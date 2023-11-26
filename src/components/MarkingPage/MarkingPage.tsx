import './MarkingPage.css';
import '../../utils/common-button.css';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Selector } from '../Selector/Selector';
import { Match } from '../Match/Match';
import { SearchInFullList } from '../SearchInFullList/SearchInFullList';
import { SelectedProduct } from '../SelectedProduct/SelectedProduct';
import { Item } from '../../utils/Item.type';
import {
  TEST_MARKETING_DEALERPRICE,
  TEST_MARKETING_DEALER,
  TEST_MARKETING_PRODUCTS
} from '../../utils/constants';

export default function MarkingPage() {
  const [matchCount, setMatchCount] = useState(2);
  const [chosenItem, setChosenItem] = useState<Item>({
    name: '',
    price: '',
    url: ''
  });
  const navigate = useNavigate();

  //Временно получаю данные из констант
  const matchList = TEST_MARKETING_PRODUCTS.slice(0, 19);
  const fullList = [...TEST_MARKETING_PRODUCTS];

  const getCurrentProduct = (): any => {
    const { product_id } = useParams();
    const productName = TEST_MARKETING_DEALERPRICE.find(
      (product) => product.product_key === product_id
    );
    const dealerName = TEST_MARKETING_DEALER.find((dealer) => dealer.id === productName?.dealer_id)
      ?.name;
    return { ...productName, dealerName };
  };

  const getMatchList = (count: number, list: any[]) => {
    const resultList: JSX.Element[] = [];
    for (let i = 0; i < (list.length >= count ? count : list.length); i++) {
      resultList.push(
        <Match product={list[i]} key={i} setChosenItem={setChosenItem} chosenItem={chosenItem} />
      );
    }
    return resultList;
  };

  const handleToMainBtnClick = () => {
    navigate('/');
  };

  return (
    <div className="marking">
      <div className="marking__header">
        <Selector matchCount={matchCount} setMatchCount={setMatchCount}></Selector>
        <h1 className="marking__product-name">{getCurrentProduct()?.dealerName}</h1>
      </div>
      <div className="marking__container">
        <div className="marking__matchList-container">
          {matchCount === 999 ? (
            <SearchInFullList fullList={fullList} getMatchList={getMatchList} />
          ) : (
            getMatchList(matchCount, matchList)
          )}
        </div>
        <div className="marking__match-container">
          <SelectedProduct product={getCurrentProduct()}></SelectedProduct>
        </div>
      </div>
      <div className="marking__footer">
        <button
          type="button"
          className="marking__btn-route-main marking__btn-footer common-button"
          onClick={handleToMainBtnClick}>
          На главную
        </button>
        <div className="marking__btn-container">
          <button type="button" className="marking__btn-confirm marking__btn-footer common-button">
            Да
          </button>
          <button type="button" className="marking__btn-deny marking__btn-footer common-button">
            Нет
          </button>
        </div>
      </div>
    </div>
  );
}
