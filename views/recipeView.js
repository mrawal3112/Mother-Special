import views from './views.js';
import { Fraction } from '/fractional.js';

class recipeView extends views {
    _recipeContainer = document.querySelector('.recipe_infoContainer');
    listenEvent(eventContainer) { //event Handler
        ['hashchange', 'load'].forEach(ev => {
            window.addEventListener(ev, eventContainer);
        });
    }

    updateData(handler) { // handle the click event on images 
        this._recipeContainer.addEventListener('click', function (e) {
            const action = e.target.closest('img');
            if (!action) return;
            handler(action.dataset.updateServings);
        });
    }

    addRecipeBookmark(handler) {
        this._recipeContainer.addEventListener('click', function (e) {
            const bookmarked = e.target.closest('.bookmarkImg');
            if (!bookmarked) return;
            handler();
        })
    }
    _generatehtmlData() { // Recipe Container

        let ingredientsCount = this._recipeData.ingredients.length;
        return `
                <div class='item_image'>
                    <img src='${this._recipeData.image_url}'>
                </div>
                <div class='itemName'>
                    <h3>${this._recipeData.title}</h3>
                </div>
                <div class='item_recipeInfo'>
                    <div class='cookingTime'>
                        <div class='clockImage'>
                            <img src='Images/clock.svg'>
                        </div>
                        <div class='timeTaken'>
                            <h3>${this._recipeData.cooking_time} Minutes</h3>
                        </div>
                    </div>
                    <div class='peopleQuantity'>
                        <div class="peopleImage">
                            <img src='Images/people.png'>
                        </div>
                        <div class="quantity">
                            <h3>${this._recipeData.servings} People</h3>
                        </div>
                    </div>
                    <div>
                        <img src='Images/add.png' class='addSymbol' data-update-servings = ${this._recipeData.servings + 1}>
                    </div>
                    <div>
                        <img src='Images/minus.png' class='minusSymbol'data-update-servings = ${this._recipeData.servings - 1}>
                    </div>
                    <div class='bookmarkImg ${this._recipeData.bookmarked ? "bookmarkFill" : "unbookmark"}'>
                    <img src='Images/bookmark-white.png' alt='No Image Found' class='bookmarkSign'>
                    </div>
                    
                </div>
                <div class='item_ingredients'>
                    <h2>RECIPE INGREDIENTS</h2>
                    <ul>
                    ${this._recipeData.ingredients.map((ing) => {
            return `<li>
                                <div>
                                <img src='Images/checked.png' style='width: 15px; height: 15px; margin-top: 0px;'>
                                </div>
                                <div class='ingredientsList'>
                                    <p style='margin-left: 5px; max-height:48px;'>${ing.quantity ? new Fraction(ing.quantity).toString() : ''} ${ing.unit}  ${ing.description}</p>
                                </div >
                                </li > `}).join('')}
                    </ul>
                </div >
    <div class='item_originalSource'>
        <h2>HOW TO COOK IT</h2>
        <div>
            <pre>This recipe was carefully designed and tested by <span style='font-weight: bold;'>${this._recipeData.publisher}</span>
    Please check out directions at their website.</pre>
        </div>
        <button class='originalSite'><a href='${this._recipeData.source_url}' style='text-decoration:none;color:black;'>Website</a></button>
    </div>
    `;
    }
}

export default new recipeView();


// height:${368 / ingredientsCount}px;