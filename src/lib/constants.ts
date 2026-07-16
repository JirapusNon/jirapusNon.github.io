export const SITE_NAME = 'RNK Products';
export const SITE_TAGLINE = 'หมึกและอุปกรณ์สำนักงาน';

export const CONTACT = {
  lineUrl: 'https://line.me/ti/p/~0863132196',
  lineId: '0863132196',
  phone: '086-313-2196',
  phoneHref: 'tel:0863132196',
  facebookUrl: 'https://facebook.com/rnkink',
  messengerUrl: 'https://m.me/rnkink',
  instagramUrl: 'https://instagram.com/rnkink',
  // TODO: ใส่ URL ร้านจริง — ค่านี้เป็น placeholder ยังใช้งานไม่ได้
  shopeeUrl: 'https://shopee.co.th/rnkink',
  // TODO: ใส่ URL บัญชีจริง — ค่านี้เป็น placeholder ยังใช้งานไม่ได้
  tiktokUrl: 'https://tiktok.com/@rnkink',
  email: 'sales@rnkproducts.co.th',
  address: '123 ถนนสุขุมวิท แขวงคลองตัน เขตคลองเตย กรุงเทพมหานคร 10110',
  addressShort: 'กรุงเทพฯ',
  mapUrl: 'https://maps.google.com/?q=RNK+Products+Bangkok',
};

export const BUSINESS = {
  legalName: 'บริษัท อาร์เอ็นเค โปรดักส์ จำกัด',
  taxId: '1102034750678',
  foundedYear: 2010,
  hours: 'จ. - ศ. 08:00 - 18:00',
  responseTime: 'ตอบ LINE ภายใน 30 นาที (เวลาทำการ)',
  aboutImage: '/products/photos/cannon2.jpg',
  storeImage: '/ink-images/store.jpeg',
  aboutImageAlt: 'คลังสินค้าหมึกพิมพ์และอุปกรณ์สำนักงานของ RNK Products',
  storeImageAlt: 'หน้าร้านและคลังสินค้า RNK Products',
  about: [
    'RNK Products จำหน่ายหมึกพิมพ์และอุปกรณ์สำนักงานครบทุกยี่ห้อ ตั้งแต่ปี 2010 ให้บริการ SME ร้านค้า และองค์กรทั่วประเทศ',
    'มีสต็อกพร้อมส่งจากคลังในกรุงเทพฯ ทีมงานช่วยเช็กรุ่นหมึกที่ตรงกับเครื่องพิมพ์ของคุณ สั่งซ้ำได้สะดวกผ่าน LINE',
    'ออกใบกำกับภาษีเต็มรูปแบบได้ รองรับการสั่งซื้อแบบองค์กรและการจัดซื้อประจำ',
  ],
  aboutHomeLead:
    'จำหน่ายหมึกพิมพ์และอุปกรณ์สำนักงานครบยี่ห้อ สต็อกพร้อมส่ง ช่วยเช็กรุ่นตรงเครื่อง สั่งซ้ำผ่าน LINE',
  aboutHomeHighlights: ['จัดส่งทั่วไทย', 'ใบกำกับภาษี', 'SME และองค์กร'],
  aboutExtended: [
    'เริ่มจากการจำหน่ายหมึกพิมพ์ให้ร้านค้าและสำนักงานในพื้นที่กรุงเทพฯ ก่อนขยายบริการจัดส่งทั่วประเทศ ปัจจุบันมีสต็อกหมึกแท้ หมึกเทียบเท่า โทนเนอร์ และอุปกรณ์สำนักงานครบหลายร้อยรุ่น',
    'ทีมงาน RNK ช่วยตรวจสอบรุ่นเครื่องพิมพ์ก่อนจัดส่งทุกครั้ง ลดปัญหาซื้อหมึกผิดรุ่น ลูกค้าองค์กรสามารถตั้งรายการสั่งซื้อประจำและออกใบกำกับภาษีได้ครบถ้วน',
    'นอกจากการสั่งซื้อออนไลน์และ LINE ลูกค้าสามารถเข้ามารับสินค้าและปรึกษาหน้าคลังได้ แนะนำโทรหรือแชทนัดหมายล่วงหน้าเพื่อให้ทีมงานเตรียมสินค้าไว้',
  ],
  values: [
    'สต็อกพร้อมส่งจากคลังกรุงเทพฯ',
    'ช่วยเช็กรุ่นหมึกตรงเครื่องพิมพ์',
    'ราคาโปร่งใส แจ้งก่อนจัดส่ง',
    'รองรับใบกำกับภาษีและการจัดซื้อประจำ',
  ],
  aboutHomeTrust: {
    tax: 'นิติบุคคลและ SME',
    payment: 'โอน · PromptPay',
  },
  paymentMethods: ['โอนธนาคาร', 'PromptPay', 'เงินสด (รับที่ร้าน)'],
  shippingPartners: ['Kerry Express', 'Flash Express', 'ไปรษณีย์ไทย'],
} as const;

export const FOOTER = {
  heading: 'ติดต่อสอบถามเรื่องหมึกพิมพ์',
  tagline:
    'บริษัท อาร์เอ็นเค โปรดักส์ จำกัด ผู้แทนจำหน่าย หมึกแท้และหมึกรีเมนูทุกรุ่น',
  lineButton: 'แชท LINE',
  contactButton: 'ข้อมูลติดต่อเพิ่มเติม',
} as const;

export const HOME_CTA = {
  label: 'ติดต่อเรา',
  title: 'ยินดีให้คำปรึกษา',
  description: 'ติดต่อสอบถาม เช็คราคาสินค้าและสต็อก',
  services: ['ให้คำปรึกษา', 'เช็คราคา', 'เช็คสต็อก'] as const,
  lineButton: 'แชท LINE',
  phoneButton: 'โทรสอบถาม',
  contactButton: 'ข้อมูลติดต่อเพิ่มเติม',
} as const;

/* ช่องทางการจัดจำหน่าย — LINE มาก่อนเพราะเป็นช่องทางที่ทีมงานตอบจริง
   `id` ผูกกับคลาส .channel-tile--{id} ใน globals.css ที่กำหนดสีแบรนด์ */
export const SALES_CHANNELS = [
  {
    id: 'line',
    name: 'LINE',
    handle: CONTACT.lineId,
    url: CONTACT.lineUrl,
  },
  {
    id: 'shopee',
    name: 'Shopee',
    handle: 'RNK Products',
    url: CONTACT.shopeeUrl,
    // ลบบรรทัดนี้ออกเมื่อใส่ URL จริงใน CONTACT.shopeeUrl แล้ว
    pending: true,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'RNK Products',
    url: CONTACT.facebookUrl,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@rnkink',
    url: CONTACT.instagramUrl,
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@rnkink',
    url: CONTACT.tiktokUrl,
    // ลบบรรทัดนี้ออกเมื่อใส่ URL จริงใน CONTACT.tiktokUrl แล้ว
    pending: true,
  },
] as const;

export const STORE = {
  eyebrow: 'คลังสินค้า · กรุงเทพฯ',
  title: 'คลัง RNK Products',
  intro:
    'เรามีคลังสินค้าและจุดรับหมึกพิมพ์ให้คุณเข้ามาดูสินค้าจริง ปรึกษาทีมงาน และรับสินค้าหน้าร้านได้ — นอกจากนี้ยังสั่งซื้อและจัดส่งทั่วไทยผ่าน LINE ได้สะดวก',
  parking: 'มีที่จอดรถหน้าอาคาร',
  visitNote: 'แนะนำโทรหรือแชท LINE ก่อนเข้ารับสินค้า',
  gallery: [
    {
      src: '/products/photos/cannon2.jpg',
      alt: 'โซนจัดเก็บหมึกพิมพ์และโทนเนอร์ในคลังสินค้า',
      caption: 'โซนจัดเก็บหมึกและโทนเนอร์พร้อมส่ง',
    },
    {
      src: '/products/photos/brother.webp',
      alt: 'หมึกพิมพ์หลายยี่ห้อจัดเรียงบนชั้น',
      caption: 'หมึกครบหลายยี่ห้อ จัดเรียงตามรุ่น',
    },
    {
      src: '/products/photos/epson.webp',
      alt: 'โต๊ะตรวจสอบและแพ็กสินค้าก่อนจัดส่ง',
      caption: 'โต๊ะตรวจสอบและแพ็กสินค้าก่อนจัดส่ง',
    },
  ],
} as const;

export const VISIT_SERVICES = [
  {
    title: 'ดูสินค้าจริงก่อนซื้อ',
    description: 'จับต้องหมึกและโทนเนอร์ของจริง ตรวจสอบรุ่นก่อนตัดสินใจ',
  },
  {
    title: 'ปรึกษาทีมงาน',
    description: 'ส่งรุ่นเครื่องพิมพ์มา ทีมงานช่วยเช็กว่าใช้หมึกรุ่นไหน',
  },
  {
    title: 'รับสินค้าหน้าร้าน',
    description: 'สั่งผ่าน LINE หรือโทรนัด แล้วเข้ามารับที่คลังได้เลย',
  },
  {
    title: 'ออกใบกำกับภาษี',
    description: 'รองรับนิติบุคคลและ SME ที่ต้องการเอกสารครบถ้วน',
  },
] as const;

export const TRUST_SERVICES = [
  {
    id: 'tax-invoice',
    label: 'ออกใบกำกับภาษี',
    description: 'ใบกำกับภาษีเต็มรูปแบบสำหรับนิติบุคคลและ SME',
    tone: 'accent' as const,
  },
  {
    id: 'payment',
    label: 'ช่องทางชำระเงิน',
    description: BUSINESS.paymentMethods.join(' · '),
    tone: 'cyan' as const,
  },
  {
    id: 'shipping',
    label: 'จัดส่งทั่วไทย',
    description: BUSINESS.shippingPartners.join(' · '),
    tone: 'navy' as const,
  },
] as const;
