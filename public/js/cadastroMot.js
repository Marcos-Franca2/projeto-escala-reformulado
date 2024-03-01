var selected = ' '
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

  async function deleteCardSelect() {
    try {
      const response = await fetch(`/deletarMotorista/${selected}`, {
        method: 'DELETE'
      });
      window.location.reload()
      if (response.ok) {
        selected = ""
        console.log("Motorista excluído com sucesso.");
        window.location.reload()
      } else {
        console.error("Erro ao excluir motorista:", response.statusText);
        selected = ""
        window.location.reload()
      }
    } catch (error) {
      console.error('Erro ao excluir motorista:', error);
      selected = ""
    }

  }
