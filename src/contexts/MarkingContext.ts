import { createContext } from 'react';
import { Dealer } from '../utils/Dealer.interface';
import { MARKETING_DEALER } from '../utils/constants';
interface IMarkingContext {
  dealerList: Dealer[];
}
export const MarkingContext = createContext<IMarkingContext>({
  dealerList: MARKETING_DEALER
});
