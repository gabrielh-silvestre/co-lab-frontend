import { WorkerControllerAbs } from '@worker/controller';

import { WorkerController } from '../controller';
import { WorkerModel } from '../model';

export class WorkerContainer {
  static build(baseUrl: string): WorkerControllerAbs {
    const model = new WorkerModel(baseUrl);
    return new WorkerController(model);
  }
}
