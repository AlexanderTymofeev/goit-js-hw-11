'use strict';

import './sass/main.scss';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages } from './pixabay-api';
// import { galleryCardsTemplate } from './tamplete';
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

const onFormSubmit = event => {
  event.preventDefault();

  localStorage.setItem('page', '1');

  const query = event.target.elements['searchQuery'].value;
  localStorage.setItem('query', query);
  clearGallery();

  fetchImages(query)
    .then(data => {
      showLoadMoreBtn();
      if (data.hits.length === 0) {
        Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
        loadMoreBtn.classList.add('is-hidden');
      }
      galleryEl.insertAdjacentHTML('beforeend', galleryCardsTemplate(data.hits));
      // console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
};

const onLoadMoreBtnClick = () => {
  const query = localStorage.getItem('query');

  fetchImages(query)
    .then(data => {
      galleryEl.insertAdjacentHTML('beforeend', galleryCardsTemplate(data.hits));
      const pageIterattor = Number(localStorage.getItem('page')) + 1;
      console.log(pageIterattor);
      localStorage.setItem('page', JSON.stringify(pageIterattor));
    })
    .catch(err => {
      console.log(err);
    });
};

// function onEnd() {
//   if (page >= 13) {
//     loadMoreBtn.classList.add('is-hidden');
//     Notify.failure(`!`);
//   }
//   return;
// }

// onEnd();

searchFormEl.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
