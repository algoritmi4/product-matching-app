import './StatisticsPage.css';
import DealerSelector from '../DealerSelector/DealerSelector';
import MatchedItemsContainer from '../MatchedItemsContainer/MatchedItemsContainer';

interface Data {
  id: number;
  product_key: string;
  price: number;
  product_url: string;
  product_name: string;
  date: string;
  dealer_id: number;
  dealerName?: string;
  marked_product: any;
}

const data: Data[] = [
  {
    id: 1,
    product_key: '546227',
    price: 233,
    product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml/',
    product_name: 'Средство универсальное Prosept Universal Spray, 500мл',
    date: '2023-07-11',
    dealer_id: 4,
    marked_product: {
      FIELD1: 78,
      id: 362,
      article: '0024-3б',
      ean_13: null,
      name: 'Герметик акриловый цвет Белый, 3 кг',
      cost: 1251,
      recommended_price: 2145,
      category_id: 25,
      ozon_name: '',
      name_1c: 'Герметик акриловый цвет Белый, 3 кг',
      wb_name: '',
      ozon_article: null,
      wb_article: null,
      ym_article: '',
      wb_article_td: ''
    }
  },
  {
    id: 2,
    product_key: '546227',
    price: 233,
    product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml/',
    product_name: 'Средство универсальное Prosept Universal Spray, 500мл',
    date: '2023-07-11',
    dealer_id: 3,
    marked_product: {
      FIELD1: 78,
      id: 362,
      article: '0024-3б',
      ean_13: null,
      name: 'Герметик акриловый цвет Белый, 3 кг',
      cost: 1251,
      recommended_price: 2145,
      category_id: 25,
      ozon_name: '',
      name_1c: 'Герметик акриловый цвет Белый, 3 кг',
      wb_name: '',
      ozon_article: null,
      wb_article: null,
      ym_article: '',
      wb_article_td: ''
    }
  },
  {
    id: 3,
    product_key: '546227',
    price: 233,
    product_url: 'https://akson.ru//p/sredstvo_universalnoe_prosept_universal_spray_500ml/',
    product_name: 'Средство универсальное Prosept Universal Spray, 500мл',
    date: '2023-07-11',
    dealer_id: 3,
    marked_product: {
      FIELD1: 78,
      id: 362,
      article: '0024-3б',
      ean_13: null,
      name: 'Герметик акриловый цвет Белый, 3 кг',
      cost: 1251,
      recommended_price: 2145,
      category_id: 25,
      ozon_name: '',
      name_1c: 'Герметик акриловый цвет Белый, 3 кг',
      wb_name: '',
      ozon_article: null,
      wb_article: null,
      ym_article: '',
      wb_article_td: ''
    }
  }
];

function StatisticsPage() {
  return (
    <>
      <DealerSelector />
      <div className="stat-page__btn-footer-background">
        <button type="button" className="stat-page__btn stat-page__btn-footer common-button">
          На главную
        </button>
      </div>
      <div className="stat-page__flex-table">
        {data.map((el) => (
          <MatchedItemsContainer key={el.id} data={el} />
        ))}
      </div>
    </>
  );
}

export default StatisticsPage;
