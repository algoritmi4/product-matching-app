import './MarkingPage.css';
import '../../utils/css-common/common-button.css';
import { useState, useEffect, SetStateAction, Dispatch, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Selector } from '../Selector/Selector';
import { Match } from '../Match/Match';
import { SearchInFullList } from '../SearchInFullList/SearchInFullList';
import { SelectedProduct } from '../SelectedProduct/SelectedProduct';
import { IDealerProduct } from '../../utils/Interfaces/IDealerProduct.interface';
import { INIRIAL_MARKETING_PRODUCTS, INITIAL_MARKETING_DEALERPRICE } from '../../utils/constants';
import { IProduct } from '../../utils/Interfaces/IProduct.interface';
import api from '../../utils/Api/api';
import { Preloader } from '../Preloader/Preloader';

export default function MarkingPage({
  matchCount,
  setMatchCount
}: {
  matchCount: number;
  setMatchCount: Dispatch<SetStateAction<number>>;
}) {
  const [isLoading, setIsLoading] = useState(true);

  const [productId, setProductId] = useState('');
  const [currentDealerName, setCurrentDealerName] = useState('');
  const [mathProductList, setMathProductList] = useState<IProduct[]>(INIRIAL_MARKETING_PRODUCTS);
  const [chosenDealerProduct, setChosenDealerProduct] = useState<IDealerProduct>(
    INITIAL_MARKETING_DEALERPRICE[0]
  );
  const [chosenItem, setChosenItem] = useState<IProduct>(INIRIAL_MARKETING_PRODUCTS[0]);
  const [mappedProduct, setMappedProduct] = useState<IProduct>(INIRIAL_MARKETING_PRODUCTS[0]);
  const [isMapped, setIsMapped] = useState(false);
  const [isDenyed, setIsDenyed] = useState(false);
  const [isDelayed, setIsDelayed] = useState(false);

  const navigate = useNavigate();

  const { product_id } = useParams();

  useLayoutEffect(() => {
    setProductId(product_id || '');
  }, []);

  const resetChosenItem = () => {
    setChosenItem(INIRIAL_MARKETING_PRODUCTS[0]);
  };

  const reset = () => {
    resetChosenItem();
    setIsDenyed(false);
    setIsMapped(false);
    setMappedProduct(INIRIAL_MARKETING_PRODUCTS[0]);
    setIsDelayed(false);
  };

  useEffect(() => {
    setIsLoading(true);
    reset();

    if (productId) {
      Promise.all([api.getMatchList(productId, '25'), api.getDealerPrice(productId)])
        .then((result) => {
          const data: IProduct[] = result[0];
          setMathProductList(data);
          if (data) return Promise.resolve(result[1]);
        })
        .then((data) => {
          setChosenDealerProduct(data);
          if (data.productdealer) {
            if (data.productdealer.status === 'matched') {
              setMappedProduct(data.productdealer.product);
              setIsMapped(true);
            }
            if (data.productdealer.status === 'not matched') {
              setIsDenyed(true);
            }
            if (data.productdealer.status === 'deferred') {
              setIsDelayed(true);
            }
          }
          // get dealer name for current dealer product
          setCurrentDealerName(data.dealer?.name);
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
      reset();
      setProductId((+productId + 1).toString());
    }
  };

  const handleBtnPrevClick = () => {
    if (productId) {
      reset();
      setProductId((+productId - 1).toString());
    }
  };

  const handleBtnToMainClick = () => {
    navigate('/');
  };

  const handleBtnDenyClick = () => {
    resetChosenItem();
    api
      .postMatchingNotAccepted(chosenDealerProduct.id.toString())
      .then((data) => {
        reset();
        setIsDenyed(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleBtnAdmit = () => {
    api
      .postMatchingAccepted(chosenDealerProduct.id.toString(), chosenItem.id.toString())
      .then((data) => {
        reset();
        setMappedProduct(chosenItem);
        setIsMapped(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleBtnDelayClick = () => {
    api
      .postMatchingAcceptedLater(chosenDealerProduct.id.toString())
      .then((data) => {
        reset();
        setIsDelayed(true);
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
        <>
          <div className="marking">
            <div className="marking__header">
              <div className="marking__header-btn-container">
                <button
                  type="button"
                  className="marking__header-btn common-button"
                  onClick={handleBtnToMainClick}>
                  На главную
                </button>
                <Selector matchCount={matchCount} setMatchCount={setMatchCount}></Selector>
              </div>
              <h1 className="marking__dealer-name">{currentDealerName}</h1>
            </div>
            <div className="marking__container">
              <div className="marking__matchList-container">
                {matchCount === 999 ? (
                  <SearchInFullList fullList={mathProductList} getMatchList={getMatchList} />
                ) : (
                  getMatchList(matchCount, mathProductList)
                )}
              </div>
              <div className="marking__matching-container">
                <div className="marking__match-container">
                  <SelectedProduct
                    dealerProduct={chosenDealerProduct}
                    chosenItem={chosenItem}
                    setIsMapped={setIsMapped}
                    isMapped={isMapped}
                    mappedProduct={mappedProduct}
                    isDenyed={isDenyed}
                    isDelayed={isDelayed}></SelectedProduct>
                </div>
                <div className="marking__btn-small-container">
                  <button
                    type="button"
                    className="marking__btn common-button"
                    onClick={handleBtnAdmit}>
                    Да
                  </button>
                  <button
                    type="button"
                    className="marking__btn common-button"
                    onClick={handleBtnDenyClick}>
                    Нет
                  </button>
                  <button
                    type="button"
                    className="marking__btn common-button"
                    onClick={handleBtnDelayClick}>
                    Отложить
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="marking__footer">
            <button
              type="button"
              className="marking__btn-footer common-button"
              onClick={handleBtnPrevClick}>
              Предыдущий
            </button>
            <button
              type="button"
              className="marking__btn-footer common-button"
              onClick={handleBtnNextClick}>
              Следующий
            </button>
          </div>
        </>
      )}
    </>
  );
}
