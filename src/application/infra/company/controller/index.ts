import {
  CompanyControllerAbs,
  InputAddEvaluationDto,
  InputCreateCompanyDto,
  InputGetCompanyByIdDto,
  InputGetCompanyByNameDto
} from '@company/controller';
import type { ICompany } from '@company/model';
import type { IPresenter } from '@shared/controller';

export class CompanyController extends CompanyControllerAbs {
  async getAll<T>(presenter: IPresenter<ICompany[], T> | null): Promise<T> {
    const result = await this.model.getAll();
    return presenter ? presenter(result) : (result as T);
  }

  async getById<T>(
    { id }: InputGetCompanyByIdDto,
    presenter: IPresenter<ICompany | null, T> | null
  ): Promise<T> {
    const result = await this.model.getById(id);
    return presenter ? presenter(result) : (result as T);
  }

  async getByName<T>(
    { name }: InputGetCompanyByNameDto,
    presenter: IPresenter<ICompany[], T> | null
  ): Promise<T> {
    const result = await this.model.getByName(name);
    return presenter ? presenter(result) : (result as T);
  }

  async create(dto: InputCreateCompanyDto): Promise<string> {
    return await this.model.create(dto);
  }

  async addEvaluation(dto: InputAddEvaluationDto): Promise<void> {
    await this.model.addEvaluation(dto.companyId, dto);
  }
}
