import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryEl } from '../';

let lightbox = new SimpleLightbox('.gallery__item', {
  captionDelay: 250,
  fadeSpeed: 250,
  scrollZoom: false,
});

export const writeImages = (str, newQuery) => {
  if (!str || newQuery) {
    galleryEl.innerHTML = str;
    lightbox.refresh();
    return;
  }

  galleryEl.insertAdjacentHTML('beforeend', str);
  lightbox.refresh();
};
