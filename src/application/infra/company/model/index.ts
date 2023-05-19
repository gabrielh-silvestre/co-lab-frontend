import type {
  ICompany,
  ICompanyDetailed,
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

  async search(params?: object | undefined): Promise<ICompany[]> {
    return super.search(params).then((res) => res.data);
  }

  async getAll(): Promise<ICompany[]> {
    return super.search().then((res) => res.data);
  }

  async getById(id: string): Promise<ICompanyDetailed> {
    return this.fetch(id).then((res) => res.data);
  }

  async getLatestEvaluated(size?: number): Promise<ICompany[]> {
    return this.makeRequest('GET', '/companies/evaluations', {
      params: size ? { size } : undefined
    }).then((res) => res.data as ICompany[]);
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
