import throttle from 'lodash.throttle';
import { galleryEl } from '../';
import { totalPages } from './createImageCard';
import { getData } from './getData';
import { query } from './onSubmit';
import { per_page } from './fetchImages';

export let activePage = 1;
export const reActivePage = () => (activePage = 1);

export const infiniteScrolling = element => {
  if (totalPages < 2) return;

  const items = galleryEl.querySelectorAll(element);

  let itemCount = items.length;
  const itemHeight = items[0].clientHeight;
  const windowHeight = window.innerHeight;

  function isLastItemVisible() {
    const lastItem = items[itemCount - 1];
    const lastItemOffsetTop = lastItem.offsetTop;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return lastItemOffsetTop - scrollTop <= windowHeight + itemHeight * 2;
  }

  function addItems() {
    console.log(totalPages, activePage);
    if (activePage >= totalPages) activePage = 1;
    getData(query, activePage);
  }
  const addNext = () => {
    if (isLastItemVisible()) {
      activePage++;
      window.removeEventListener('scroll', handleScroll);
      addItems();

      removeFirst40ElementsFromDOM();
    }
  };

  const handleScroll = throttle(addNext, 1000);

  window.addEventListener('scroll', handleScroll);
};

function removeFirst40ElementsFromDOM() {
  const listItems = document.querySelectorAll('.gallery__item');

  for (let i = 0; i < 40 && listItems.length > per_page; i++) {
    listItems[i].remove();
  }
}
