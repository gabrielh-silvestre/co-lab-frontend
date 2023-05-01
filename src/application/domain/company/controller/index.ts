import type { IPresenter } from '@domain/shared/controller';

import type { ICompany, ICompanyModel } from '../model';

export interface InputGetCompanyByIdDto {
  id: string;
}

export interface InputGetCompanyByNameDto {
  name: string;
}

export interface InputCreateCompanyDto {
  name: string;
  image?: string;
  description?: string;
}

export interface InputAddEvaluationDto {
  companyId: string;
  comment?: string;
  categories: {
    name: string;
    rating: number;
  }[];
}

export abstract class CompanyControllerAbs {
  constructor(protected readonly model: ICompanyModel) {}

  abstract getAll<T = ICompany[]>(
    presenter?: null | IPresenter<ICompany[], T>
  ): Promise<T>;
  abstract getById<T = ICompany | null>(
    dto: InputGetCompanyByIdDto,
    presenter?: null | IPresenter<ICompany | null, T>
  ): Promise<T>;
  abstract getByName<T = ICompany[]>(
    dto: InputGetCompanyByNameDto,
    presenter?: null | IPresenter<ICompany[], T>
  ): Promise<T>;

  abstract create(dto: InputCreateCompanyDto): Promise<string>; // id
  abstract addEvaluation(dto: InputAddEvaluationDto): Promise<void>;
}
