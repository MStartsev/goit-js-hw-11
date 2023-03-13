import { activePage, reActivePage } from './infiniteScrolling';
import { getData } from './getData';

export let query = '';

export const onSubmit = e => {
  e.preventDefault();
  const value = e.target.text.value.trim();
  e.target.text.value = '';
  if (!value) return;

  reActivePage();
  getData(value, activePage, true);
  query = value;
};
