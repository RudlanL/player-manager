import {VuexModule, Module, Mutation} from 'vuex-module-decorators';
import {GamepadInstance} from '@/type'
@Module({namespaced: true})
export default class GamepadModule extends VuexModule {
    public data: Array<GamepadInstance> = []

    get getList(): Array<GamepadInstance> {
        return this.data
    }
    @Mutation
    public setList(data: Array<GamepadInstance>): void {
        this.data = data;
    }

}