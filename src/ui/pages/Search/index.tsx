import { CompanyContainer } from '@company/infra/container';

import { SearchDesk } from './SearchDesk';

export function MakeSearch() {
  const companyController = CompanyContainer.build(
    import.meta.env.VITE_API_URL as string
  );

  return <SearchDesk companyController={companyController} />;
}
