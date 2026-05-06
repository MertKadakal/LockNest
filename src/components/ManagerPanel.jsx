import { useMemo } from 'react';
import { useApp } from '../store/AppContext';

const LIVE_STATUSES = ['active', 'overdue', 'pending_return'];

function csvEscape(value) {
  const normalized = value == null ? '' : String(value);
  return `"${normalized.replace(/"/g, '""')}"`;
}

function downloadCsv(filename, rows) {
  const csv = rows.map(row => row.map(csvEscape).join(',')).join('\n');
  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function MiniBars({ values }) {
  const max = Math.max(...values.map(item => item.value), 1);

  return (
    <div className="manager-mini-bars" aria-label="Son 7 gun kiralama trendi">
      {values.map(item => (
        <div className="manager-mini-bar-item" key={item.key}>
          <div className="manager-mini-bar-track">
            <span style={{ height: `${item.value ? Math.max((item.value / max) * 100, 18) : 4}%` }} />
          </div>
          <b>{item.label}</b>
        </div>
      ))}
    </div>
  );
}

export default function ManagerPanel() {
  const { rentals, bags, locations, currentUser, logout } = useApp();

  const activeRentals = rentals.filter(rental => LIVE_STATUSES.includes(rental.status));
  const completedRentals = rentals.filter(rental => rental.status === 'completed');
  const activeBagIds = new Set(activeRentals.map(rental => rental.bagId).filter(Boolean));
  const availableBags = bags.filter(bag => bag.available).length;
  const inventoryUsage = bags.length ? Math.round(((bags.length - availableBags) / bags.length) * 100) : 0;

  const averageHours = useMemo(() => {
    const rentalsWithDuration = completedRentals.filter(rental => (
      Number.isFinite(rental.startTime) &&
      Number.isFinite(rental.endTime) &&
      rental.endTime > rental.startTime
    ));

    if (!rentalsWithDuration.length) return 0;

    const totalMs = rentalsWithDuration.reduce((sum, rental) => sum + (rental.endTime - rental.startTime), 0);
    return totalMs / rentalsWithDuration.length / 3600000;
  }, [completedRentals]);

  const locationRows = useMemo(() => {
    return locations.map(location => {
      const locationBags = bags.filter(bag => bag.locationId === location.id);
      const locationRentals = rentals.filter(rental => rental.locationName === location.name);
      const activeCount = locationRentals.filter(rental => LIVE_STATUSES.includes(rental.status)).length;
      const returnCount = locationRentals.filter(rental => rental.status === 'completed' || rental.status === 'pending_return').length;
      const revenue = locationRentals
        .filter(rental => rental.status === 'completed')
        .reduce((sum, rental) => sum + (rental.fee || 0), 0);
      const capacity = locationBags.length;
      const available = locationBags.filter(bag => bag.available).length;
      const availabilityRate = capacity ? available / capacity : 0;
      const isLow = capacity > 0 && availabilityRate < 0.35;

      return {
        id: location.id,
        name: location.name,
        address: location.address || '',
        available,
        capacity,
        activeCount,
        returnCount,
        revenue,
        status: capacity === 0 ? 'Canta Yok' : isLow ? 'Dusuk Stok' : 'Aktif',
        isLow,
      };
    });
  }, [bags, locations, rentals]);

  const trendValues = useMemo(() => {
    const formatter = new Intl.DateTimeFormat('tr-TR', { weekday: 'short' });
    const today = new Date();

    return Array.from({ length: 7 }, (_, index) => {
      const day = new Date(today);
      day.setDate(today.getDate() - (6 - index));
      day.setHours(0, 0, 0, 0);
      const nextDay = new Date(day);
      nextDay.setDate(day.getDate() + 1);

      return {
        key: day.toISOString(),
        label: formatter.format(day),
        value: rentals.filter(rental => rental.startTime >= day.getTime() && rental.startTime < nextDay.getTime()).length,
      };
    });
  }, [rentals]);

  const exportLocationCsv = () => {
    const rows = [
      ['Mekan', 'Adres', 'Musait Canta', 'Toplam Canta', 'Aktif Kiralama', 'Iade/Tamamlanan', 'Toplam Kazanc', 'Durum'],
      ...locationRows.map(row => [
        row.name,
        row.address,
        row.available,
        row.capacity,
        row.activeCount,
        row.returnCount,
        row.revenue,
        row.status,
      ]),
    ];

    downloadCsv(`ecostyle-mekan-raporu-${new Date().toISOString().slice(0, 10)}.csv`, rows);
  };

  return (
    <div className="screen manager-overview-screen">
      <header className="manager-app-header">
        <div>
          <span className="manager-kicker">Yonetici Paneli</span>
          <h1>EcoStyle Paneli</h1>
          <p>{currentUser?.name || 'EcoStyle Yonetici'}</p>
        </div>
        <button type="button" className="manager-logout-btn" onClick={logout}>Cikis</button>
      </header>

      <main className="manager-overview-content">
        <section className="manager-stats-grid">
          <article className="manager-stat-card">
            <span>Toplam Envanter</span>
            <strong>{bags.length}</strong>
            <small>{availableBags} canta musait</small>
            <div className="manager-meter">
              <i style={{ width: `${inventoryUsage}%` }} />
            </div>
          </article>

          <article className="manager-stat-card">
            <span>Aktif Kiralamalar</span>
            <strong>{activeRentals.length}</strong>
            <small>{activeBagIds.size} canta kullanimda</small>
            <div className="manager-meter">
              <i style={{ width: `${bags.length ? Math.min((activeRentals.length / bags.length) * 100, 100) : 0}%` }} />
            </div>
          </article>

          <article className="manager-stat-card">
            <span>Ort. Kiralama Suresi</span>
            <strong>{averageHours.toFixed(1)} saat</strong>
            <small>{completedRentals.length} tamamlanan kiralama</small>
            <div className="manager-meter">
              <i style={{ width: `${Math.min((averageHours / 8) * 100, 100)}%` }} />
            </div>
          </article>
        </section>

        <section className="manager-card">
          <div className="manager-card-title-row">
            <div>
              <h2>Mekan Bazli Kiralamalar</h2>
              <p>Firebase verileriyle guncel operasyon ozeti</p>
            </div>
            <button type="button" onClick={exportLocationCsv}>CSV Indir</button>
          </div>

          {locationRows.length ? (
            <div className="manager-location-list">
              {locationRows.map(row => (
                <article className="manager-location-row" key={row.id}>
                  <div className="manager-location-main">
                    <div className="location-icon">⌖</div>
                    <div>
                      <h3>{row.name}</h3>
                      <p>{row.address}</p>
                    </div>
                  </div>

                  <div className="manager-location-metrics">
                    <div>
                      <span>Envanter</span>
                      <strong className={row.isLow ? 'danger-text' : ''}>{row.available} / {row.capacity}</strong>
                    </div>
                    <div>
                      <span>Kiralama / Iade</span>
                      <strong>{row.activeCount} / {row.returnCount}</strong>
                    </div>
                    <div>
                      <span>Kazanc</span>
                      <strong>{row.revenue.toLocaleString('tr-TR')} TL</strong>
                    </div>
                  </div>

                  <span className={`manager-status-badge ${row.isLow ? 'danger' : ''}`}>{row.status}</span>
                </article>
              ))}
            </div>
          ) : (
            <div className="manager-empty-state">Henuz mekan verisi bulunmuyor.</div>
          )}
        </section>

        <section className="manager-card">
          <div className="manager-card-title-row">
            <div>
              <h2>Son 7 Gun Trendi</h2>
              <p>Gunluk baslatilan kiralama adetleri</p>
            </div>
          </div>
          <MiniBars values={trendValues} />
        </section>
      </main>
    </div>
  );
}
