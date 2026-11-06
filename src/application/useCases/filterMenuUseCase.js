import { CATEGORY_ALL } from '../../domain/entities/Menu';

export const filterMenu = (menuList = [], keyword = '', kategori = CATEGORY_ALL) => {
  const normalizedKeyword = keyword.trim().toLowerCase();
  const isCategoryAll = !kategori || kategori === CATEGORY_ALL;

  return menuList.filter((item) => {
    const matchesKeyword =
      normalizedKeyword === '' ||
      item.nama.toLowerCase().includes(normalizedKeyword);

    const matchesCategory =
      isCategoryAll ||
      item.kategori.toLowerCase() === kategori.toLowerCase();

    return matchesKeyword && matchesCategory;
  });
};

export const extractCategories = (menuList = []) => {
  const categorySet = new Set(
    menuList.map((item) => item.kategori).filter(Boolean)
  );
  return [CATEGORY_ALL, ...Array.from(categorySet)];
};
