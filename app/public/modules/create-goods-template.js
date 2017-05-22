$.fn.createGoodsTemplate = function(data, config){
    let el = this;  
    let settings = Object.assign({

    }, config);
    
    console.log(el);
    return el;
};

let store = [{
    id: 123456,
    dateAdd: '20.06.17',
    quantity: 5000,
    price: 49.99,
    sale: 0,
    label: 'default',
    title: 'QWertyuiop',
    img_min: '',
    img: ''
}];

$('.catalog_items-list').createGoodsTemplate(store, {
    itemsOnPage: 8
});