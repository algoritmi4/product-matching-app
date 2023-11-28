import './App.css';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../MainPage/MainPage';
import MarkingPage from '../MarkingPage/MarkingPage';
import StatisticsPage from '../StatisticsPage/StatisticsPage';
import { MarkingContext } from '../../contexts/MarkingContext';
import api from '../../utils/api';
import { Preloader } from '../Preloader/Preloader';
import { MARKETING_DEALER } from '../../utils/constants';
import { Dealer } from '../../utils/Dealer.interface';

function App() {
  const [dealerList, setDealerList] = useState<Dealer[]>(MARKETING_DEALER);
  // For Preloader
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Request common data for all routes
    // launch preloader
    setIsLoading(true);
    // Get Dealer List
    api
      .getDealers()
      .then((data) => {
        setDealerList(data.data);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <MarkingContext.Provider value={{ dealerList }}>
          {isLoading && <Preloader />}
          {!isLoading && (
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route
                path="/marking/:product_id"
                element={<MarkingPage setIsLoading={setIsLoading} />}
              />
              <Route path="/statistics" element={<StatisticsPage />} />
            </Routes>
          )}
        </MarkingContext.Provider>
      </div>
    </div>
  );
}

export default App;
