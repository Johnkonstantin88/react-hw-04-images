export const getPictures = (searchValue, page = 1) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '42027897-ca60981f5971518ff8fefcb8b';
  const picturesCountQuery = 12;
  const params = new URLSearchParams({
    key: API_KEY,
    q: `${searchValue}`,
    image_type: 'photo',
    orientation: 'horizontal',
    page: page,
    per_page: `${picturesCountQuery}`,
  });

  return fetch(`${BASE_URL}?${params}`);
};
