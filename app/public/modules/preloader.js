$.fn.do = function(config = {
                                type: 'fadeIn', 
                                time:  1000}){
    let { type, time } = config,
        element = this;
    
    element[type](time);
    
    return element;
};