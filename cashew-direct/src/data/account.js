export const currentUser = {
  firstName: 'Heshan',
  lastName: 'Pramuditha',
  email: 'heshan@example.com',
  phone: '+94 77 123 4567',
  joined: '2025-02-14',
};

export const orders = [
  {
    id: 'CD-100231',
    date: '2026-05-28',
    status: 'Delivered',
    total: 6700,
    items: [
      { productId: 'p18', name: 'Premium Cashew Gift Hamper', qty: 1, price: 6500 },
    ],
  },
  {
    id: 'CD-100214',
    date: '2026-05-12',
    status: 'Delivered',
    total: 4100,
    items: [
      { productId: 'p05', name: 'Roasted & Salted Cashews', qty: 1, price: 1650 },
      { productId: 'p07', name: 'Honey Roasted Cashews', qty: 1, price: 1450 },
      { productId: 'p10', name: 'Black Pepper Cashews', qty: 1, price: 1650 },
    ],
  },
  {
    id: 'CD-100187',
    date: '2026-04-30',
    status: 'In Transit',
    total: 2950,
    items: [
      { productId: 'p06', name: 'Roasted Unsalted Cashews', qty: 1, price: 2950 },
    ],
  },
  {
    id: 'CD-100142',
    date: '2026-04-08',
    status: 'Cancelled',
    total: 2200,
    items: [
      { productId: 'p12', name: 'Creamy Cashew Butter', qty: 1, price: 2200 },
    ],
  },
];

export const addresses = [
  {
    id: 'addr1',
    label: 'Home',
    name: 'Heshan Pramuditha',
    line1: '24/3 Lake Road',
    line2: 'Nugegoda',
    city: 'Colombo',
    postalCode: '10250',
    phone: '+94 77 123 4567',
    isDefault: true,
  },
  {
    id: 'addr2',
    label: 'Office',
    name: 'Heshan Pramuditha',
    line1: '88 Galle Road, Floor 4',
    line2: 'Colpetty',
    city: 'Colombo',
    postalCode: '00300',
    phone: '+94 77 123 4567',
    isDefault: false,
  },
];

export const ORDER_STATUS_STYLES = {
  Delivered: 'bg-brand-100 text-brand-700',
  'In Transit': 'bg-blue-100 text-blue-700',
  Processing: 'bg-amber-100 text-amber-700',
  Cancelled: 'bg-gray-100 text-gray-500',
};
