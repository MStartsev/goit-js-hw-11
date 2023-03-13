import { infiniteScrolling } from './infiniteScrolling';
import { per_page } from './fetchImages';
import { writeImages } from './writeImages';

export let totalPages = 1;

export const createImageCard = (answer, page, newQuery) => {
  if (newQuery) {
    totalPages = Math.ceil(answer.totalHits / per_page);
  }

  const hits = answer.hits;

  const createGallery = ({ hits, galleryName, newQuery }) =>
    writeImages(
      hits.reduce(
        (
          arr,
          {
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
          }
        ) =>
          `${arr}
        <a class='${galleryName}__item ${galleryName}__link' href='${largeImageURL}'>
            <img class='${galleryName}__image' src='${webformatURL}' alt='${tags}' loading="lazy"  width='240px'>
             <div class="info">
          <p class="info__item">
            <b>Likes<br>${likes}</br></b>
          </p>
          <p class="info__item">
            <b>Views<br>${views}</br></b>
          </p>
          <p class="info__item">
            <b>Comments<br>${comments}</br></b>
          </p>
          <p class="info__item">
            <b>Downloads<br>${downloads}</br></b>
          </p>
        </div>
      </div>
        </a>
    `,
        ''
      ),
      newQuery
    );

  createGallery({ hits: hits, galleryName: 'gallery', newQuery: newQuery });

  infiniteScrolling('.gallery__item');
};
