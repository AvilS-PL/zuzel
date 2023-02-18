import { dane, img, img2, img_p1, img_p2, img_p3, img_p4 } from "./assets.js"
import { Player } from "./player.js"
import { game } from "./map.js"

//klawisze
document.getElementById("body").onkeydown = function (e) {
    if (!dane.kierunki.includes(e.code)) {
        dane.kierunki.push(e.code)
    }
    dane.kierunek = e.code
    dane.kierunek_info = e.key
}

document.getElementById("body").onkeyup = function (e) {
    dane.kierunki.splice(dane.kierunki.indexOf(e.code), 1)
    dane.kierunek = ""
    dane.kierunek_info = ""
}

setInterval(() => {
    if (dane.game_state == "play") {
        let temp_check = 0
        game.render()
        dane.players.forEach(pl => {
            pl.movement(dane.kierunki)
            temp_check++
            if (pl.alive) {
                dane.winner = pl.name
            } else {
                temp_check--
            }
        })
        if (dane.players.length > 1) {
            if (temp_check < 2) {
                dane.game_state = "end"
                game.ending("win", dane.winner)
            }

        } else {
            if (temp_check < 1) {
                dane.game_state = "end"
                game.ending("lost", "you")
            }
        }
    }
}, 16);