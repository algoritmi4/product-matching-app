import './DealerSelector.css';
import { ChangeEvent, useContext } from 'react';
import { MarkingContext } from '../../contexts/MarkingContext';

function DealerSelector({
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
  const context = useContext(MarkingContext);

  function onChange(e: ChangeEvent<HTMLSelectElement>) {
    setOffset(0);
    setHasMore(true);
    setIsPreloader(true);
    handleDealerStatistics(e.target.value);
    setSelectedDealer(e.target.value);
  }

  return (
    <select defaultValue="all" className="dealer-selector" onChange={(e) => onChange(e)}>
      <option value="all" className="dealer-selector__option">
        Все товары(выберите дилера)
      </option>
      {context.dealerList.map((dealer) => (
        <option className="dealer-selector__option" value={dealer.id} key={dealer.id}>
          {dealer.name}
        </option>
      ))}
    </select>
  );
}

export default DealerSelector;
