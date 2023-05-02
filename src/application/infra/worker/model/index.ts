import { CustomAxiosClient } from '@shared/client-core/CustomAxios.client-core';
import type { IWorker, IWorkerModel } from '@worker/model';

export class WorkerModel extends CustomAxiosClient implements IWorkerModel {
  constructor(baseURL: string) {
    super({
      baseURL,
      appName: 'worker',
      endpoints: { fetch: '/workers/{id}' }
    });
  }

  async getById(id: number): Promise<IWorker | null> {
    return this.fetch(`${id}`).then((res) => res.data);
  }
}
