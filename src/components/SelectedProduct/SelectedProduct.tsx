import './SelectedProduct.css';

export function SelectedProduct({ product }: { product: any }) {
  return (
    <div className="selected-item">
      <p className="selected-item__product-name">
        {product?.product_name || 'Не удалось получить наименование продукта'}
      </p>
      <p className="selected-item__price">
        {`Цена: ${product?.price || 'Не удалось получить цену продукта'} руб.`}
      </p>
    </div>
  );
}
