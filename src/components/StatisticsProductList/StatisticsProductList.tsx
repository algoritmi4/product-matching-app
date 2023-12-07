import InfiniteScroll from 'react-infinite-scroll-component';
import ProductTypeSelector from '../ProductTypeSelector/ProductTypeSelector';
import './StatisticsProductList.css';
import ButtonPreloader from '../ButtonPreloader/ButtonPreloader';
import MatchedItemsContainer from '../MatchedItemsContainer/MatchedItemsContainer';
import DeferredItemsContainer from '../DeferredItemsContainer/DeferredItemsContainer';
import { Preloader } from '../Preloader/Preloader';
import { Items } from '../../utils/Interfaces/StatisticsPage/Items.interface';

function StatisticsProductList({
  items,
  productType,
  setProductType,
  setOffset,
  setIsPreloader,
  setHasMore,
  isPreloader,
  hasMore,
  handleNext
}: {
  items: Items[];
  productType: string;
  setIsPreloader: (arg: boolean) => void;
  setProductType: (arg: string) => void;
  setOffset: (arg: number) => void;
  setHasMore: (arg: boolean) => void;
  isPreloader: boolean;
  hasMore: boolean;
  handleNext: () => void;
}) {
  return (
    <div className="stat-page__flex-table">
      <ProductTypeSelector
        setProductType={setProductType}
        setOffset={setOffset}
        setIsPreloader={setIsPreloader}
        setHasMore={setHasMore}
      />
      {items.length === 0 ? (
        <h4 className="stat-page__err-message">{`${
          productType === 'matched' ? 'Сопоставленных' : 'Отложенных'
        } товаров ещё нет в базе`}</h4>
      ) : isPreloader ? (
        <Preloader />
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
