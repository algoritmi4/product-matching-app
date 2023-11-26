import './Selector.css';

export function Selector({
  matchCount,
  setMatchCount
}: {
  matchCount: number;
  setMatchCount: any;
}) {
  const handleChange = (e: any) => {
    setMatchCount(Number(e.target.value));
  };

  return (
    <select className="select" defaultValue={matchCount} onChange={handleChange}>
      <option value="2">Вариантов: 2</option>
      <option value="3">Вариантов: 3</option>
      <option value="5">Вариантов: 5</option>
      <option value="10">Вариантов: 10</option>
      <option value="20">Вариантов: 20</option>
      <option value="999">Выбрать вручную</option>
    </select>
  );
}
