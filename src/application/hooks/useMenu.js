import { useState, useEffect, useCallback } from 'react';
import { fetchMenuList } from '../../infrastructure/repositories/menuRepository';

export const useMenu = () => {
  const [menu, setMenu] = useState([]);
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');

  const loadMenu = useCallback(async () => {
    setStatus('loading');
    setErrorMessage('');
    try {
      const data = await fetchMenuList();
      setMenu(data);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Gagal memuat data menu kantin. Silakan coba lagi.'
      );
    }
  }, []);

  useEffect(() => {
    loadMenu();
  }, [loadMenu]);

  return {
    menu,
    status,
    errorMessage,
    retry: loadMenu,
  };
};
