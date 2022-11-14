const duracao =3000;

$(document).ready(function(){
    $('.owl-carousel').owlCarousel();
    //configuração de produtos
    $('.featured-item a').addClass('btn btn-dark stretch-link');
    $('.featured-item:first h4').append('<span class="badge bg-success">Novo</span> ');
    $("strong").css('color','red');

   //callback function
   setTimeout(() => {
    $('.featured-item').show("blind",duracao)
   }, 2000);
   

   $('.nav-modal-open').on('click',function(e){
    e.preventDefault();
    let elem = $(this).attr('rel') //sets or returns os atributos e valores do elementos selecionados
    console.log($(this).attr('rel'))
    $('.modal-body').html($('#'+elem).html())//pega o conteúdo da class #elem
    $('.modal-header h5.modal-title').html($(this).text())
    let myModal = new bootstrap.Modal($('#modelId'));
    myModal.show()
   })


   //para validação de formulário
   $('body').on('submit','.modal-body .form',function(e){ // chamada que executa uma ação num elemento que é criado após o carregamento da página

    //impede que o documento seja enviado antes de passar por esse procedimento
    e.preventDefault();
    
    const inputName = $('#nome');
    const inputData =$('#date');
    const inputCpf =$('#cpf');
    valida(inputName)
    valida($('#email'))
    valida(inputData)
    valida(inputCpf)
    valida($('#cep'))
    valida($('#phone'))
    valida($('#time'))

    if(inputName.hasClass('invalido') || $('#email').hasClass('invalido')|| inputData.hasClass('invalido')
    ||$('#time').hasClass('invalido') || $('#cep').hasClass('invalido') || $('#phone').hasClass('invalido')
    ||inputCpf.hasClass('invalido') ){
      console.log('verificar campos obrigatórios')
      return false
    }else{
      $(this).submit()
    }

    
    /*se fosse uma verificação dentro do submit:
    if(inputName.val()==''){
      console.log('o campo de nome é obrigatório')
      $('#nome').addClass('invalido')
      return false;
    }

    if($('#email').val()==''){
      console.log('o campo de email é obrigatório')
      $('#email').addClass('invalido')
      return false;
    }*/
   })

   
  // Validação:   
   function valida(elem){
   
    const emailcerto =/[a-z0-9._+#$%&']+@[a-z0-9.-]+\.[a-z]{2,}$/
    const cpfcerto =/^[0-9]{3}[.-]?[\/]?[0-9]{3}[.-]?[\/]?[0-9]{3}[-.]?[\/]?[0-9]{2}$/
    if(elem.val()=='' || ((elem.attr('id')=="email") && !(elem.val().match(emailcerto))) 
       || ((elem.attr('id')=="cpf") && !(elem.val().match(cpfcerto)))){
      console.log('o campo de '+elem.attr('name')+ ' é obrigatório')
      elem.addClass('invalido')
      elem.parent().find('.text-muted').show()//acessa primeiro um nível acima, depois acha os descedentes com a classe desejada
      return false
    }
    else{
      elem.removeClass('invalido')
      elem.parent().find('.text-muted').hide()
    }
    
   }

  
  //importante notar que podemos utilizar pattern no input para trabalhar com o regex que se deseja, e tittle
  
  //verificação do nome de forma separada com regex
   $('body').on('blur','#nome',function(){
    const nomecerto =/[A-Za-z]{2,}/ 
    let nome = $(this).val()
    if(nome=='' || !(nome.match(nomecerto))){
      $(this).addClass('invalido')
      $(this).parent().find('.text-muted').show()//acessa primeiro um nível acima, depois acha os descedentes com a classe desejada
      return false
    }
    else{ $(this).removeClass('invalido')
    $(this).parent().find('.text-muted').hide()}
   })

  
   $('body').on('blur','#email',function(){
    valida($(this))
   })

   $('body').on('focus','#date',function(){
    $(this).datepicker()
   })


   $('body').on('blur','#date',function(){
    $(this).mask('00/00/0000');
    valida($(this))
   })
   $('body').on('blur','#time',function(){
    valida($(this))
    $(this).mask('00:00');
   })
   $('body').on('blur','#cep',function(){
    valida($(this))
    $(this).mask('00000-000');
   })
   $('body').on('blur','#phone',function(){
    valida($(this))
    $(this).mask('0000-0000');
   })

   $('body').on('blur','#cpf',function(){
    valida($(this))
    //$(this).mask('000.000.000-00')
    //para praticar a validação por regex, retirou-se mask
   })

  });

  $('.featured-item a').click(function(event){
    event.preventDefault();
    alert('Produto esgotado');
  });
  $('.featured-item:first').mouseenter(function(){
    $('#toast-Notice').show();

  });
  $('.toast-header button').click(function(){
    $('#toast-Notice').hide();

  });




