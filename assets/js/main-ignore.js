// Fetch API => biblioteca já disponível nos browsers

const offset = 0;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

function convertPokemonToLi(pokemon) {
  return `
    <li class="pokemon">
          <span class="number">#001</span>
          <span class="name">${pokemon.name}</span>
          <div class="detail">
            <ol class="types">
              <li class="type">grass</li>
              <li class="type">poison</li>
            </ol>
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
              alt="${pokemon.name}"
            />
          </div>
        </li>
    `;
}

// O fetch retorna uma promisse, que ajuda a tratar com o processamento assincrono, porque tem o tempo de processamento da requisição.
// Para processar uma Promisse, usamos o método "then".
// Podemos usar o "catch" para tratar o fracasso, ou seja, no caso da promisse der errado.
// E para tratar a promisse independente dela da certo ou não, podemos usar o "finally"

// Ao invés de sair colocando um then dentro do outro e uma função dentro da outra, podemos usar eles encadeados um após o outro. E a "entrada" de uma será o retorno da anterior

const pokemonList = document.getElementById("pokemonList");

// pokeApi.getPokemons().then((pokemons) => {
//   const listItems = [];

//   for (let i = 0; i < pokemons.length; i++) {
//     const pokemon = pokemons[i];

//     // pokemonList.innerHTML += convertPokemonToLi(pokemon);
//     listItems.push(convertPokemonToLi(pokemon));
//   }
//   console.log(listItems);
// });

// O map é essencialmente essa transformação. Nele vamos passar uma função transformadora, que irá transformar um elemento no outro. Ele irá fazer tudo que esávamos fazendo antes com o for e tals

// pokeApi.getPokemons().then((pokemons = []) => {
//   const newList = pokemons.map((Value, indexe, arrayOriginal) => {
//     return "Nova Lista";
//   });
// });

// pokeApi.getPokemons().then((pokemons = []) => {
//   const newList = pokemons.map((pokemon) => {
//     // return pokemon.name; // Isso transforma em uma lista de nomes
//     return convertPokemonToLi(pokemon);
//   });

//   // console.log(newList);

//   const newHtmlList = newList.join("");

//   pokemonList.innerHTML += newHtmlList;
// });

// Dando uma limpada a mais no código:

// pokeApi.getPokemons().then((pokemons = []) => {
//   const newList = pokemons.map((pokemon) => convertPokemonToLi(pokemon));
//   const newHtmlList = newList.join("");
//   pokemonList.innerHTML += newHtmlList;
// });

// Em essência a função "convertPokemonToLi" já é um map, então, podemos passar diretamente a referência da função inteira no map

pokeApi.getPokemons().then((pokemons = []) => {
  pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join("");
});
