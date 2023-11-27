import { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import './SearchInFullList.css';
import { Product } from '../../utils/Product.interface';

export function SearchInFullList({
  fullList,
  getMatchList
}: {
  fullList: Product[];
  getMatchList: (count: number, list: Product[]) => JSX.Element[];
}) {
  const {
    register,
    handleSubmit,
    formState: { isValid }
  } = useForm({ mode: 'all' });

  const [resultOfSearchList, setResultOfSearchList] = useState(fullList);

  const onSubmit = (data: FieldValues) => {
    const { pattern } = data;
    setResultOfSearchList(
      fullList.filter((item) => item.name.toLowerCase().indexOf(pattern.toLowerCase()) >= 0)
    );
  };

  return (
    <>
      <form className="search-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="search-form__field-container">
          <input
            type="text"
            {...register('pattern', {
              required: true
            })}
            placeholder="Поиск по всем продуктам"
            className="search-form__field"
          />
          <button
            disabled={!isValid}
            className={`search-form__submit-btn ${
              !isValid ? 'search-form__submit-btn_diabled' : ''
            }`}></button>
        </div>
      </form>
      <div className="marking__matchList-container">
        {getMatchList.length > 0 &&
          (resultOfSearchList.length > 0 ? (
            getMatchList(999, resultOfSearchList)
          ) : (
            <div className="search-form__no-goods">Нет подходящих товаров</div>
          ))}
      </div>
    </>
  );
}
