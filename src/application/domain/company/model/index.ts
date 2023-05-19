export interface ICategory {
  name: string;
  rating: number;
}

export interface IEvaluation {
  id: string;

  comment: string | null;
  categories: ICategory[];

  createdAt: Date;
  updatedAt: Date;
}

export interface IEvaluationInput {
  comment?: string;
  categories: ICategory[];
}

export interface ICompany {
  id: string;
  name: string;
  image: string | null;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICompanyDetailed extends ICompany {
  evaluations: IEvaluation[];
}

export interface ICompanyInput {
  name: string;
  image?: string;
  description?: string;
}

export interface ICompanyModel {
  getAll(): Promise<ICompany[]>;
  getById(id: string): Promise<ICompanyDetailed>;
  getByName(name: string): Promise<ICompany[]>;

  create(input: ICompanyInput): Promise<ICompany>;
  addEvaluation(companyId: string, input: IEvaluationInput): Promise<void>;
}
