$.fn.createGoodsTemplate = function(data, config, fn){
    let el = this;  
    let settings = Object.assign({
        pagination: true
    }, config);
    
    let toHtml = (item) => {
        let { label, id ,title, price, img } = item;
        
        return ` 
            <li class="catalog_item ${label}" data-id="${id}">
                <img src="${img}" alt="${title}" class="catalog_item-img">
                <p class="catalog_item-name">
                    ${title}
                </p>
                <p class="catalog_item-price">
                    ${price} $
                </p>
            </li>
        `;
    }
    let dataToPrint;
    if (settings.pagination) {
        dataToPrint = data.slice(0, settings.itemsOnPage || 8);
    } else {
        dataToPrint = data.slice();
    }
    console.log(dataToPrint);
    el.html( dataToPrint.map(toHtml) );
    fn.call(el);

    return el;
};