import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

/**
 * Guards routes that require an authenticated user. Reads auth state
 * from Redux (populated either by LoginForm/SignupForm or by the
 * silent-refresh-on-app-boot flow in App.jsx) rather than checking a
 * token in localStorage — there is none.
 */
export default function ProtectedRoute() {
  const { status } = useAppSelector((state) => state.auth);

  if (status === 'idle' || status === 'authenticating') {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (status !== 'authenticated') {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
