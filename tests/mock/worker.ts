import type { IWorker } from '@worker/domain/model';

export const WORKER: IWorker = {
  id: '1',
  name: 'John Doe',
  email: 'john_doe@email.com',
  age: 30,
  salary: 1000,
  // AxiosResponse converts Date to string
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
} as unknown as IWorker;
