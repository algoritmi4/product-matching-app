import './SelectedProduct.css';
import { IDealerProduct } from '../../utils/IDealerProduct.interface';
import { Link } from 'react-router-dom';
import { IProduct } from '../../utils/IProduct.interface';
import arrowImg from '../../images/selectedProduct/arrows.png';
import { SetStateAction, Dispatch } from 'react';

export function SelectedProduct({
  dealerProduct,
  chosenItem,
  mappedProduct,
  setIsMapped,
  isMapped
}: {
  dealerProduct: IDealerProduct;
  chosenItem: IProduct;
  mappedProduct: IProduct;
  setIsMapped: Dispatch<SetStateAction<boolean>>;
  isMapped: boolean;
}) {
  return (
    <div className="selected-item">
      <p className="selected-item__source">Дилер</p>
      <div className="selected-item__container">
        <p className="selected-item__product-atribute">
          Наименование:{' '}
          <span className="selected-item__product-atribute-span">
            {dealerProduct?.product_name || 'Не удалось получить наименование продукта'}
          </span>
        </p>
        <p className="selected-item__product-atribute">
          Цена:{' '}
          <span className="selected-item__product-atribute-span">
            {dealerProduct?.price || 'Не удалось получить цену продукта'}
          </span>{' '}
          руб.
        </p>
        <p className="selected-item__product-atribute">
          Дата получения данных:{' '}
          <span className="selected-item__product-atribute-span">
            {dealerProduct?.date || 'Не удалось получить артикль продукта'}
          </span>
        </p>
        {dealerProduct?.product_url && (
          <Link
            to={dealerProduct?.product_url}
            target="_blank"
            className="selected-item__product-link">
            Открыть страницу с товаром
          </Link>
        )}
      </div>
      {chosenItem?.id !== 0 && (
        <>
          <img className="selected-item__vs" src={arrowImg} />
          <p className="selected-item__source">Просепт</p>
          <div className="selected-item__container">
            <p className="selected-item__product-atribute">
              Наименование 1C:{' '}
              <span className="selected-item__product-atribute-span">
                {chosenItem?.name_1c || 'Не удалось получить наименование продукта'}
              </span>
            </p>
            <p className="selected-item__product-atribute">
              Рекомендованная цена:{' '}
              <span className="selected-item__product-atribute-span">
                {chosenItem?.recommended_price || 'Не удалось получить цену продукта'}
              </span>{' '}
              руб.
            </p>
            <p className="selected-item__product-atribute">
              Артикль:{' '}
              <span className="selected-item__product-atribute-span">
                {chosenItem?.article || 'Не удалось получить артикль продукта'}
              </span>
            </p>
          </div>
        </>
      )}

      {isMapped && (
        <>
          <p className="selected-item__source selected-item__source_mapped">
            Продукт сопоставлен с
          </p>
          <div className="selected-item__container selected-item__container_mapped">
            <p className="selected-item__product-atribute">
              Наименование 1C:{' '}
              <span className="selected-item__product-atribute-span">
                {mappedProduct?.name_1c ||
                  'Не удалось получить наименование сопоставленного продукта'}
              </span>
            </p>
            <p className="selected-item__product-atribute">
              Рекомендованная цена:{' '}
              <span className="selected-item__product-atribute-span">
                {mappedProduct?.recommended_price ||
                  'Не удалось получить цену сопоставленного продукта'}
              </span>{' '}
              руб.
            </p>
            <p className="selected-item__product-atribute">
              Артикль:{' '}
              <span className="selected-item__product-atribute-span">
                {mappedProduct?.article || 'Не удалось получить артикль сопоставленного продукта'}
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
