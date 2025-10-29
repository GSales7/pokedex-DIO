const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const loadLessButton = document.getElementById("showLessButton");

const maxRecords = 18;
const limit = 6;
let offset = 0;

// Função que converte um pokemon em um elemento Li do html
function convertPokemonToLi(pokemon) {
  return `
          <li class="pokemon ${pokemon.type}">
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>

          <div class="detail">
            <ol class="types">
              ${pokemon.types
                .map((type) => `<li class="type ${type}">${type}</li>`)
                .join("")}
            </ol>

            <img
              src="${pokemon.photo}"
              alt="${pokemon.name}"
            />
          </div>
        </li>`;
}

// Função que faz o carregamento de novos pokemons
function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
    addEventListenerToEachLi();
    updateButtons();
  });
}

// Função que faz a remoção dos elementos Li
function removeLastN(n) {
  for (let i = 0; i < n; i++) {
    const last = pokemonList.lastElementChild;
    if (!last) break;
    pokemonList.removeChild(last);
  }
}

// Função que atualiza o status dos botões
function updateButtons() {
  const currentCount = pokemonList.children.length;

  loadMoreButton.style.display = currentCount >= maxRecords ? "none" : "";
  loadLessButton.style.display = currentCount <= limit ? "none" : "";
}

// Função que adiciona um EventListiner para cada Li
// Funcionou muito bem, porém, não é a forma mais eficiente
function addEventListenerToEachLi() {
  const liList = pokemonList.querySelectorAll("li.pokemon");

  liList.forEach((li) => {
    li.addEventListener("click", () => {
      if (li.classList.contains("selected")) {
        li.classList.remove("selected");
        return;
      }

      liList.forEach((li2) => li2.classList.remove("selected"));

      li.classList.add("selected");
    });
  });
}

// Carrega os pokemons iniciais
loadPokemonItens(offset, limit);

// Carrega mais pokemons ao apertar no botão Show More
loadMoreButton.addEventListener("click", () => {
  const currentCount = pokemonList.children.length;

  offset += limit;
  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    // Remove o botão de carregar mais itens
    // loadMoreButton.parentElement.removeChild(loadMoreButton);

    // Não remove o botão apenas "esconde" ele
    loadMoreButton.style.display = "none";
  } else {
    loadPokemonItens(offset, limit);
  }
});

// Reduz a quantidade de pokemons exibidos ao apertar no botão Show Less
loadLessButton.addEventListener("click", () => {
  // Verifica o tamanho da lista ol que está sendo exibida atualmente
  const currentCount = pokemonList.children.length;

  // Verifica se está na 1º página, se tiver, não faz nada
  if (currentCount >= limit) {
    // Garante que fiquemos com pelo menos 1 página
    const itensToRemove = Math.min(limit, currentCount - limit);

    // Chama a função que remove os últimos itens
    removeLastN(itensToRemove);

    // Atualiza o offset, mas garantindo que nunca seja negativo
    offset = Math.max(0, offset - limit);

    updateButtons();
  }
});
