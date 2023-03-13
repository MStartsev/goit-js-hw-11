import { fetchImages } from './fetchImages';
import { writeImages } from './writeImages';
import { createImageCard } from './createImageCard';

export const getData = async (query, page, newQuery = false) => {
  try {
    const answer = await fetchImages(query, page, newQuery);
    if (!answer) {
      writeImages('');
      return;
    }

    createImageCard(answer, page, newQuery);
  } catch (error) {
    console.error(error);
  }
};
