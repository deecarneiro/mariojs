# Mariojs

## Description

Simple Mario Bros game in javascript with lib kaboom.js.

## Libs

- [Kaboom.js](https://kaboomjs.com/)

## Screenshoots

- 1. First Level 
![level1](https://user-images.githubusercontent.com/44411176/155918163-17da9354-4b26-483a-8386-34f4d4ab8942.png)

- 2. Second Level 
![level2](https://user-images.githubusercontent.com/44411176/155918194-68b25add-1f60-457a-a1d4-7218f78c289d.png)

- 3. Third Level
![level3](https://user-images.githubusercontent.com/44411176/155918217-b1241e5f-2b08-4dc8-bf1d-2860ce41821b.png)

- 4. Over Game
![overgame](https://user-images.githubusercontent.com/44411176/155918245-9cc25d2d-66d0-4b3d-947e-26f4dfa3e394.png)


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
       const maps = [
       //First level
       [
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

    ], 
    //Second level
    [

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
    //Third level
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
