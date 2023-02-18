//klawisze
document.getElementById("body").onkeydown = function (e) {
    if (!kierunki.includes(e.code)) {
        kierunki.push(e.code)
    }
    kierunek = e.code
    kierunek_info = e.key
}

document.getElementById("body").onkeyup = function (e) {
    kierunki.splice(kierunki.indexOf(e.code), 1)
    kierunek = ""
    kierunek_info = ""
}

setInterval(() => {
    if (game_state == "play") {
        let temp_check = 0
        game.render()
        players.forEach(pl => {
            pl.movement(kierunki)
            temp_check++
            if (pl.alive) {
                winner = pl.name
            } else {
                temp_check--
            }
        })
        if (players.length > 1) {
            if (temp_check < 2) {
                game_state = "end"
                game.ending("win", winner)
            }

        } else {
            if (temp_check < 1) {
                game_state = "end"
                game.ending("lost", "you")
            }
        }
    }
}, 16);