import './MatchedItemsContainer.css';

interface Data {
  id: number;
  product_key: string;
  price: number;
  product_url: string;
  product_name: string;
  date: string;
  dealer_id: number;
  dealerName?: string;
  marked_product: any;
}

interface Dealer {
  id: number;
  name: string;
}

const dealers: Dealer[] = [
  {
    id: 1,
    name: 'Moi_vibor_WB'
  },
  {
    id: 2,
    name: 'Akson'
  },
  {
    id: 3,
    name: 'Bafus'
  },
  {
    id: 5,
    name: 'Castorama'
  },
  {
    id: 6,
    name: 'Cubatora'
  },
  {
    id: 7,
    name: 'Komus'
  },
  {
    id: 9,
    name: 'Megastroy'
  },
  {
    id: 10,
    name: 'OnlineTrade'
  },
  {
    id: 11,
    name: 'Petrovich'
  },
  {
    id: 12,
    name: 'sdvor'
  },
  {
    id: 13,
    name: 'simaLand'
  },
  {
    id: 14,
    name: 'VegosM'
  },
  {
    id: 15,
    name: 'Vse_instrumeni'
  },
  {
    id: 16,
    name: 'Vimos'
  },
  {
    id: 4,
    name: 'Baucenter'
  },
  {
    id: 8,
    name: 'Leroy_Merlin'
  },
  {
    id: 18,
    name: 'Мasterstroy_spb_OZON\n'
  },
  {
    id: 17,
    name: 'Unicleaner_OZON'
  }
];

function MatchedItemsContainer({ data }: { data: Data }) {
  return (
    <div className="match-items-cont__container">
      <div className="match-items-cont__box">
        <h2 className="match-items-cont__box-title">Товар дилера</h2>
        <h3 className="match-items-cont__product-name">{`Название: ${data.product_name}`}</h3>
        <p className="match-items-cont__product-price">{`Цена: ${data.price}`}</p>
        <p className="match-items-cont__dealer-name">{`Дилер: ${dealers.find(
          (dealer) => dealer.id === data.dealer_id
        )?.name}`}</p>
        <div className="match-items-cont__date-link-box">
          <p className="match-items-cont__product-date">{`Дата загрузки товара: ${data.date}`}</p>
          <a
            href={data.product_url}
            rel="noreferrer"
            target="_blank"
            className="match-items-cont__product-link">
            Ссылка на товар
          </a>
        </div>
      </div>
      <div className="match-items-cont__arrow-image"></div>
      <div className="match-items-cont__box">
        <h2 className="match-items-cont__box-title">Сопоставленный товар заказчика</h2>
        <h3 className="match-items-cont__product-name">{`Название: ${data.marked_product.name}`}</h3>
        <p className="match-items-cont__product-price">{`Цена: ${data.marked_product.cost}`}</p>
        <p className="match-items-cont__product-min-price">{`Мин. рекомендованная цена: ${data.marked_product.recommended_price}`}</p>
        <p className="match-items-cont__product-article">{`Артикль: ${data.marked_product.article}`}</p>
      </div>
    </div>
  );
}

export default MatchedItemsContainer;
