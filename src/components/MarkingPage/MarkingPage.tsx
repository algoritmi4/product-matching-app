import './MarkingPage.css';
import '../../utils/common-button.css';
import { useState, useEffect, useContext, SetStateAction, Dispatch } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Selector } from '../Selector/Selector';
import { Match } from '../Match/Match';
import { SearchInFullList } from '../SearchInFullList/SearchInFullList';
import { SelectedProduct } from '../SelectedProduct/SelectedProduct';
import { IDealerProduct } from '../../utils/IDealerProduct.interface';
import { MarkingContext } from '../../contexts/MarkingContext';
import {
  INIRIAL_MARKETING_PRODUCTS,
  INITIAL_MARKETING_DEALERPRICE,
  TEST_MARKETING_PRODUCTS
} from '../../utils/constants';
import { IProduct } from '../../utils/IProduct.interface';
import api from '../../utils/api';
import { Preloader } from '../Preloader/Preloader';

export default function MarkingPage({
  matchCount,
  setMatchCount
}: {
  matchCount: number;
  setMatchCount: Dispatch<SetStateAction<number>>;
}) {
  // For Preloader, launch it then open window
  const [isLoading, setIsLoading] = useState(true);

  // create states
  const [currentDealerName, setCurrentDealerName] = useState('');
  const [mathProductList, setMathProductList] = useState<IProduct[]>(INIRIAL_MARKETING_PRODUCTS);
  const [chosenDealerProduct, setChosenDealerProduct] = useState<IDealerProduct>(
    INITIAL_MARKETING_DEALERPRICE[0]
  );
  const [chosenItem, setChosenItem] = useState<IProduct>(INIRIAL_MARKETING_PRODUCTS[0]);

  // get navigate object
  const navigate = useNavigate();

  // get dealers from context
  const { dealerList } = useContext(MarkingContext);

  // get id of chosen dealer product from url
  //const { product_id } = useParams();
  const product_id = '3';

  // request data and initialize states
  useEffect(() => {
    // launch preloader
    setIsLoading(true);
    if (product_id) {
      // get list of matches
      // get chosen dealer product from db by it's id
      Promise.all([api.getMatchList(product_id, '25'), api.getDealerPrice(product_id)])
        .then((result) => {
          const data: IProduct[] = result[0];
          console.log('result[0].data =>>>>', data);
          setMathProductList(data);
          return Promise.resolve(result[1]);
        })
        .then((data) => {
          console.log('data =>>>>', data);
          setChosenDealerProduct(data);
          // get dealer name for current dealer product
          const curDealer = dealerList?.find((dealer) => dealer.id === data?.dealer_id)?.name || '';
          setCurrentDealerName(curDealer);
        })
        .catch((err) => {
          console.log(err?.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  // get list of products for matching
  const getMatchList = (count: number, list: IProduct[]) => {
    const resultList: JSX.Element[] = [];
    for (let i = 0; i < (list.length >= count ? count : list.length); i++) {
      resultList.push(
        <Match product={list[i]} key={i} setChosenItem={setChosenItem} chosenItem={chosenItem} />
      );
    }
    return resultList;
  };

  // handle for button forwarding to main page
  const handleBtnToMainClick = () => {
    navigate('/');
  };

  // render
  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="marking">
          <div className="marking__header">
            <Selector matchCount={matchCount} setMatchCount={setMatchCount}></Selector>
            <div className="marking__dealer-name-container">
              <h1 className="marking__dealer-name">{currentDealerName}</h1>
            </div>
          </div>
          <div className="marking__container">
            <div className="marking__matchList-container">
              {matchCount === 999 ? (
                <SearchInFullList fullList={mathProductList} getMatchList={getMatchList} />
              ) : (
                getMatchList(matchCount, mathProductList)
              )}
            </div>
            <div className="marking__match-container">
              <SelectedProduct
                product={chosenDealerProduct}
                chosenItem={chosenItem}></SelectedProduct>
            </div>
          </div>
          <div className="marking__footer">
            <div className="marking__btn-footer-background">
              <button
                type="button"
                className="marking__btn marking__btn-footer common-button"
                onClick={handleBtnToMainClick}>
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
      )}
    </>
  );
}
