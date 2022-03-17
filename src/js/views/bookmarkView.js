import View from './view.js';
import previewView from './previewView.js';

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks');
  _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it :)`;
  _message = '';

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
  // Handler to load all bookmarks in the
  addHandlerBookmark(handler) {
    window.addEventListener('load', handler);
  }
}
export default new BookmarkView();
