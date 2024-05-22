// Associates type with its color
const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
};

const cardContainer = document.querySelector(".card-container");
const nameHeading = document.getElementById("poke-head");
const cryButton = document.getElementById("cry-btn");
const cry = document.createElement("audio");
const spriteImg = document.getElementById("poke-sprite");
const error = document.getElementById("error");

// Fetches data from PokeAPI
async function fetchData() {
    const pokemonName = document.getElementById("poke-name").value.toLowerCase();
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();

        // Display Pokemon Data
        displayPokemonData(data);
    }
    catch (error) {
        console.error(error);
        displayError();
    }
}

// Displays Pokemon data on card
function displayPokemonData(data) {
    // Hide error message
    error.style.display = "none";

    // Show card container
    cardContainer.style.display = "flex";

    // Display Pokemon Name and ID
    nameHeading.innerText = data.name.charAt(0).toUpperCase() + data.name.slice(1) + " #" + data.id;

    // Display Pokemon Sprite
    const pokemonSprite = data.sprites.front_default;
    spriteImg.src = pokemonSprite;
    spriteImg.style.display = "block";

    // Set source of pokemon cry button
    cry.src = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${data.id}.ogg`;

    // Append types to card
    appendTypes(data.types);

    // Display stats
    document.getElementById('attack').textContent = data.stats[1].base_stat;
    document.getElementById('defense').textContent = data.stats[2].base_stat;
    document.getElementById('speed').textContent = data.stats[5].base_stat;
}

// Append types to card
function appendTypes(types) {
    // Get the types container
    let typesContainer = document.querySelector(".types");

    // Clear the types container
    typesContainer.innerHTML = '';

    // Append each type to the container using span elements
    types.forEach((item) => {
        let span = document.createElement("SPAN");
        span.textContent = item.type.name;

        // Apply the color based on the type
        span.style.backgroundColor = typeColor[item.type.name];

        typesContainer.appendChild(span);
    });

    // Color the cry button based on the first type
    cryButton.style.color = typeColor[types[0].type.name];
}

// Shows error whenever a user inputs an invalid name
function displayError() {
    // Hide card container 
    cardContainer.style.display = "none";

    // Display error message
    error.style.display = "block";
}

// Play Pokemon cry with click of play button
function playCry() {
    cry.play();
}