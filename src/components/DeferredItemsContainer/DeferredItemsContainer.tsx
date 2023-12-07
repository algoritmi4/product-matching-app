import { useNavigate } from 'react-router-dom';
import './DeferredItemsContainer.css';

interface Product {
  id: number;
  name: string;
  article: string;
  recommended_price: number;
  cost: number;
}

interface DealerPrice {
  id: number;
  product_key: number;
  price: number;
  product_url: string;
  product_name: string;
  date: string;
}

interface Items {
  product: Product;
  dealerprice: DealerPrice;
  created_at: string;
  status: string;
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

function DeferredItemsContainer({ data }: { data: Items }) {
  const navigate = useNavigate();

  return (
    <div className="def-items-cont">
      <div
        onClick={() => navigate(`/marking/${data.dealerprice.id}`)}
        className="def-items-cont__marking-link"></div>
      <h2 className="def-items-cont__box-title">Товар дилера</h2>
      <h3 className="def-items-cont__product-name">{`Название: ${data.dealerprice.product_name}`}</h3>
      <p className="def-items-cont__product-price">{`Цена: ${data.dealerprice.price}`}</p>
      <p className="def-items-cont__dealer-name">{`Дилер: ${dealers.find(
        (dealer) => dealer.id === data.dealerprice.id
      )?.name}`}</p>
      <div className="def-items-cont__date-link-box">
        <p className="def-items-cont__product-date">{`Дата загрузки товара: ${data.dealerprice.date}`}</p>
        <a
          href={data.dealerprice.product_url}
          rel="noreferrer"
          target="_blank"
          className="def-items-cont__product-link">
          Ссылка на товар
        </a>
      </div>
    </div>
  );
}

export default DeferredItemsContainer;
