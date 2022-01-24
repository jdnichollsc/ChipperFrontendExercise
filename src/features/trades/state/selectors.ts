import {useSelector} from 'react-redux';
import {RootState} from '../../../store';

export const useTrades = () =>
  useSelector((state: RootState) => state.trades?.data);
