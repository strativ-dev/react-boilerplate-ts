import { Outlet } from 'react-router-dom';

import { withoutAuth } from '@/components/Hoc/withoutAuth';

const AuthenticationLayout = withoutAuth(() => {
  return <Outlet />;
});

export default AuthenticationLayout;
