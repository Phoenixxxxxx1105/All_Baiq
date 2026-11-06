import { useState, useMemo } from 'react';
import { CATEGORY_ALL } from '../../domain/entities/Menu';
import { filterMenu, extractCategories } from '../useCases/filterMenuUseCase';

export const useMenuFilter = (menuList = []) => {
  const [keyword, setKeyword] = useState('');
  const [kategori, setKategori] = useState(CATEGORY_ALL);

  const categories = useMemo(() => {
    return extractCategories(menuList);
  }, [menuList]);

  const filteredMenu = useMemo(() => {
    return filterMenu(menuList, keyword, kategori);
  }, [menuList, keyword, kategori]);

  return {
    keyword,
    setKeyword,
    kategori,
    setKategori,
    categories,
    filteredMenu,
    jumlahHasil: filteredMenu.length,
  };
};
