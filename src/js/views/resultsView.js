import View from "./view.js";
import icons from '../../img/icons.svg'
import preViewView from "./preViewView.js";


class ResultView extends View{
    _parentEl = document.querySelector('.results');
    _errorMessage = 'No recipes found for your query. Please try again ;)'
    _successMessage = '';

    _generateMarkUp(){
        return this._data.map(result => preViewView.render(result , false)).join('')
    }
}

export default new ResultView();