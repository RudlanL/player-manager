import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { Player } from '@/type';

@Module({ namespaced: true })
export default class Socket extends VuexModule {
    public connectedPcWs = false;
    public connectedMSB = false;
    public connectedControllerWs = false;
    public pcSocket: WebSocket = {} as WebSocket;
    public controllerSocket: WebSocket = {} as WebSocket;
    public MSBSocket: WebSocket = {} as WebSocket;

    get getPcSocket(): WebSocket {
        return this.pcSocket
    }
    get getControllerSocket(): WebSocket {
        return this.controllerSocket
    }
    get getMSBSocket(): WebSocket {
        return this.MSBSocket
    }
    get isCSocketConnected(): boolean {
        return this.connectedControllerWs
    }
    get isPcSocketConnected(): boolean {
        return this.connectedPcWs
    }
    get isMSBConnected(): boolean {
        return this.connectedMSB
    }
    @Mutation
    public setPcSocket(socket: WebSocket): void {
        this.pcSocket = socket;
    }
    @Mutation
    public setCSocket(socket: WebSocket): void {
        this.controllerSocket = socket;
    }
    @Mutation
    public setMSBSocket(socket: WebSocket): void {
        this.MSBSocket = socket
    }

    @Mutation
    public setCConnected(connected: boolean): void {
        this.connectedControllerWs = connected;
    }
    @Mutation
    public setPcConnected(connected: boolean): void {
        this.connectedPcWs = connected;
    }
    @Mutation
    public setMSBConnected(connected: boolean): void {
        this.connectedMSB = connected;
    }

    @Action({ rawError: true })
    public connectGamepadControl(): void {
        this.context.commit('setCSocket', new WebSocket(`ws://localhost:5403/socket.io/?EIO=3&transport=websocket`, 'viewer_protocol'));
        this.controllerSocket.onopen = () => {
            this.context.commit('setCConnected', true)
        };
        this.controllerSocket.onmessage = (event) => {
            const message = event.data.slice(13).slice(0, -1);
            const data = JSON.parse(message)
            if (data) {
                this.context.commit('gamepad/setList', data, { root: true });
            }
        }
        this.controllerSocket.onclose = () => {
            this.context.commit('setCConnected', false)
        }
    }
    @Action({ rawError: true })
    public connectMsb(): void {
        this.context.commit('setMSBSocket', new WebSocket(`ws://localhost:7882/socket.io/?EIO=3&transport=websocket`, 'viewer_protocol'))
        this.MSBSocket.onopen = () => {
            this.context.commit('setMSBConnected', true)
        };
        this.MSBSocket.onmessage = (event) => {
            const message = event.data.slice(13).slice(0, -1);
            const data = JSON.parse(message)
            if (data) {
                if (data.gameController) {
                    this.context.commit('game/setGameController', data.gameController, { root: true });
                }
            }
        }
        this.MSBSocket.onclose = () => {
            this.context.commit('setMSBConnected', false)
        }
    }
    @Action({ rawError: true })
    public updateState(state: string): void {
        console.log(state)
        if (this.MSBSocket.readyState == this.MSBSocket.OPEN) {
            this.MSBSocket.send(42 + JSON.stringify(['updateState', state]))
        }
    }
    @Action({ rawError: true })
    public sendOrder(player: Player) {
        if (this.controllerSocket.readyState == this.controllerSocket.OPEN) {
            this.controllerSocket.send(42 + JSON.stringify(['sendOrder', player]))
        }
    }
}