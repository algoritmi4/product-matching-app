import './StatisticsPage.css';
import DealerSelector from '../DealerSelector/DealerSelector';
import MatchedItemsContainer from '../MatchedItemsContainer/MatchedItemsContainer';
import { useNavigate } from 'react-router-dom';
import ProductTypeSelector from '../ProductTypeSelector/ProductTypeSelector';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import ButtonPreloader from '../ButtonPreloader/ButtonPreloader';
import DeferredItemsContainer from '../DeferredItemsContainer/DeferredItemsContainer';
import useDidMountEffect from '../../customHooks/useDidMountEffect';
import api from '../../utils/api';

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

interface matchedCount {
  matched: number;
  not_matched: number;
  deferred: number;
  total_matching: number;
  accuracy: number;
}

function StatisticsPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Items[]>([]);
  const [statistics, setStatistics] = useState<matchedCount>({
    matched: 0,
    not_matched: 0,
    deferred: 0,
    total_matching: 0,
    accuracy: 0
  });
  const [productType, setProductType] = useState<string>('matched');
  const [selectedDealer, setSelectedDealer] = useState<string>('all');
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useDidMountEffect(() => {
    if (selectedDealer === 'all') {
      api
        .getMatchedUserProducts(productType, offset)
        .then((res) => {
          setItems(res.items);
          setOffset((state) => state + 20);
          if (items.length + res.limit >= res.total) {
            setHasMore(false);
          }
        })
        .catch((err) => console.log(err));
    } else {
      api
        .getMatchedDealerProducts(selectedDealer, productType, offset)
        .then((res) => {
          setItems(res.items);
          setOffset((state) => state + 20);
          if (items.length + res.limit >= res.total) {
            setHasMore(false);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [selectedDealer, productType]);

  function handleNext() {
    if (selectedDealer === 'all') {
      api
        .getMatchedUserProducts(productType, offset)
        .then((res) => {
          setItems(res.items);
          setOffset((state) => state + 20);
          if (items.length + res.limit >= res.total) {
            setHasMore(false);
          }
        })
        .catch((err) => console.log(err));
    } else {
      api
        .getMatchedDealerProducts(selectedDealer, productType, offset)
        .then((res) => {
          setItems(res.items);
          setOffset((state) => state + 20);
          if (items.length + res.limit >= res.total) {
            setHasMore(false);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <section className="stat-page">
      <div className="stat-page__header">
        <DealerSelector setSelectedDealer={setSelectedDealer} />
        <button
          onClick={() => navigate('/')}
          type="button"
          className="stat-page__menu-button common-button">
          На главную
        </button>
      </div>
      <div className="stat-page__flex-table">
        <ProductTypeSelector setProductType={setProductType} />
        {items.length === 0 ? (
          <h4 className="stat-page__err-message">{`${
            productType ? 'Сопоставленных' : 'Отложенных'
          } товаров ещё нет в базе`}</h4>
        ) : productType ? (
          <InfiniteScroll
            className="stat-page__infinite-scroll stat-page__infinite-scroll_type_matched"
            dataLength={items.length}
            next={handleNext}
            hasMore={hasMore}
            loader={<ButtonPreloader />}
            height={800}>
            {items.map((el, index) => (
              <MatchedItemsContainer key={index} data={el} />
            ))}
          </InfiniteScroll>
        ) : (
          <InfiniteScroll
            className="stat-page__infinite-scroll stat-page__infinite-scroll_type_deferred"
            dataLength={items.length}
            next={handleNext}
            hasMore={hasMore}
            loader={<ButtonPreloader />}
            height={800}>
            {items.map((el, index) => (
              <DeferredItemsContainer key={index} data={el} />
            ))}
          </InfiniteScroll>
        )}
      </div>
      <div className="stat-page__info">
        <h2 className="stat-page__info-title">Статистика</h2>
        <p className="stat-page__total-matched">{`Всего сопоставлено: ${statistics.matched}`}</p>
        <p className="stat-page__total-matched">{`Всего не сопоставлено: ${statistics.not_matched}`}</p>
        <p className="stat-page__total-matched">{`Всего отложено: ${statistics.deferred}`}</p>
        <p className="stat-page__total-matched">{`Точность: ${statistics.accuracy}`}</p>
        <h3 className="stat-page__dealer-info-title">Статистика по выбранному дилеру</h3>
        <p className="stat-page__dealer-matched">{`Кол-во сопоставленных: `}</p>
        <p className="stat-page__dealer-matched">{`Кол-во несопоставленных: `}</p>
      </div>
    </section>
  );
}

export default StatisticsPage;
