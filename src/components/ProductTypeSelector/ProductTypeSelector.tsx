import './ProductTypeSelector.css';

function ProductTypeSelector({ setProductType }: { setProductType: any }) {
  function onChange(e: any) {
    setProductType(e.target.value);
  }

  return (
    <select className="product-type-selector" defaultValue="matched" onChange={(e) => onChange(e)}>
      <option value="matched" className="product-type-selector__option">
        Сопоставленный
      </option>
      <option value="not matched" className="product-type-selector__option">
        Отложенный
      </option>
    </select>
  );
}

export default ProductTypeSelector;
