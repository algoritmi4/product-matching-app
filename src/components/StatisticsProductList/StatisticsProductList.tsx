import InfiniteScroll from 'react-infinite-scroll-component';
import ProductTypeSelector from '../ProductTypeSelector/ProductTypeSelector';
import './StatisticsProductList.css';
import ButtonPreloader from '../ButtonPreloader/ButtonPreloader';
import MatchedItemsContainer from '../MatchedItemsContainer/MatchedItemsContainer';
import DeferredItemsContainer from '../DeferredItemsContainer/DeferredItemsContainer';
import { Items } from '../../utils/Interfaces/StatisticsPage/Items.interface';
import UsersTypeSelector from '../UsersTypeSelector/UsersTypeSelector';

function StatisticsProductList({
  items,
  productType,
  setProductType,
  setOffset,
  setHasMore,
  hasMore,
  handleNext,
  setSelectedUserType
}: {
  items: Items[];
  productType: string;
  setProductType: (arg: string) => void;
  setOffset: (arg: number) => void;
  setHasMore: (arg: boolean) => void;
  hasMore: boolean;
  handleNext: () => void;
  setSelectedUserType: (arg: string) => void;
}) {
  return (
    <div className="product-list">
      <div className="product-list__selectors-box">
        <ProductTypeSelector
          setProductType={setProductType}
          setOffset={setOffset}
          setHasMore={setHasMore}
        />
        <UsersTypeSelector
          setSelectedUserType={setSelectedUserType}
          setOffset={setOffset}
          setHasMore={setHasMore}
        />
      </div>
      {items.length === 0 ? (
        <h4 className="stat-page__err-message">{`${
          productType === 'matched'
            ? 'Сопоставленных'
            : productType === 'not matched'
              ? 'Не сопоставленных'
              : productType === 'deferred'
                ? 'Отложенных'
                : ''
        } товаров ещё нет в базе`}</h4>
      ) : (
        <InfiniteScroll
          className={`stat-page__infinite-scroll ${
            productType === 'matched'
              ? 'stat-page__infinite-scroll_type_matched'
              : 'stat-page__infinite-scroll_type_deferred'
          }`}
          dataLength={items.length}
          next={handleNext}
          hasMore={hasMore}
          loader={<ButtonPreloader />}
          height={800}>
          {items.map((el, index) =>
            productType === 'matched' ? (
              <MatchedItemsContainer key={index} data={el} />
            ) : (
              <DeferredItemsContainer key={index} data={el} />
            )
          )}
        </InfiniteScroll>
      )}
    </div>
  );
}

export default StatisticsProductList;
