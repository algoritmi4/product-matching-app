import { useState, useEffect } from 'react';
import './Match.css';

export function Match({
  product,
  setChosenItem,
  chosenItem
}: {
  product: any;
  setChosenItem: any;
  chosenItem: any;
}) {
  const [isChosen, setIsChosen] = useState(false);

  useEffect(() => {
    setIsChosen(chosenItem.id === product.id);
  }, [chosenItem]);

  const handleClick = () => {
    if (chosenItem.id !== product.id) {
      setChosenItem(product);
    } else {
      setChosenItem({});
    }
  };

  return (
    <div className={`match common-button ${isChosen && 'match_chosen'}`} onClick={handleClick}>
      <p className="match__product-name">
        {product?.name || 'Не удалось получить наименование продукта'}
      </p>
    </div>
  );
}
