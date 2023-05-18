import { createBrowserRouter } from 'react-router-dom';

import { Landing } from '../ui/pages/Landing/Landing';
import { MakeSignIn } from '../ui/pages/SignIn';
import { MakeSignUp } from '../ui/pages/SignUp';

export const router = createBrowserRouter([
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
