kaboom({
    global: true,
    fullscreen: true,
    scale: 1.5,
    debug: true,
    clearColor: [0, 0, 1],
})

const MOVE_SPEED = 120
const JUMP_FORCE = 460
const BIG_JUMP_FORCE = 650
let CURRENT_JUMP_FORCE = JUMP_FORCE
const DEATH_FALL = 800
const ENEMY_SPEED = 20

let IS_JUMPING = true


loadRoot('https://i.imgur.com/')
loadSprite('coin', 'wbKxhcd.png')
loadSprite('evil-mushroom', 'KPO3fR9.png')
loadSprite('brick', 'pogC9x5.png')
loadSprite('block', 'M6rwarW.png')
loadSprite('mario', 'Wb1qfhK.png')
loadSprite('mushroom', '0wMd92p.png')
loadSprite('surprise', 'gesQ1KP.png')
loadSprite('unboxed', 'bdrLpi6.png')
loadSprite('pipe-top-left', 'ReTPiWY.png')
loadSprite('pipe-top-right', 'hj2GK4n.png')
loadSprite('pipe-bottom-left', 'c1cYSbt.png')
loadSprite('pipe-bottom-right', 'nqQ79eI.png')

function big() {
    let timer = 0
    let isBig = false
    return {
        update() {
            if (isBig) {
                CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
                timer -= dt()
                if (timer <= 0) {
                    this.smallify()
                }
            }
        },
        isBig() {
            return isBig
        },
        smallify() {
            this.scale = vec2(1)
            CURRENT_JUMP_FORCE = JUMP_FORCE
            timer = 0
            isBig = false
        },
        biggify(time) {
            this.scale = vec2(2)
            CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
            timer = time
            isBig = true
        }
    }
}


scene("game", ({ level, score }) => {
    layers(['bg', 'obj', 'ui'], 'obj')



    const maps = [[
        '                                                                ',
        '                                                                ',
        '                                                                ',
        '                                                                ',
        '                                                                ',
        '                                                                ',
        '                                                                ',
        '                                                                ',
        '                                                                ',
        '                $==%==$        ==%==                            ',
        '                                                            *   ',
        '                                                                ',
        '                                                          -+    ',
        '                      $$      ^     ^      $$$$           ()    ',
        '============= =====  =======  =========  ========  ====  =======',

    ], [

        '                                                                ',
        '                                                                ',
        '                                                                ',
        '                                                                ',
        '                             -+                                 ',
        '                             ()                                 ',
        '                         =========                              ',
        '                                                =========       ',
        '                                                                ',
        '                $==%==$        ==*==           ==%==            ',
        '                                                            *   ',
        '                                                                ',
        '                                                                ',
        '                      $$      ^     ^       ^                   ',
        '=======  ==========  ==================  ========  ====  =======',
    ],
    [

        '                                                                ',
        '                                     -+                         ',
        '                                     ()                         ',
        '                                   =======                      ',
        '                      =======                                   ',
        '              ^                                                 ',
        '           =======                                              ',
        '       $$$                                                      ',
        '    ===========                     =========                   ',
        '               ^              $$$$                              ',
        '    ====     =====           ======                             ',
        '                                                                ',
        '                                                                ',
        '                                                                ',
        '          $$      ^     ^       ^                               ',
        '=======  ==================  ========  ====  =====    ===========',
    ]
    ]

    const levelCfg = {
        width: 20,
        height: 20,
        '=': [sprite('block'), solid()],
        '$': [sprite('coin'), solid(), 'coin'],
        '%': [sprite('surprise'), solid(), 'coin-surprise'],
        '*': [sprite('surprise'), solid(), 'mushroom-surprise'],
        '}': [sprite('unboxed'), solid()],
        '(': [sprite('pipe-bottom-left'), solid(), scale(0.5), 'pipe'],
        ')': [sprite('pipe-bottom-right'), solid(), scale(0.5), 'pipe'],
        '-': [sprite('pipe-top-left'), solid(), scale(0.5), 'pipe'],
        '+': [sprite('pipe-top-right'), solid(), scale(0.5), 'pipe'],
        '^': [sprite('evil-mushroom'), solid(), 'dangerous', body()],
        '#': [sprite('mushroom'), solid(), 'mushroom', body()],

    }

    const gameLevel = addLevel(maps[level], levelCfg)


    const scoreLabel = add([
        text("score " + score),
        pos(30, 10),
        layer('ui'),
        {
            value: score
        }
    ])

    add([
        text('level ' + parseInt(level + 1)), pos(100, 10)
    ])


    const player = add(
        [sprite('mario'), solid(),
        pos(30, 0),
        body(),
        big(),
        ])

    action('mushroom', (m) => {
        m.move(10, 0)
    })

    player.on("headbump", (obj) => {
        if (obj.is('coin-surprise')) {
            gameLevel.spawn('$', obj.gridPos.sub(0, 1))
            destroy(obj)
            gameLevel.spawn('}', obj.gridPos.sub(0, 0))
        }
        if (obj.is('mushroom-surprise')) {
            gameLevel.spawn('#', obj.gridPos.sub(0, 1))
            destroy(obj)
            gameLevel.spawn('}', obj.gridPos.sub(0, 0))
        }
    })

    player.collides('mushroom', (m) => {
        destroy(m)
        player.biggify(10)
    })

    player.collides('coin', (c) => {
        destroy(c)
        scoreLabel.value++
        scoreLabel.text = "score " + scoreLabel.value
    })

    player.action(() => {
        var currCam = camPos();

        if (currCam.x < player.pos.x) {
            camPos(player.pos.x, currCam.y);
         
        }

        if (player.pos.y >= DEATH_FALL) {
            go('lose', { score: scoreLabel.value })
        }
    });

    action('dangerous', (d) => {
        d.move(-ENEMY_SPEED, 0)
    })

    player.collides('pipe', () => {
        keyPress('down', () => {
            go('game', {
                level: (level + 1),
                score: scoreLabel.value
            })
        })
    })

    player.collides('dangerous', (d) => {
        if (IS_JUMPING) {
            destroy(d)
        } else {
            go('lose', { score: scoreLabel.value })
        }
    })

    keyDown('left', () => {
        player.move(-MOVE_SPEED, 0)
    })

    keyDown('right', () => {
        player.move(MOVE_SPEED, 0)
    })

    player.action(() => {
        if (player.grounded()) {
            IS_JUMPING = false
        }

    })

    keyDown('up', () => {
        var currCam = camPos();
        if (player.grounded()) {
            IS_JUMPING = true
            player.jump(CURRENT_JUMP_FORCE)
        }
    })

    keyPress('space', () => {
        if (player.grounded()) {
            IS_JUMPING = true
            player.jump(CURRENT_JUMP_FORCE)

        }
    })


})

scene('lose', ({ score }) => {
    add([text("GAME OVER\n \nscore " + score, 32), origin('center'), pos(width() / 2, height() / 2)])
})

start("game", { level: 0, score: 0 })