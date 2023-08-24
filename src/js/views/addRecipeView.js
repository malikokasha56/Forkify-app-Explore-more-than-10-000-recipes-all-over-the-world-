import View from "./view.js";
import icons from '../../img/icons.svg'
import {MODEL_CLOSE_TIME} from'../config.js'


class PaginationView extends View{
    _parentEl = document.querySelector('.upload');
    _successMessage = 'Recipe was successfully uploaded ;)'

    _window = document.querySelector('.add-recipe-window')
    _overlay = document.querySelector('.overlay')
    _btnOpen = document.querySelector('.nav__btn--add-recipe')
    _btnClose = document.querySelector('.btn--close-modal')

    constructor(){
        super()
        this._addHandlerShowWindow()
        this._addHandlerCloseWindow()
    }

    toggleWindow(){
        this._overlay.classList.toggle('hidden')
        this._window.classList.toggle('hidden')
    }

    _addHandlerShowWindow(){

        this._btnOpen.addEventListener('click' ,this.toggleWindow.bind(this) )
    }

    _addHandlerCloseWindow(){
        [this._btnClose,this._overlay].forEach(ele => ele.addEventListener('click' ,this.toggleWindow.bind(this)))
    }

    addHandlerUpload(handler){
        this._parentEl.addEventListener('submit' , function(e){
            e.preventDefault();
            const dataArr = [...new FormData(this)]
            const data = Object.fromEntries(dataArr)
            handler(data)
        })
    }

    _regenartingWindow(){
        setTimeout(() => {
            this._restoreMarkup()
          }, MODEL_CLOSE_TIME*1000)
    }

    _restoreMarkup(){
        this._clearParentEl();
        const markUp = `
        <div class="upload__column">
        <h3 class="upload__heading">Recipe data</h3>
        <label>Title</label>
        <input value="TEST23" required name="title" type="text" />
        <label>URL</label>
        <input value="TEST23" required name="sourceUrl" type="text" />
        <label>Image URL</label>
        <input value="TEST23" required name="image" type="text" />
        <label>Publisher</label>
        <input value="TEST23" required name="publisher" type="text" />
        <label>Prep time</label>
        <input value="23" required name="cookingTime" type="number" />
        <label>Servings</label>
        <input value="23" required name="servings" type="number" />
      </div>

      <div class="upload__column">
        <h3 class="upload__heading">Ingredients</h3>
        <label>Ingredient 1</label>
        <input
          value="0.5,kg,Rice"
          type="text"
          required
          name="ingredient-1"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 2</label>
        <input
          value="1,,Avocado"
          type="text"
          name="ingredient-2"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 3</label>
        <input
          value=",,salt"
          type="text"
          name="ingredient-3"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 4</label>
        <input
          type="text"
          name="ingredient-4"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 5</label>
        <input
          type="text"
          name="ingredient-5"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 6</label>
        <input
          type="text"
          name="ingredient-6"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
      </div>

      <button class="btn upload__btn">
        <svg>
          <use href="src/img/icons.svg#icon-upload-cloud"></use>
        </svg>
        <span>Upload</span>
      </button>
        `
        this._parentEl.insertAdjacentHTML('afterbegin', markUp)
    }

    _generateMarkUp(){
    }

}

export default new PaginationView()