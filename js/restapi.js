const apiUrl = "https://restcountries.com/v3.1/";

let originalCountriesData;

const loadCountryApi = async () => {
    try {
        const response = await fetch(`${apiUrl}all`);
        originalCountriesData = await response.json();
        const sortedCountries = originalCountriesData.sort((a, b) => a.name.common.localeCompare(b.name.common));
        displayCountries(sortedCountries);
    } catch (error) {
        console.error("Error fetching country data:", error);
    }
};

const displayCountries = countries => {
    const countriesHTML = countries.map(getCountry);
    document.getElementById("countries").innerHTML = countriesHTML.join(" ");
};

const getCountry = country => `
    <div class="country-wrapper">
        <img src="${country.flags.png}">
        <h2>${country.name.common}</h2>
        <hr>
        <h4>Population: ${country.population}</h4>
        <h4>Region: ${country.region}</h4>
        <h4>Capital: ${country.capital}</h4>
    </div>
`;

const searchBtn = document.getElementById("search-btn");
const countryInp = document.getElementById("country-input");
const continentSelect = document.getElementById("continent-select"); 

const searchCountry = async () => {
    const countryName = countryInp.value.trim();

    if (!countryName) {
        alert("Please enter a country name");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}name/${countryName}?fullText=true`);
        const data = await response.json();

        if (data.length > 0) {
            displayCountries(data);
        } else {
            alert("No country found with that name");
        }
    } catch (error) {
        console.error("Error fetching country data:", error);
    }
};

const clearSearch = () => {
    countryInp.value = "";
    loadCountryApi();
    continentSelect.value = ""; 
};

searchBtn.addEventListener("click", searchCountry);

loadCountryApi();


const filterByContinent = () => {
    const selectedContinent = continentSelect.value;

    if (selectedContinent) {
        const filteredCountries = originalCountriesData.filter(country => country.region === selectedContinent);
        displayCountries(filteredCountries);
    } else {
        loadCountryApi(); 
    }
};

