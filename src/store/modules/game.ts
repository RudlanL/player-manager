import {VuexModule, Module, Mutation} from 'vuex-module-decorators';
import {GameControllerEvent} from '@namec/types'
@Module({namespaced: true})
export default class GameModule extends VuexModule {
    public gameController: GameControllerEvent = {} as GameControllerEvent
    
    get getGameController(): GameControllerEvent {
        return this.gameController
    }

    @Mutation
    public setGameController(value: GameControllerEvent) {
        this.gameController = value
    }
}