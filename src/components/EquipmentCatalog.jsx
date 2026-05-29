import { useState } from 'react';
import { parseSafeUrl } from '../security-utils.js';

const CATEGORIES = [
  { id: 'all', label: 'All Equipment' },
  { id: 'sound', label: 'Sound Systems' },
  { id: 'lighting', label: 'Lighting & FX' }
];

const EQUIPMENT_ITEMS = [
  {
    id: 'alto-speakers',
    name: 'Alto Speakers',
    image: '/assets/equipment-alto-speaker.png',
    qty: '2x',
    spec: 'Active PA Speakers',
    category: 'sound',
    desc: 'Powerful active speakers for clear speech, clean mids, and full dance-floor projection.',
    details: 'Speaker stands included.'
  },
  {
    id: 'subwoofer',
    name: 'Subwoofer',
    image: '/assets/equipment-subwoofer.webp',
    qty: '1x',
    spec: '18-inch Active Sub',
    category: 'sound',
    desc: 'Deep, controlled bass response that gives the dance floor proper low-end weight.',
    details: 'Designed for event-scale output.'
  },
  {
    id: 'beamz-partybar',
    name: 'Beamz Partybar 12 Light',
    image: '/assets/equipment-beamz-partybar12.png',
    qty: '1x',
    spec: 'LED RGBW Wash & Derby System',
    category: 'lighting',
    desc: 'All-in-one lighting system with wash and derby effects to energize the dance floor.',
    details: 'Sound-to-light activation.'
  },
  {
    id: 'smoke-machine',
    name: 'Smoke Machine',
    image: '/assets/equipment-smoke-machine.png',
    qty: '1x',
    spec: 'Event Fogger',
    category: 'lighting',
    desc: 'Smoke output that makes light beams more visible and boosts the event atmosphere.',
    details: 'Water-based fog fluid.'
  }
];

export default function EquipmentCatalog() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedItems, setSelectedItems] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleItem = (id) => {
    setSelectedItems((prev) => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = true;
      }
      return next;
    });
  };

  const clearCart = () => {
    setSelectedItems({});
  };

  const getSelectedCount = () => {
    return Object.keys(selectedItems).length;
  };

  const filteredItems = activeTab === 'all'
    ? EQUIPMENT_ITEMS
    : EQUIPMENT_ITEMS.filter((item) => item.category === activeTab);

  const buildWhatsAppLink = () => {
    const selectedList = EQUIPMENT_ITEMS.filter((item) => selectedItems[item.id]);
    if (selectedList.length === 0) return '';

    let text = 'Hi Michael,\n\nI would like to enquire about renting the following equipment from Roos Sound:\n';
    selectedList.forEach((item) => {
      text += `- ${item.qty} ${item.name} (${item.spec})\n`;
    });

    text += '\nPlease let me know your availability and pricing for my event!';
    const rawLink = `https://wa.me/27722791279?text=${encodeURIComponent(text)}`;
    const safeUrl = parseSafeUrl(rawLink, { allowSameOrigin: false });
    return safeUrl ? safeUrl.href : '';
  };

  return (
    <div className="equipment-catalog-system">
      <div className="catalog-toolbar">
        <div className="filters">
          {CATEGORIES.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={`filter-btn ${activeTab === id ? 'active' : ''}`}
              onClick={() => setActiveTab(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="auto-grid catalog-grid">
        {filteredItems.map((item) => {
          const isAdded = !!selectedItems[item.id];
          return (
            <article key={item.id} className={`glass card equipment-card ${isAdded ? 'selected-item' : ''}`}>
              <div className="equipment-image-slot">
                <img
                  src={item.image}
                  alt={item.name}
                  width="280"
                  height="280"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="equipment-card-header">
                <span className="badge">{item.qty} Qty</span>
                <h3>{item.name}</h3>
              </div>
              <p>{item.desc}</p>
              <div className="specs">
                <div className="spec">
                  <span>Spec</span>
                  <strong>{item.spec}</strong>
                </div>
                <div className="spec">
                  <span>Includes</span>
                  <small>{item.details}</small>
                </div>
              </div>
              <button
                type="button"
                className={`btn small ${isAdded ? '' : 'secondary'}`}
                onClick={() => toggleItem(item.id)}
              >
                {isAdded ? 'Remove' : 'Add to Enquiry'}
              </button>
            </article>
          );
        })}
      </div>

      {/* Floating Enquiry Drawer */}
      {getSelectedCount() > 0 && (
        <div className={`glass enquiry-drawer ${isCartOpen ? 'open' : ''}`}>
          <div className="enquiry-drawer-header" onClick={() => setIsCartOpen(!isCartOpen)}>
            <div className="enquiry-drawer-title">
              <span className="cart-badge">{getSelectedCount()}</span>
              <h3>Selected Equipment Enquiry</h3>
            </div>
            <button type="button" className="drawer-toggle">
              {isCartOpen ? 'Hide' : 'Show Selection'}
            </button>
          </div>

          {isCartOpen && (
            <div className="enquiry-drawer-body">
              <ul className="enquiry-list">
                {EQUIPMENT_ITEMS.filter((item) => selectedItems[item.id]).map((item) => (
                  <li key={item.id} className="enquiry-item">
                    <span><strong>{item.qty}</strong> {item.name}</span>
                    <button type="button" className="remove-item-btn" onClick={() => toggleItem(item.id)}>Remove</button>
                  </li>
                ))}
              </ul>

              <div className="enquiry-actions">
                <button type="button" className="btn secondary small" onClick={clearCart}>Clear All</button>
                <a
                  className="btn small whatsapp-btn"
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Send WhatsApp Enquiry
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
