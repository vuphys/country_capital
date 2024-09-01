const countryCapitalData = {
    "united states": "Washington, D.C.",
    "canada": "Ottawa",
    "united kingdom": "London",
    "france": "Paris",
    "germany": "Berlin",
    "japan": "Tokyo",
    "australia": "Canberra",
    "india": "New Delhi",
    "brazil": "Brasília",
    "mexico": "Mexico City"
    // Add more countries and their capitals as needed
};

// Convert keys to lowercase for case-insensitive matching
const normalizedCountryCapitalData = Object.fromEntries(
    Object.entries(countryCapitalData).map(([country, capital]) => [country.toLowerCase(), capital])
);

// Function to capitalize the first letter of each word
function capitalize(str) {
    return str.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function findCapital() {
    // Get user input and normalize it to lowercase
    const countryName = document.getElementById("countryInput").value.trim().toLowerCase(); 
    const capital = normalizedCountryCapitalData[countryName]; // Look up normalized input

    // Check if the capital exists for the given country, output the result
    if (capital) {
        document.getElementById("result").textContent = `The capital of ${capitalize(countryName)} is ${capital}.`;
    } else {
        document.getElementById("result").textContent = `Sorry, I couldn't find the capital for "${capitalize(countryName)}".`;
    }
}

document.getElementById("findCapitalButton").addEventListener("click", findCapital);

document.getElementById("countryInput").addEventListener("keydown", function(event) {
    // Check if the Enter key (keyCode 13) was pressed
    if (event.key === "Enter") {
        findCapital(); // Call the findCapital function
    }
});