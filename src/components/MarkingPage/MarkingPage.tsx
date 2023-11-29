import './MarkingPage.css';
import '../../utils/common-button.css';
import { useState, useEffect, useContext, SetStateAction, Dispatch, useLayoutEffect } from 'react';
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
  const [productId, setProductId] = useState('');
  const [currentDealerName, setCurrentDealerName] = useState('');
  const [mathProductList, setMathProductList] = useState<IProduct[]>(INIRIAL_MARKETING_PRODUCTS);
  const [chosenDealerProduct, setChosenDealerProduct] = useState<IDealerProduct>(
    INITIAL_MARKETING_DEALERPRICE[0]
  );
  const [chosenItem, setChosenItem] = useState<IProduct>(INIRIAL_MARKETING_PRODUCTS[0]);
  const [mappedProduct, setMappedProduct] = useState<IProduct>(TEST_MARKETING_PRODUCTS[0]);
  const [isMapped, setIsMapped] = useState(false);

  // get navigate object
  const navigate = useNavigate();
  // get dealers from context
  const { dealerList } = useContext(MarkingContext);

  // get id of chosen dealer product from url
  const { product_id } = useParams();

  // put product_id into state
  useLayoutEffect(() => {
    setProductId(product_id || '');

    // check if dealer prodauct is mapped
    if (mappedProduct.id !== 0) {
      setIsMapped(true);
    }
  }, []);

  // reset chosen item
  const resetChosenItem = () => {
    setChosenItem(INIRIAL_MARKETING_PRODUCTS[0]);
  };

  // request data and initialize states
  useEffect(() => {
    // launch preloader
    setIsLoading(true);

    // reset chosen item
    resetChosenItem();

    if (productId) {
      // get list of matches
      // get chosen dealer product from db by it's id
      Promise.all([api.getMatchList(productId, '25'), api.getDealerPrice(productId)])
        .then((result) => {
          const data: IProduct[] = result[0];
          setMathProductList(data);
          return Promise.resolve(result[1]);
        })
        .then((data) => {
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
  }, [productId]);

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

  const handleBtnNextClick = () => {
    if (productId) {
      setProductId((+productId + 1).toString());
    }
  };

  // handle for button forwarding to main page
  const handleBtnToMainClick = () => {
    navigate('/');
  };

  // handle Deny button, do reset chosen item
  const handleBtnDenyClick = () => {
    resetChosenItem();
  };

  const handleBtnAdmit = () => {
    api
      .postMatching(chosenItem.id.toString(), chosenDealerProduct.id.toString())
      .then((data) => {
        console.log(data);
        setMappedProduct(chosenItem);
        setIsMapped(true);
        resetChosenItem();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

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
                dealerProduct={chosenDealerProduct}
                chosenItem={chosenItem}
                setIsMapped={setIsMapped}
                isMapped={isMapped}
                mappedProduct={mappedProduct}></SelectedProduct>
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
              <div className="marking__btn-small-container">
                <div className="marking__btn-footer-background marking__btn-footer-background_small">
                  <button
                    type="button"
                    className="marking__btn marking__btn-footer common-button"
                    onClick={handleBtnAdmit}>
                    Да
                  </button>
                </div>
                <div className="marking__btn-footer-background marking__btn-footer-background_small">
                  <button
                    type="button"
                    className="marking__btn marking__btn-footer common-button"
                    onClick={handleBtnDenyClick}>
                    Нет
                  </button>
                </div>
              </div>
              <div className="marking__btn-footer-background marking__btn-footer-background_middle">
                <button
                  type="button"
                  className="marking__btn marking__btn-footer common-button"
                  onClick={handleBtnNextClick}>
                  Далее
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
