<template>
  <v-container>
    <v-card class="my-1">
      <v-card-title class="d-flex justify-space-between">
        {{ player.name }}
        <v-icon v-if="player.team != 0" color="primary" large>mdi-circle</v-icon>
        <v-icon v-else color="yellow" large>mdi-circle</v-icon>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-icon v-if="player.controller == 'pc'" large>mdi-laptop</v-icon>
            <v-icon v-if="player.controller == 'controller'" large>mdi-controller-classic</v-icon>
          </v-col>
          <v-col>
            <v-icon medium>mdi-robot</v-icon>
            {{ player.botId }}
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="deletePlayer" fab color="red accent-5">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Player as IPlayer } from "../type";
import { namespace } from "vuex-class";
const p = namespace("player");
@Component
export default class Player extends Vue {
  @Prop({ required: true }) readonly player!: IPlayer;

  @p.Action
  public delete!: (value: IPlayer) => void;

  public deletePlayer(): void {
    this.delete(this.player);
  }
}
</script>