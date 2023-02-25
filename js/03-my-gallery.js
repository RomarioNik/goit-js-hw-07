import { images } from './my-gallery.js';

const gallery = document.querySelector('.gallery');

// создал объект нужного формата для урока
const newArray = images.map(el => {
  return {
    preview: el.previewURL.replace('_150.jpg', '__340.jpg'),
    original: el.previewURL.replace('_150.jpg', '_1280.jpg'),
    description: el.tags,
  };
});

addMyGallery(gallery);

function createMyGallery(arr) {
  return arr
    .map(({ original, preview, description }) => {
      return `<li>
                <a class="gallery__item" href="${original}">
                    <img class="gallery__image lazyload" loading="lazy" data-src="${preview}" alt="${description}" />
                </a>
            </li>`;
    })
    .join('');
}

function addMyGallery(container) {
  container.innerHTML = createMyGallery(newArray);
}

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

gallery.addEventListener('click', handleShowImage);

function handleShowImage() {
  lightbox.on('show.simplelightbox');
}

if ('loading' in HTMLImageElement.prototype) {
  addSrcToImages();
} else {
  addLazyLoadingScript();
}

function addSrcToImages() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(el => (el.src = el.dataset.src));
}

function addLazyLoadingScript() {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  script.integrity =
    'sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==';
  script.crossorigin = 'anonymous';
  script.referrerpolicy = 'no-referrer';

  document.body.appendChild(script);
}
