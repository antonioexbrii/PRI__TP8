$(() => {
    $('#ficheiros').load('http://localhost:5001/carregar')


    $('#adicionar').click(e=> {
        e.preventDefault()
        var filename = $('#fich').val().split('\\').pop();

        if(filename!='' && $('#desc').val()!=""){      
            var url = '"/images/'+filename+'"'
            $('#ficheiros').append('<tr><td>'+ '<a href='+url+'>'+filename+'</a>'+'</td>'+'<td>'+$('#desc').val()+'</td></tr>')    
            ajaxPost()
            formPost() 
        }
        else alert('Um ou mais campos por preencher.')
        
    })
    $('#limpar').click(e=>{
        e.preventDefault()
        $.get('http://localhost:5001/apagar',(data,status)=>{
            alert('Dados apagados com sucesso')
        })
    })
    function ajaxPost() {
        $.ajax({
            type:"POST",
            contentType: "application/json",
            url: "http://localhost:5001/atualizar",
            data: JSON.stringify({ficheiro: $('#fich').val().split('\\').pop(),desc: $('#desc').val()}),
            success: p => {},
            error: e => {
                alert('ERRO(POST):' + JSON.stringify(e))
            }
        })
    }

    function formPost() {
        var form_data = new FormData($('#formulario')[0]);
        $.ajax({
            type:'POST',
            url:'http://localhost:5001/processa',
            processData: false,
            contentType: false,
            async: true,
            cache: false,
            data : form_data,
            success: p => {},
            error: e => {alert('Erro no post: ' + JSON.stringify(e))}       
        })
        $('#desc').val('')
        $('#fich').val('')
    }
})