import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../authApi';

export default function SignupForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '', college: '' });
  const [signup, { isLoading, error }] = useSignupMutation();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signup(form);
    if ('data' in result) {
      navigate('/login', { state: { justSignedUp: true } });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Create your account</h1>

      <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} required className="border rounded px-3 py-2" />
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="border rounded px-3 py-2" />
      <input name="college" placeholder="College (optional)" value={form.college} onChange={handleChange} className="border rounded px-3 py-2" />
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="border rounded px-3 py-2" />

      {error && (
        <ul className="text-red-600 text-sm list-disc list-inside">
          {(error.errors || [{ message: error.message || 'Signup failed' }]).map((e, i) => (
            <li key={i}>{e.message}</li>
          ))}
        </ul>
      )}

      <button type="submit" disabled={isLoading} className="bg-blue-600 text-white rounded px-3 py-2 disabled:opacity-50">
        {isLoading ? 'Creating account...' : 'Sign up'}
      </button>
    </form>
  );
}
