import { async } from "regenerator-runtime"
import { API_URL, RESULTS_PER_PAGE,KEY } from "./config.js" 
import { AJAX } from "./helpers.js"
export const state = {
    recipe : {},
    search : {
        query : '',
        results : [],
        resultsPerPage : RESULTS_PER_PAGE,
        page:1,

    },
    bookMarks :[]
}

const createObject = function(data){
    let {recipe} = data.data
        return {
            id : recipe.id,
            publisher : recipe.publisher,
            title : recipe.title,
            sourceUrl : recipe.source_url,
            image : recipe.image_url,
            servings : recipe.servings,
            cookingTime : recipe.cooking_time,
            ingredients : recipe.ingredients,
            ...(recipe.key && {key:recipe.key})
        };
}

export const loadRecipe = async function(hashId){
    try{
        const data = await AJAX(`${API_URL}${hashId}?key=${KEY}`);
        //Formatiing the recipe object nicely
        state.recipe = createObject(data)
        if(state.bookMarks.some((bookMark) => bookMark.id === hashId)){
            state.recipe.bookMarked = true;
        }
        else{
            state.recipe.bookMarked = false;
        }
    }
    catch(err){
        console.error(err.message)
        throw err
    }
}

export const loadSearchResults = async function(query){
    try{
        state.search.query = query;
        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
        console.log(data)
        state.search.results = data.data.recipes.map((rec) => {
            return {
                id : rec.id,
                publisher : rec.publisher,
                title : rec.title,
                image : rec.image_url,
                ...(rec.key && {key:rec.key})
            }
        })
        state.search.page = 1;

    }
    catch(err){
        console.error(err.message)
        throw err
    }
}

export const getSearchResultPage = function(page = state.search.page){
    state.search.page = page;
    const start = (page -1)*state.search.resultsPerPage
    const end = page*state.search.resultsPerPage

    return state.search.results.slice(start , end)
}

export const updateServings = function(newServings){
    
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = ing.quantity * newServings/state.recipe.servings 
    });

    state.recipe.servings = newServings;

    console.log(state.recipe)
}

const presistBookMark = () => {
    localStorage.setItem('bookMark' , JSON.stringify(state.bookMarks))
}

export const addBookMark = function(recipe){
    //ADD it to the bookmark
    state.bookMarks.push(recipe);

    // /Make the recipe bookmarked if it is currently displayed
    if(recipe.id === state.recipe.id) state.recipe.bookMarked = true;
    
    presistBookMark()
    
}

export const deleteBookmark = function(id){
    const index = state.bookMarks.findIndex(el => el.id === id)
    state.bookMarks.splice(index , 1)
    if(id === state.recipe.id) state.recipe.bookMarked = false

    presistBookMark()
}

const init = () => {
    const storage = localStorage.getItem('bookMark')
    if(storage) {
        state.bookMarks = JSON.parse(storage)
    }
}
init()

const clearBookMarks = function(){
    localStorage.clear('bookMark')
}

export const uploadRecipe = async function(newRecipe){
    try{
        const ingredients = Object.entries(newRecipe).filter((element) => {
            return element[0].startsWith('ingredient') && element[1]!==''
        })
        .map((ing) => {
            const ingArr = ing[1].split(',').map(el => el.trim())
            if(ingArr.length !==3) throw new Error('Wrong ingreidents format. Please use correct format as provided ;)')

            const [quantity , unit , description] = ingArr
            return {quantity : quantity ? +quantity :null , unit , description}
        })
        
        const recipe ={
            title : newRecipe.title,
            publisher : newRecipe.publisher,
            source_url : newRecipe.sourceUrl,
            image_url : newRecipe.image,
            servings : +newRecipe.servings,
            cooking_time : +newRecipe.cookingTime,
            ingredients,

        }

        const data = await AJAX(`${API_URL}?key=${KEY}`, recipe)
        console.log(data)
        state.recipe = createObject(data)
        addBookMark(state.recipe)
    }
    catch(err){
        throw err;
    }
}
// clearBookMarks()