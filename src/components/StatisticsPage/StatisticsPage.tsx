import './StatisticsPage.css';
import DealerSelector from '../DealerSelector/DealerSelector';
import MatchedItemsContainer from '../MatchedItemsContainer/MatchedItemsContainer';
import { useNavigate } from 'react-router-dom';
import ProductTypeSelector from '../ProductTypeSelector/ProductTypeSelector';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from 'react';
import ButtonPreloader from '../ButtonPreloader/ButtonPreloader';
import DeferredItemsContainer from '../DeferredItemsContainer/DeferredItemsContainer';
import useDidMountEffect from '../../customHooks/useDidMountEffect';
import api from '../../utils/Api/api';
import { Preloader } from '../Preloader/Preloader';
import StatisticsInfo from '../StatisticsInfo/StatisticsInfo';
import { InputValues } from '../../utils/Interfaces/StatisticsPage/InputValues.interface';
import { Analytics } from '../../utils/Interfaces/StatisticsPage/Analytics.interface';
import { Items } from '../../utils/Interfaces/StatisticsPage/Items.interface';

function StatisticsPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Items[]>([]);
  const [isPreloader, setIsPreloader] = useState<boolean>(false);
  const [statistics, setStatistics] = useState<Analytics>({
    matched: 0,
    not_matched: 0,
    deferred: 0,
    total_matching: 0,
    accuracy: 0
  });
  const [dealerStatistics, setDealerStatistics] = useState<Analytics>({
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

  useEffect(() => {
    handleUserStatistics();
  }, []);

  useDidMountEffect(() => {
    if (selectedDealer === 'all') {
      getMatchedUserProducts();
    } else {
      getMatchedDealerProducts();
    }
  }, [selectedDealer, productType]);

  function getMatchedUserProducts() {
    api
      .getMatchedUserProducts(productType, offset)
      .then((res) => {
        setItems(offset === 0 ? res.items : (state) => [...state, ...res.items]);
        setOffset((state) => state + 20);
        if (res.offset + res.limit >= res.total) {
          setHasMore(false);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsPreloader(false);
      });
  }

  function getMatchedDealerProducts() {
    api
      .getMatchedDealerProducts(selectedDealer, productType, offset)
      .then((res) => {
        setItems(offset === 0 ? res.items : (state) => [...state, ...res.items]);
        setOffset((state) => state + 20);
        if (items.length + res.limit >= res.total) {
          setHasMore(false);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsPreloader(false);
      });
  }

  function handleNext() {
    if (selectedDealer === 'all') {
      getMatchedUserProducts();
    } else {
      getMatchedDealerProducts();
    }
  }

  function handleUserStatistics() {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    const endDate = new Date();
    api
      .getUserMatchedCount(endDate.toISOString().slice(0, -1), startDate.toISOString().slice(0, -1))
      .then((res) => {
        setStatistics(res);
      })
      .catch((err) => console.log(err));
  }

  function handleSubmitInfoForm(inputValues: InputValues) {
    const startDate = new Date(inputValues.startDate).toISOString().slice(0, -1);
    const endDate = new Date(inputValues.endDate).toISOString().slice(0, -1);
    api
      .getUserMatchedCountById({ id: inputValues.id, startDate, endDate })
      .then((res) => {
        setStatistics(res);
      })
      .catch((err) => console.log(err));
  }

  function handleDealerStatistics(dealerId: string) {
    if (dealerId !== 'all') {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
      const endDate = new Date();
      api
        .getDealerMatchedCount({
          dealerId,
          startDate: startDate.toISOString().slice(0, -1),
          endDate: endDate.toISOString().slice(0, -1)
        })
        .then((res) => {
          setDealerStatistics(res);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <section className="stat-page">
      <div className="stat-page__header">
        <DealerSelector
          setSelectedDealer={setSelectedDealer}
          setOffset={setOffset}
          setIsPreloader={setIsPreloader}
          handleDealerStatistics={handleDealerStatistics}
          setHasMore={setHasMore}
        />
        <button
          onClick={() => navigate('/')}
          type="button"
          className="stat-page__menu-button common-button">
          На главную
        </button>
      </div>
      <div className="stat-page__flex-table">
        <ProductTypeSelector
          setProductType={setProductType}
          setOffset={setOffset}
          setIsPreloader={setIsPreloader}
          setHasMore={setHasMore}
        />
        {items.length === 0 ? (
          <h4 className="stat-page__err-message">{`${
            productType === 'matched' ? 'Сопоставленных' : 'Отложенных'
          } товаров ещё нет в базе`}</h4>
        ) : isPreloader ? (
          <Preloader />
        ) : (
          <InfiniteScroll
            className={`stat-page__infinite-scroll ${
              productType === 'matched'
                ? 'stat-page__infinite-scroll_type_matched'
                : 'stat-page__infinite-scroll_type_deferred'
            }`}
            dataLength={items.length}
            next={handleNext}
            hasMore={hasMore}
            loader={<ButtonPreloader />}
            height={800}>
            {items.map((el, index) =>
              productType === 'matched' ? (
                <MatchedItemsContainer key={index} data={el} />
              ) : (
                <DeferredItemsContainer key={index} data={el} />
              )
            )}
          </InfiniteScroll>
        )}
      </div>
      <StatisticsInfo
        statistics={statistics}
        dealerStatistics={dealerStatistics}
        handleSubmitInfoForm={handleSubmitInfoForm}
      />
    </section>
  );
}

export default StatisticsPage;
