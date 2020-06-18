import {VuexModule, Module, Action, Mutation} from 'vuex-module-decorators';
import {Player} from '@/type'
@Module({namespaced: true})
export default class PlayerModule extends VuexModule {
    public data: Array<Player> = [];

    get get() {
        return this.data;
    }
    @Mutation
    public setPlayerList(value: Array<Player>) {
        this.data = value
    }
    @Action
    public add(player: Player): void {
        this.data?.push(player);
    }
    @Action
    public delete(player: Player): void {
        // const i = this.data?.findIndex((e) => e == player)
        const newData = this.data?.filter((e) => e != player)
        this.context.commit('setPlayerList', newData)       
    }
    @Action
    public reset(): void {
        this.data = [];
    }
}