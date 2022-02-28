# README MODEL

## Description

Simple Mario Bros game in javascript with lib kaboom.js.

## Libs

- [Kaboom.js](https://kaboomjs.com/)

## Screens

## Code Snippets

- 1. Loading sprites
  ```javascript
  ...
    loadRoot('https://i.imgur.com/')
    loadSprite('coin', 'wbKxhcd.png')
  ...
  ```
- 2. Declarating maps
  ```javascript
  ....
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
    ....
  ```
- 3. Defining sprites symbols
  ```javascript
  ...
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
    ...
  ```
  - 4. When Mario collides with coin
   ```javascript
   ...
    player.collides('coin', (c) => {
        destroy(c)
        scoreLabel.value++
        scoreLabel.text = "score " + scoreLabel.value
    })
   ...
   ```
 - 5. Mario moves keypress
  ```javascript
  ...
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
   ...
  ```
- 6. Losing scene 
  ```javascript
  ...
  scene('lose', ({ score }) => {
    add([text("GAME OVER\n \nscore " + score, 32), origin('center'), pos(width() / 2, height() / 2)])})
  ...
  ```