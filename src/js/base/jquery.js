(function($){
    // Space for custom jQuery functions

    $.fn.getFormData = function(){
        let data = {};
        let dataArray = $(this).serializeArray();

        for(let i=0; i < dataArray.length; i++){
            data[dataArray[i].name] = dataArray[i].value;
        }

        return data;
    }

}) (jQuery);

let getLoader = function(){
    let html = '';
        html += '<div class="loader">';
        html += '<img src="/assets/images/loader.svg">';
        html += '</div>';

    return html;
}

let setAjaxMessage = function(message){
    let html = '<div class="message">'+ message +'</div>';

    return html;
}