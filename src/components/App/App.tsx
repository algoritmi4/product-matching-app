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
import { ProtectedRoute } from '../ProtectedRout/ProtectedRout';

function App() {
  const [dealerList, setDealerList] = useState<IDealer[]>(INITIAL_MARKETING_DEALER);
  const [matchCount, setMatchCount] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

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
        <MarkingContext.Provider value={{ dealerList, loggedIn }}>
          {isLoading ? (
            <Preloader />
          ) : (
            <Routes>
              <Route
                path="/"
                element={<ProtectedRoute element={<MainPage setLoggedIn={setLoggedIn} />} />}
              />

              <Route
                path="/marking/:product_id"
                element={
                  <ProtectedRoute
                    element={<MarkingPage matchCount={matchCount} setMatchCount={setMatchCount} />}
                  />
                }
              />

              <Route path="/statistics" element={<ProtectedRoute element={<StatisticsPage />} />} />

              <Route path="/auth" element={<LogInPopupForm setLoggedIn={setLoggedIn} />} />
            </Routes>
          )}
        </MarkingContext.Provider>
      </div>
    </div>
  );
}

export default App;
