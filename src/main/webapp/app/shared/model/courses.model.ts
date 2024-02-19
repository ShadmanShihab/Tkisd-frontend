import { ICategory } from 'app/shared/model/category.model';

export interface ICourses {
  id?: number;
  courseName?: string;
  description?: string;
  price?: number;
  numberOfClasses?: number;
  totalDuration?: number;
  categoryId?: ICategory | null;
}

export const defaultValue: Readonly<ICourses> = {};
