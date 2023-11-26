export interface Data {
  id: string;
  product_key: number;
  price: string;
  product_url: string;
  product_name: string;
  date: string;
  dealer_id: string;
  status: boolean;
}

export const data: Data[] = [
  {
    id: '1',
    product_key: 546227,
    price: '233.00',
    product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml',
    product_name: 'Средство универсальное Prosept Universal Spray	500мл',
    date: `${new Date('2023-07-11').getDate()}.${new Date('2023-07-11').getMonth()}.${new Date(
      '2023-07-11'
    ).getFullYear()}`,
    dealer_id: '3',
    status: false
  },
  {
    id: '2',
    product_key: 546227,
    price: '233.00',
    product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml',
    product_name: 'Удалитель ржавчины PROSEPT RUST REMOVER 0 5л 023-05',
    date: '2023-07-11',
    dealer_id: '5',
    status: false
  },
  {
    id: '3',
    product_key: 546227,
    price: '233.00',
    product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml',
    product_name: 'Средство для чистки люстр Prosept Universal Anti-dust 500мл',
    date: '2023-07-11',
    dealer_id: '2',
    status: false
  },
  {
    id: '4',
    product_key: 546227,
    price: '233.00',
    product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml',
    product_name: 'Концентрат Prosept Multipower для мытья полов цитрус 1л',
    date: '2023-07-11',
    dealer_id: '4',
    status: false
  },
  {
    id: '5',
    product_key: 546227,
    price: '233.00',
    product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml',
    product_name: 'Концентрат Prosept Multipower для мытья полов цитрус 1л',
    date: '2023-07-11',
    dealer_id: '4',
    status: false
  },
  {
    id: '6',
    product_key: 546227,
    price: '233.00',
    product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml',
    product_name: 'Концентрат Prosept Multipower для мытья полов цитрус 1л',
    date: '2023-07-11',
    dealer_id: '4',
    status: true
  },
  {
    id: '7',
    product_key: 546227,
    price: '233.00',
    product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml',
    product_name: 'Концентрат Prosept Multipower для мытья полов цитрус 1л',
    date: '2023-07-11',
    dealer_id: '4',
    status: true
  },
  {
    id: '8',
    product_key: 546227,
    price: '233.00',
    product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml',
    product_name: 'Концентрат Prosept Multipower для мытья полов цитрус 1л',
    date: '2023-07-11',
    dealer_id: '4',
    status: true
  },
  {
    id: '9',
    product_key: 546227,
    price: '232.00',
    product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml',
    product_name:
      'Концентрат Prosept Multipower для мытья полов цитрус 1л название длинное ну прорстио очень я не могу прям',
    date: '2023-07-11',
    dealer_id: '4',
    status: true
  },
  {
    id: '10',
    product_key: 546227,
    price: '233.00',
    product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml',
    product_name: 'Концентрат Prosept Multipower для мытья полов цитрус 1л',
    date: '2023-07-11',
    dealer_id: '4',
    status: true
  }
];
