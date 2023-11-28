import './SelectedProduct.css';
import { IDealerProduct } from '../../utils/IDealerProduct.interface';
import { Link } from 'react-router-dom';

export function SelectedProduct({ product }: { product: IDealerProduct }) {
  return (
    <div className="selected-item">
      <p className="selected-item__product-atribute">
        {product?.product_name || 'Не удалось получить наименование продукта'}
      </p>
      <p className="selected-item__product-atribute">
        {`Цена: ${product?.price || 'Не удалось получить цену продукта'} руб.`}
      </p>
      <p className="selected-item__product-atribute">
        {`Дата получения данных: ${product?.date || 'Не удалось получить артикль продукта'}`}
      </p>
      {product?.product_url && (
        <Link to={product?.product_url} target="_blank" className="selected-item__product-link">
          Открыть страницу с товаром
        </Link>
      )}
    </div>
  );
}
