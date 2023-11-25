import React from 'react';
import './SelectedProduct.css';
import { Item } from '../MarkingPage/Item.type';

export function SelectedProduct({ product }: { product: Item }) {
  return (
    <div className="selected-item">
      <p className="selected-item__product-name">
        {product?.name || 'Не удалось получить наименование продукта'}
      </p>
      <p className="selected-item__price">
        {product?.price || 'Не удалось получить цену продукта'}
      </p>
    </div>
  );
}
