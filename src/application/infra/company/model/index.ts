import type {
  ICompany,
  ICompanyInput,
  ICompanyModel,
  IEvaluationInput
} from '@company/domain/model';
import { CustomAxiosClient } from '@shared/infra/client-core/CustomAxios.client-core';

export class CompanyModel extends CustomAxiosClient implements ICompanyModel {
  constructor(baseURL: string) {
    super({
      baseURL,
      appName: 'company',
      endpoints: {
        search: '/companies/search',
        fetch: '/companies/{id}',
        create: '/companies/create',
        update: '/companies/{id}'
      }
    });
  }

  async getAll(): Promise<ICompany[]> {
    return super
      .makeRequest<ICompany[]>('GET', '/companies')
      .then((res) => res.data);
  }

  async getById(id: string): Promise<ICompany> {
    return this.fetch(id).then((res) => res.data);
  }

  async getByName(name: string): Promise<ICompany[]> {
    return this.search({ name }).then((res) => res.data);
  }

  async create(input: ICompanyInput): Promise<Omit<ICompany, 'evaluations'>> {
    return super.create(input).then((res) => res.data);
  }

  async addEvaluation(
    companyId: string,
    input: IEvaluationInput
  ): Promise<void> {
    await super.makeRequest(
      'PATCH',
      `${this.clientOptions.endpoints.update}/add-evaluation`,
      {
        data: input,
        params: { id: companyId }
      }
    );
  }
}
