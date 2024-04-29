let allPokemon = [];
let displayedPokemon = [];

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=1000';
    let response = await fetch(url);
    let responseAsJson = await response.json();

    allPokemon = responseAsJson.results;
    renderPokemon(allPokemon.slice(0, 20));
}

async function renderPokemon(pokemonList) {
    let content = document.getElementById('Content');

    for (let i = 0; i < pokemonList.length; i++) {
        let Idpoke = pokemonList[i].url.split('/').filter(Boolean).pop();
        let namePoke = pokemonList[i].name.charAt(0).toUpperCase() + pokemonList[i].name.slice(1);
        await getPokemonData(pokemonList[i].url).then(pokemonData => {
            let imgPokeUrl = pokemonData.sprites.other['official-artwork'].front_default;
            let pokeTypes = pokemonData.types.map(type => type.type.name).join(', ');
            content.innerHTML += htmlPokemonRender(Idpoke, namePoke, imgPokeUrl, pokeTypes);
            displayedPokemon.push({ id: Idpoke, data: pokemonData });
        });
    }
}

function getPokemonData(pokemonUrl) {
    return fetch(pokemonUrl)
        .then(response => response.json());
}

document.addEventListener('DOMContentLoaded', function () {
    const moreButton = document.querySelector('.morebutt');
    const searchForm = document.getElementById('searchForm');
    const overlay = document.getElementById('overlay');
    const closeButton = document.querySelector('.buttonclose');

    moreButton.addEventListener('click', async function () {
        const nextBatch = allPokemon.slice(displayedPokemon.length, displayedPokemon.length + 20);
        renderPokemon(nextBatch);
    });

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        namePokedexFilter();
    });

    document.addEventListener('click', function (event) {
        const isPokemonCard = event.target.classList.contains('pokemonkard') ||
            event.target.closest('.pokemonkard') !== null;

        if (isPokemonCard) {
            openOverlay(event);
        } else if (event.target === overlay) {
            closeOverlay();
        }
    });

    closeButton.addEventListener('click', function () {
        closeOverlay();
    });
});

async function namePokedexFilter() {
    let searchTermElement = document.querySelector('.searchInput');
    let searchTerm = searchTermElement.value;
    if (searchTerm) {
        let filteredPokemons = allPokemon.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
        renderFilteredPokemons(filteredPokemons);
    }
}

function renderFilteredPokemons(filteredPokemons) {
    let content = document.getElementById('Content');
    content.innerHTML = "";
    for (let i = 0; i < filteredPokemons.length; i++) {
        let pokemon = filteredPokemons[i];
        let Idpoke = pokemon.url.split('/').filter(Boolean).pop();
        let namePoke = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        getPokemonData(pokemon.url).then(pokemonData => {
            let imgPoke = pokemonData.sprites.other['official-artwork'].front_default;
            let pokeTypes = pokemonData.types.map(type => type.type.name).join(', ');
            content.innerHTML += htmlPokemonRender(Idpoke, namePoke, imgPoke, pokeTypes);
        });
    }
}

function openOverlay(event) {
    overlay.style.display = 'block';
    console.log('Overlay geöffnet.');
    const card = event.target.closest('.pokemonkard');
    const id = card.querySelector('.NameIDstyle p').textContent.slice(1);

    const pokemonData = displayedPokemon.find(pokemon => pokemon.id === id)?.data;
    if (pokemonData) {
        displayDataInOverlay(pokemonData, id);
        document.addEventListener('keydown', handleKeyPress);
        console.log('Keydown-Event hinzugefügt.');
    } else {
        console.error('Pokemon data not found.');
    }
}

function closeOverlay() {
    overlay.style.display = 'none';
    clearOverlayContent();
}

function clearOverlayContent() {
    const pokeImage = document.getElementById('pokeImage');
    const pokeName = document.getElementById('pokeName');
    const pokeNumber = document.getElementById('pokeNumber');
    const pokeType = document.getElementById('pokeType');
    const cardds1 = document.querySelector('.cardds1');

    pokeImage.innerHTML = '';
    pokeName.textContent = '';
    pokeNumber.textContent = '';
    pokeType.textContent = '';
    cardds1.innerHTML = '';
}

function displayDataInOverlay(pokemonData, id) {
    const pokeImage = document.getElementById('pokeImage');
    const pokeName = document.getElementById('pokeName');
    const pokeNumber = document.getElementById('pokeNumber');
    const pokeType = document.getElementById('pokeType');
    const cardds1 = document.querySelector('.cardds1');

    pokeImage.innerHTML = `<img src="${pokemonData.sprites.other['official-artwork'].front_default}">`;
    pokeName.textContent = pokemonData.name;
    pokeNumber.textContent = `#${id}`;
    pokeType.textContent = pokemonData.types.map(type => type.type.name).join(', ');

    cardds1.innerHTML = `
        <div class="heightdiv">
            <h4>Height:</h4>
            <p>${pokemonData.height} m</p>
        </div>
        <div class="weightdiv">
            <h4>Weight:</h4>
            <p>${pokemonData.weight} kg</p>
        </div>
        <div class="abilidiv">
            <h4>Abilities:</h4>
            <p style="margin-left: 45px;">${pokemonData.abilities.map(ability => ability.ability.name).join(', ')}</p>
        </div>
        <div class="sectionBase">
            <h4 id="baseStatsTitle">Base Stats</h4>
            <p id="hpStat">HP: ${pokemonData.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
            <p id="attackStat">Attack: ${pokemonData.stats.find(stat => stat.stat.name === 'attack').base_stat}</p>
            <p id="defenseStat">Defense: ${pokemonData.stats.find(stat => stat.stat.name === 'defense').base_stat}</p>
            <p id="specialAttackStat">Special Attack: ${pokemonData.stats.find(stat => stat.stat.name === 'special-attack').base_stat}</p>
            <p id="specialDefenseStat">Special Defense: ${pokemonData.stats.find(stat => stat.stat.name === 'special-defense').base_stat}</p>
            <p id="speedStat">Speed: ${pokemonData.stats.find(stat => stat.stat.name === 'speed').base_stat}</p>
        </div>
    `;
}

function handleKeyPress(event) {
    console.log('Key pressed:', event.key);
    if (event.key === 'ArrowRight') {
        showNextPokemon();
    } else if (event.key === 'ArrowLeft') {
        showPrevPokemon();
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const closeButton = document.querySelector('.buttonclose');

    closeButton.addEventListener('click', function () {
        closeOverlay();
    });
});