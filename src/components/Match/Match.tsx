import React from 'react';
import './Match.css';

export function Match({ product, setChosenItem }: { product: any; setChosenItem: any }) {
  const handleClick = (e: any) => {
    setChosenItem(product);
  };

  return (
    <div className="match" onClick={handleClick}>
      <p className="match__product-name">
        {product?.name || 'Не удалось получить наименование продукта'}
      </p>
    </div>
  );
}
