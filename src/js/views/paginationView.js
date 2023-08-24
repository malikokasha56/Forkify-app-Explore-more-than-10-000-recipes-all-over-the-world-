import View from "./view.js";
import icons from '../../img/icons.svg'


class PaginationView extends View{
    _parentEl = document.querySelector('.pagination');
    _currPage;

    _generateMarkUp(){
        this._currPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage)
        console.log(this._currPage)
        
        console.log(this._data)

        //Page 1, other pages
        if(this._currPage === 1 && numPages>1){
            return this._generateMarkUpBtnRight()
        }

        //Other Pages
        if(this._currPage < numPages){
            return this._generateMarkUpBtnLeft() + this._generateMarkUpBtnRight()
        }

        //Last page
        if(this._currPage === numPages && numPages > 1){
            return this._generateMarkUpBtnLeft()
            }

        //Only Page 1,
        return ''
    }

    _generateMarkUpBtnRight(){
        return `
        <button data-goto= "${this._currPage+1}" class="btn--inline pagination__btn--next">
            <span>Page ${this._currPage+1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `
    }

    _generateMarkUpBtnLeft(){
        return `
        <button data-goto="${this._currPage-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._currPage -1}</span>
        </button>
        `
    }

    addHandlerClick(handler){
        this._parentEl.addEventListener('click' , function(e){
            const btn = e.target.closest('.btn--inline')
            
            if(!btn) return;
            const gotoPage = +btn.dataset.goto
            handler(gotoPage);
        })

    }

}

export default new PaginationView()