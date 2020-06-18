import Vue from 'vue'
import Vuex from 'vuex'
import PlayerModule from './modules/player'
import SocketModule from './modules/socket'
import GamepadModule from './modules/gamepad'
import GameModule from './modules/game'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    player: PlayerModule,
    socket: SocketModule,
    gamepad: GamepadModule,
    game: GameModule,
  }
})
