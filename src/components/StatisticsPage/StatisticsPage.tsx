import './StatisticsPage.css';
import DealerSelector from '../DealerSelector/DealerSelector';
import MatchedItemsContainer from '../MatchedItemsContainer/MatchedItemsContainer';
import { useNavigate } from 'react-router-dom';
import ProductTypeSelector from '../ProductTypeSelector/ProductTypeSelector';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import ButtonPreloader from '../ButtonPreloader/ButtonPreloader';

interface Product {
  id: number;
  name: string;
  article: string;
  recommended_price: number;
  cost: number;
}

interface DealerPrice {
  id: number;
  product_key: number;
  price: number;
  product_url: string;
  product_name: string;
  date: string;
}

interface Items {
  product: Product;
  dealerprice: DealerPrice;
  created_at: string;
  status: string;
}

const someItems: Items[] = [
  {
    product: {
      id: 0,
      name: 'Огнебиозащита ОГНЕБИО PROF 2 группа бесцветный готовый состав / 10 л',
      article: '006-10',
      recommended_price: 0,
      cost: 0
    },
    dealerprice: {
      id: 0,
      product_key: 0,
      price: 0,
      product_url:
        'https://akson.ru//p/antiseptik_prosept_eco_interior_dlya_vnutrennih_rabot_gotovyy_sostav_5l/',
      product_name: 'Антисептик PROSEPT Eco Interior для внутренних работ, готовый состав  5л',
      date: '2023-12-01'
    },
    created_at: '2023-12-01T15:35:40.812Z',
    status: 'string'
  },
  {
    product: {
      id: 0,
      name: 'Огнебиозащита ОГНЕБИО PROF 2 группа бесцветный готовый состав / 10 л',
      article: '006-10',
      recommended_price: 0,
      cost: 0
    },
    dealerprice: {
      id: 0,
      product_key: 0,
      price: 0,
      product_url:
        'https://akson.ru//p/antiseptik_prosept_eco_interior_dlya_vnutrennih_rabot_gotovyy_sostav_5l/',
      product_name: 'Антисептик PROSEPT Eco Interior для внутренних работ, готовый состав  5л',
      date: '2023-12-01'
    },
    created_at: '2023-12-01T15:35:40.812Z',
    status: 'string'
  },
  {
    product: {
      id: 0,
      name: 'Огнебиозащита ОГНЕБИО PROF 2 группа бесцветный готовый состав / 10 л',
      article: '006-10',
      recommended_price: 0,
      cost: 0
    },
    dealerprice: {
      id: 0,
      product_key: 0,
      price: 0,
      product_url:
        'https://akson.ru//p/antiseptik_prosept_eco_interior_dlya_vnutrennih_rabot_gotovyy_sostav_5l/',
      product_name: 'Антисептик PROSEPT Eco Interior для внутренних работ, готовый состав  5л',
      date: '2023-12-01'
    },
    created_at: '2023-12-01T15:35:40.812Z',
    status: 'string'
  },
  {
    product: {
      id: 0,
      name: 'Огнебиозащита ОГНЕБИО PROF 2 группа бесцветный готовый состав / 10 л',
      article: '006-10',
      recommended_price: 0,
      cost: 0
    },
    dealerprice: {
      id: 0,
      product_key: 0,
      price: 0,
      product_url:
        'https://akson.ru//p/antiseptik_prosept_eco_interior_dlya_vnutrennih_rabot_gotovyy_sostav_5l/',
      product_name: 'Антисептик PROSEPT Eco Interior для внутренних работ, готовый состав  5л',
      date: '2023-12-01'
    },
    created_at: '2023-12-01T15:35:40.812Z',
    status: 'string'
  },
  {
    product: {
      id: 0,
      name: 'Огнебиозащита ОГНЕБИО PROF 2 группа бесцветный готовый состав / 10 л',
      article: '006-10',
      recommended_price: 0,
      cost: 0
    },
    dealerprice: {
      id: 0,
      product_key: 0,
      price: 0,
      product_url:
        'https://akson.ru//p/antiseptik_prosept_eco_interior_dlya_vnutrennih_rabot_gotovyy_sostav_5l/',
      product_name: 'Антисептик PROSEPT Eco Interior для внутренних работ, готовый состав  5л',
      date: '2023-12-01'
    },
    created_at: '2023-12-01T15:35:40.812Z',
    status: 'string'
  },
  {
    product: {
      id: 0,
      name: 'Огнебиозащита ОГНЕБИО PROF 2 группа бесцветный готовый состав / 10 л',
      article: '006-10',
      recommended_price: 0,
      cost: 0
    },
    dealerprice: {
      id: 0,
      product_key: 0,
      price: 0,
      product_url:
        'https://akson.ru//p/antiseptik_prosept_eco_interior_dlya_vnutrennih_rabot_gotovyy_sostav_5l/',
      product_name: 'Антисептик PROSEPT Eco Interior для внутренних работ, готовый состав  5л',
      date: '2023-12-01'
    },
    created_at: '2023-12-01T15:35:40.812Z',
    status: 'string'
  },
  {
    product: {
      id: 0,
      name: 'Огнебиозащита ОГНЕБИО PROF 2 группа бесцветный готовый состав / 10 л',
      article: '006-10',
      recommended_price: 0,
      cost: 0
    },
    dealerprice: {
      id: 0,
      product_key: 0,
      price: 0,
      product_url:
        'https://akson.ru//p/antiseptik_prosept_eco_interior_dlya_vnutrennih_rabot_gotovyy_sostav_5l/',
      product_name: 'Антисептик PROSEPT Eco Interior для внутренних работ, готовый состав  5л',
      date: '2023-12-01'
    },
    created_at: '2023-12-01T15:35:40.812Z',
    status: 'string'
  }
];

const moreItems: Items[] = [
  {
    product: {
      id: 0,
      name: 'Огнебиозащита ОГНЕБИО PROF 2 группа бесцветный готовый состав / 10 л',
      article: '006-10',
      recommended_price: 0,
      cost: 0
    },
    dealerprice: {
      id: 0,
      product_key: 0,
      price: 0,
      product_url:
        'https://akson.ru//p/antiseptik_prosept_eco_interior_dlya_vnutrennih_rabot_gotovyy_sostav_5l/',
      product_name: 'Антисептик PROSEPT Eco Interior для внутренних работ, готовый состав  5л',
      date: '2023-12-01'
    },
    created_at: '2023-12-01T15:35:40.812Z',
    status: 'string'
  },
  {
    product: {
      id: 0,
      name: 'Огнебиозащита ОГНЕБИО PROF 2 группа бесцветный готовый состав / 10 л',
      article: '006-10',
      recommended_price: 0,
      cost: 0
    },
    dealerprice: {
      id: 0,
      product_key: 0,
      price: 0,
      product_url:
        'https://akson.ru//p/antiseptik_prosept_eco_interior_dlya_vnutrennih_rabot_gotovyy_sostav_5l/',
      product_name: 'Антисептик PROSEPT Eco Interior для внутренних работ, готовый состав  5л',
      date: '2023-12-01'
    },
    created_at: '2023-12-01T15:35:40.812Z',
    status: 'string'
  },
  {
    product: {
      id: 0,
      name: 'Огнебиозащита ОГНЕБИО PROF 2 группа бесцветный готовый состав / 10 л',
      article: '006-10',
      recommended_price: 0,
      cost: 0
    },
    dealerprice: {
      id: 0,
      product_key: 0,
      price: 0,
      product_url:
        'https://akson.ru//p/antiseptik_prosept_eco_interior_dlya_vnutrennih_rabot_gotovyy_sostav_5l/',
      product_name: 'Антисептик PROSEPT Eco Interior для внутренних работ, готовый состав  5л',
      date: '2023-12-01'
    },
    created_at: '2023-12-01T15:35:40.812Z',
    status: 'string'
  },
  {
    product: {
      id: 0,
      name: 'Огнебиозащита ОГНЕБИО PROF 2 группа бесцветный готовый состав / 10 л',
      article: '006-10',
      recommended_price: 0,
      cost: 0
    },
    dealerprice: {
      id: 0,
      product_key: 0,
      price: 0,
      product_url:
        'https://akson.ru//p/antiseptik_prosept_eco_interior_dlya_vnutrennih_rabot_gotovyy_sostav_5l/',
      product_name: 'Антисептик PROSEPT Eco Interior для внутренних работ, готовый состав  5л',
      date: '2023-12-01'
    },
    created_at: '2023-12-01T15:35:40.812Z',
    status: 'string'
  },
  {
    product: {
      id: 0,
      name: 'Огнебиозащита ОГНЕБИО PROF 2 группа бесцветный готовый состав / 10 л',
      article: '006-10',
      recommended_price: 0,
      cost: 0
    },
    dealerprice: {
      id: 0,
      product_key: 0,
      price: 0,
      product_url:
        'https://akson.ru//p/antiseptik_prosept_eco_interior_dlya_vnutrennih_rabot_gotovyy_sostav_5l/',
      product_name: 'Антисептик PROSEPT Eco Interior для внутренних работ, готовый состав  5л',
      date: '2023-12-01'
    },
    created_at: '2023-12-01T15:35:40.812Z',
    status: 'string'
  },
  {
    product: {
      id: 0,
      name: 'Огнебиозащита ОГНЕБИО PROF 2 группа бесцветный готовый состав / 10 л',
      article: '006-10',
      recommended_price: 0,
      cost: 0
    },
    dealerprice: {
      id: 0,
      product_key: 0,
      price: 0,
      product_url:
        'https://akson.ru//p/antiseptik_prosept_eco_interior_dlya_vnutrennih_rabot_gotovyy_sostav_5l/',
      product_name: 'Антисептик PROSEPT Eco Interior для внутренних работ, готовый состав  5л',
      date: '2023-12-01'
    },
    created_at: '2023-12-01T15:35:40.812Z',
    status: 'string'
  },
  {
    product: {
      id: 0,
      name: 'Огнебиозащита ОГНЕБИО PROF 2 группа бесцветный готовый состав / 10 л',
      article: '006-10',
      recommended_price: 0,
      cost: 0
    },
    dealerprice: {
      id: 0,
      product_key: 0,
      price: 0,
      product_url:
        'https://akson.ru//p/antiseptik_prosept_eco_interior_dlya_vnutrennih_rabot_gotovyy_sostav_5l/',
      product_name: 'Антисептик PROSEPT Eco Interior для внутренних работ, готовый состав  5л',
      date: '2023-12-01'
    },
    created_at: '2023-12-01T15:35:40.812Z',
    status: 'string'
  }
];

function StatisticsPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Items[]>([]);

  useEffect(() => {
    setItems(someItems);
  }, []);

  function handleNext() {
    setTimeout(() => {
      setItems((state) => state.concat(moreItems));
    }, 1000);
  }

  return (
    <section className="stat-page">
      <div className="stat-page__header">
        <DealerSelector />
        <button
          onClick={() => navigate('/')}
          type="button"
          className="stat-page__menu-button common-button">
          На главную
        </button>
      </div>
      <div className="stat-page__flex-table">
        <ProductTypeSelector />
        {items.length === 0 ? (
          <h4 className="stat-page__err-message">Сопоставленных товаров ещё нет в базе</h4>
        ) : (
          <InfiniteScroll
            className="stat-page__infinite-scroll"
            dataLength={items.length}
            next={handleNext}
            hasMore={true}
            loader={<ButtonPreloader />}
            height={800}>
            {items.map((el, index) => (
              <MatchedItemsContainer key={index} data={el} />
            ))}
          </InfiniteScroll>
        )}
      </div>
      <div className="stat-page__info">
        <h2 className="stat-page__info-title">Статистика</h2>
        <p className="stat-page__total-matched">{`Всего сопоставлено: 50`}</p>
        <h3 className="stat-page__dealer-info-title">Статистика по выбранному дилеру</h3>
        <p className="stat-page__dealer-matched">
          {`Кол-во сопоставленных: `}
          <span className="stat-page__matched-quant stat-page__matched-quant_type_green">10</span>
        </p>
        <p className="stat-page__dealer-matched">
          {`Кол-во несопоставленных: `}
          <span className="stat-page__matched-quant stat-page__matched-quant_type_red">20</span>
        </p>
      </div>
    </section>
  );
}

export default StatisticsPage;
