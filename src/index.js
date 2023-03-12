import { fetchImages, per_page } from './js/fetchImages';
import { createImageCard } from './js/createImageCard';

import 'notiflix/dist/notiflix-3.2.6.min.css';

const searchFormEl = document.querySelector('.search-form');
export const galleryEl = document.querySelector('.gallery');

let activePage = 1;
export let pages = 1;

const writeImages = str => {
  if (!str) {
    galleryEl.innerHTML = str;
    return;
  }
};

const getData = async (query, page) => {
  try {
    const answer = await fetchImages(query, page);
    if (!answer) {
      writeImages('');
      return;
    }

    createImageCard(answer, page);
  } catch (error) {
    console.error(error);
  }
};

const onSubmit = e => {
  e.preventDefault();
  const value = e.target.text.value.trim();
  e.target.text.value = '';
  if (!value) return;
  console.log(value);
  activePage = 1;

  value ? getData(value, activePage) : writeImages('');
};

searchFormEl.addEventListener('submit', onSubmit);

/*  
<ul class="list">
  <li class="item">1</li>
</ul>

.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100px; width: 100px;
  margin: 0; padding: 10px;
  overflow-y: scroll;
  font-size: 20px;
  background-color: gold;
}
.list::-webkit-scrollbar {
  width: 0;
}

const list = document.querySelector('.list');
list.scrollTop = 1;
list.addEventListener('scroll', function(ev) {
  let items = this.querySelectorAll('.item');
  if (parseInt(this.scrollTop) == 0) {
    this.scrollTop = items[items.length - 1].clientHeight;
    this.prepend(items[items.length - 1]);
    this.scrollTop = 1;
  } else if (this.scrollTop > this.scrollHeight - this.clientHeight - 1) {
    this.append(items[0]);
  }
  return false;
});


*/
