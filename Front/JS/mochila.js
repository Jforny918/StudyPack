const modal = document.getElementById("modal-nova-questao");
const btnCancelar = document.getElementById("btn-cancel-questao");
const btnSalvar = document.getElementById("btn-salvar-questao");

const modalMochila = document.getElementById("modal-nova-mochila");
const btnNovaMochila = document.getElementById("btn-nova-mochila");
const btnCancelarMochila = document.getElementById("btn-cancel-mochila");
const btnSalvarMochila = document.getElementById("btn-salvar-mochila");

const btnToggleSidebar = document.getElementById("btn-toggle-sidebar");
const container = document.querySelector(".container");

const mochilaList = document.getElementById("mochilas-list");
const mochilaArea = document.getElementById("mochila-area");

let mochilas = [
  {
    id: 1,
    nome: "Mochila 1",
    materias: [
      { nome: "Matemática", questoes: [] },
      { nome: "História", questoes: [] }
    ]
  }
];

let mochilaAtualId = 1;
let materiaAtualNome = mochilas[0].materias[0].nome;

// Renderiza lista de mochilas na sidebar
function renderMochilas() {
  mochilaList.innerHTML = "";
  mochilas.forEach(mochila => {
    const div = document.createElement("div");
    div.classList.add("mochila-item");
    if (mochila.id === mochilaAtualId) div.classList.add("active");
    div.textContent = mochila.nome;
    div.dataset.id = mochila.id;
    div.addEventListener("click", () => {
      mochilaAtualId = mochila.id;
      // Seleciona primeira matéria da mochila ao mudar de mochila
      materiaAtualNome = mochila.materias.length > 0 ? mochila.materias[0].nome : null;
      renderMochilas();
      renderMaterias();
    });
    mochilaList.appendChild(div);
  });
}

// Renderiza área principal com matérias e questões da matéria atual
function renderMaterias() {
  const mochila = mochilas.find(m => m.id === mochilaAtualId);
  mochilaArea.innerHTML = `
    <div class="mochila-header">
      <button class="btn" id="btn-nova-questao">Criar Nova Questão</button>
    </div>
    <div class="materias-list" style="margin-bottom: 1rem;">
      ${mochila.materias.map(materia => `
        <div class="materia-item" style="
          cursor:pointer; 
          padding:10px; 
          border-radius:5px; 
          background: ${materia.nome === materiaAtualNome ? '#3b82f6' : '#374151'};
          color: #ddd;
          margin-bottom: 5px;
        ">${materia.nome}</div>
      `).join("")}
    </div>
    <div class="questoes-list" id="questoes-list"></div>
  `;

  // Adicionar evento para mudar matéria
  const materiaItems = mochilaArea.querySelectorAll(".materia-item");
  materiaItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      materiaAtualNome = mochila.materias[index].nome;
      renderMaterias(); // Re-render para atualizar seleção e questões
    });
  });

  // Evento para abrir modal nova questão
  document.getElementById("btn-nova-questao").addEventListener("click", () => {
    modal.classList.add("active");
  });

  renderQuestoes();
}

// Renderiza questões da matéria atual
function renderQuestoes() {
  const mochila = mochilas.find(m => m.id === mochilaAtualId);
  const materia = mochila.materias.find(mat => mat.nome === materiaAtualNome);
  const questoesList = document.getElementById("questoes-list");
  if (!questoesList) return;
  questoesList.innerHTML = "";

  materia.questoes.forEach(q => {
    const div = document.createElement("div");
    div.classList.add("questao");
    div.textContent = `Questão: ${q.enunciado}`;
    div.style.cursor = "pointer";
    div.addEventListener("click", () => {
      const altUrl = q.alternativas.map(a => encodeURIComponent(a)).join("|");
      const url = `questao.html?enunciado=${encodeURIComponent(q.enunciado)}&alternativas=${altUrl}`;
      window.open(url, "_blank");
    });
    questoesList.appendChild(div);
  });
}

// Eventos dos botões

btnNovaMochila.addEventListener("click", () => {
  modalMochila.classList.add("active");
});

btnCancelarMochila.addEventListener("click", () => {
  modalMochila.classList.remove("active");
});

btnSalvarMochila.addEventListener("click", () => {
  const nomeMochila = document.getElementById("nome-mochila").value.trim();
  if (!nomeMochila) {
    alert("Por favor, preencha o nome da mochila.");
    return;
  }
  mochilas.push({
    id: Date.now(),
    nome: nomeMochila,
    materias: []
  });
  renderMochilas();
  modalMochila.classList.remove("active");

  document.getElementById("nome-mochila").value = "";
  document.getElementById("tag").value = "";
  document.getElementById("color").value = "#0a659d";
});

btnCancelar.addEventListener("click", () => {
  modal.classList.remove("active");
});

btnSalvar.addEventListener("click", () => {
  const enunciado = document.getElementById("enunciado").value.trim();
  const alternativasVal = document.getElementById("alternativas").value.trim();
  if (!enunciado) {
    alert("Por favor, preencha o enunciado da questão.");
    return;
  }
  if (!materiaAtualNome) {
    alert("Nenhuma matéria selecionada para adicionar a questão.");
    return;
  }

  const alternativasArr = alternativasVal.split("\n").map(a => a.trim()).filter(Boolean);
  
  const mochila = mochilas.find(m => m.id === mochilaAtualId);
  const materia = mochila.materias.find(mat => mat.nome === materiaAtualNome);

  materia.questoes.push({
    enunciado: enunciado,
    alternativas: alternativasArr,
  });

  renderQuestoes();

  document.getElementById("enunciado").value = "";
  document.getElementById("alternativas").value = "";
  document.getElementById("resposta").value = "";
  document.getElementById("imagem").value = "";
  modal.classList.remove("active");
});

btnToggleSidebar.addEventListener("click", () => {
  container.classList.toggle("collapsed");
});

// Inicialização
renderMochilas();
renderMaterias();
