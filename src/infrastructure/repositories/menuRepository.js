import { isValidMenuItem } from '../../domain/entities/Menu';

export const DATA_ENDPOINT = '/data/kantin.json';

export const fetchMenuList = async (endpoint = DATA_ENDPOINT) => {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-cache',
    });

    if (!response.ok) {
      throw new Error(`Gagal mengambil data menu (HTTP ${response.status})`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Format data menu tidak valid (harus array)');
    }

    const validItems = data.filter(isValidMenuItem);
    if (validItems.length === 0 && data.length > 0) {
      throw new Error('Data menu tidak sesuai dengan format yang diharapkan');
    }

    return validItems;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Terjadi kesalahan saat memuat data kantin.');
  }
};
