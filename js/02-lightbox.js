import { galleryItems } from './gallery-items.js';
// Change code below this line

const lightboxContainer = document.querySelector('.gallery');

addLightboxGallery(lightboxContainer);

function addLightboxGallery(container) {
  container.innerHTML = createLightboxGallery(galleryItems);
}

function createLightboxGallery(arr) {
  return arr
    .map(({ preview, original, description }) => {
      return `<li>
            <a class="gallery__item" href="${original}">
                <img class="gallery__image" loading="lazy" src="${preview}" alt="${description}" />
            </a>
        </li>`;
    })
    .join('');
}

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

lightboxContainer.addEventListener('click', handleShowImage);

function handleShowImage() {
  lightbox.on('show.simplelightbox');
}

console.log(galleryItems);
