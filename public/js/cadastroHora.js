var diaselect = "";

function colectDay() {
    var dataAtual = new Date().toISOString().split('T')[0];
    let date1 = new Date(dataAtual);
    var date2 = date1.getDay();
    const diasDaSemana = ['Segunda Feira', 'Terça Feira', 'Quarta Feira', 'Quinta Feira', 'Sexta Feira', 'Sabado', 'Domingo'];
    diaselect = diasDaSemana[date2];
    sendDaySelect(diaselect);
    return diaselect;
}

function selectDay(dia) {
    const day = dia.id;
    const diaDaSemana = dia.name;
    const indiceDia = dia.value;
    const diasDaSemana = ['Segunda Feira', 'Terça Feira', 'Quarta Feira', 'Quinta Feira', 'Sexta Feira', 'Sabado', 'Domingo'];
    const diaselect = diasDaSemana[indiceDia];

    $(".btn").removeClass("active");
    $(`#${day}`).addClass("active");
    $("#text").html(`<h5>Horarios de ${diaDaSemana}</h5>`);


    sendDaySelect(diaselect, dia);
}

function sendDaySelect(dia, teste) {
    if (dia) {
        const day = (dia);

        const config = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ day }),
        };

        const url = "/diaColect";

        fetch(url, config)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Resposta do servidor:', data);
    
            if (data.success) {
                if (data.redirectUrl) {
                    window.location.href = data.redirectUrl;
                } else {
                    window.location.reload();
                }
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    }
}

function colect() {
    let diaSelect = $(".custom-btn.active").attr("name");
    let horario = document.getElementById("hora").value;
    let tipo = document.getElementById("tipoHora");

    if (diaSelect == undefined || horario == "") {
        location.reload();
    } else {
        if (tipo.checked) {
            tipo = "retorno";
        } else {
            tipo = "ida";
        }
        let form = {
            dia: diaSelect,
            horario: horario,
            tipo: tipo
        };
        sendForm(form);
        return;
    }
}

function sendForm(form) {
    const config = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    };
    const url = "/cadastradohorario";

    fetch(url, config)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Resposta do servidor:', data);
            if (data.success) {
                window.location.reload();
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
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