import * as Phaser from 'phaser'
import * as rive from '@rive-app/canvas'

var riveCarElement: Phaser.GameObjects.DOMElement
var riveBoyElement: Phaser.GameObjects.DOMElement
var player: Phaser.Physics.Arcade.Body
var cursors: Phaser.Types.Input.Keyboard.CursorKeys

const userViewportWidth = window.innerWidth
const userViewportHeigth = window.innerHeight
export default class Demo extends Phaser.Scene {
  constructor() {
    super('demo')
  }

  preload() {}

  create() {
    const riveCarObject = document.getElementById(
      'rive-canvas-car'
    ) as HTMLCanvasElement

    const riveBoyObject = document.getElementById(
      'rive-canvas-boy'
    ) as HTMLCanvasElement

    // const r = new rive.Rive({
    //   src: 'https://cdn.rive.app/animations/vehicles.riv',
    //   // Or the path to a public Rive asset
    //   // src: '/public/example.riv',
    //   canvas: riveObject,
    //   autoplay: true,
    //   stateMachines: 'bumpy',
    //   onLoad: () => {
    //     r.resizeDrawingSurfaceToCanvas()
    //   },
    // })

    riveCarElement = this.add.dom(100, 100, riveCarObject)
    riveBoyElement = this.add.dom(800, 200, riveBoyObject)
    player = this.physics.add.body(100, 100, 200, 200)
    player.setBounce(0.3)
    player.setCollideWorldBounds(true)
    cursors = this.input.keyboard.createCursorKeys()
    this.cameras.main.backgroundColor = new Phaser.Display.Color(235, 58, 96)
  }
  update(time: number, delta: number): void {
    riveCarElement.setPosition(player.x, player.y)

    if (cursors.down.isDown) {
      player.setVelocityY(200)
    } else if (cursors.up.isDown) {
      player.setVelocityY(-200)
    } else {
      player.setVelocityY(Phaser.Math.Linear(player.velocity.y, 0, 0.01))
    }

    if (cursors.left.isDown) {
      player.setVelocityX(-200)
    } else if (cursors.right.isDown) {
      player.setVelocityX(200)
    } else {
      player.setVelocityX(Phaser.Math.Linear(player.velocity.x, 0, 0.01))
    }
  }
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#125555',
  width: userViewportWidth,
  height: userViewportHeigth,
  scene: Demo,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
}

const game = new Phaser.Game(config)
