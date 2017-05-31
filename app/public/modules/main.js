let store = Array.from({length: 5}, ()=>({
    dateAdd: 12562137821739,
    price: 49.99,
    sale: 0,
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam culpa reprehenderit, cum laborum ipsa dolores sunt enim dignissimos dolore sed libero maiores fugiat? Consectetur necessitatibus nam, velit, repellat atque dolorum.',
    label: 'default',
    title: 'QWertyuiop',
    img_min: 'img/shorts.jpg',
    img: 'img/shorts.jpg'
}));

store.push(Object.assign({}, store[0], {
    quantity: 110,
    price: 5000,
    title: 'Lol kek',
    img: 'img/logo.png'
}));

console.log(store);

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
    // AJAX REQUEST
    // $.get(`http://localhost:3001/goods?category=${hash}`)
    appendToList(Array.from({length: 1}, ()=>({
        id: 123456,
        dateAdd: '20.06.17',
        quantity: 5000,
        price: 29.99,
        sale: 0,
        label: 'default',
        title: 'askdhsaldjasdj',
        img_min: 'img/shorts.jpg',
        img: 'img/shorts.jpg'
    })));
}

let menu = $('.catalog_nav');

menu.on('click', 'a', getGoods);

goods_list.on('click', 'li', addToCart);

addToCartBtn.on('click', function(){
    let currenItem = $(this).attr('data-index');
    cart.updateCounter(store[currenItem]);
    $('#cart').modal('hide');
});

appendToList(store);