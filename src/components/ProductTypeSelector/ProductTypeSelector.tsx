import './ProductTypeSelector.css';

function ProductTypeSelector() {
  return (
    <select className="product-type-selector">
      <option className="product-type-selector__option" selected>
        Сопоставленный
      </option>
      <option className="product-type-selector__option">Отложенный</option>
    </select>
  );
}

export default ProductTypeSelector;
