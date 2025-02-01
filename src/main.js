import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { createMarkup } from './js/render-functions';
import { getPhotos } from './js/pixabay-api';

const refs = {
  form: document.querySelector('.form'),
  btnSearch: document.querySelector('.btn-search'),
  imgList: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

let lightbox;

refs.form.addEventListener('submit', e => {
  e.preventDefault();

  const input = e.target.elements.text.value.trim();

  if (!input) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  refs.loader.classList.remove('loader--hidden');

  refs.imgList.innerHTML = '';

  getPhotos(input)
    .then(res => {
      if (res.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }
      refs.imgList.innerHTML = createMarkup(res.hits);
      if (lightbox) {
        lightbox.refresh();
      } else {
        lightbox = new SimpleLightbox('.gallery-link', {
          captionsData: 'alt',
          captionDelay: 250,
        });
      }
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      console.error('Fetch error: ', error);
    })
    .finally(() => {
      refs.loader.classList.add('loader--hidden');
    });

  e.currentTarget.reset();
});

window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  loader.classList.add('loader--hidden');
});