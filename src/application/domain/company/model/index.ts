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
  description: string | null;

  evaluations: IEvaluation[];

  createdAt: Date;
  updatedAt: Date;
}

export interface ICompanyInput {
  name: string;
  image?: string;
  description?: string;
}

export interface ICompanyModel {
  getAll(): Promise<ICompany[]>;
  getById(id: string): Promise<ICompany | null>;
  getByName(name: string): Promise<ICompany[]>;

  create(input: ICompanyInput): Promise<string>; // id
  addEvaluation(companyId: string, input: IEvaluationInput): Promise<void>;
}
