import './App.css';
import { useState, useLayoutEffect, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../MainPage/MainPage';
import MarkingPage from '../MarkingPage/MarkingPage';
import StatisticsPage from '../StatisticsPage/StatisticsPage';
import { MarkingContext } from '../../contexts/MarkingContext';
import api from '../../utils/api';
import { Preloader } from '../Preloader/Preloader';
import { INIRIAL_USER, INITIAL_MARKETING_DEALER } from '../../utils/constants';
import { IDealer } from '../../utils/IDealer.interface';
import { LogInPopupForm } from '../LogInPopupForm/LogInPopupForm';
import { ProtectedRoute } from '../ProtectedRout/ProtectedRout';
import { RegisterForm } from '../RegisterForm/RegistreForm';
import { IUser } from '../../utils/IUser.interface';

function App() {
  const [dealerList, setDealerList] = useState<IDealer[]>(INITIAL_MARKETING_DEALER);
  const [matchCount, setMatchCount] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<IUser>(INIRIAL_USER);

  useLayoutEffect(() => {
    api
      .getCurrentUser()
      .then((data) => {
        setUser(data);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err?.message);
      });
  }, []);

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
        <MarkingContext.Provider value={{ dealerList, loggedIn, user }}>
          {isLoading ? (
            <Preloader />
          ) : (
            <Routes>
              <Route path="/" element={<ProtectedRoute element={<MainPage />} />} />
              <Route
                path="/marking/:product_id"
                element={
                  <ProtectedRoute
                    element={<MarkingPage matchCount={matchCount} setMatchCount={setMatchCount} />}
                  />
                }
              />
              <Route path="/statistics" element={<ProtectedRoute element={<StatisticsPage />} />} />

              <Route
                path="/auth"
                element={<LogInPopupForm setLoggedIn={setLoggedIn} setUser={setUser} />}
              />
              <Route path="/register" element={<RegisterForm setLoggedIn={setLoggedIn} />} />
            </Routes>
          )}
        </MarkingContext.Provider>
      </div>
    </div>
  );
}

export default App;
