import { onSubmit } from './js/onSubmit';

const searchFormEl = document.querySelector('.search-form');
export const galleryEl = document.querySelector('.gallery');
export let activePage = 1;
export const reActivePage = () => (activePage = 1);

searchFormEl.addEventListener('submit', onSubmit);
