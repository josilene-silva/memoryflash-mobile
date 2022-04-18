import { ICard } from './ICard';
import { ICategory } from './ICategory';
import { IPractice } from './IPractice';

export interface ISet {
  id: string;
  name: string;
  description: string;
  category: ICategory;
  cards: ICard[];
  practices: IPractice[];
}
