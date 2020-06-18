<template>
  <v-app>
    <v-content row>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <Menu v-bind:drawer="drawer" />
      <v-container>
        <v-container row>
          <v-col cols="6">
            <v-container row class="justify-space-between">
              <v-btn disabled>Player ({{players.length}})</v-btn>
            </v-container>
            <v-container v-for="p in players" :key="p.name">
              <Player v-bind:player="p" />
            </v-container>
          </v-col>
          <v-col cols="3">
            <v-container class="d-flex flex-column">
              <v-menu open-on-hover bottom offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on">Game</v-btn>
                </template>
                <v-list>
                  <v-list-item v-for="(item, index) in difficulties"
                    :key="index" @click="updateState(item.toLowerCase())">
                    <v-list-item-title>{{item}}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-container>
          </v-col>
        </v-container>
      </v-container>
      <v-container class="d-flex justify-end">
        <v-btn :to="{name: 'AddPlayer'}" color="primary">
          <v-icon small>fas fa-plus</v-icon>Add
        </v-btn>
      </v-container>
    </v-content>
  </v-app>
</template>
<script lang="ts">
import { Player as PlayerInterface } from "../type";
import { Vue, Component } from "vue-property-decorator";
import Player from "./Player.vue";
import Menu from "./Menu.vue";
import { namespace } from "vuex-class";
const playerModule = namespace("player");
const socket = namespace("socket");
@Component({
  components: {
    Player,
    Menu
  }
})
export default class Home extends Vue {
  public players: Array<PlayerInterface> = [];
  public interval: NodeJS.Timeout = {} as NodeJS.Timeout;
  public drawer = false;
  public difficulties: Array<string> = ['Dummy', 'BetterDummy', 'Normal', 'Difficult']

  @playerModule.Getter
  public get!: Array<PlayerInterface>;

  @socket.Action
  public connectGamepadControl!: () => void;

  @socket.Action
  public connectMsb!: () => void;

  @socket.Action
  public sendOrder!: (player: PlayerInterface) => void;

  @socket.Action
  public updateState!: (state: string) => void;

  mounted() {
    this.connectGamepadControl();
    this.connectMsb();
    this.interval = setInterval(() => {
      this.players = this.get;
      if (this.players) {
        for (let index = 0; index < this.players.length; index++) {
          this.sendOrder(this.players[index]);
        }
      }
    }, 16);
  }
}
</script>