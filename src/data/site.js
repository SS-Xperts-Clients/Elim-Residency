import {
  Armchair,
  BedDouble,
  Car,
  CheckCircle2,
  ClipboardCheck,
  DoorClosed,
  Fence,
  Home,
  KeyRound,
  Mail,
  MapPin,
  Microwave,
  Phone,
  ShieldCheck,
  Sofa,
  Sparkles,
  Utensils,
  Wifi
} from 'lucide-react';

export const site = {
  name: 'Elim',
  fullName: 'Elim Student Residency',
  email: 'support@elimresidency.co.za',
  phone: '+27 73 139 0344',
  address: '89 Braam Pretorius Street, Wonderboom, Pretoria',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=89%20Braam%20Pretorius%20Street%2C%20Wonderboom%2C%20Pretoria'
};

export const about = {
  eyebrow: 'About Elim',
  title: 'We Care About Student Success',
  paragraphs: [
    'At Elim Student Residency, we believe that every student deserves a comfortable place to call home.',
    'Our accommodation is designed to provide a peaceful, secure, and welcoming environment where students can study, grow, and build lifelong friendships.',
    'Our mission is to create more than just accommodation; we create a community.'
  ]
};

export const rooms = [
  {
    name: 'Single Rooms',
    tag: 'Best for Privacy',
    description: 'Private room for maximum comfort and privacy.',
    price: 'Enquire',
    image:
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=85',
    includes: [
      ['Bed', BedDouble],
      ['Mattress', CheckCircle2],
      ['Wardrobe', DoorClosed],
      ['Study desk', ClipboardCheck],
      ['Chair', Armchair],
      ['Wi-Fi', Wifi],
      ['Electricity', Sparkles],
      ['Water', CheckCircle2],
      ['Stove', Utensils],
      ['Fridge', Home],
      ['Microwave', Microwave]
    ]
  },
  {
    name: 'Sharing Rooms',
    tag: 'Great Value',
    description: 'Affordable shared accommodation with ample space.',
    price: 'Enquire',
    image:
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1200&q=85',
    includes: [
      ['Bed', BedDouble],
      ['Mattress', CheckCircle2],
      ['Wardrobe', DoorClosed],
      ['Study desk', ClipboardCheck],
      ['Wi-Fi', Wifi],
      ['Water and electricity', Sparkles],
      ['Stove', Utensils],
      ['Fridge', Home],
      ['Microwave', Microwave]
    ]
  }
];

export const amenities = [
  ['Unlimited Wi-Fi', Wifi, 'Reliable connectivity for study, streaming, and staying in touch.'],
  ['Fully Equipped Kitchen', Utensils, 'Shared cooking spaces with essential appliances.'],
  ['Laundry Facilities', Sparkles, 'Convenient laundry access for everyday student living.'],
  ['Entertainment Area', Sofa, 'A relaxed shared area for downtime and community.'],
  ['Secure Access', KeyRound, 'Controlled access helps keep the property secure.'],
  ['Daily Common Area Cleaning', ClipboardCheck, 'Shared spaces are cleaned daily.'],
  ['Secure Parking', Car, 'Parking access is available for residents.'],
  ['Outdoor Relaxation Area', Sparkles, 'Fresh-air spaces for breaks between study sessions.']
];

export const safety = [
  ['Controlled Access', KeyRound],
  ['Secure Gates', ShieldCheck],
  ['Perimeter Fencing', Fence],
  ['Emergency Contact Support', Phone],
  ['House Rules for Peaceful Living', ClipboardCheck]
];

export const faqs = [
  {
    question: 'What is included in the accommodation?',
    answer:
      'Rooms include essential furniture, Wi-Fi, water and electricity, and access to shared student-living facilities.'
  },
  {
    question: 'Are the rooms secure?',
    answer:
      'Yes. The property includes controlled access, secure gates, perimeter fencing, and emergency contact support.'
  },
  {
    question: 'Can I enquire about availability online?',
    answer:
      'Yes. Use the enquiry form and the Elim team will respond with availability and next steps.'
  },
  {
    question: 'Are common areas cleaned?',
    answer: 'Yes. Common areas are cleaned daily to support a comfortable shared living environment.'
  }
];

export const contactMethods = [
  ['Address', site.address, MapPin],
  ['Phone', site.phone, Phone],
  ['Email', site.email, Mail]
];


