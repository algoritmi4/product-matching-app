import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import './StatisticsInfo.css';
import { MarkingContext } from '../../contexts/MarkingContext';

interface matchedCount {
  matched: number;
  not_matched: number;
  deferred: number;
  total_matching: number;
  accuracy: number;
}

interface InputValues {
  id: string;
  startDate: string;
  endDate: string;
}

function StatisticsInfo({
  statistics,
  dealerStatistics,
  handleSubmitInfoForm
}: {
  statistics: matchedCount;
  dealerStatistics: matchedCount;
  handleSubmitInfoForm: (arg: InputValues) => void;
}) {
  const context = useContext(MarkingContext);
  const [inputValues, setInputValues] = useState<InputValues>({
    id: '',
    startDate: '',
    endDate: ''
  });
  const isFormReady =
    inputValues.id !== '' && inputValues.startDate !== '' && inputValues.endDate !== '';

  function handleInputValues(e: ChangeEvent<HTMLInputElement>) {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  }

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    handleSubmitInfoForm(inputValues);

    setInputValues({
      id: '',
      startDate: '',
      endDate: ''
    });
  }

  return (
    <div className="stat-info">
      <h2 className="stat-info__info-title">Статистика</h2>
      <form className="stat-info__info-form" onSubmit={(e) => handleFormSubmit(e)}>
        <label className="stat-info__text-input-label">
          <input
            type="number"
            onChange={(e) => handleInputValues(e)}
            value={inputValues.id}
            id="id-input"
            name="id"
            className="stat-info__text-input"
            placeholder={`Введите id(ваш id - ${context.user.id})`}
          />
          <div className="stat-info__search-icon"></div>
        </label>
        <h3 className="stat-info__subtitle">Укажите период:</h3>
        <div className="stat-info__date-input-box">
          <input
            onChange={(e) => handleInputValues(e)}
            value={inputValues.startDate}
            type="date"
            name="startDate"
            id="start-date-input"
            className="stat-info__date-input"
          />
          <input
            onChange={(e) => handleInputValues(e)}
            value={inputValues.endDate}
            type="date"
            name="endDate"
            id="end-date-input"
            className="stat-info__date-input"
          />
        </div>
        <button
          type="submit"
          className={`stat-info__form-button ${
            isFormReady ? '' : 'stat-info__form-button_disabled'
          }`}
          disabled={!isFormReady}>
          Поиск
        </button>
      </form>
      <p className="stat-info__total-matched">{`Всего сопоставлено: ${statistics.matched}`}</p>
      <p className="stat-info__total-matched">{`Всего не сопоставлено: ${statistics.not_matched}`}</p>
      <p className="stat-info__total-matched">{`Всего отложено: ${statistics.deferred}`}</p>
      <p className="stat-info__total-matched">{`Точность: ${statistics.accuracy}`}</p>
      <h3 className="stat-info__dealer-info-title">Статистика по выбранному дилеру</h3>
      <p className="stat-info__dealer-matched">{`Кол-во сопоставленных: ${dealerStatistics.matched}`}</p>
      <p className="stat-info__dealer-matched">{`Кол-во несопоставленных: ${dealerStatistics.not_matched}`}</p>
      <p className="stat-info__dealer-matched">{`Кол-во отложенных: ${dealerStatistics.deferred}`}</p>
    </div>
  );
}

export default StatisticsInfo;
