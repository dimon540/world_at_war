
// ==========================================
// WORLD AT WAR
// INTERACTIVE WORLD MAP
// ==========================================

const worldSvg = d3.select("#world-map");

let selectedMapCountry = "Germany";

const mapColors = [
    "#526d80",
    "#647b8c",
    "#596f82",
    "#71828b",
    "#536578",
    "#7b786c",
    "#5b7180",
    "#687d8c"
];

let worldCountries = [];
let worldProjection;
let worldPath;

// ==========================================
// COUNTRY NAMES
// ==========================================

function getCountryName(feature) {
    const name = feature.properties.name;

    if (name === "Russia") return "Soviet Union";
    if (name === "United States of America") return "United States";

    return name;
}

// ==========================================
// SELECT COUNTRY
// ==========================================

function chooseMapCountry(name) {
    selectedMapCountry = name;

    const countryLabel = document.getElementById("selected-country");
    const selector = document.getElementById("country-select");

    if (countryLabel) {
        countryLabel.textContent = name;
    }

    if (selector) {
        selector.value = name;
    }

    if (typeof game !== "undefined") {
        game.country = name;
    }

    updateMapSelection();
}

// ==========================================
// UPDATE COUNTRY HIGHLIGHT
// ==========================================

function updateMapSelection() {
    worldSvg.selectAll(".country")
        .classed("selected", function(d) {
            return getCountryName(d) === selectedMapCountry;
        });
}

// ==========================================
// CREATE COUNTRY LIST
// ==========================================

function createCountryList(countries) {
    const selector = document.getElementById("country-select");

    if (!selector) {
        console.error("Country selector not found!");
        return;
    }

    const names = countries
        .map(country => getCountryName(country))
        .filter((name, index, array) => array.indexOf(name) === index)
        .sort((a, b) => a.localeCompare(b));

    selector.innerHTML = "";

    names.forEach(name => {
        const option = document.createElement("option");

        option.value = name;
        option.textContent = name;

        selector.appendChild(option);
    });

    selector.value = selectedMapCountry;

    if (!selector.value && names.length > 0) {
        chooseMapCountry(names[0]);
    }
}

// ==========================================
// DRAW MAP
// ==========================================

function drawWorldMap() {
    const svgElement = document.getElementById("world-map");

    const width = svgElement.clientWidth;
    const height = svgElement.clientHeight;

    if (!width || !height) {
        console.warn("Map container has no size yet.");
        return;
    }

    worldProjection = d3.geoNaturalEarth1()
        .fitSize([width, height], {
            type: "FeatureCollection",
            features: worldCountries
        });

    worldPath = d3.geoPath()
        .projection(worldProjection);

    worldSvg
        .attr("viewBox", `0 0 ${width} ${height}`);

    worldSvg.selectAll(".country")
        .data(worldCountries)
        .join("path")
        .attr("class", "country")
        .attr("d", worldPath)
        .attr("fill", (d, i) => mapColors[i % mapColors.length])
        .on("click", function(event, d) {
            chooseMapCountry(getCountryName(d));
        })
        .append("title")
        .text(d => getCountryName(d));

    updateMapSelection();
}

// ==========================================
// LOAD WORLD MAP
// ==========================================

async function loadWorldMap() {
    try {
        console.log("Loading world map...");

        const response = await fetch(
            "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
        );

        if (!response.ok) {
            throw new Error("Could not download world map data.");
        }

        const worldData = await response.json();

        worldCountries = topojson.feature(
            worldData,
            worldData.objects.countries
        ).features;

        createCountryList(worldCountries);
        drawWorldMap();

        console.log("WORLD MAP LOADED!");
        console.log("Countries loaded:", worldCountries.length);

    } catch (error) {
        console.error("MAP ERROR:", error);

        const mapInfo = document.querySelector(".map-info p");

        if (mapInfo) {
            mapInfo.textContent =
                "Map loading error. Check your internet connection.";
        }
    }
}

// ==========================================
// RESIZE MAP
// ==========================================

window.addEventListener("resize", function() {
    if (worldCountries.length > 0) {
        drawWorldMap();
    }
});

// ==========================================
// START
// ==========================================

loadWorldMap();
