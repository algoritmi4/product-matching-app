import './Selector.css';
import { Dispatch, SetStateAction, ChangeEvent } from 'react';

export function Selector({
  matchCount,
  setMatchCount
}: {
  matchCount: number;
  setMatchCount: Dispatch<SetStateAction<number>>;
}) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setMatchCount(Number(e.target.value));
  };

  // get option list
  const getOptions = (valueList: string[]) => {
    return valueList.map((item, index) => (
      <option value={item} className="select__option" key={index}>
        {`Вариантов: ${item}`}
      </option>
    ));
  };

  return (
    <select className="select" defaultValue={matchCount} onChange={handleChange}>
      {getOptions(['2', '3', '4', '5', '10', '20', '25'])}
      <option value="999" className="select__option">
        {'Поиск по всем вариантам'}
      </option>
    </select>
  );
}
