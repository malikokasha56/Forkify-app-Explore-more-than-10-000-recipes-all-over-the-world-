import icons from '../../img/icons.svg'

export default class View{

    _data;
    
    /**
     * 
     * @param {Object | Object[]} data Recives an array or object (e.g. recipe) 
     * @param {Boolean} [render=true] If false, make string to return from function 
     * @returns {undefined | String} A markup string is returned if render is false
     * @this {object} View instance
     * @author Malik Okasha
     */

    render(data, render = true){
        if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError()
        this._data = data
        const markup = this._generateMarkUp();
        if(!render) return markup
        this._clearParentEl()
        this._parentEl.insertAdjacentHTML('afterbegin' , markup)
    }
    
    update(data){
        this._data = data
        const newMarkup = this._generateMarkUp();
        const newDom = document.createRange().createContextualFragment(newMarkup)
        const newElements = Array.from(newDom.querySelectorAll('*'))
        const currElements = Array.from(this._parentEl.querySelectorAll('*'))

        newElements.forEach((newEl, i) => {
            const currEl = currElements[i]

            if(!newEl.isEqualNode(currEl) && newEl.firstChild?.nodeValue.trim() !== ''){
                currEl.textContent = newEl.textContent
            }
            
            if(!newEl.isEqualNode(currEl)){
                Array.from(newEl.attributes).forEach((newEle) => {
                    currEl.setAttribute(newEle.name , newEle.value)
                })
            }
        })


    }

    _clearParentEl (){
        this._parentEl.innerHTML = ''

    }
    
    renderSpinner (){
        const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
          </div>
          `;
          
          this._clearParentEl()
        this._parentEl.insertAdjacentHTML('afterbegin', markup)
      }
    
    renderError(message = this._errorMessage){
      const markup = `
            <div class="error">
            <div>
              <svg>
              <use href="${icons}.svg#icon-alert-triangle"></use>
              </svg>
              </div>
              <p>${message}</p>
              </div>
              `;
              this._clearParentEl();
          this._parentEl.insertAdjacentHTML('afterbegin', markup)
          
        }
    
        renderMessage(message = this._successMessage){
          const markup = `
          <div class="message">
          <div>
              <svg>
                <use href="${icons}.svg#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
            </div>
          `;
          this._clearParentEl();
          this._parentEl.insertAdjacentHTML('afterbegin', markup)
          
        }
        
}