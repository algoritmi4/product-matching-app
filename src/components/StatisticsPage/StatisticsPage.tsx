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
import useDidMountEffect from '../../customHooks/useDidMountEffect';

function StatisticsPage({
  setRequestError
}: {
  setRequestError: Dispatch<SetStateAction<string>>;
}) {
  const [items, setItems] = useState<Items[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [productType, setProductType] = useState<string>('matched');
  const [selectedDealer, setSelectedDealer] = useState<string>('all');
  const [selectedUserType, setSelectedUserType] = useState<string>('current');
  const [statistics, setStatistics] = useState<Analytics>(INITIAL_STATISTICS_ANALYTICS);
  const [dealerStatistics, setDealerStatistics] = useState<Analytics>(INITIAL_STATISTICS_ANALYTICS);

  useEffect(() => {
    if (selectedUserType === 'current') {
      handleCurrentUserStatistics();
    } else {
      handleAllUsersStatistics();
    }
  }, [selectedUserType]);

  useDidMountEffect(() => {
    if (selectedUserType === 'current') {
      getCurrentUserProducts();
    } else {
      getAllUsersProducts();
    }
  }, [selectedDealer, productType, selectedUserType]);

  function getCurrentUserProducts() {
    api
      .getCurrentUserProducts({ status: productType, offset, selectedDealer })
      .then((res) => {
        setItems(res.offset === 0 ? res.items : (state) => [...state, ...res.items]);
        console.log(res.items.length);
        setOffset((state) => state + 20);
        if (res.offset + res.limit >= res.total) {
          setHasMore(false);
        }
      })
      .catch((err) => {
        setRequestError(err.message);
        console.log(err);
      });
  }

  function getAllUsersProducts() {
    api
      .getAllUsersProducts({ status: productType, offset, selectedDealer })
      .then((res) => {
        setItems(res.offset === 0 ? res.items : (state) => [...state, ...res.items]);
        setOffset((state) => state + 20);
        if (res.offset + res.limit >= res.total) {
          setHasMore(false);
        }
      })
      .catch((err) => {
        setRequestError(err.message);
        console.log(err);
      });
  }

  function handleNext() {
    if (selectedUserType === 'current') {
      getCurrentUserProducts();
    } else {
      getAllUsersProducts();
    }
  }

  function handleCurrentUserStatistics() {
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
      });
  }

  function handleSubmitInfoForm(inputValues: InputValues) {
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
      });
  }

  function handleAllUsersStatistics() {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    const endDate = new Date();
    api
      .getAllUsersMatchedCount({
        endDate: endDate.toISOString(),
        startDate: startDate.toISOString()
      })
      .then((res) => {
        setStatistics(res);
      })
      .catch((err) => {
        setRequestError(err.message);
        console.log(err);
      });
  }

  function handleDealerStatistics(dealerId: number | string) {
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
        .catch((err) => {
          setRequestError(err.message);
          console.log(err);
        });
    }
  }

  return (
    <section className="stat-page">
      <StatisticsHeader
        setSelectedDealer={setSelectedDealer}
        setOffset={setOffset}
        handleDealerStatistics={handleDealerStatistics}
        setHasMore={setHasMore}
      />
      <StatisticsProductList
        items={items}
        productType={productType}
        setProductType={setProductType}
        setOffset={setOffset}
        setHasMore={setHasMore}
        hasMore={hasMore}
        handleNext={handleNext}
        setSelectedUserType={setSelectedUserType}
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
