function htmlPokemonRender(Idpoke, namePoke, imgPoke, pokeTypes) {
    return `
    <div class="pokemonkard ${getPokemonTypeClass(pokeTypes)}">
        <div class="NameIDstyle">
            <p>#${Idpoke}</p>
            <h2>${namePoke}</h2>
            <div class="typepoke">
                <p>${pokeTypes}</p>
            </div>
        </div>

        <div class="Imgtypestyle">
            <div class="click-overlay"></div>
            <img src="${imgPoke}">
        </div>
    </div>
    `;
}

function getPokemonTypeClass(types) {
    let typeClass = '';
    if (types.includes('bug')) {
        typeClass = 'bugType';
    } else if (types.includes('grass')) {
        typeClass = 'grassType';
    } else if (types.includes('dark')) {
        typeClass = 'darkType';
    } else if (types.includes('fire')) {
        typeClass = 'fireType';
    } else if (types.includes('rock')) {
        typeClass = 'rockType';
    } else if (types.includes('water')) {
        typeClass = 'waterType';
    } else if (types.includes('normal')) {
        typeClass = 'normalType';
    } else if (types.includes('electric')) {
        typeClass = 'electricType';
    } else if (types.includes('steel')) {
        typeClass = 'steelType';
    } else if (types.includes('ghost')) {
        typeClass = 'ghostType';
    } else if (types.includes('poison')) {
        typeClass = 'poisonType';
    } else if (types.includes('ice,')) {
        typeClass = 'iceType';
    } else if (types.includes('ground')) {
        typeClass = 'groundType';
    } else if (types.includes('fairy')) {
        typeClass = 'fairyType';
    } else if (types.includes('fighting')) {
        typeClass = 'fightingType';
    } else if (types.includes('psychic')) {
        typeClass = 'psychicType';
    } else if (types.includes('dragon')) {
        typeClass = 'dragonType';
    }

    return typeClass;
}