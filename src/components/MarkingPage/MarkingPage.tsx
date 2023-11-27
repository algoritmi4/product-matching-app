import './MarkingPage.css';
import '../../utils/common-button.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Selector } from '../Selector/Selector';
import { Match } from '../Match/Match';
import { SearchInFullList } from '../SearchInFullList/SearchInFullList';
import { SelectedProduct } from '../SelectedProduct/SelectedProduct';
import { DealerProduct } from '../../utils/DealerProduct.interface';
import {
  TEST_MARKETING_DEALERPRICE,
  TEST_MARKETING_DEALER,
  TEST_MARKETING_PRODUCTS
} from '../../utils/constants';
import { Product } from '../../utils/Product.interface';
import { apiMarking } from '../../utils/test.api';

export default function MarkingPage() {
  const [matchCount, setMatchCount] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [dealers, setDealers] = useState(TEST_MARKETING_DEALER);
  const [currentProduct, setCurrentProduct] = useState<DealerProduct>({
    id: 0,
    product_key: '',
    price: 0,
    product_url: '',
    product_name: '',
    date: '',
    dealer_id: 0
  });
  const [chosenItem, setChosenItem] = useState<Product>({
    FIELD1: 0,
    id: 0,
    article: '',
    ean_13: 0,
    name: '',
    cost: 0,
    recommended_price: 0,
    category_id: null,
    ozon_name: '',
    name_1c: '',
    wb_name: '',
    ozon_article: null,
    wb_article: null,
    ym_article: '',
    wb_article_td: ''
  });

  const navigate = useNavigate();

  //Временно получаю данные из констант
  const matchList = TEST_MARKETING_PRODUCTS.slice(0, 19);
  const fullList = [...TEST_MARKETING_PRODUCTS];

  const { product_id } = useParams();

  useEffect(() => {
    const curProduct = TEST_MARKETING_DEALERPRICE.find(
      (product) => product.product_key === product_id
    );
    if (curProduct) {
      curProduct.dealerName =
        TEST_MARKETING_DEALER.find((dealer) => dealer.id === curProduct?.dealer_id)?.name || '';
      setCurrentProduct(curProduct);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    apiMarking
      .getDealers()
      .then((allDealers) => {
        console.log(allDealers);
        setDealers(allDealers);
      })
      .catch((err) => console.log(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const getMatchList = (count: number, list: Product[]) => {
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
        <h1 className="marking__product-name">{currentProduct?.dealerName}</h1>
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
          <SelectedProduct product={currentProduct}></SelectedProduct>
        </div>
      </div>
      <div className="marking__footer">
        <div className="marking__btn-footer-background">
          <button
            type="button"
            className="marking__btn marking__btn-footer common-button"
            onClick={handleToMainBtnClick}>
            На главную
          </button>
        </div>
        <div className="marking__btn-container">
          <div className="marking__btn-footer-background marking__btn-footer-background_small">
            <button type="button" className="marking__btn marking__btn-footer common-button">
              Да
            </button>
          </div>
          <div className="marking__btn-footer-background marking__btn-footer-background_small">
            <button type="button" className="marking__btn marking__btn-footer common-button">
              Нет
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
