import { Player } from "./player.js"
import { dane, img, img2, img_p1, img_p2, img_p3, img_p4 } from "./assets.js"

//main object
export let game = {
    wid: 800,
    hei: 300,
    lwid: 4,
    assets: 6,

    assets_check: function (x) {
        if (this.assets <= x) {
            game.main()
        }
    },

    main: function () {
        let main = document.createElement("div")
        main.id = "main"
        main.style.width = this.wid + "px"
        document.body.append(main)

        if (this.wid < this.hei) {
            this.hei = this.wid
        }

        let dial = document.createElement("DIALOG")
        dial.id = "dial"
        let info = document.createElement("div")
        info.innerText = ""
        info.id = "info"
        let ok = document.createElement("button")
        ok.innerText = "ok"
        ok.id = "ok"
        ok.addEventListener("click", function () {
            dane.dial_open = false
            setTimeout(() => {
                dial.close()
            }, 100);
        });
        dial.append(info, ok)
        document.body.append(dial);

        this.generate_map()
    },

    generate_map: function () {
        let cv = document.createElement("canvas")
        cv.id = "canvas"
        cv.width = this.wid
        cv.height = this.hei

        let bt_start = document.createElement("button")
        bt_start.id = "bt_start"
        bt_start.addEventListener("click", this.start)
        bt_start.innerText = "Start"
        bt_start.disabled = true

        let bt_init_player = document.createElement("button")
        bt_init_player.id = "bt_init_player"
        bt_init_player.addEventListener("click", this.init_player)
        bt_init_player.innerText = "Dodaj gracza"

        document.getElementById("main").append(cv, bt_start, bt_init_player)
        this.render()
    },

    render: function () {
        let cv = document.getElementById("canvas")
        let ctx = cv.getContext("2d")
        let pat = ctx.createPattern(img, 'repeat')
        let pat2 = ctx.createPattern(img2, 'repeat')

        ctx.clearRect(0, 0, this.wid, this.hei)

        ctx.lineWidth = this.lwid
        ctx.strokeStyle = "rgb(0,0,0,1)"
        ctx.fillStyle = pat;
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(this.wid, 0)
        ctx.lineTo(this.wid, this.hei)
        ctx.lineTo(0, this.hei)
        ctx.closePath()
        ctx.fill()

        ctx.fillStyle = pat2
        ctx.beginPath()
        ctx.arc(this.hei / 2, this.hei / 2, this.hei / 2 - this.lwid / 2, (2 * Math.PI) / 360 * 270, (2 * Math.PI) / 360 * 90, true);
        ctx.arc(this.wid - (this.hei / 2), this.hei / 2, this.hei - (this.hei / 2) - this.lwid / 2, (2 * Math.PI) / 360 * 270, (2 * Math.PI) / 360 * 450, true);
        ctx.closePath()
        ctx.stroke()
        ctx.fill()

        ctx.fillStyle = pat
        ctx.beginPath()
        ctx.arc(this.hei / 2, this.hei / 2, this.hei / 5, (2 * Math.PI) / 360 * 90, (2 * Math.PI) / 360 * 270);
        ctx.arc(this.wid - (this.hei / 2), this.hei / 2, this.hei / 5, (2 * Math.PI) / 360 * 270, (2 * Math.PI) / 360 * 90);
        ctx.closePath()
        ctx.stroke()
        ctx.fill()

        ctx.fillStyle = "black"
        ctx.beginPath()
        ctx.moveTo(game.wid / 2 + 16, game.hei / 2 + game.hei / 5)
        ctx.lineTo(game.wid / 2 + 26, game.hei / 2 + game.hei / 5)
        ctx.lineTo(game.wid / 2 + 26, game.hei)
        ctx.lineTo(game.wid / 2 + 16, game.hei)
        ctx.closePath()
        ctx.fill()
    },

    start: function () {
        document.getElementById("bt_init_player").disabled = true
        document.getElementById("bt_start").disabled = true
        game.render()
        dane.players.forEach(pl => {
            pl.game_init(dane.kierunki)
        })
        dane.game_state = "play"
    },

    init_player: function () {
        document.getElementById("bt_start").disabled = false
        if (dane.players.length < 4) {
            for (let i = 0; i < dane.players_kol.length; i++) {
                if (dane.players_kol[i] == 0) {
                    if (!dane.players_kol.includes(1)) {
                        dane.players.push(new Player("Player1", "KeyQ", "q", "KeyW", "w", i + 1, 1, img_p1))
                        dane.wybrane_kierunki.push("KeyQ", "KeyW")
                        dane.players_kol[i] = 1
                        break
                    } else if (!dane.players_kol.includes(2)) {
                        dane.players.push(new Player("Player2", "KeyC", "c", "KeyV", "v", i + 1, 2, img_p2))
                        dane.wybrane_kierunki.push("KeyC", "KeyV")
                        dane.players_kol[i] = 2
                        break
                    } else if (!dane.players_kol.includes(3)) {
                        dane.players.push(new Player("Player3", "KeyY", "y", "KeyU", "u", i + 1, 3, img_p3))
                        dane.wybrane_kierunki.push("KeyY", "KeyU")
                        dane.players_kol[i] = 3
                        break
                    } else if (!dane.players_kol.includes(4)) {
                        dane.players.push(new Player("Player4", "KeyK", "k", "KeyL", "l", i + 1, 4, img_p4))
                        dane.wybrane_kierunki.push("KeyK", "KeyL")
                        dane.players_kol[i] = 4
                        break
                    }
                }
            }
        } else {
            document.getElementById("bt_init_player").innerText = "Limit graczy"
            document.getElementById("bt_init_player").disabled = true
        }
        if (dane.players.length == 4) {
            document.getElementById("bt_init_player").innerText = "Limit graczy"
            document.getElementById("bt_init_player").disabled = true
        }

    },

    del: function (gracz) {
        dane.players.splice(dane.players.indexOf(gracz), 1)
        document.getElementById("bt_init_player").disabled = false
        document.getElementById("bt_init_player").innerText = "Dodaj gracza"
        this.render()

        for (let i = 0; i < dane.players.length; i++) {
            for (let j = 1; j <= dane.players_kol.length; j++) {
                if (dane.players[i].number > j && dane.players_kol[j - 1] == 0) {
                    dane.players_kol[dane.players[i].number - 1] = 0
                    dane.players_kol[j - 1] = dane.players[i].player_number
                    dane.players[i].number = j
                    break
                }
            }
            dane.players[i].generate_player()

        }
        console.log(dane.players_kol)
        if (dane.players.length < 1) {
            document.getElementById("bt_start").disabled = true
        }
    },

    ending: function (result, who) {
        if (result == "lost" && who == "you") {
            document.getElementById("info").innerText = "Przegrywasz :("
        } else if (result == "win") {
            document.getElementById("info").innerText = "Wygrywa " + who
        }
        dial.setAttribute("open", "open")
        dane.dial_open = true
        let a = setInterval(() => {
            if (!dane.dial_open) {
                clearInterval(a)
                dane.game_state = ""
                dane.kierunek = ""
                dane.kierunek_info = ""
                dane.kierunki = []
                this.render()
                dane.players.forEach(pl => {
                    pl.reset()
                })
                document.getElementById("bt_init_player").disabled = false
                if (document.getElementById("bt_start").innerText != "Limit graczy") {
                    document.getElementById("bt_start").disabled = false
                }
            }
        }, 100);
    },
}