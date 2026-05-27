import { useState } from 'react';

const CATEGORIES = [
  { id: 'all', label: 'All Equipment' },
  { id: 'sound', label: 'Sound Systems' },
  { id: 'mics', label: 'Microphones' },
  { id: 'lighting', label: 'Lighting & FX' },
  { id: 'dj', label: 'DJ Decks' }
];

const EQUIPMENT_ITEMS = [
  {
    id: 'alto-speakers',
    name: 'Alto TS415 Active Speakers',
    qty: '2x',
    spec: '2500W Active Loudspeakers',
    category: 'sound',
    desc: 'Powerful active PA speakers providing crystal-clear high and mid projection. Perfect for ceremony sound, speeches, and full dance floor coverage.',
    details: 'Samson speaker stands included.'
  },
  {
    id: 'fbt-subwoofer',
    name: 'FBT X-SUB 18SA Active Subwoofer',
    qty: '1x',
    spec: '1200W RMS / 18" Subwoofer',
    category: 'sound',
    desc: 'Professional active subwoofer delivering deep, controlled low-end punch to give the dance floor a proper floor feel.',
    details: 'Heavy-duty bass response.'
  },
  {
    id: 'alto-mixer',
    name: 'Alto AMX FX140 Audio Mixer',
    qty: '1x',
    spec: 'Multi-channel mixing console',
    category: 'sound',
    desc: 'Compact audio mixer to control microphone levels, background music, and direct DJ console outputs with integrated FX routing.',
    details: 'All required audio cabling included.'
  },
  {
    id: 'hybrid-wireless-mics',
    name: 'Hybrid U-DV FE Wireless Microphones',
    qty: '2x',
    spec: 'Dual Handheld UHF Wireless',
    category: 'mics',
    desc: 'High-frequency wireless microphone set for speeches, toasts, MCing, and announcements. Clear signal across the room.',
    details: 'Includes microphone stand.'
  },
  {
    id: 'superlux-mic',
    name: 'Superlux Dynamic Microphone',
    qty: '1x',
    spec: 'Corded Vocal Microphone',
    category: 'mics',
    desc: 'Robust corded dynamic microphone, perfect as a backup mic or for ceremony/DJ booth announcements.',
    details: 'Vocal-tuned frequency response.'
  },
  {
    id: 'beamz-partybar',
    name: 'Beamz Partybar 12 Light System',
    qty: '1x',
    spec: 'LED RGBW Wash & Derby System',
    category: 'lighting',
    desc: 'All-in-one lighting stand equipped with high-intensity LED wash pars and derby effect lights to illuminate the dance floor automatically.',
    details: 'Sound-to-light activation.'
  },
  {
    id: 'parcan-lights',
    name: 'Parcan Wash Lights',
    qty: '4x',
    spec: 'RGB LED Spotlights',
    category: 'lighting',
    desc: 'Compact wash lights to create ambient color schemes, illuminate walls, or add pulsing color beats behind the DJ booth.',
    details: 'Flexible positioning stands.'
  },
  {
    id: 'beamz-smoke-machine',
    name: 'Beamz Rage 600 LED Smoke Machine',
    qty: '1x',
    spec: '600W fogger with Amber LEDs',
    category: 'lighting',
    desc: 'Compact smoke machine that highlights light beams on the dance floor. Features built-in amber LEDs for a warm flame-like exit effect.',
    details: 'Safe, water-based fog liquid.'
  },
  {
    id: 'numark-controller',
    name: 'Numark Mixtrack Platinum FX DJ Controller',
    qty: '1x',
    spec: '4-deck DJ controller with FX paddles',
    category: 'dj',
    desc: 'Professional DJ controller featuring built-in display screens on the jog wheels, dedicated FX paddles, and seamless software integration.',
    details: 'Used directly by Michael for live mixing.'
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
    : EQUIPMENT_ITEMS.filter(item => item.category === activeTab);

  const buildWhatsAppLink = () => {
    const selectedList = EQUIPMENT_ITEMS.filter(item => selectedItems[item.id]);
    if (selectedList.length === 0) return '';
    
    let text = 'Hi Michael,\n\nI would like to enquire about renting the following equipment from Roos Sound:\n';
    selectedList.forEach(item => {
      text += `- ${item.qty} ${item.name} (${item.spec})\n`;
    });
    
    text += '\nPlease let me know your availability and pricing for my event!';
    return `https://wa.me/27722791279?text=${encodeURIComponent(text)}`;
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
              {isCartOpen ? '▼ Hide' : '▲ Show Selection'}
            </button>
          </div>
          
          {isCartOpen && (
            <div className="enquiry-drawer-body">
              <ul className="enquiry-list">
                {EQUIPMENT_ITEMS.filter(item => selectedItems[item.id]).map(item => (
                  <li key={item.id} className="enquiry-item">
                    <span><strong>{item.qty}</strong> {item.name}</span>
                    <button type="button" className="remove-item-btn" onClick={() => toggleItem(item.id)}>×</button>
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
