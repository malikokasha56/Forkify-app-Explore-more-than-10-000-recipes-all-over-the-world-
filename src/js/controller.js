import 'core-js/stable'
import 'regenerator-runtime/runtime'
import icons from 'url:../img/icons.svg'
import * as model from './model.js' 
import {MODEL_CLOSE_TIME} from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bobookMarkView from './views/bookMarkView.js';
import paginationView from './views/paginationView.js';
import { async } from 'regenerator-runtime';
import bookMarkView from './views/bookMarkView.js';
import addRecipeView from './views/addRecipeView.js';


///////////////////////////////////////

const controlRecipe  = async function(){
  try {

    const hashId = window.location.hash.slice(1)
    if(!hashId) return;

    resultsView.update(model.getSearchResultPage())
    bookMarkView.update(model.state.bookMarks)
    //Spinner rendring
    recipeView.renderSpinner()
    
    // 1) loading recipe from api
    await model.loadRecipe(hashId);
    // 2) Rendering recipe
    recipeView.render(model.state.recipe);

  }catch (error) {
    console.error(error)
    recipeView.renderError();
  }

};

const controlSearchResults = async function(){
  try{

    resultsView.renderSpinner()
    const query = searchView.getQuery();
    await model.loadSearchResults(query);
    
    // resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultPage())

    paginationView.render(model.state.search)
  }
  catch (error) {
    console.error(error)
  }
}

const controlPagination = function(gotoPage){
  resultsView.render(model.getSearchResultPage(gotoPage))
  paginationView.render(model.state.search)
}

const controlServings = function(servings){
  //UPDATE RECIPE SERVINGS(in state)
  model.updateServings(servings)
  // UPDATE RECIPE VIEW
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
}

const controlAddBookMark = function(){
  if(!model.state.recipe.bookMarked){
    model.addBookMark(model.state.recipe);
  }
  else{
    model.deleteBookmark(model.state.recipe.id);
  }
  recipeView.update(model.state.recipe)
  bookMarkView.render(model.state.bookMarks)
}

const controlBookMarksLoad = function(){
  bookMarkView.render(model.state.bookMarks)
}

const controlAddRecipe = async function(newRecipe){
  try{
    addRecipeView.renderSpinner()
    await model.uploadRecipe(newRecipe)
    
    addRecipeView.renderMessage()
    
    addRecipeView._regenartingWindow()

    bookMarkView.render(model.state.bookMarks)
    window.history.pushState(null , '' , `#${model.state.recipe.id}`)

    recipeView.render(model.state.recipe)


    console.log(model.state.recipe)
  }
  catch(err){
    console.error(err)
    addRecipeView.renderError(err.message)
   addRecipeView._regenartingWindow()
    // addRecipeView._restoreMarkup()
  }

}

const welcome = function(){
  console.log('Welcome')
}

const init = function(){
  bookMarkView.addHandlerBookMark(controlBookMarksLoad)
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookMark(controlAddBookMark)
  addRecipeView.addHandlerUpload(controlAddRecipe)
  welcome()
}
init()



