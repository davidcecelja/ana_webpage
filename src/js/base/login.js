let handleLogin = function(options){
    if(options){
        if(options.login){
            $('#loginForm').on('submit', function(e){
                e.preventDefault();
                
                let _thisloginForm = $(this);
                let data = $(this).getFormData();
                
                $.ajax({
                    crossDomain: true,
                    url: '/data/login.json',
                    method: 'GET',
                    contentType: 'application/json',
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    data: JSON.stringify(data),
                    beforeSend: function(){
                        $('#loginModal .modal-content').prepend(getLoader());
                        $('button', _thisloginForm).prop('disabled', true);
                    },
                    success: function(data){
                        if(data.status == 0){
                            $('#loginModal .loader').append(setAjaxMessage(data.message)); 
                        } else if(data.status == 1){
                            $('#loginModal .loader').append(setAjaxMessage(data.message)); 
                            setTimeout(function(){
                                window.location.replace('/admin');
                            }, 2000);
                        }
                    },
                    error: function(xhr){
                        $('#loginModal .loader').append(setAjaxMessage('Došlo je do pogreške! Pokušajte ponovo ili kontaktirajte administratora!'));
                    },
                    complete: function() {
                        setTimeout(function(){
                            $('.loader').remove();
                            $('button', _thisloginForm).prop('disabled', false);
                        }, 2500);
                    }

                });
            });

            $('#loginModal').on('hidden.bs.modal', function(e){
                e.preventDefault();

                $('#loginForm').trigger('reset').parsley().reset();
            });
        }
    }
};