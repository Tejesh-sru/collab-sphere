import { useState, useEffect } from 'react';

/**
 * Custom hook for async operations with loading and error states
 * @returns {Object} { data, loading, error, execute }
 */
export function useAsync() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (asyncFunction) => {
    try {
      setLoading(true);
      setError(null);
      const result = await asyncFunction();
      setData(result);
      return { success: true, data: result };
    } catch (err) {
      setError(err.message || 'An error occurred');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, execute };
}
