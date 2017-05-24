class Storage {
    constructor(title = 'cart'){
        this.title = title;
    }
    getStore(){
        let storage = localStorage;
        let store = storage.getItem(this.title);
        return store ? JSON.parse(store) : [];
    }
    read(){
        let store = this.getStore();
        return store;
    }
    update(newItem){
        let store = this.getStore();
        store.push(newItem);
        localStorage.setItem(this.title, JSON.stringify(store));     
    }
    clear(){
        localStorage.setItem(this.title, JSON.stringify([]));
    }
}

class Cart extends Storage {
    constructor(){
        super(...arguments);
    }
    updateCounter(data){
        if (data) this.update(data);
        let counter = $('.header_main-cart-count span');
        let quantity = this.read().length;
        counter.text(quantity);
    }
}

let cart = new Cart();

cart.updateCounter();