import { CompanyContainer } from '@company/infra/container';

import { Home } from './Home';
import { HomeDesk } from './HomeDesk';

export function MakeHome() {
  const companyController = CompanyContainer.build(
    import.meta.env.VITE_API_URL as string
  );

  const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

  if (!isDesktop) return <Home companyController={companyController} />;
  return <HomeDesk companyController={companyController} />;
}
