'use strict';

const API_KEY = '24502852-6a795cd657d1b023a90d357f4';
const BASE_URL = 'https://pixabay.com/api/';

import axios from 'axios';

export const fetchImages = async query => {
  let page = Number(localStorage.getItem('page'));

  const result = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`,
  );
  return result;
};
