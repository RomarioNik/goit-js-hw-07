import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');

addGalleryToHtml(galleryContainer);

galleryContainer.addEventListener('click', handleClickImage);

function createGallery(arr) {
  return arr
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
                <a class="gallery__link" href="${original}">
                    <img
                    class="gallery__image"
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

function handleClickImage(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  const instance = basicLightbox.create(`
	<img src="${evt.target.dataset.source}" width="800" height="600">
`);

  instance.show();

  const handleCloseWindowEsc = evt => {
    if (evt.code !== 'Escape') {
      return;
    }
    instance.close();
    document.removeEventListener('keydown', handleCloseWindowEsc);
  };

  document.addEventListener('keydown', handleCloseWindowEsc);
}
