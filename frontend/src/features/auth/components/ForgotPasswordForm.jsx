import { useState } from 'react';
import axiosInstance from '../../../services/axiosInstance';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post('/auth/forgot-password', { email });
    } finally {
      setLoading(false);
      setSent(true); // always show the same message - don't leak whether the email exists
    }
  };

  if (sent) {
    return <p>If an account with that email exists, a reset link has been sent.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Reset your password</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border rounded px-3 py-2"
      />
      <button type="submit" disabled={loading} className="bg-blue-600 text-white rounded px-3 py-2 disabled:opacity-50">
        {loading ? 'Sending...' : 'Send reset link'}
      </button>
    </form>
  );
}
