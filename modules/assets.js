//assets
let dial_open = false
let winner
let game_state = ""
let kierunek = ""
let kierunek_info = ""
let wybrane_kierunki = []
let kierunki = []
let players = []
let players_kol = [0, 0, 0, 0]
let loading = 0

let img = new Image()
img.src = "grass_tx3.jpg"
img.onload = () => {
    loading++
    game.assets_check(loading)
}

let img2 = new Image()
img2.src = "dirt_tx4.jpg"
img2.onload = () => {
    loading++
    game.assets_check(loading)
}

let img_p1 = new Image();
img_p1.src = "motorcycle_red.png"
img_p1.onload = () => {
    loading++
    game.assets_check(loading)
}
let img_p2 = new Image();
img_p2.src = "motorcycle_green.png"
img_p2.onload = () => {
    loading++
    game.assets_check(loading)
}
let img_p3 = new Image();
img_p3.src = "motorcycle_blue.png"
img_p3.onload = () => {
    loading++
    game.assets_check(loading)
}
let img_p4 = new Image();
img_p4.src = "motorcycle_white.png"
img_p4.onload = () => {
    loading++
    game.assets_check(loading)
}