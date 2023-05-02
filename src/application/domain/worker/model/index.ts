export interface IWorker {
  id: string;
  name: string;
  email: string;
  age: number | null;
  salary: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWorkerModel {
  getById(id: number): Promise<IWorker | null>;
}
