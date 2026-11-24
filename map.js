
// ==================================
// WORLD AT WAR
// INTERACTIVE WORLD MAP
// ==================================

const worldSvg = d3.select("#world-map");

let selectedMapCountry = "Germany";

const mapColors = [
    "#526d80",
    "#647b8c",
    "#596f82",
    "#71828b",
    "#536578",
    "#7b786c",
    "#5b7180"
];

// Названия стран
function getCountryName(feature) {
    const name = feature.properties.name;

    if (name === "Russia") {
        return "Soviet Union";
    }

    if (name === "United States of America") {
        return "United States";
    }

    return name;
}

// Выбор страны
function chooseMapCountry(name) {

    selectedMapCountry = name;

    document.getElementById(
        "selected-country"
    ).textContent = name;

    const selector = document.getElementById(
        "country-select"
    );

    const option = Array.from(selector.options)
        .find(item => item.value === name);

    if (option) {
        selector.value = name;
    }

    if (typeof game !== "undefined") {
        game.country = name;
    }

    updateMapSelection();
}

// Подсветка выбранной страны
function updateMapSelection() {

    worldSvg.selectAll(".country")
        .classed("selected", function(d) {
            return getCountryName(d) === selectedMapCountry;
        });

}

// Загрузка карты
async function loadWorldMap() {

    try {

        const response = await fetch(
            "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
        );

        const worldData = await response.json();

        const countries = topojson.feature(
            worldData,
            worldData.objects.countries
        ).features;

        const width = document.getElementById(
            "world-map"
        ).clientWidth;

        const height = document.getElementById(
            "world-map"
        ).clientHeight;

        const projection = d3.geoNaturalEarth1()
            .fitSize([width, height], {
                type: "FeatureCollection",
                features: countries
            });

        const path = d3.geoPath()
            .projection(projection);

        worldSvg
            .attr("viewBox", `0 0 ${width} ${height}`);

        worldSvg.selectAll(".country")
            .data(countries)
            .join("path")
            .attr("class", "country")
            .attr("d", path)
            .attr("fill", (d, i) => {
                return mapColors[i % mapColors.length];
            })
            .on("click", function(event, d) {

                chooseMapCountry(getCountryName(d));

            })
            .append("title")
            .text(d => getCountryName(d));

        updateMapSelection();

        console.log("WORLD MAP LOADED!");

    } catch (error) {

        console.error("MAP ERROR:", error);

        document.querySelector(".map-info p")
            .textContent = "Map loading error. Check internet.";

    }

}

// Запускаем загрузку
loadWorldMap();
