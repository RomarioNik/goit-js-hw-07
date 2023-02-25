import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');

addGalleryToHtml(galleryContainer);

function createGallery(arr) {
  return arr
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
                <a class="gallery__link" href="${original}">
                    <img
                    class="gallery__image"
                    loading="lazy"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                    />
                </a>
                </div>`;
    })
    .join('');
}

function addGalleryToHtml(container) {
  container.innerHTML = createGallery(galleryItems);
}

galleryContainer.addEventListener('click', handleLargeImage);

function handleLargeImage(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  const instance = basicLightbox.create(`
	<img src="${evt.target.dataset.source}" width="800" height="600">
`);

  instance.show();

  document.addEventListener(
    'keydown',
    evt => {
      if (evt.code === 'Escape') {
        instance.close();
      }
    },
    { once: true }
  );
}
