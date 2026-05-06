import { useMemo, useState } from 'react';
import { useApp } from '../store/AppContext';

const managerTabs = [
  { id: 'overview', icon: '▦', label: 'Genel Bakis' },
  { id: 'locations', icon: '⌖', label: 'Mekanlar' },
  { id: 'inventory', icon: '▤', label: 'Envanter' },
  { id: 'finance', icon: '◉', label: 'Finans' },
];

const fallbackLocations = [
  { name: 'Starbucks Nisantasi', address: 'Istanbul, TR' },
  { name: 'BigChefs Akasya', address: 'Istanbul, TR' },
  { name: 'Espressolab Besiktas', address: 'Istanbul, TR' },
];

function BarChart({ values }) {
  const max = Math.max(...values.map(item => item.value), 1);

  return (
    <div className="manager-bars" aria-label="Buyume trendleri">
      {values.map(item => (
        <div className="manager-bar-item" key={item.label}>
          <div className="manager-bar-track">
            <span
              className={`manager-bar ${item.highlight ? 'is-highlighted' : ''}`}
              style={{ height: `${Math.max((item.value / max) * 100, 18)}%` }}
            />
          </div>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function ManagerPanel() {
  const { rentals, bags, locations, currentUser, logout } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  const liveStatuses = ['active', 'overdue', 'pending_return'];
  const activeRentals = rentals.filter(rental => liveStatuses.includes(rental.status));
  const completedRentals = rentals.filter(rental => rental.status === 'completed');
  const totalRevenue = completedRentals.reduce((sum, rental) => sum + (rental.fee || 0), 0);
  const rentedBagIds = new Set(activeRentals.map(rental => rental.bagId).filter(Boolean));
  const availableBags = Math.max(bags.length - rentedBagIds.size, 0);

  const averageHours = useMemo(() => {
    const completedWithDuration = completedRentals.filter(rental => rental.startTime && rental.endTime && rental.endTime > rental.startTime);
    if (!completedWithDuration.length) return 4.5;
    const totalMs = completedWithDuration.reduce((sum, rental) => sum + (rental.endTime - rental.startTime), 0);
    return totalMs / completedWithDuration.length / 3600000;
  }, [completedRentals]);

  const locationRows = useMemo(() => {
    const sourceLocations = locations.length ? locations : fallbackLocations;

    return sourceLocations.slice(0, 3).map((location, index) => {
      const locationName = location.name;
      const locationBags = bags.filter(bag => bag.locationId === location.id);
      const locationRentals = rentals.filter(rental => rental.locationName === locationName);
      const activeCount = locationRentals.filter(rental => liveStatuses.includes(rental.status)).length;
      const returnCount = locationRentals.filter(rental => rental.status === 'completed' || rental.status === 'pending_return').length;
      const revenue = locationRentals.reduce((sum, rental) => sum + (rental.fee || 0), 0);
      const capacity = locationBags.length || [50, 40, 30][index];
      const current = locationBags.filter(bag => bag.available).length || [42, 8, 25][index];
      const isLow = current / capacity < 0.35;

      return {
        id: location.id || locationName,
        name: locationName,
        address: location.address || 'Istanbul, TR',
        icon: ['☕', '🍴', '▰'][index] || '▰',
        current,
        capacity,
        rentals: activeCount || [156, 210, 94][index],
        returns: returnCount || [148, 202, 88][index],
        revenue: revenue || [12450, 18920, 7100][index],
        status: isLow ? 'Dusuk Stok' : 'Aktif',
        isLow,
      };
    });
  }, [bags, locations, rentals]);

  const trendValues = [
    { label: 'Pzt', value: 22 },
    { label: 'Sal', value: 30 },
    { label: 'Car', value: 24 },
    { label: 'Per', value: 38 },
    { label: 'Cum', value: 46 },
    { label: 'Cmt', value: 36 },
    { label: 'Paz', value: 52, highlight: true },
  ];

  return (
    <div className="manager-shell">
      <aside className="manager-sidebar">
        <div className="manager-profile">
          <div className="manager-avatar">E</div>
          <div>
            <strong>EcoStyle Yonetici</strong>
            <span>Yonetici Paneli</span>
          </div>
        </div>

        <nav className="manager-nav">
          {managerTabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              className={`manager-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.icon}</span>
              <b>{tab.label}</b>
            </button>
          ))}
        </nav>
      </aside>

      <main className="manager-main">
        <header className="manager-topbar">
          <div className="manager-title-row">
            <button className="manager-menu-btn" type="button" aria-label="Menu">☰</button>
            <h1>EcoStyle Paneli</h1>
          </div>
          <div className="manager-user-actions">
            <button type="button" aria-label="Bildirimler">♧</button>
            <span>{currentUser?.name || 'EcoStyle Yonetici'}</span>
            <button type="button" onClick={logout}>Cikis</button>
          </div>
        </header>

        <section className="manager-content">
          <div className="manager-metrics">
            <article className="manager-metric-card">
              <div className="manager-card-head">
                <span>Toplam Envanter</span>
                <b>▢</b>
              </div>
              <strong>{bags.length || 450}</strong>
              <small>Yuksek talep mevcut</small>
              <div className="manager-line-meter"><span style={{ width: `${Math.min((availableBags / Math.max(bags.length, 1)) * 100, 94)}%` }} /></div>
            </article>

            <article className="manager-metric-card">
              <div className="manager-card-head">
                <span>Aktif Kiralamalar</span>
                <b>⇄</b>
              </div>
              <strong>{activeRentals.length || 128}</strong>
              <small>Yuksek talep mevcut</small>
              <div className="manager-segments">
                {[25, 36, 52, 78, 44].map((size, index) => (
                  <span key={size} className={index === 3 ? 'active' : ''} style={{ opacity: `${0.45 + index * 0.11}` }} />
                ))}
              </div>
            </article>

            <article className="manager-metric-card">
              <div className="manager-card-head">
                <span>Ort. Kiralama Suresi</span>
                <b>◷</b>
              </div>
              <strong>{averageHours.toFixed(1)} hrs</strong>
              <small>-0.5 sa ideal</small>
              <div className="manager-efficiency">
                <span>%{Math.min(Math.round((availableBags / Math.max(bags.length, 1)) * 100), 96) || 82}</span>
                <b>Verimlilik hedefi</b>
              </div>
            </article>
          </div>

          <section className="manager-panel-card manager-location-panel">
            <div className="manager-section-head">
              <div>
                <h2>Mekan Bazli Kiralamalar</h2>
                <p>Perakende ortaklari genelindeki operasyonel performans</p>
              </div>
              <button type="button">↧ Veriyi Disa Aktar</button>
            </div>

            <div className="manager-table">
              <div className="manager-table-header">
                <span>Mekan</span>
                <span>Mevcut Canta</span>
                <span>Kiralama / Iade</span>
                <span>Toplam Kazanc</span>
                <span>Durum</span>
              </div>
              {locationRows.map(row => (
                <div className="manager-table-row" key={row.id}>
                  <div className="manager-place">
                    <span>{row.icon}</span>
                    <div>
                      <strong>{row.name}</strong>
                      <small>{row.address}</small>
                    </div>
                  </div>
                  <div className="manager-stock">
                    <b className={row.isLow ? 'is-low' : ''}>{row.current} / {row.capacity}</b>
                    <i><em style={{ width: `${Math.min((row.current / row.capacity) * 100, 100)}%` }} /></i>
                  </div>
                  <div className="manager-flow">
                    <span>↗ {row.rentals}</span>
                    <span>↙ {row.returns}</span>
                  </div>
                  <strong className="manager-revenue">{row.revenue.toLocaleString('tr-TR')} TL</strong>
                  <span className={`manager-status ${row.isLow ? 'danger' : ''}`}>{row.status}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="manager-panel-card manager-growth">
            <div className="manager-section-head compact">
              <div>
                <h2>↗ Buyume Trendleri</h2>
                <p>Kiralama deviri Besiktas genislemesinden bu yana %18.4 artti.</p>
              </div>
            </div>
            <BarChart values={trendValues} />
          </section>
        </section>
      </main>
    </div>
  );
}
