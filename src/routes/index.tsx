import { MakeHome } from '@pages/Home';
import { MakeRegisterEvaluation } from '@pages/RegisterEvaluation';
import { MakeSearch } from '@pages/Search';
import { createBrowserRouter } from 'react-router-dom';

import { Landing } from '../ui/pages/Landing/Landing';
import { MakeSignIn } from '../ui/pages/SignIn';
import { MakeSignUp } from '../ui/pages/SignUp';

export const mobileRouter = createBrowserRouter([
  {
    path: '/',
    element: <Landing />
  },
  {
    path: '/sign-in',
    element: <MakeSignIn />
  },
  {
    path: '/sign-up',
    element: <MakeSignUp />
  }
]);

export const desktopRouter = createBrowserRouter([
  {
    path: '/',
    element: <MakeHome />
  },
  {
    path: '/companies/search',
    element: <MakeSearch />
  },
  {
    path: '/contribute',
    element: <MakeRegisterEvaluation />
  },
  {
    path: '/sign-in',
    element: <MakeSignIn />
  },
  {
    path: '/sign-up',
    element: <MakeSignUp />
  }
]);
