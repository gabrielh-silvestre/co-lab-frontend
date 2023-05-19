import { RegisterEvaluation } from './RegisterEvaluation';
import { RegisterEvaluationDesk } from './RegisterEvaluationDesk';

export function MakeRegisterEvaluation() {
  const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

  if (!isDesktop) return <RegisterEvaluation />;
  return <RegisterEvaluationDesk />;
}
