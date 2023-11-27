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

  return (
    <select className="select" defaultValue={matchCount} onChange={handleChange}>
      <option value="2" className="select__option">
        Вариантов: 2
      </option>
      <option value="3" className="select__option">
        Вариантов: 3
      </option>
      <option value="5" className="select__option">
        Вариантов: 5
      </option>
      <option value="10" className="select__option">
        Вариантов: 10
      </option>
      <option value="20" className="select__option">
        Вариантов: 20
      </option>
      <option value="999" className="select__option">
        Выбрать вручную
      </option>
    </select>
  );
}
