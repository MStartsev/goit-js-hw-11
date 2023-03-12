import SimpleLightbox from 'simplelightbox';
import { galleryEl, pages } from '../';
import { fetchImages, per_page } from './fetchImages';

import 'simplelightbox/dist/simple-lightbox.min.css';

let previousPage = 1;

let lightbox = new SimpleLightbox('.gallery__item', {
  captionDelay: 250,
  fadeSpeed: 250,
  scrollZoom: false,
});

export const createImageCard = (answer, page) => {
  if (page === 1) pages = Math.ceil(answer.totalHits / per_page);

  const hits = answer.hits;

  const createGallery = ({ gallery, galleryName }) =>
    (gallery.innerHTML = hits.reduce(
      (
        arr,
        { webformatURL, largeImageURL, tags, likes, views, comments, downloads }
      ) =>
        `${arr}
        <a class='${galleryName}__item ${galleryName}__link' href='${largeImageURL}'>
            <img class='${galleryName}__image' src='${webformatURL}' alt='${tags}' loading="lazy"  width='240px'>
             <div class="info">
          <p class="info-item">
            <b>Likes<br>${likes}</br></b>
          </p>
          <p class="info-item">
            <b>Views<br>${views}</br></b>
          </p>
          <p class="info-item">
            <b>Comments<br>${comments}</br></b>
          </p>
          <p class="info-item">
            <b>Downloads<br>${downloads}</br></b>
          </p>
        </div>
      </div>
        </a>
    `,
      ''
    ));

  createGallery({ gallery: galleryEl, galleryName: 'gallery' });
  lightbox.refresh();
};
