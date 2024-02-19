export interface IInstructor {
  id?: number;
  instructorName?: string;
  description?: string | null;
  address?: string | null;
  phoneNo?: string | null;
  grade?: number | null;
  userId?: number | null;
}

export const defaultValue: Readonly<IInstructor> = {};
