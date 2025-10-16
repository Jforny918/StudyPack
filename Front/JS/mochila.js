const modal = document.getElementById('modal-nova-questao');
  const btnNovaQuestao = document.getElementById('btn-nova-questao');
  const btnCancelar = document.getElementById('btn-cancel');
  const btnSalvar = document.getElementById('btn-salvar');
  const questoesList = document.getElementById('questoes-list');

const modalMochila = document.getElementById('modal-nova-mochila');
  const btnNovaMochila = document.getElementById('btn-nova-mochila');
  const btnCancelarMochila = document.getElementById('btn-cancel-mochila');
  const btnSalvarMochila = document.getElementById('btn-salvar-mochila');

const sidebar = document.querySelector('.sidebar');
const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');

  btnNovaQuestao.addEventListener('click', () => {
    modal.classList.add('active');
  });

  btnCancelar.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  btnNovaMochila.addEventListener('click', () => {
    modalMochila.classList.add('active');
  });

  btnCancelarMochila.addEventListener('click', () => {
    modalMochila.classList.remove('active');
  });

  btnSalvarMochila.addEventListener('click', () => {
    alert('Salvar mochila: ' + document.getElementById('nome-mochila').value);
    modalMochila.classList.remove('active');
  });

  btnSalvar.addEventListener('click', () => {
    const enunciado = document.getElementById('enunciado').value.trim();
    if (!enunciado) {
      alert('Por favor, preencha o enunciado da questão.');
      return;
    }

    // Criar uma nova div de questão com o enunciado
    const novaQuestao = document.createElement('div');
    novaQuestao.classList.add('questao');
    novaQuestao.textContent = `Questão: ${enunciado}`;
    questoesList.appendChild(novaQuestao);

    // Resetar campos e fechar modal
    document.getElementById('enunciado').value = '';
    document.getElementById('alternativas').value = '';
    document.getElementById('resposta').value = '';
    document.getElementById('imagem').value = '';
    modal.classList.remove('active');
  });

  btnToggleSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });