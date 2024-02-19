import { ICourses } from 'app/shared/model/courses.model';
import { TrxType } from 'app/shared/model/enumerations/trx-type.model';

export interface IOrders {
  id?: number;
  amount?: number;
  trxType?: keyof typeof TrxType;
  userId?: number | null;
  courseId?: ICourses | null;
}

export const defaultValue: Readonly<IOrders> = {};
