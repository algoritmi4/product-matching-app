import './DealerSelector.css';
import { TEST_MARKETING_DEALER } from '../../utils/constants';

function DealerSelector() {
  return (
    <select defaultValue="all" className="dealer-selector">
      <option value="all" className="dealer-selector__option">
        Все товары(выберите дилера)
      </option>
      {TEST_MARKETING_DEALER.map((dealer) => (
        <option className="dealer-selector__option" value={dealer.id} key={dealer.id}>
          {dealer.name}
        </option>
      ))}
    </select>
  );
}

export default DealerSelector;
