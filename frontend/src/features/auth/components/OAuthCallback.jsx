import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { setAccessToken } from '../authSlice';
import { useGetMeQuery } from '../authApi';
import { setCredentials } from '../authSlice';

/**
 * Landing page for `${CLIENT_URL}/oauth/callback?accessToken=...` after
 * a successful Google OAuth redirect from the backend. We read the
 * token once from the URL, store it in memory, immediately strip it
 * from the URL bar (avoid it lingering in browser history), then fetch
 * the user profile to populate Redux before routing into the app.
 */
export default function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = searchParams.get('accessToken');

  useEffect(() => {
    if (token) {
      dispatch(setAccessToken(token));
      window.history.replaceState({}, '', '/oauth/callback');
    } else {
      navigate('/login?error=oauth');
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const { data, isSuccess } = useGetMeQuery(undefined, { skip: !token });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setCredentials({ user: data.data.user, accessToken: token }));
      navigate('/dashboard');
    }
  }, [isSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  return <p className="text-center mt-10">Signing you in...</p>;
}
