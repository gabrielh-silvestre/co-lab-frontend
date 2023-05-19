import { CompanyContainer } from '@company/infra/container';

import { Home } from './Home';

export function MakeHome() {
  const companyController = CompanyContainer.build(
    import.meta.env.VITE_API_URL as string
  );

  return <Home companyController={companyController} />;
}
