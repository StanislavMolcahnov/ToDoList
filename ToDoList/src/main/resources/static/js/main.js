$(function(){

    const appendWork = function(data){
        var workCode = '<h4>' + data.name + '</h4>' +
            '<div class="work-show">' + data.description + '</div>' +
            '<button class="delete-work" data-id="' + data.id + '">Удалить</button>' +
            '<button class="update-work" data-id="' + data.id + '">Изменить</button>';
        $('#work-list')
            .append('<div id="div-' + data.id + '">' + workCode + '</div>');
    };

    //Show description
    $(document).on('click', '#show-description',function(){
        if ($('.work-show').is(':hidden')){
            $('.work-show').css('display', 'flex');
        } else {
            $('.work-show').css('display', 'none');
        }
    });

    //Show adding work form
    $('#show-add-work-form').click(function(){
        $('#work-form').css('display', 'flex');
    });

    //Closing adding work form
    $('#work-form').click(function(event){
        if(event.target === this) {
            $(this).css('display', 'none');
        }
    });

    //Show update work form
    $(document).on('click', '.update-work', function(){
        $('#update-work').css('display', 'flex');
    });

    $('#update-work').click(function(event){
            if(event.target === this) {
                $(this).css('display', 'none');
            }
        });

    //Update work
    $(document).on('click', '.update-work', function(){
        var link = $(this);
        var workId = link.data('id');
        $(document).on('click', '#update-work-button', function()
            {
                var data = $('#update-work form').serialize();
                $.ajax({
                    method: "PUT",
                    url: '/works/' + workId,
                    data: data,
                    success: function(response)
                    {
                        $('#update-work').css('display', 'none');
                        var code = document.getElementById('div-' + workId);
                        var work = {};
                        var dataArray = $('#update-work form').serializeArray();
                        for(i in dataArray) {
                            work[dataArray[i]['name']] = dataArray[i]['value'];
                        }
                        code.innerHTML = '<h4>' + work.name + '</h4>' +
                            '<div class="work-show">' + work.description + '</div>' +
                            '<button class="delete-work" data-id="' + workId + '">Удалить</button>' +
                            '<button class="update-work" data-id="' + workId + '">Изменить</button>';

                    }
                });
                return false;
            });
        });

    //Delete work
    $(document).on('click', '.delete-work', function(){
        var link = $(this);
        var workId = link.data('id');
        $.ajax({
            method: "DELETE",
            url: '/works/' + workId,
            success: function(response)
                {
                    var code = document.getElementById('div-' + workId);
                    code.remove();
                }
            });
            return false;
        });

    //Delete all works
    $('#delete-works').click(function()
    {
        $.ajax({
            method: "DELETE",
            url: '/works/',
            success: function(response)
            {
                var code = document.getElementById('work-list');
                while (code.firstChild) {
                  code.removeChild(code.firstChild);
                }
            }
        });
        return false;
    });

    //Adding work
    $('#save-work').click(function()
    {
        var data = $('#work-form form').serialize();
        $.ajax({
            method: "POST",
            url: '/works/',
            data: data,
            success: function(response)
            {
                $('#work-form').css('display', 'none');
                var work = {};
                work.id = response;
                var dataArray = $('#work-form form').serializeArray();
                for(i in dataArray) {
                    work[dataArray[i]['name']] = dataArray[i]['value'];
                }
                appendWork(work);
            }
        });
        return false;
    });

});