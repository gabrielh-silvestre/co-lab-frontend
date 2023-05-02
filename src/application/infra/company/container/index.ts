import { CompanyControllerAbs } from '@company/controller';

import { CompanyController } from '../controller';
import { CompanyModel } from '../model';

export class CompanyContainer {
  static build(baseUrl: string): CompanyControllerAbs {
    const model = new CompanyModel(baseUrl);
    return new CompanyController(model);
  }
}
