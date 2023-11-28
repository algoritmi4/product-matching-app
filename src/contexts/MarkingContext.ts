import { createContext } from 'react';
import { IDealer } from '../utils/IDealer.interface';
import { INITIAL_MARKETING_DEALER } from '../utils/constants';
interface IMarkingContext {
  dealerList: IDealer[];
}
export const MarkingContext = createContext<IMarkingContext>({
  dealerList: INITIAL_MARKETING_DEALER
});
