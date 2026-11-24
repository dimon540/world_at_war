
let game = {
    started: false,
    paused: true,
    day: 1,
    month: 1,
    year: 1936,
    speed: 1,
    country: "Germany"
};

const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];

function startGame() {
    game.started = true;
    game.paused = false;
    game.day = 1;
    game.month = 1;
    game.year = 1936;
    updateInterface();
}

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

function pauseGame() {
    game.paused = !game.paused;
    updateInterface();
}

function changeSpeed(speed) {
    game.speed = speed;
    updateInterface();
}

function selectCountry(country) {
    game.country = country;

    if (typeof chooseMapCountry === "function") {
        chooseMapCountry(country);
    } else {
        updateInterface();
    }
}

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
}

setInterval(function() {
    if (game.started && !game.paused) {
        for (let i = 0; i < game.speed; i++) {
            nextDay();
        }
    }
}, 1000);

console.log("WORLD AT WAR engine loaded!");
