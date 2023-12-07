import './StatisticsPage.css';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import api from '../../utils/Api/api';
import StatisticsInfo from '../StatisticsInfo/StatisticsInfo';
import { InputValues } from '../../utils/Interfaces/StatisticsPage/InputValues.interface';
import { Analytics } from '../../utils/Interfaces/StatisticsPage/Analytics.interface';
import { Items } from '../../utils/Interfaces/StatisticsPage/Items.interface';
import StatisticsProductList from '../StatisticsProductList/StatisticsProductList';
import StatisticsHeader from '../StatisticsHeader/StatisticsHeader';
import { INITIAL_STATISTICS_ANALYTICS } from '../../utils/constants';

function StatisticsPage({
  setRequestError
}: {
  setRequestError: Dispatch<SetStateAction<string>>;
}) {
  const [items, setItems] = useState<Items[]>([]);
  const [isPreloader, setIsPreloader] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [productType, setProductType] = useState<string>('matched');
  const [selectedDealer, setSelectedDealer] = useState<string>('all');
  const [statistics, setStatistics] = useState<Analytics>(INITIAL_STATISTICS_ANALYTICS);
  const [dealerStatistics, setDealerStatistics] = useState<Analytics>(INITIAL_STATISTICS_ANALYTICS);

  useEffect(() => {
    handleUserStatistics();
  }, []);

  useEffect(() => {
    if (selectedDealer === 'all') {
      getMatchedUserProducts();
    } else {
      getMatchedDealerProducts();
    }
  }, [selectedDealer, productType]);

  function getMatchedUserProducts() {
    setIsPreloader(true);
    api
      .getMatchedUserProducts(productType, offset)
      .then((res) => {
        setItems(offset === 0 ? res.items : (state) => [...state, ...res.items]);
        setOffset((state) => state + 20);
        if (res.offset + res.limit >= res.total) {
          setHasMore(false);
        }
      })
      .catch((err) => {
        setRequestError(err.message);
        console.log(err);
      })
      .finally(() => {
        setIsPreloader(false);
      });
  }

  function getMatchedDealerProducts() {
    setIsPreloader(true);
    api
      .getMatchedDealerProducts(selectedDealer, productType, offset)
      .then((res) => {
        setItems(offset === 0 ? res.items : (state) => [...state, ...res.items]);
        setOffset((state) => state + 20);
        if (items.length + res.limit >= res.total) {
          setHasMore(false);
        }
      })
      .catch((err) => {
        setRequestError(err.message);
        console.log(err);
      })
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
    setIsPreloader(true);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    const endDate = new Date();
    api
      .getUserMatchedCount(endDate.toISOString(), startDate.toISOString())
      .then((res) => {
        setStatistics(res);
      })
      .catch((err) => {
        setRequestError(err.message);
        console.log(err);
      })
      .finally(() => {
        setIsPreloader(false);
      });
  }

  function handleSubmitInfoForm(inputValues: InputValues) {
    setIsPreloader(true);
    const startDate = new Date(inputValues.startDate).toISOString();
    const endDate = new Date(inputValues.endDate).toISOString();
    api
      .getUserMatchedCountById({ id: inputValues.id, startDate, endDate })
      .then((res) => {
        setStatistics(res);
      })
      .catch((err) => {
        setRequestError(err.message);
        console.log(err);
      })
      .finally(() => {
        setIsPreloader(false);
      });
  }

  function handleDealerStatistics(dealerId: string) {
    if (dealerId !== 'all') {
      setIsPreloader(true);
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
        .catch((err) => {
          setRequestError(err.message);
          console.log(err);
        })
        .finally(() => {
          setIsPreloader(false);
        });
    }
  }

  return (
    <section className="stat-page">
      <StatisticsHeader
        setSelectedDealer={setSelectedDealer}
        setOffset={setOffset}
        setIsPreloader={setIsPreloader}
        handleDealerStatistics={handleDealerStatistics}
        setHasMore={setHasMore}
      />
      <StatisticsProductList
        items={items}
        productType={productType}
        setProductType={setProductType}
        setOffset={setOffset}
        setIsPreloader={setIsPreloader}
        setHasMore={setHasMore}
        isPreloader={isPreloader}
        hasMore={hasMore}
        handleNext={handleNext}
      />
      <StatisticsInfo
        statistics={statistics}
        dealerStatistics={dealerStatistics}
        handleSubmitInfoForm={handleSubmitInfoForm}
        selectedDealer={selectedDealer}
      />
    </section>
  );
}

export default StatisticsPage;
