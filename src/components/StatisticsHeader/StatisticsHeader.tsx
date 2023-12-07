import { useNavigate } from 'react-router-dom';
import DealerSelector from '../DealerSelector/DealerSelector';
import './StatisticsHeader.css';

function StatisticsHeader({
  setSelectedDealer,
  setOffset,
  setIsPreloader,
  handleDealerStatistics,
  setHasMore
}: {
  setSelectedDealer: (arg: string) => void;
  setOffset: (arg: number) => void;
  setIsPreloader: (arg: boolean) => void;
  handleDealerStatistics: (arg: string) => void;
  setHasMore: (arg: boolean) => void;
}) {
  const navigate = useNavigate();

  return (
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
  );
}

export default StatisticsHeader;
