import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useLogoutMutation } from '../../features/auth/authApi';
import { clearAuth } from '../../features/auth/authSlice';

export default function Navbar() {
  const { user, status } = useAppSelector((state) => state.auth);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    dispatch(clearAuth());
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b bg-white">
      <Link to="/" className="font-bold text-lg text-blue-600">
        CollabSphere
      </Link>
      <div className="flex items-center gap-4">
        {status === 'authenticated' ? (
          <>
            <span className="text-sm text-gray-600">{user?.name}</span>
            <button onClick={handleLogout} className="text-sm text-red-600">
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm">Log in</Link>
            <Link to="/signup" className="text-sm">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
