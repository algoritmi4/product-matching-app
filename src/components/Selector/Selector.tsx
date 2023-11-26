import React from 'react';
import Select, { components } from 'react-select';
import './Selector.css';

export function Selector({
  matchCount,
  setMatchCount
}: {
  matchCount: number;
  setMatchCount: any;
}) {
  const handleChange = (e: any) => {
    console.log(e.target.value);

    setMatchCount(Number(e.target.value));
  };

  return (
    <select className="select" defaultValue={matchCount} onChange={handleChange}>
      <option value="2">Количество 2</option>
      <option value="3">Количество 3</option>
      <option value="5">Количество 5</option>
      <option value="10">Количество 10</option>
      <option value="20">Количество 20</option>
      <option value="999">Выбрать вручную</option>
    </select>
  );
}
