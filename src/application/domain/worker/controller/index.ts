import type { IPresenter } from '@shared/controller';
import type { IWorker, IWorkerModel } from '../model';

export interface InputGetWorkerByIdDto {
  id: number;
}

export abstract class WorkerControllerAbs {
  constructor(protected readonly model: IWorkerModel) {}

  abstract getById<T = IWorker>(
    dto: InputGetWorkerByIdDto,
    presenter?: null | IPresenter<IWorker, T>
  ): Promise<T>;
}
