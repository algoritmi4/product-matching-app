import { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import './SearchInFullList.css';
import { spawn } from 'child_process';

export function SearchInFullList({
  fullList,
  getMatchList
}: {
  fullList: any[];
  getMatchList: any;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({ mode: 'all' });

  const [resultOfSearchList, setResultOfSearchList] = useState(fullList);

  const onSubmit = (data: FieldValues) => {
    const { pattern } = data;
    console.log(pattern);

    setResultOfSearchList(
      fullList.filter((item) => item.name.toLowerCase().indexOf(pattern.toLowerCase()) >= 0)
    );
  };

  return (
    <>
      <form className="search-form" onSubmit={handleSubmit(onSubmit)}>
        <p className="search-form__field-header">Поиск по всем продуктам</p>
        <div className="search-form__field-container">
          <input
            type="text"
            {...register('pattern', {
              required: 'необходимо ввести фразу для поиска',
              maxLength: {
                value: 200,
                message: 'можно вводить не более 200 символов'
              }
            })}
            placeholder=""
            className="search-form__field"
          />
          <button
            disabled={!isValid}
            className={`search-form__submit-btn ${
              !isValid ? 'search-form__submit-btn_diabled' : ''
            }`}></button>
        </div>
        {errors?.pattern && (
          <div className="search-form__field-error">{errors.pattern.message?.toString()}</div>
        )}
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
