import './ProductTypeSelector.css';

function ProductTypeSelector() {
  return (
    <select className="product-type-selector" defaultValue="matched">
      <option value="matched" className="product-type-selector__option">
        Сопоставленный
      </option>
      <option value="not-matched" className="product-type-selector__option">
        Отложенный
      </option>
    </select>
  );
}

export default ProductTypeSelector;
