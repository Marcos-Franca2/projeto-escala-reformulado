/*colectDay()
function colectDay() {
    var dataAtual = new Date().toISOString().split('T')[0]
    let date1 = new Date(dataAtual)
    var date2 = date1.getDay(); //coletando o dia da semana de acordo com seu index da semana (ex.Segunda-Feira = 0 )
    const diasDaSemana = ['Segunda Feira', 'Terça Feira', 'Quarta Feira', 'Quinta Feira', 'Sexta Feira', 'Sabado', 'Domingo'];
    const diaselect = diasDaSemana[date2];// selecionado o dia correto pelo Array .
    module.exports = diaselect
    return diaselect;
}
*/



// aplica um stilo do bootsrap par o botão que recebeu um click se manter selecionado  
function selectDay(dia){
    var day = dia.id;
    let diaDaSemana = dia.name
    $(".btn").removeClass("active"); // jQuery qu represente o QuerySelectorAll
    $(`#${day}`).addClass("active");
    document.getElementById("text").innerHTML = `<h5>Horarios de ${diaDaSemana}</h5>`
    sendDay(diaDaSemana)
    return 
};

function sendDay(dia){
    const config = {
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dia),
        
    };
    const url = "/diaColect";

    fetch(url, config).then(response => response.json()).then(data => {
        console.log('Resposta do servidor:', data);
        if (data.success) {
            window.location.reload();
        }

    }) .catch(error => console.error('Erro:', error));
}



// coletar dados e enviar a proxima função
function colect(){
    let diaSelect = $(".custom-btn.active").attr("name") // coletando o id do botao com a class active
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