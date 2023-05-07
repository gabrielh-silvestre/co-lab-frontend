import type { IPresenter } from '@shared/domain/controller';
import {
  InputGetWorkerByIdDto,
  WorkerControllerAbs
} from '@worker/domain/controller';
import type { IWorker } from '@worker/domain/model';

export class WorkerController extends WorkerControllerAbs {
  async getById<T = IWorker>(
    { id }: InputGetWorkerByIdDto,
    presenter: null | IPresenter<IWorker, T> = null
  ): Promise<T> {
    const result = await this.model.getById(id);
    return presenter ? presenter(result) : (result as T);
  }
}
