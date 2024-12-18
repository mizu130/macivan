function getPokemon() {
    const pokemonName = document.getElementById("pokemonInput").value.toLowerCase();

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {

            const abilitiesPromise = fetch(data.abilities[0].ability.url).then(response => response.json());
            const speciesPromise = fetch(data.species.url).then(response => response.json());

            return Promise.all([data, abilitiesPromise, speciesPromise]);
        })
        .then(([pokemonData, abilitiesData, speciesData]) => {

            displayPokemonInfo(pokemonData, abilitiesData, speciesData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Error fetching data. Please try again.');
        });
}

function displayPokemonInfo(pokemonData, abilitiesData, speciesData) {
    const pokemonInfoDiv = document.getElementById("pokemonInfo");

    pokemonInfoDiv.innerHTML = "";

    const nameElement = document.createElement("p");
    nameElement.textContent = `Name: ${pokemonData.name}`;

    const idElement = document.createElement("p");
    idElement.textContent = `ID: ${pokemonData.id}`;

    const typesElement = document.createElement("p");
    typesElement.textContent = `Types: ${pokemonData.types.map(type => type.type.name).join(', ')}`;

    const abilitiesElement = document.createElement("p");
    abilitiesElement.textContent = `Abilities: ${abilitiesData.names[0].name}`;

    const imageElement = document.createElement("img");
    imageElement.src = pokemonData.sprites.front_default;
    imageElement.alt = pokemonData.name;

    const evolutionChainUrl = speciesData.evolution_chain.url;


    fetch(evolutionChainUrl)
        .then(response => response.json())
        .then(evolutionData => {
            const evolutionElement = document.createElement("p");
            evolutionElement.textContent = `Evolution: ${getEvolutionChain(evolutionData.chain)}`;
            pokemonInfoDiv.appendChild(evolutionElement);
        });

    pokemonInfoDiv.appendChild(nameElement);
    pokemonInfoDiv.appendChild(idElement);
    pokemonInfoDiv.appendChild(typesElement);
    pokemonInfoDiv.appendChild(abilitiesElement);
    pokemonInfoDiv.appendChild(imageElement);
}


function getEvolutionChain(chain) {
    let evolutionChain = chain.species.name;
    if (chain.evolves_to.length > 0) {
        evolutionChain += " -> " + getEvolutionChain(chain.evolves_to[0]);
    }
    return evolutionChain;
}

function plusFunction() {
    let num1 = document.getElementById("num1").value;
    let num2 = document.getElementById("num2").value;
    document.getElementById("result").innerHTML = parseInt(num1) + parseInt(num2);
}

function minusFunction() {
    let num1 = document.getElementById("num1").value;
    let num2 = document.getElementById("num2").value;
    document.getElementById("result").innerHTML = parseInt(num1) - parseInt(num2);
}

function multiFunction() {
    let num1 = document.getElementById("num1").value;
    let num2 = document.getElementById("num2").value;
    document.getElementById("result").innerHTML = parseInt(num1) * parseInt(num2);
}

function divideFunction() {
    let num1 = document.getElementById("num1").value;
    let num2 = document.getElementById("num2").value;
    document.getElementById("result").innerHTML = parseInt(num1) / parseInt(num2);
}

function newFunc() {
    x = document.getElementById("cat").value;
    console.log(parseInt(x) - 2023);

    if (parseInt(x) >= 18) {
        console.log("you are in legal age")
    } else {
        console.log("you are not in legal age")
    }
}

function MACFunc() {
    const inputDate = document.getElementById("out").value
    const d = new Date(inputDate)
    const today = d.getDay()

    let dayValue = ""
    switch (today) {
        case 1:
            dayValue = "Monday"
            break;
        case 2:
            dayValue = "Tuesday"
            break;
        case 3:
            dayValue = "Wednesday"
            break;
        case 4:
            dayValue = "Thursday"
            break;
        case 5:
            dayValue = "Friday"
            break;
        case 6:
            dayValue = "Saturday"
            break;
        case 0:
            dayValue = "Sunday"
            break;
    }

    document.getElementById("res").innerHTML = dayValue
}

function generateSnowflakes() {
    const numberOfSnowflakes = 100;
    for (let i = 0; i < numberOfSnowflakes; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.innerHTML = '❄';
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.animationDuration = `${Math.random() * 3 + 7}s`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        document.body.appendChild(snowflake);
    }
}

window.onload = generateSnowflakes;