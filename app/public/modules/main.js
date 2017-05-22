let store = Array.from({length: 50}, ()=>({
    id: 123456,
    dateAdd: '20.06.17',
    quantity: 5000,
    price: 49.99,
    sale: 0,
    label: 'default',
    title: 'QWertyuiop',
    img_min: 'img/shorts.jpg',
    img: 'img/shorts.jpg'
}));

let preloader = $('.main_preloader');

function appendToList(store = [], q){
    $('.catalog_items-list').createGoodsTemplate(store, {
        itemsOnPage: q
    }, ()=>{
        preloader.do({
            type: 'fadeOut',
            time: 1500
        })
    });
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

appendToList(store, 5);