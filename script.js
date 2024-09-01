// Function to capitalize the first letter of each word
function capitalize(str) {
    return str.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Function to fetch all country capitals and return a mapping
async function fetchCountryCapitals() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countriesData = await response.json();

        // Map country names to their capitals
        const countryCapitalData = {};
        countriesData.forEach(country => {
            const countryName = country.name.common.toLowerCase();
            const capital = country.capital ? country.capital[0] : null; // Some countries do not have capitals
            if (capital) {
                countryCapitalData[countryName] = capital;
            }
        });

        return countryCapitalData;
    } catch (error) {
        console.error('Failed to fetch country capitals:', error);
        return {}; // Return an empty object on error
    }
}

// Placeholder for normalized country capital data
let normalizedCountryCapitalData = {};

// Fetch country capitals when the page loads
fetchCountryCapitals().then(data => {
    normalizedCountryCapitalData = data;
});

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
    // Check if the Enter key was pressed
    if (event.key === "Enter") {
        findCapital(); // Call the findCapital function
    }
});