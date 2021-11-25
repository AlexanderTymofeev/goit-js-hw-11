'use strict';

const API_KEY = '24502852-6a795cd657d1b023a90d357f4';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = query => {
  let page = Number(localStorage.getItem('page'));
  page += 1;

  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`,
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
};
