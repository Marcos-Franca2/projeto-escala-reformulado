// aplica um stilo do bootsrap par o botão que recebeu um click se manter selecionado  
function selectDay(dia){
    
    var day = dia.id;
    
    $(".btn").removeClass("active"); // jQuery qu represente o QuerySelectorAll
    $(`#${day}`).addClass("active");
    
    return 
};


// coletar dados e enviar a proxima função
function colect(){
    let diaSelect = $(".custom-btn.active").attr("id") // coletando o id do botao com a class active
    let horario = document.getElementById("hora").value
    let tipo = document.getElementById("tipoHora")

    if(diaSelect == undefined ||horario == ""){
        location.reload()
    }else{
        if(tipo.checked){
            tipo = "retorno"
        }else{
            
            tipo = "ida"
        }
        let form = {
            dia: diaSelect,
        horario: horario,
        tipo: tipo
    }
    sendForm(form)
        return 
    }
}
    
    function sendForm(form){
    const config = {
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
        
    };
    const url = "/cadastradohorario";

    fetch(url, config).then(response => response.json()).then(data => {
        console.log('Resposta do servidor:', data);
        if (data.success) {
            window.location.reload();
        }

    }) .catch(error => console.error('Erro:', error));
}



function changeCardColor(cardId, checkboxId) {
    let card = document.getElementById(cardId);
    let checkbox = document.getElementById(checkboxId);
    

    if (checkbox.checked) {
        card.classList.add('selected-card');
    } else {
        card.classList.remove('selected-card');
    }

        selected = checkbox.id;
}