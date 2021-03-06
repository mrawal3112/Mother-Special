import views from './views.js';

class searchResult extends views {
    _recipeContainer = document.querySelector('.items');
    _generatehtmlData() {
        return this._recipeData.map(function (items) {
            return `
        <div class='itemBox'>
                    <div class='itemImage'>
                        <img src='${items.image_url}'>
                    </div>
                    <div class='itemData'>
                        <a href='#${items.id}'><h3>${items.title}</h3></a>
                        <h6>${items.publisher}</h6>
                    </div>
                </div>
            `
        }).join('');
    }
}

export default new searchResult();