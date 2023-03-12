import axios from 'axios';
import { Notify } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const API_KEY = '34327066-9eab2ae5edaa4607329818102';
const BASE_URL = 'https://pixabay.com/api/';

export const per_page = 40;

export const fetchImages = async (query = '', page = 1) => {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: per_page,
  });

  try {
    const response = await axios.get(`${BASE_URL}?${searchParams}`);
    if (!response.data.total) throw new Error(response.statusText);
    if (page === 1)
      Notify.success(`Hooray! We found ${response.data.total} images for you.`);
    return response.data;
  } catch (e) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return [];
  }
};
