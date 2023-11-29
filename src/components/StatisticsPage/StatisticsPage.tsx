import './StatisticsPage.css';
import DealerSelector from '../DealerSelector/DealerSelector';
import MatchedItemsContainer from '../MatchedItemsContainer/MatchedItemsContainer';
import { useNavigate } from 'react-router-dom';
import ProductTypeSelector from '../ProductTypeSelector/ProductTypeSelector';
import { useState, useEffect } from 'react';
import api from '../../utils/api';

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

function StatisticsPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    api
      .getMatchedProducts()
      .then((res) => {
        setData(res.items);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="stat-page">
      <div className="stat-page__btn-footer-background">
        <button
          onClick={() => navigate('/')}
          type="button"
          className="stat-page__btn stat-page__btn-footer common-button">
          На главную
        </button>
      </div>
      <DealerSelector />
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
      <div className="stat-page__flex-table">
        <ProductTypeSelector />
        {data.length === 0 ? (
          <h4 className="stat-page__err-message">Сопоставленных товаров ещё нет в базе</h4>
        ) : (
          data.map((el) => <MatchedItemsContainer key={el.id} data={el} />)
        )}
      </div>
    </section>
  );
}

export default StatisticsPage;
