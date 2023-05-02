import type { IPresenter } from '@shared/controller';
import type { IWorker } from '@worker/model';
import { InputGetWorkerByIdDto, WorkerControllerAbs } from '@worker/controller';

export class WorkerController extends WorkerControllerAbs {
  async getById<T = IWorker>(
    { id }: InputGetWorkerByIdDto,
    presenter: null | IPresenter<IWorker, T> = null
  ): Promise<T> {
    const result = await this.model.getById(id);
    if (!result) throw new Error('Worker not found');

    return presenter ? presenter(result) : (result as T);
  }
}
