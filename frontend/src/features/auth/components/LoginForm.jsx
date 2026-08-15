import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../authApi';
import { useAppDispatch } from '../../../app/hooks';
import { setCredentials } from '../authSlice';

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form);
    if ('data' in result) {
      const { user, accessToken } = result.data.data;
      dispatch(setCredentials({ user, accessToken }));
      navigate('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Log in to CollabSphere</h1>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="border rounded px-3 py-2"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="border rounded px-3 py-2"
      />

      {error && (
        <p className="text-red-600 text-sm">
          {error.message || 'Invalid email or password'}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white rounded px-3 py-2 disabled:opacity-50"
      >
        {isLoading ? 'Logging in...' : 'Log in'}
      </button>
    </form>
  );
}
