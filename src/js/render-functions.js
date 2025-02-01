export function createMarkup(arr) {
  return arr
    .map(el => {
      return `<li class="gallery-list">
        <a class="gallery-link" href="${el.largeImageURL}">
          <img src="${el.webformatURL}" alt="${el.tags}" title="${el.tags}">
        </a>
        <div >
          <ul class="text-list">
            <li class="text-item"><p class="text"><span class="text-span">Likes</span><span class="link-span">${el.likes}</span></p></li>
            <li class="text-item"><p class="text"><span class="text-span">Views</span><span class="link-span">${el.views}</span></p></li>
            <li class="text-item"><p class="text"><span class="text-span">Comments</span><span class="link-span">${el.comments}</span></p></li>
            <li class="text-item"><p class="text"><span class="text-span">Downloads</span><span class="link-span">${el.downloads}</span></p></li>
          </ul>
        </div>
      </li>`;
    })
    .join('');
}