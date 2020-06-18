export interface Player {
    name: string;
    team: number;
    controller: string;
    deviceID?: number;
    botId?: number;
}

export enum State {
    START,
    STOP,
}

export interface GamepadInstance {
    deviceID: number;
    description: string;
    vendorID: number;
    productID: number;
    axisStates: Array<number>;
    buttonStates: Array<boolean>;
}