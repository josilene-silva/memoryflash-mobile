import { ICard } from './ICard';
import { ICategory } from './ICategory';

export interface ISet {
  id: string;
  name: string;
  description: string;
  category: ICategory;
  cards: ICard[];
}
