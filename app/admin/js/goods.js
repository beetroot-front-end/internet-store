let goods = (function(){
    let new_item = {};

    let form = $('#add-goods'),
        goods_list = $('#goods-list');

    function parseForm(form){
        let fields = form.find(' input, textarea, select '),
            data = {};

        fields.each((index, element) => {
            let item = $(element);
            if (item.attr('type') === 'checkbox') {
                data[item.attr('name')] = item.prop('checked');
            } else {
                data[item.attr('name')] = item.val().trim();
            }
        });

        return data;
    }

    function getGoods(){
        $.ajax({
            method: 'GET',
            url: 'https://store-maks1mp.c9users.io/api/goods?collection=sweaters',
            success: function(response){
                if (response.status) {
                    response.data.forEach(addToList);
                }
            }
        })
    }

    function addToList(data){
        goods_list.prepend( `<tr>
                                <th scope="row">  </th>
                                <td> ${data.title} </td>
                                <td> ${data.price} </td>
                                <td> <input type="checkbox" ${ data.is_hidden ? 'checked' : '' }/> </td>
                                <td>
                                    <p style="width: 200px">
                                        ${data.description}
                                    </p>
                                </td>
                                <td>
                                    <button class="btn btn-danger text-uppercase"> remove </button>
                                    <button class="btn btn-primary text-uppercase"> edit </button>
                                </td>
                            </tr>` )
    }

    function hasEmptyField(obj){
        let keys = Object.keys(obj);
        return !keys.every( prop => obj[prop] !== '');
    }

    function clearFields(form){
        let fields = form.find('input, textarea');
        fields.each((index, item)=>{
            let $el = $(item);
            if ($el.attr('type') === 'checkbox') {
                $el.prop('checked', false);
            } else {
                $el.val('');
            }
        })
    }

    form.on('submit', function (e) {
       e.preventDefault();
       let form_data = $.extend(parseForm($(this)), { dateAdd: Date.now() });
       $.ajax({
         data: JSON.stringify({
            collection: 'sweaters', 
            body: form_data}),
         method: 'POST',
         url: 'https://store-maks1mp.c9users.io/api/goods/add',
         contentType: 'application/json',
         success: function(response){
            if (response.status) {
                goods_list.html('');
                getGoods();
            }
         }
       });
    });

    getGoods();

    return {  }
}());