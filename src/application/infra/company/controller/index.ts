import {
  CompanyControllerAbs,
  InputAddEvaluationDto,
  InputCreateCompanyDto,
  InputGetCompanyByIdDto,
  InputGetCompanyByNameDto,
  InputGetLatestEvaluatedDto
} from '@company/domain/controller';
import type { ICompany } from '@company/domain/model';
import type { IPresenter } from '@shared/domain/controller';

export class CompanyController extends CompanyControllerAbs {
  async getAll<T = ICompany[]>(
    presenter: IPresenter<ICompany[], T> | null = null
  ): Promise<T> {
    const result = await this.model.getAll();
    return presenter ? presenter(result) : (result as T);
  }

  async getById<T = ICompany | null>(
    { id }: InputGetCompanyByIdDto,
    presenter: IPresenter<ICompany | null, T> | null = null
  ): Promise<T> {
    const result = await this.model.getById(id);
    return presenter ? presenter(result) : (result as T);
  }

  async getByName<T = ICompany[]>(
    { name, page }: InputGetCompanyByNameDto,
    presenter: IPresenter<ICompany[], T> | null = null
  ): Promise<T> {
    // TODO: add pagination, page is not really working
    const result = await this.model.search({
      field: 'name',
      value: name,
      page
    });
    return presenter ? presenter(result) : (result as T);
  }

  async getLatestEvaluated<T = ICompany[]>(
    dto: InputGetLatestEvaluatedDto,
    presenter?: IPresenter<ICompany[], T> | null | undefined
  ): Promise<T> {
    const result = await this.model.getLatestEvaluated(dto.size);
    return presenter ? presenter(result) : (result as T);
  }

  async create<T = Omit<ICompany, 'evaluations'>>(
    dto: InputCreateCompanyDto,
    presenter: IPresenter<Omit<ICompany, 'evaluations'>, T> | null = null
  ): Promise<T> {
    const result = await this.model.create(dto);
    return presenter ? presenter(result) : (result as T);
  }

  async addEvaluation(dto: InputAddEvaluationDto): Promise<void> {
    const { companyId, ...body } = dto;
    await this.model.addEvaluation(companyId, body);
  }
}
