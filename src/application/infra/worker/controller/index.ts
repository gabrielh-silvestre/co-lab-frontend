import type { IPresenter } from '@shared/domain/controller';
import type { IWorker } from '@worker/domain/model';
import { InputGetWorkerByIdDto, WorkerControllerAbs } from '@worker/domain/controller';

export class WorkerController extends WorkerControllerAbs {
  async getById<T = IWorker>(
    { id }: InputGetWorkerByIdDto,
    presenter: null | IPresenter<IWorker, T> = null
  ): Promise<T> {
    const result = await this.model.getById(id);
    return presenter ? presenter(result) : (result as T);
  }
}
