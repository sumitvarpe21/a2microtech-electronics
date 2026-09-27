export const COMPANY = {
  name: 'A2 Microtech',
  legalName: 'A2MICROTECH INDIA PVT. LTD',
  tagline: "India's Electronic Components & Technology Store",
  description:
    'Explore quality electronic components, technology products and solutions designed for modern needs.',
  email: 'support@a2microtech.in',
  phones: ['+919175702325', '+917758931307'],
  whatsapp: '919175702325',
  address: 'Talwade, Pimpri-Chinchwad, Maharashtra - 411062',
  city: 'Pune',
  state: 'Maharashtra',
  pincode: '411062',
  copyright: '© 2025 A2MICROTECH INDIA PVT. LTD. All rights reserved.',
  team: [
    { name: 'Avinash Ghalme', role: 'Founder & Director' },
    { name: 'Akash Chechare', role: 'Co-Founder & Technical Lead' },
  ],
  about:
    'A2MICROTECH INDIA PVT. LTD provides electronics, technology products and development solutions for students, developers, businesses and technology enthusiasts.',
  aboutLong:
    'A2 Microtech is focused on providing electronic components, development boards, sensors, accessories and technology solutions.',
  mission:
    'We continuously explore modern technologies, electronics and digital solutions.',
  values: [
    {
      title: 'Quality Products',
      description: 'Carefully sourced electronic components and development boards you can rely on.',
      icon: 'shield-check',
    },
    {
      title: 'Fast Delivery',
      description: 'Reliable delivery across India with quick order processing.',
      icon: 'truck',
    },
    {
      title: 'Customer Focus',
      description: 'Dedicated support to help you complete your projects with confidence.',
      icon: 'headphones',
    },
  ],
  services: [
    {
      title: 'Electronic Components',
      description:
        'Explore electronic components, development boards, sensors, modules and accessories.',
      icon: 'cpu',
    },
    {
      title: 'Electronics Prototyping',
      description:
        'Components and prototyping support for electronics projects, experiments and product development.',
      icon: 'lightbulb',
    },
    {
      title: 'Digital Solutions',
      description:
        'Development boards, sensors and IoT solutions for automation, monitoring and smart systems.',
      icon: 'wifi',
    },
  ],
};

export const CATEGORIES = [
  'Development Boards',
  'Sensors & Modules',
  'Motors',
  'LEDs',
  'Resistors',
  'Displays',
  'IOT & Wireless',
  'ICs',
  'Transistors',
  'Diodes',
  'Wires & Cables',
  'Battery & Power',
  'Tools & Accessories',
] as const;

export const CATEGORY_IMAGES: Record<string, string> = {
  'Development Boards':
    'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=800&q=80',
  'Sensors & Modules':
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  Motors:
    'https://images.unsplash.com/photo-1581092921461-eab62a97adf7?auto=format&fit=crop&w=800&q=80',
  LEDs:
    'https://images.unsplash.com/photo-1565636291923-c0e22c3a4f1b?auto=format&fit=crop&w=800&q=80',
  Resistors:
    'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80',
  Displays:
    'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80',
  'IOT & Wireless':
    'https://images.unsplash.com/photo-1451187580459-9546f893c31f?auto=format&fit=crop&w=800&q=80',
  ICs: 'https://images.unsplash.com/photo-1603796349810-26b2888c305f?auto=format&fit=crop&w=800&q=80',
  Transistors:
    'https://images.unsplash.com/photo-1581092160562-40aa0e693c14?auto=format&fit=crop&w=800&q=80',
  Diodes:
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  'Wires & Cables':
    'https://images.unsplash.com/photo-1565608087348-1f54887dc3a4?auto=format&fit=crop&w=800&q=80',
  'Battery & Power':
    'https://images.unsplash.com/photo-1608216251941-9897a4d3a3a4?auto=format&fit=crop&w=800&q=80',
  'Tools & Accessories':
    'https://images.unsplash.com/photo-1530124566582-a618bc271f92?auto=format&fit=crop&w=800&q=80',
};
