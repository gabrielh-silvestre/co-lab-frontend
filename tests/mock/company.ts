import type { ICategory, ICompany, IEvaluation } from '@company/domain/model';

export const CATEGORY: ICategory = {
  name: 'category',
  rating: 3
};

export const EVALUATION: IEvaluation = {
  id: '1',
  comment: 'comment',
  categories: [CATEGORY],
  // AxiosResponse converts Date to string
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
} as unknown as IEvaluation;

export const COMPANY: ICompany = {
  id: '1',
  name: 'Company 1',
  image: 'image',
  description: 'description',
  evaluations: [EVALUATION],
  // AxiosResponse converts Date to string
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
} as unknown as ICompany;
