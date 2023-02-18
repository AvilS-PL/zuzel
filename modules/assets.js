//assets
import { game } from "./map.js"
export let dane = {
    dial_open: false,
    winner: "",
    game_state: "",
    kierunek: "",
    kierunek_info: "",
    wybrane_kierunki: [],
    kierunki: [],
    players: [],                //
    players_kol: [0, 0, 0, 0],
    loading: 0,
}


export let img = new Image()
img.src = "grass_tx3.jpg"
img.onload = () => {
    dane.loading++
    game.assets_check(dane.loading)
}

export let img2 = new Image()
img2.src = "dirt_tx4.jpg"
img2.onload = () => {
    dane.loading++
    game.assets_check(dane.loading)
}

export let img_p1 = new Image();
img_p1.src = "motorcycle_red.png"
img_p1.onload = () => {
    dane.loading++
    game.assets_check(dane.loading)
}
export let img_p2 = new Image();
img_p2.src = "motorcycle_green.png"
img_p2.onload = () => {
    dane.loading++
    game.assets_check(dane.loading)
}
export let img_p3 = new Image();
img_p3.src = "motorcycle_blue.png"
img_p3.onload = () => {
    dane.loading++
    game.assets_check(dane.loading)
}
export let img_p4 = new Image();
img_p4.src = "motorcycle_white.png"
img_p4.onload = () => {
    dane.loading++
    game.assets_check(dane.loading)
}