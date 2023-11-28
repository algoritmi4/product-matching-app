import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from '../MainPage/MainPage';
import MarkingPage from '../MarkingPage/MarkingPage';
import StatisticsPage from '../StatisticsPage/StatisticsPage';

function App() {
  return (
    <div className="page">
      <div className="page__content">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/marking/:product_id" element={<MarkingPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
