'use strict';

import './sass/main.scss';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages } from './pixabay-api';
import galleryCardsTemplate from './templates/gallery-card.hbs';

const searchFormEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');

const loadMoreBtn = document.querySelector('.load-more');

const clearGallery = () => {
  galleryEl.innerHTML = '';
};

const showLoadMoreBtn = () => {
  loadMoreBtn.classList.remove('is-hidden');
};

const onFormSubmit = async event => {
  event.preventDefault();

  localStorage.setItem('page', '1');

  const query = event.target.elements['searchQuery'].value;
  localStorage.setItem('query', query);
  clearGallery();

  try {
    const { data } = await fetchImages(query);

    showLoadMoreBtn();
    if (data.hits.length === 0) {
      Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
      loadMoreBtn.classList.add('is-hidden');
    } else if (data.hits.length < 40) {
      loadMoreBtn.classList.add('is-hidden');
    }

    galleryEl.insertAdjacentHTML('beforeend', galleryCardsTemplate(data.hits));
    let pageIterattor = Number(localStorage.getItem('page')) + 1;
    // console.log(pageIterattor);
    localStorage.setItem('page', JSON.stringify(pageIterattor));
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

const onLoadMoreBtnClick = async () => {
  const query = localStorage.getItem('query');

  try {
    const { data } = await fetchImages(query);

    galleryEl.insertAdjacentHTML('beforeend', galleryCardsTemplate(data.hits));

    let pageIterattor = Number(localStorage.getItem('page'));
    // console.log(pageIterattor);

    if (data.totalHits <= pageIterattor * 40) {
      loadMoreBtn.classList.add('is-hidden');
      Notify.failure(`We're sorry, but you've reached the end of search results.`);
    }
    pageIterattor += 1;
    localStorage.setItem('page', JSON.stringify(pageIterattor));
  } catch (err) {
    console.log(err);
  }
};

searchFormEl.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
