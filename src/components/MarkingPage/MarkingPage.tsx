import './MarkingPage.css';
import { useState } from 'react';
import { Selector } from '../Selector/Selector';
import { Match } from '../Match/Match';
import { SearchInFullList } from '../SearchInFullList/SearchInFullList';
import { SelectedProduct } from '../SelectedProduct/SelectedProduct';
import { Item } from './Item.type';

export default function MarkingPage() {
  const [matchCount, setMatchCount] = useState(2);
  const [chosenItem, setChosenItem] = useState<Item>({
    name: '',
    price: '',
    url: ''
  });

  const matchList = [
    {
      name: 'Пропитка для дерева 1л',
      price: '2000',
      url: 'https://www.wildberries.ru/catalog/118093487/detail.aspx'
    },
    {
      name: 'Пропитка для дерева 2л',
      price: '2000',
      url: 'https://www.wildberries.ru/catalog/118093487/detail.aspx'
    },
    {
      name: 'Пропитка для дерева 3л очень много слов очееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееее',
      price: '2000',
      url: 'https://www.wildberries.ru/catalog/118093487/detail.aspx'
    },
    {
      name: 'Пропитка для дерева 4л',
      price: '2000',
      url: 'https://www.wildberries.ru/catalog/118093487/detail.aspx'
    },
    {
      name: 'Пропитка для дерева 5л',
      price: '2000',
      url: 'https://www.wildberries.ru/catalog/118093487/detail.aspx'
    },
    {
      name: 'Пропитка для дерева 6л',
      price: '2000',
      url: 'https://www.wildberries.ru/catalog/118093487/detail.aspx'
    },
    {
      name: 'Пропитка для дерева 7л',
      price: '2000',
      url: 'https://www.wildberries.ru/catalog/118093487/detail.aspx'
    },
    {
      name: 'Пропитка для дерева 8л',
      price: '2000',
      url: 'https://www.wildberries.ru/catalog/118093487/detail.aspx'
    },
    {
      name: 'Пропитка для дерева 9л',
      price: '2000',
      url: 'https://www.wildberries.ru/catalog/118093487/detail.aspx'
    },
    {
      name: 'Пропитка для дерева 10л',
      price: '2000',
      url: 'https://www.wildberries.ru/catalog/118093487/detail.aspx'
    },
    {
      name: 'Пропитка для дерева 11л',
      price: '2000',
      url: 'https://www.wildberries.ru/catalog/118093487/detail.aspx'
    }
  ];

  const fullList = [
    {
      name: 'Пропитка для дерева 1л',
      price: '2000',
      url: 'https://www.wildberries.ru/catalog/118093487/detail.aspx'
    },
    {
      name: 'Пропитка для дерева 2л',
      price: '2000',
      url: 'https://www.wildberries.ru/catalog/118093487/detail.aspx'
    },
    {
      name: 'Пропитка для дерева 3л очень много слов очееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееееее',
      price: '2000',
      url: 'https://www.wildberries.ru/catalog/118093487/detail.aspx'
    },
    {
      name: 'Пропитка для дерева 4л',
      price: '2000',
      url: 'https://www.wildberries.ru/catalog/118093487/detail.aspx'
    },
    {
      name: 'Пропитка для дерева 5л',
      price: '2000',
      url: 'https://www.wildberries.ru/catalog/118093487/detail.aspx'
    },
    {
      name: 'Пропитка для дерева 6л',
      price: '2000',
      url: 'https://www.wildberries.ru/catalog/118093487/detail.aspx'
    },
    {
      name: 'Пропитка для дерева 7л',
      price: '2000',
      url: 'https://www.wildberries.ru/catalog/118093487/detail.aspx'
    },
    {
      name: 'Пропитка для дерева 8л',
      price: '2000',
      url: 'https://www.wildberries.ru/catalog/118093487/detail.aspx'
    },
    {
      name: 'Пропитка для дерева 9л',
      price: '2000',
      url: 'https://www.wildberries.ru/catalog/118093487/detail.aspx'
    },
    {
      name: 'Пропитка для дерева 10л',
      price: '2000',
      url: 'https://www.wildberries.ru/catalog/118093487/detail.aspx'
    },
    {
      name: 'Пропитка для дерева 11л',
      price: '2000',
      url: 'https://www.wildberries.ru/catalog/118093487/detail.aspx'
    }
  ];

  const getMatchList = (count: number, list: any[]) => {
    const resultList: JSX.Element[] = [];
    for (let i = 0; i < (list.length >= count ? count : list.length); i++) {
      resultList.push(<Match product={list[i]} key={i} setChosenItem={setChosenItem} />);
    }
    return resultList;
  };

  return (
    <div className="marking">
      <div className="marking__header">
        <Selector matchCount={matchCount} setMatchCount={setMatchCount}></Selector>
        <h1 className="marking__product-name">
          Наименование продукта очень длнное
          оченьььььььььььььььььььььььььььььььььььььььььььььььььььь
        </h1>
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
          <SelectedProduct product={chosenItem}></SelectedProduct>
        </div>
      </div>
      <div className="marking__footer">
        <button type="button" className="marking_btn-confirm">
          Да
        </button>
        <button type="button" className="marking_btn-deny">
          Нет
        </button>
      </div>
    </div>
  );
}
