import './App.css';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../MainPage/MainPage';
import MarkingPage from '../MarkingPage/MarkingPage';
import StatisticsPage from '../StatisticsPage/StatisticsPage';
import { MarkingContext } from '../../contexts/MarkingContext';
import api from '../../utils/api';
import { Preloader } from '../Preloader/Preloader';
import { INITIAL_MARKETING_DEALER } from '../../utils/constants';
import { IDealer } from '../../utils/IDealer.interface';

function App() {
  // make states
  const [dealerList, setDealerList] = useState<IDealer[]>(INITIAL_MARKETING_DEALER);
  // for preloader
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // request common data for all routes
    // launch preloader
    setIsLoading(true);
    // get Dealer List
    api
      .getDealers()
      .then((data) => {
        setDealerList(data?.data);
      })
      .catch((err) => {
        console.log(err?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <MarkingContext.Provider value={{ dealerList }}>
          {isLoading ? (
            <Preloader />
          ) : (
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/marking/:product_id" element={<MarkingPage />} />
              <Route path="/statistics" element={<StatisticsPage />} />
            </Routes>
          )}
        </MarkingContext.Provider>
      </div>
    </div>
  );
}

export default App;
