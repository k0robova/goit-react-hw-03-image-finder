import axios from 'axios';

export const fetchImagesBySearch = async (searchQuery, page) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '39941682-76fa8d5585fc0f3711900558e';

  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontale',
    safesearch: true,
    page,
    per_page: 12,
  });
  try {
    const { data } = await axios.get(`${BASE_URL}?${searchParams}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
};
