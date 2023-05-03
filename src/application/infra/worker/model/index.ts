import { CustomAxiosClient } from '@shared/infra/client-core/CustomAxios.client-core';
import type { IWorker, IWorkerModel } from '@worker/domain/model';

export class WorkerModel extends CustomAxiosClient implements IWorkerModel {
  constructor(baseURL: string) {
    super({
      baseURL,
      appName: 'worker',
      endpoints: { fetch: '/workers/{id}' }
    });
  }

  async getById(id: string): Promise<IWorker> {
    return this.fetch(id).then((res) => res.data);
  }
}
