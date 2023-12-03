import './DealerSelector.css';
import { useContext } from 'react';
import { MarkingContext } from '../../contexts/MarkingContext';

function DealerSelector({ setSelectedDealer }: { setSelectedDealer: any }) {
  const context = useContext(MarkingContext);

  function onChange(e: any) {
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
