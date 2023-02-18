import { game } from "./map.js"
import { dane, img, img2, img_p1, img_p2, img_p3, img_p4 } from "./assets.js"

//class Player
export class Player {
    constructor(name, key1, opis_key1, key2, opis_key2, number, player_number, color) {
        this.counter = 5
        this.checker1 = false
        this.checker2 = false
        this.color = color
        this.alive = true
        this.player_number = player_number
        this.number = number
        this.name = name
        this.key1 = key1
        this.key2 = key2
        this.opis_key1 = opis_key1
        this.opis_key2 = opis_key2
        this.angle = 90
        this.speed = 4
        this.x = game.wid / 2
        this.y = game.hei / 2 + game.hei / 5 + ((game.hei / 2 - game.hei / 5) / 5) * this.number
        this.tab = [{
            x: this.x - this.speed,
            y: this.y
        }, {
            x: this.x,
            y: this.y
        }]

        this.generate_player()
        this.menu()

    }

    generate_player() {
        this.x = game.wid / 2
        this.y = game.hei / 2 + game.hei / 5 + ((game.hei / 2 - game.hei / 5) / 5) * this.number
        this.tab = [{
            x: this.x - this.speed,
            y: this.y
        }, {
            x: this.x,
            y: this.y
        }]
        if (this.menu_name_input) {
        }

        let cv = document.getElementById("canvas")
        let ctx = cv.getContext("2d")
        ctx.strokeStyle = "rgba(0,0,0,1)"
        ctx.lineWidth = game.lwid
        ctx.translate(this.x, this.y)
        ctx.rotate((2 * Math.PI / 360) * -(this.angle - 90))
        ctx.drawImage(this.color, 0, 0, 256, 128, -16, -8, 32, 16)
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    game_init() {
        this.menu_name_input.disabled = true
        this.menu_bt1.disabled = true
        this.menu_bt2.disabled = true
        this.menu_del.disabled = true
        this.menu_bt1.innerText = this.opis_key1
        this.menu_bt2.innerText = this.opis_key2
        this.name = this.menu_name_input.value
        this.generate_player()
    }

    movement(temp_key) {
        if (temp_key.includes(this.key2) && this.alive) {        //prawo
            this.angle -= 3
        } else if (temp_key.includes(this.key1) && this.alive) {     //lewo
            this.angle += 3
        }

        let cv = document.getElementById("canvas")
        let ctx = cv.getContext("2d")
        ctx.lineWidth = game.lwid
        for (let i = 1; i < this.tab.length; i++) {
            ctx.strokeStyle = "rgba(0,0,0," + (i / (this.tab.length - 1)) + ")"
            ctx.beginPath()
            ctx.moveTo(this.tab[i - 1].x, this.tab[i - 1].y)
            ctx.lineTo(this.tab[i].x, this.tab[i].y)
            ctx.stroke()
            ctx.closePath()
        }

        ctx.strokeStyle = "rgba(0,0,0,1)"
        this.x = this.x + (this.speed * Math.sin((2 * Math.PI / 360) * this.angle))
        this.y = this.y + (this.speed * Math.cos((2 * Math.PI / 360) * this.angle))

        ctx.translate(this.x, this.y)
        ctx.rotate((2 * Math.PI / 360) * -(this.angle - 90))
        ctx.drawImage(this.color, 0, 0, 256, 128, -16, -8, 32, 16)
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        this.tab.push({
            x: this.x,
            y: this.y
        })
        if (this.tab.length > 19) {
            this.tab.shift()
        }
        this.movement_check()
    }

    movement_check() {
        let temp_path_check = 0
        let cv = document.getElementById("canvas")
        let ctx = cv.getContext("2d")
        ctx.lineWidth = this.lwid
        ctx.strokeStyle = "rgb(0,0,0,1)"

        ctx.beginPath()
        ctx.arc(game.hei / 2, game.hei / 2, game.hei / 2 - game.lwid / 2, (2 * Math.PI) / 360 * 270, (2 * Math.PI) / 360 * 90, true);
        ctx.arc(game.wid - (game.hei / 2), game.hei / 2, game.hei - (game.hei / 2) - game.lwid / 2, (2 * Math.PI) / 360 * 90, (2 * Math.PI) / 360 * 270, true);
        ctx.closePath()
        if (!ctx.isPointInPath(this.x + (16 * Math.sin((2 * Math.PI / 360) * this.angle)), this.y + (16 * Math.cos((2 * Math.PI / 360) * this.angle)))) {
            this.speed = 0
            this.alive = false
            this.menu_main.style.opacity = "30%"
        }

        ctx.beginPath()
        ctx.arc(game.hei / 2, game.hei / 2, game.hei / 5, (2 * Math.PI) / 360 * 90, (2 * Math.PI) / 360 * 270);
        ctx.arc(game.wid - (game.hei / 2), game.hei / 2, game.hei / 5, (2 * Math.PI) / 360 * 270, (2 * Math.PI) / 360 * 90);
        ctx.closePath()
        if (ctx.isPointInPath(this.x + (16 * Math.sin((2 * Math.PI / 360) * this.angle)), this.y + (16 * Math.cos((2 * Math.PI / 360) * this.angle)))) {
            this.speed = 0
            this.alive = false
            this.menu_main.style.opacity = "30%"
        }

        ctx.beginPath()
        ctx.moveTo(game.wid / 2 + 16, game.hei / 2 + game.hei / 5)
        ctx.lineTo(game.wid / 2 + 26, game.hei / 2 + game.hei / 5)
        ctx.lineTo(game.wid / 2 + 26, game.hei)
        ctx.lineTo(game.wid / 2 + 16, game.hei)
        ctx.closePath()
        if (ctx.isPointInPath(this.x + (16 * Math.sin((2 * Math.PI / 360) * this.angle)), this.y + (16 * Math.cos((2 * Math.PI / 360) * this.angle)))) {
            if (this.checker1 && this.checker2) {
                this.counter--
                this.menu_counter.innerText = "Pozostało " + this.counter + " kółek"
            }
            this.checker1 = false
            this.checker2 = false
            if (this.counter == 0) {
                dane.game_state = "win"
                game.ending("win", this.name)
            }
        }

        ctx.beginPath()
        ctx.moveTo(game.wid / 2 + 58, game.hei / 2 + game.hei / 5)
        ctx.lineTo(game.wid / 2 + 68, game.hei / 2 + game.hei / 5)
        ctx.lineTo(game.wid / 2 + 68, game.hei)
        ctx.lineTo(game.wid / 2 + 58, game.hei)
        ctx.closePath()
        if (ctx.isPointInPath(this.x + (16 * Math.sin((2 * Math.PI / 360) * this.angle)), this.y + (16 * Math.cos((2 * Math.PI / 360) * this.angle)))) {
            this.checker1 = true
            this.checker2 = false
        }

        ctx.beginPath()
        ctx.moveTo(game.wid / 2 - 16, game.hei / 2 + game.hei / 5)
        ctx.lineTo(game.wid / 2 - 26, game.hei / 2 + game.hei / 5)
        ctx.lineTo(game.wid / 2 - 26, game.hei)
        ctx.lineTo(game.wid / 2 - 16, game.hei)
        ctx.closePath()
        if (ctx.isPointInPath(this.x + (16 * Math.sin((2 * Math.PI / 360) * this.angle)), this.y + (16 * Math.cos((2 * Math.PI / 360) * this.angle)))) {
            this.checker2 = true
        }
    }

    menu() {
        this.menu_main = document.createElement("div")
        this.menu_name = document.createElement("label")
        this.menu_name_input = document.createElement("input")
        this.menu_bt1 = document.createElement("button")
        this.menu_bt2 = document.createElement("button")
        this.menu_del = document.createElement("button")
        this.menu_counter = document.createElement("div")

        this.menu_main.className = "menu"
        this.menu_name.innerText = "Nazwa gracza:"
        this.menu_name_input.value = "Player" + this.player_number
        this.menu_name_input.maxLength = "18"
        this.menu_bt1.innerText = this.opis_key1
        this.menu_bt2.innerText = this.opis_key2
        this.menu_del.innerText = "Usuń"
        this.menu_counter.innerText = "Pozostało " + this.counter + " kółek"

        if (this.player_number == 1) {
            this.menu_main.style.backgroundColor = "#ff2222"
        } else if (this.player_number == 2) {
            this.menu_main.style.backgroundColor = "#00cc00"

        } else if (this.player_number == 3) {
            this.menu_main.style.backgroundColor = "#00aaff"

        } else if (this.player_number == 4) {
            this.menu_main.style.backgroundColor = "#ffffff"
        }

        this.menu_bt1.onclick = function (el) {
            this.player_key_change(el.target, "lewo")
        }.bind(this)

        this.menu_bt2.onclick = function (el) {
            this.player_key_change(el.target, "prawo")
        }.bind(this)

        this.menu_del.onclick = function (el) {
            this.player_del(el.target)
        }.bind(this)

        this.menu_main.append(this.menu_name, this.menu_name_input, this.menu_bt1, this.menu_bt2, this.menu_del, this.menu_counter)
        document.getElementById("main").append(this.menu_main)
    }

    player_key_change(el, temp) {
        dane.players.forEach(pl => {
            pl.menu_bt1.disabled = true
            pl.menu_bt2.disabled = true
            pl.menu_del.disabled = true
            pl.menu_name_input.disabled = true
        })
        el.disabled = false
        el.style.height = "40px"
        this.menu_main.style.opacity = "100%"
        this.menu_main.style.height = "50px"
        document.getElementById("bt_start").disabled = true
        document.getElementById("bt_init_player").disabled = true
        el.innerText = "wybierz klawisz"
        let change_key = setInterval(() => {
            if (dane.kierunek != "") {
                if (temp == "lewo") {
                    if (dane.wybrane_kierunki.includes(dane.kierunek) && dane.kierunek != this.key1) {
                        el.innerText = "zajęty klawisz"
                    } else {
                        dane.wybrane_kierunki.splice(dane.wybrane_kierunki.indexOf(this.key1), 1)
                        dane.wybrane_kierunki.push(dane.kierunek)
                        el.innerText = dane.kierunek_info
                        this.key1 = dane.kierunek
                        this.opis_key1 = dane.kierunek_info

                        document.getElementById("bt_start").disabled = false
                        document.getElementById("bt_init_player").disabled = false
                        clearInterval(change_key)
                        dane.players.forEach(pl => {
                            pl.menu_bt1.disabled = false
                            pl.menu_bt2.disabled = false
                            pl.menu_del.disabled = false
                            pl.menu_name_input.disabled = false
                            pl.menu_main.style.opacity = "100%"
                        })
                        this.menu_main.style.height = "50px"
                        el.style.height = "30px"
                    }

                } else if (temp == "prawo") {
                    if (dane.wybrane_kierunki.includes(dane.kierunek) && dane.kierunek != this.key2) {
                        el.innerText = "zajęty klawisz"
                    } else {
                        dane.wybrane_kierunki.splice(dane.wybrane_kierunki.indexOf(this.key2), 1)
                        dane.wybrane_kierunki.push(dane.kierunek)
                        el.innerText = dane.kierunek_info
                        this.key2 = dane.kierunek
                        this.opis_key2 = dane.kierunek_info

                        document.getElementById("bt_start").disabled = false
                        document.getElementById("bt_init_player").disabled = false
                        clearInterval(change_key)
                        dane.players.forEach(pl => {
                            pl.menu_bt1.disabled = false
                            pl.menu_bt2.disabled = false
                            pl.menu_del.disabled = false
                            pl.menu_name_input.disabled = false
                            pl.menu_main.style.opacity = "100%"
                        })
                        this.menu_main.style.height = "50px"
                        el.style.height = "30px"
                    }
                }
            }
        }, 10);
    }

    player_del() {
        dane.wybrane_kierunki.splice(dane.wybrane_kierunki.indexOf(this.key1), 1)
        dane.wybrane_kierunki.splice(dane.wybrane_kierunki.indexOf(this.key2), 1)
        document.getElementById("main").removeChild(this.menu_main)
        dane.players_kol[this.number - 1] = 0
        game.del(this)
    }

    reset() {
        this.counter = 5
        this.menu_counter.innerText = "Pozostało " + this.counter + " kółek"
        this.checker1 = false
        this.checker2 = false
        this.alive = true
        this.angle = 90
        this.speed = 4
        this.x = game.wid / 2
        this.y = game.hei / 2 + game.hei / 5 + ((game.hei / 2 - game.hei / 5) / 5) * this.number
        this.tab = [{
            x: this.x - this.speed,
            y: this.y
        }, {
            x: this.x,
            y: this.y
        }]

        this.generate_player()
        this.menu_main.style.opacity = "100%"
        this.menu_name_input.disabled = false
        this.menu_bt1.disabled = false
        this.menu_bt2.disabled = false
        this.menu_del.disabled = false
        this.menu_bt1.innerText = this.opis_key1
        this.menu_bt2.innerText = this.opis_key2
        this.name = this.menu_name_input.value
    }
}