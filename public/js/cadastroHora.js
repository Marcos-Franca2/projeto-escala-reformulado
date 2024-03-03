colectDay()
var diaselect =""
function colectDay() {
    var dataAtual = new Date().toISOString().split('T')[0]
    let date1 = new Date(dataAtual)
    var date2 = date1.getDay(); //coletando o dia da semana de acordo com seu index da semana (ex.Segunda-Feira = 0 )
    const diasDaSemana = ['Segunda Feira', 'Terça Feira', 'Quarta Feira', 'Quinta Feira', 'Sexta Feira', 'Sabado', 'Domingo'];
    diaselect = diasDaSemana[date2];// selecionado o dia correto pelo Array .
    sendDaySelect(diaselect)
    return diaselect;
}




// aplica um stilo do bootsrap par o botão que recebeu um click se manter selecionado  
function selectDay(dia){
    var day = dia.id;
    let diaDaSemana = dia.name
     let indiceDia = dia.value
    const diasDaSemana = ['Segunda Feira', 'Terça Feira', 'Quarta Feira', 'Quinta Feira', 'Sexta Feira', 'Sabado', 'Domingo']
    diaselect = diasDaSemana[indiceDia];
    $(".btn").removeClass("active"); // jQuery qu represente o QuerySelectorAll
    $(`#${day}`).addClass("active");
    document.getElementById("text").innerHTML = `<h5>Horarios de ${diaDaSemana}</h5>`
    sendDay(diaDaSemana)
    sendDaySelect(diaselect)
    return 
};
function sendDaySelect(dia){
    if (dia) {
        const url = `/cadastroHora?dia=${dia}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Faça algo com os dados recebidos
                console.log('Resposta do servidor:', data);
            })
            .catch(error => console.error('Erro:', error));
    } else {
        console.error('Dia não definido. A requisição não será enviada.');
    }
}
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