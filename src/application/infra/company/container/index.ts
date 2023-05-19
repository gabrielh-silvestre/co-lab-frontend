import { CompanyControllerAbs } from '@company/domain/controller';

import { CompanyController } from '../controller';
import { CompanyModel } from '../model';

export class CompanyContainer {
  static build(
    baseUrl: string,
    token: string | null = null
  ): CompanyControllerAbs {
    const model = new CompanyModel(baseUrl, token);
    return new CompanyController(model);
  }
}
