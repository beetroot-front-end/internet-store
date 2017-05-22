let goods = (function(){
    let new_item = {};

    let form = $('#add-goods'),
        goods_list = $('#goods-list');

    function parseForm(form){
        let fields = form.find(' input, textarea '),
            data = {};

        fields.each((index, element) => {
            let item = $(element);
            data[item.attr('name')] = item.attr('type') === 'checkbox' ?
                                        item.prop('checked') :
                                        item.val().trim();
        });

        return data;
    }

    function addToList(data){
        // ajax request
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
       let form_data = $.extend(parseForm($(this)), { id: Date.now() });

       if ( hasEmptyField(form_data) ) {
           $.growl.error({ message: "Form validation error!" });
       } else {
           addToList(form_data);
           $.growl.notice({ message: "Added new item to list" });
           clearFields($(this));
       }
    });


    return {  }
}());