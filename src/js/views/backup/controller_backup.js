// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
// import * as model from './model.js';

// import recipeView from './views/recipeView.js';
// import searchView from './views/searchView.js';
// import resultsView from './views/resultsView.js';
// import paginationView from './views/paginationView.js';

// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
if (module.hot) {
  module.hot.accepted;
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // If no hash detected the default webpage loads
    if (!id) return;
    recipeView.renderSpinner();

    // 1) Load the Recipe
    await model.loadRecipe(id);

    // 2) Render the Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;
    // 2) Load search results
    await model.loadSearchResults(query);
    // 3) Render results on the console
    console.log(model.state.search.results);
    const currentPage = model.state.search.currentPage;
    const totalPages = model.state.search.totalPages;
    resultsView.render(model.searchResultsPerPage(currentPage));
    // 4) Render pagination buttons
    paginationView.render(currentPage, totalPages);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (btnEl) {
  if (btnEl.classList.contains('pagination__btn--prev')) {
    model.state.search.currentPage -= 1;
  }
  if (btnEl.classList.contains('pagination__btn--next')) {
    model.state.search.currentPage += 1;
  }
  // 3) Render results on the console
  const currentPage = model.state.search.currentPage;
  const totalPages = model.state.search.totalPages;
  resultsView.render(model.searchResultsPerPage(currentPage));
  // 4) Render pagingation buttons
  paginationView.render(currentPage, totalPages);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
};
init();
