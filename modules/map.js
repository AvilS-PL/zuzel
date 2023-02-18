//main object
let game = {
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
            dial_open = false
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
        ctx.arc(this.wid - (this.hei / 2), this.hei / 2, this.hei - (this.hei / 2) - this.lwid / 2, (2 * Math.PI) / 360 * 90, (2 * Math.PI) / 360 * 270, true);
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
        players.forEach(pl => {
            pl.game_init(kierunki)
        })
        game_state = "play"
    },

    init_player: function () {
        document.getElementById("bt_start").disabled = false
        if (players.length < 4) {
            for (let i = 0; i < players_kol.length; i++) {
                if (players_kol[i] == 0) {
                    if (!players_kol.includes(1)) {
                        players.push(new Player("Player1", "KeyQ", "q", "KeyW", "w", i + 1, 1, img_p1))
                        wybrane_kierunki.push("KeyQ", "KeyW")
                        players_kol[i] = 1
                        break
                    } else if (!players_kol.includes(2)) {
                        players.push(new Player("Player2", "KeyC", "c", "KeyV", "v", i + 1, 2, img_p2))
                        wybrane_kierunki.push("KeyC", "KeyV")
                        players_kol[i] = 2
                        break
                    } else if (!players_kol.includes(3)) {
                        players.push(new Player("Player3", "KeyY", "y", "KeyU", "u", i + 1, 3, img_p3))
                        wybrane_kierunki.push("KeyY", "KeyU")
                        players_kol[i] = 3
                        break
                    } else if (!players_kol.includes(4)) {
                        players.push(new Player("Player4", "KeyK", "k", "KeyL", "l", i + 1, 4, img_p4))
                        wybrane_kierunki.push("KeyK", "KeyL")
                        players_kol[i] = 4
                        break
                    }
                }
            }
        } else {
            document.getElementById("bt_init_player").innerText = "Limit graczy"
            document.getElementById("bt_init_player").disabled = true
        }
        if (players.length == 4) {
            document.getElementById("bt_init_player").innerText = "Limit graczy"
            document.getElementById("bt_init_player").disabled = true
        }

    },

    del: function (gracz) {
        players.splice(players.indexOf(gracz), 1)
        document.getElementById("bt_init_player").disabled = false
        document.getElementById("bt_init_player").innerText = "Dodaj gracza"
        this.render()

        for (let i = 0; i < players.length; i++) {
            for (let j = 1; j <= players_kol.length; j++) {
                if (players[i].number > j && players_kol[j - 1] == 0) {
                    players_kol[players[i].number - 1] = 0
                    players_kol[j - 1] = players[i].player_number
                    players[i].number = j
                    break
                }
            }
            players[i].generate_player()

        }
        console.log(players_kol)
        if (players.length < 1) {
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
        dial_open = true
        let a = setInterval(() => {
            if (!dial_open) {
                clearInterval(a)
                game_state = ""
                kierunek = ""
                kierunek_info = ""
                kierunki = []
                this.render()
                players.forEach(pl => {
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