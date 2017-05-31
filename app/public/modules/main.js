var store = [];

let preloader = $('.main_preloader'),
    goods_list = $('.catalog_items-list'),
    addToCartBtn = $('#add-to-cart');

function appendToList(store = [], q){
    goods_list.createGoodsTemplate(store, {
        itemsOnPage: q
    }, ()=>{
        preloader.do({
            type: 'fadeOut',
            time: 1500
        })
    });
}



function addToCart(event){
    let currentItemIndex = $(this).index();
    let currentItem = store[currentItemIndex];
    let modal = $('#cart');

    let keys = Object.keys(currentItem);
    keys.forEach(key => {
        let field = modal.find(`[data-value="${key}"]`);
        if (field.attr('type')) {
            field.val(currentItem[key])
        } else if (field.is('img')) {
            field.attr('src', currentItem[key]);    
        } else field.text(currentItem[key]);    
    });
    addToCartBtn.attr('data-index', currentItemIndex);
    modal.modal();
}

function getGoods(event){
    event.preventDefault();
    preloader.do({
        type: 'fadeIn',
        time: 1500
    })
    let element = $(this),
        hash = element.attr('href');

    window.location.hash = hash;
    console.log(hash);
    getData(hash.slice(1));

}

let menu = $('.catalog_nav');

menu.on('click', 'a', getGoods);

goods_list.on('click', 'li', addToCart);

addToCartBtn.on('click', function(){
    let currenItem = $(this).attr('data-index');
    cart.updateCounter(store[currenItem]);
    $('#cart').modal('hide');
});


function getData(hash){
    hash = hash || window.location.hash.slice(1) || 'shorts';
    $.ajax({
        method: 'GET',
        url: `https://store-maks1mp.c9users.io/api/goods?collection=${hash}`,
        success: function(response){
            if (response.status) {
                store = response.data;
                appendToList(response.data);
            }
        }
    })
}

getData();