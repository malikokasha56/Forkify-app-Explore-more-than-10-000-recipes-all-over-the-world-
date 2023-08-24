import View from "./view.js";
import icons from '../../img/icons.svg'
import preViewView from "./preViewView.js";

class BookMarkView extends View{
    _parentEl = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmark yet. Find a nice recipe and add it to bookmark ;)'
    _successMessage = '';

    _generateMarkUp(){
        return this._data.map(result => preViewView.render(result , false)).join('')
    }

    addHandlerBookMark(handler){
        window.addEventListener('load' , handler)
    }
}

export default new BookMarkView();