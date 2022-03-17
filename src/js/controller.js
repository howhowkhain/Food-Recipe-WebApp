import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { timeOut } from './helpers.js';
import { MODAL_CLOSE_SEC } from './config.js';

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

    // 0) Updating the search results view to mark the selected recipe
    resultsView.update(model.searchResultsPerPage());
    // 1) Update the bookmark view to mark the selected bookmarked recipe
    bookmarkView.update(model.state.bookmarks);
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
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();
    // 2) Load search results
    await model.loadSearchResults(query);
    // 3) Render results on the console
    resultsView.render(model.searchResultsPerPage());
    // 4) Render pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  // 3) Render NEW results on the console;
  resultsView.render(model.searchResultsPerPage(goToPage));
  // 4) Render pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateRecipeServings(newServings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) If a recipe is bookmarked will remove it from bookmarks and if otherwise will add it
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);
  // 2) Update the recipe view due to change of the 'bookmark' icon state
  recipeView.update(model.state.recipe);
  console.log(model.state.bookmarks);
  // 3) Render the bookmark
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();
    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Close form window
    setTimeout(function () {
      addRecipeView.toogleWindow();
    }, MODAL_CLOSE_SEC * 1000);

    // Render bookmarks view
    bookmarkView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (err) {
    console.error(`${err}---`);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarkView.addHandlerBookmark(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
