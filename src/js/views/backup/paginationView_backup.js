// import View from './view.js';
// import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _currentPage;
  _totalPages;
  prevPage;
  nextPage;
  _parentElement = document.querySelector('.pagination');
  _message = '';

  render(currentPage, totalPages) {
    this._currentPage = currentPage;
    this._totalPages = totalPages;
    this.prevPage = currentPage - 1;
    this.nextPage = currentPage + 1;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  _generateMarkup() {
    // 1) One page only
    if (this._currentPage === 1 && this._totalPages === 1) {
      return;
    }
    // 2) First page and other pages
    if (this._currentPage === 1 && this._currentPage < this._totalPages) {
      return `
      <button class="btn--inline pagination__btn--next">
        <span>${this.nextPage}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }
    // 3) Other pages
    if (this._currentPage < this._totalPages) {
      return `
    <button class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>${this.prevPage}</span>
    </button>
    <button class="btn--inline pagination__btn--next">
      <span>${this.nextPage}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
    // 4) Last page
    return `
    <button class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>${this.prevPage}</span>
    </button>`;
  }
  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);
      handler(btn);
    });
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
}

export default new PaginationView();
