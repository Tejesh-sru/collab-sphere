import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useAppDispatch } from './app/hooks';
import { setCredentials, clearAuth } from './features/auth/authSlice';
import axiosInstance from './services/axiosInterceptor';
import { useGetMeQuery } from './features/auth/authApi';

import AppLayout from './components/layout/AppLayout';
import ProtectedRoute from './routes/ProtectedRoute';

import LoginForm from './features/auth/components/LoginForm';
import SignupForm from './features/auth/components/SignupForm';
import ForgotPasswordForm from './features/auth/components/ForgotPasswordForm';
import OAuthCallback from './features/auth/components/OAuthCallback';

/**
 * On every fresh page load there's no accessToken in memory yet (it's
 * never persisted), so we attempt a silent refresh using the httpOnly
 * cookie before deciding whether to show the login screen. This is
 * what makes a hard refresh NOT log the user out.
 */
function useBootstrapAuth() {
  const dispatch = useAppDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.post('/auth/refresh');
        const accessToken = data.data.accessToken;
        // Temporarily set the token so the immediate /auth/me call below is authenticated.
        dispatch({ type: 'auth/setAccessToken', payload: accessToken });
        const me = await axiosInstance.get('/auth/me');
        dispatch(setCredentials({ user: me.data.data.user, accessToken }));
      } catch {
        dispatch(clearAuth());
      } finally {
        setReady(true);
      }
    })();
  }, [dispatch]);

  return ready;
}

export default function App() {
  const ready = useBootstrapAuth();

  if (!ready) return <p className="text-center mt-10">Loading CollabSphere...</p>;

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<p>Dashboard - build the Feed module next.</p>} />
          {/* Additional protected routes are added here as each feature is built:
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/messages" element={<MessagingPage />} />
              <Route path="/mentorship" element={<MentorshipPage />} />
              <Route path="/projects/:id" element={<ProjectPage />} /> */}
        </Route>
      </Route>
    </Routes>
  );
}
