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
import { LogInPopupForm } from '../LogInPopupForm/LogInPopupForm';

function App() {
  const [dealerList, setDealerList] = useState<IDealer[]>(INITIAL_MARKETING_DEALER);
  const [matchCount, setMatchCount] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginPopupVisible, setIsLoginPopupVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api
      .getDealers()
      .then((data) => {
        setDealerList(data?.items);
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
              <Route
                path="/marking/:product_id"
                element={<MarkingPage matchCount={matchCount} setMatchCount={setMatchCount} />}
              />
              <Route path="/statistics" element={<StatisticsPage />} />
            </Routes>
          )}
          {isLoginPopupVisible && (
            <LogInPopupForm setIsLoginPopupVisible={setIsLoginPopupVisible} />
          )}
        </MarkingContext.Provider>
      </div>
    </div>
  );
}

export default App;
