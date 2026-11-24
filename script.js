
/* ==========================================
   WORLD AT WAR
   MAIN GAME ENGINE
   START DATE: 1 JANUARY 1936
========================================== */

const game = {
    started: false,
    paused: true,
    day: 1,
    month: 1,
    year: 1936,
    speed: 1
};

const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];

// ==========================================
// COUNTRY DATABASE
// Population: millions
// Army: thousands of personnel
// Factories: game values
// ==========================================

const countryDatabase = {

    "Germany": {
        population: 66.0,
        army: 550,
        divisions: 36,
        military: 8,
        civilian: 25,
        steel: 35,
        oil: 2,
        manpower: 12000
    },

    "Soviet Union": {
        population: 170.0,
        army: 1350,
        divisions: 100,
        military: 20,
        civilian: 35,
        steel: 45,
        oil: 30,
        manpower: 35000
    },

    "United States": {
        population: 128.0,
        army: 175,
        divisions: 10,
        military: 15,
        civilian: 50,
        steel: 60,
        oil: 100,
        manpower: 25000
    },

    "United Kingdom": {
        population: 47.0,
        army: 230,
        divisions: 9,
        military: 10,
        civilian: 30,
        steel: 25,
        oil: 5,
        manpower: 9000
    },

    "France": {
        population: 41.5,
        army: 650,
        divisions: 30,
        military: 12,
        civilian: 25,
        steel: 30,
        oil: 3,
        manpower: 10000
    },

    "Italy": {
        population: 42.0,
        army: 500,
        divisions: 40,
        military: 8,
        civilian: 15,
        steel: 8,
        oil: 1,
        manpower: 8000
    },

    "Japan": {
        population: 69.0,
        army: 250,
        divisions: 17,
        military: 12,
        civilian: 20,
        steel: 5,
        oil: 2,
        manpower: 12000
    },

    "Poland": {
        population: 34.0,
        army: 300,
        divisions: 30,
        military: 5,
        civilian: 12,
        steel: 10,
        oil: 1,
        manpower: 7000
    },

    "China": {
        population: 500.0,
        army: 2000,
        divisions: 100,
        military: 3,
        civilian: 15,
        steel: 8,
        oil: 2,
        manpower: 50000
    },

    "Spain": {
        population: 24.0,
        army: 200,
        divisions: 20,
        military: 3,
        civilian: 12,
        steel: 8,
        oil: 1,
        manpower: 5000
    },

    "Romania": {
        population: 19.0,
        army: 180,
        divisions: 20,
        military: 4,
        civilian: 8,
        steel: 5,
        oil: 12,
        manpower: 4000
    },

    "Turkey": {
        population: 16.0,
        army: 150,
        divisions: 20,
        military: 2,
        civilian: 8,
        steel: 3,
        oil: 1,
        manpower: 4000
    },

    "Czechoslovakia": {
        population: 15.0,
        army: 150,
        divisions: 17,
        military: 7,
        civilian: 12,
        steel: 12,
        oil: 1,
        manpower: 3500
    },

    "Netherlands": {
        population: 8.5,
        army: 70,
        divisions: 8,
        military: 3,
        civilian: 10,
        steel: 5,
        oil: 2,
        manpower: 1500
    },

    "Belgium": {
        population: 8.3,
        army: 100,
        divisions: 12,
        military: 3,
        civilian: 8,
        steel: 8,
        oil: 1,
        manpower: 1500
    },

    "Sweden": {
        population: 6.2,
        army: 40,
        divisions: 6,
        military: 3,
        civilian: 10,
        steel: 15,
        oil: 1,
        manpower: 1200
    },

    "Norway": {
        population: 2.9,
        army: 20,
        divisions: 4,
        military: 1,
        civilian: 4,
        steel: 2,
        oil: 1,
        manpower: 500
    },

    "Finland": {
        population: 3.7,
        army: 30,
        divisions: 9,
        military: 1,
        civilian: 4,
        steel: 3,
        oil: 1,
        manpower: 800
    },

    "Portugal": {
        population: 7.2,
        army: 45,
        divisions: 5,
        military: 1,
        civilian: 5,
        steel: 2,
        oil: 1,
        manpower: 1000
    },

    "Greece": {
        population: 7.0,
        army: 80,
        divisions: 10,
        military: 1,
        civilian: 4,
        steel: 2,
        oil: 1,
        manpower: 1200
    },

    "Hungary": {
        population: 9.0,
        army: 80,
        divisions: 7,
        military: 2,
        civilian: 5,
        steel: 3,
        oil: 1,
        manpower: 1500
    },

    "Bulgaria": {
        population: 6.3,
        army: 60,
        divisions: 8,
        military: 1,
        civilian: 4,
        steel: 2,
        oil: 1,
        manpower: 1000
    },

    "Canada": {
        population: 11.0,
        army: 10,
        divisions: 1,
        military: 2,
        civilian: 8,
        steel: 10,
        oil: 5,
        manpower: 2000
    },

    "Australia": {
        population: 6.8,
        army: 15,
        divisions: 2,
        military: 2,
        civilian: 6,
        steel: 8,
        oil: 2,
        manpower: 1200
    },

    "Brazil": {
        population: 40.0,
        army: 80,
        divisions: 8,
        military: 2,
        civilian: 8,
        steel: 3,
        oil: 2,
        manpower: 6000
    },

    "Mexico": {
        population: 18.0,
        army: 50,
        divisions: 5,
        military: 1,
        civilian: 5,
        steel: 2,
        oil: 5,
        manpower: 3000
    },

    "Argentina": {
        population: 13.0,
        army: 60,
        divisions: 8,
        military: 2,
        civilian: 7,
        steel: 2,
        oil: 2,
        manpower: 2500
    },

    "South Africa": {
        population: 9.5,
        army: 15,
        divisions: 2,
        military: 1,
        civilian: 5,
        steel: 4,
        oil: 1,
        manpower: 1500
    },

    "New Zealand": {
        population: 1.6,
        army: 5,
        divisions: 1,
        military: 1,
        civilian: 3,
        steel: 1,
        oil: 1,
        manpower: 300
    }
};

// ==========================================
// DEFAULT COUNTRY STATISTICS
// Used for countries not yet in the database
// ==========================================

function generateCountryStats(name) {
    let hash = 0;

    for (let i = 0; i < name.length; i++) {
        hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
    }

    return {
        population: 1 + (hash % 140) / 10,
        army: 5 + (hash % 500),
        divisions: 1 + (hash % 12),
        military: 1 + (hash % 4),
        civilian: 2 + (hash % 8),
        steel: 1 + (hash % 10),
        oil: hash % 5,
        manpower: 300 + (hash % 3000)
    };
}

// ==========================================
// GET COUNTRY DATA
// ==========================================

function getCountryStats(name) {
    return countryDatabase[name] || generateCountryStats(name);
}

// ==========================================
// CREATE COUNTRY INFORMATION PANEL
// ==========================================

function createCountryStatsPanel() {
    if (document.getElementById("country-stats")) return;

    const selector = document.getElementById("country-select");

    if (!selector) {
        console.warn("Country selector not found.");
        return;
    }

    const panel = document.createElement("div");
    panel.id = "country-stats";

    panel.style.cssText = `
        margin-top: 18px;
        padding: 14px;
        background: #182a38;
        border: 1px solid #53677a;
        color: #e5edf3;
        font-size: 12px;
        line-height: 1.8;
    `;

    selector.insertAdjacentElement("afterend", panel);

    renderCountryStats();
}

// ==========================================
// DISPLAY COUNTRY STATISTICS
// ==========================================

function renderCountryStats() {
    const panel = document.getElementById("country-stats");

    if (!panel) return;

    const name = game.country;
    const stats = getCountryStats(name);

    panel.innerHTML = `
        <div style="
            color:#d0ad68;
            font-size:14px;
            font-weight:bold;
            margin-bottom:10px;
            letter-spacing:1px;
        ">
            NATIONAL OVERVIEW
        </div>

        <div>Population: <b>${stats.population.toFixed(1)} million</b></div>
        <div>Army: <b>${stats.army.toLocaleString("en-US")} thousand</b></div>
        <div>Divisions: <b>${stats.divisions}</b></div>

        <div style="
            color:#d0ad68;
            margin-top:12px;
            font-weight:bold;
        ">
            INDUSTRY
        </div>

        <div>Military factories: <b>${stats.military}</b></div>
        <div>Civilian factories: <b>${stats.civilian}</b></div>

        <div style="
            color:#d0ad68;
            margin-top:12px;
            font-weight:bold;
        ">
            RESOURCES
        </div>

        <div>Steel: <b>${stats.steel}</b></div>
        <div>Oil: <b>${stats.oil}</b></div>
        <div>Manpower: <b>${stats.manpower.toLocaleString("en-US")} thousand</b></div>

        <div style="
            color:#8799a8;
            font-size:9px;
            margin-top:12px;
        ">
            Historical scenario: 1936
        </div>
    `;
}

// ==========================================
// COUNTRY SELECTION
// ==========================================

function selectCountry(country) {
    game.country = country;

    if (typeof chooseMapCountry === "function") {
        chooseMapCountry(country);
    }

    updateInterface();
}

// ==========================================
// START GAME
// ==========================================

function startGame() {
    game.started = true;
    game.paused = false;

    game.day = 1;
    game.month = 1;
    game.year = 1936;

    updateInterface();

    console.log("Campaign started!");
}

// ==========================================
// GAME DATE
// ==========================================

function nextDay() {
    if (!game.started || game.paused) return;

    game.day++;

    const daysInMonth = new Date(
        game.year,
        game.month,
        0
    ).getDate();

    if (game.day > daysInMonth) {
        game.day = 1;
        game.month++;

        if (game.month > 12) {
            game.month = 1;
            game.year++;
        }
    }

    updateInterface();
}

// ==========================================
// PAUSE
// ==========================================

function pauseGame() {
    game.paused = !game.paused;
    updateInterface();
}

// ==========================================
// GAME SPEED
// ==========================================

function changeSpeed(speed) {
    game.speed = speed;
    updateInterface();
}

// ==========================================
// UPDATE INTERFACE
// ==========================================

function updateInterface() {
    const dateElement = document.getElementById("game-date");
    const pauseButton = document.getElementById("pause-button");
    const countryElement = document.getElementById("selected-country");

    if (dateElement) {
        dateElement.textContent =
            game.day + " " + months[game.month - 1] + " " + game.year;
    }

    if (pauseButton) {
        pauseButton.textContent = game.paused ? "RESUME" : "PAUSE";
    }

    if (countryElement) {
        countryElement.textContent = game.country;
    }

    renderCountryStats();
}

// ==========================================
// AUTOMATIC COUNTRY CHANGE DETECTION
// Works with map.js
// ==========================================

let currentCountry = "Germany";

Object.defineProperty(game, "country", {
    get: function() {
        return currentCountry;
    },

    set: function(value) {
        currentCountry = value;

        if (document.readyState !== "loading") {
            updateInterface();
        }
    }
});

// ==========================================
// GAME LOOP
// ==========================================

setInterval(function() {
    if (game.started && !game.paused) {
        for (let i = 0; i < game.speed; i++) {
            nextDay();
        }
    }
}, 1000);

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", function() {
    createCountryStatsPanel();
    updateInterface();
});

console.log("WORLD AT WAR engine loaded!");
