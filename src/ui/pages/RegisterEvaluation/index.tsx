import { CompanyContainer } from '@company/infra/container';
import { useUserStore } from '@stores/userStore';

import { RegisterEvaluation } from './RegisterEvaluation';
import { RegisterEvaluationDesk } from './RegisterEvaluationDesk';

export type RegisterEvaluationFormInput = {
  inclusionRating: number;
  benefitsRating: number;
  growthRating: number;
  equityRating: number;

  comment?: string;
};

export type EvaluationCategories = {
  diversidade: number;
  beneficios: number;
  crescimento: number;
  equidade: number;
};

export function MakeRegisterEvaluation() {
  const { token } = useUserStore();

  const companyController = CompanyContainer.build(
    import.meta.env.VITE_API_URL,
    token
  );

  const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

  if (!isDesktop) return <RegisterEvaluation />;
  return <RegisterEvaluationDesk companyController={companyController} />;
}
