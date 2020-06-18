<template>
  <v-navigation-drawer v-model="drawer" absolute bottom temporary>
    <v-list class="mt-2" dense>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <v-container v-if="isMSBConnected">
              <v-btn color="green darken-2">
                <v-icon small>mdi-check</v-icon>
              </v-btn>MSB
            </v-container>
            <v-container v-else>
              <v-btn @click="connectMsb">
                <v-icon small>mdi-sync</v-icon>
              </v-btn>MSB
              <v-btn outlined icon small @click="modal = true">
                <v-icon small>fas fa-satellite-dish</v-icon>
              </v-btn>
            </v-container>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <v-container v-if="isCSocketConnected">
              <v-btn color="green darken-2">
                <v-icon small>mdi-check</v-icon>
              </v-btn> Game-Controller
            </v-container>
            <v-container v-else>
              <v-btn @click="connectGamepadControl">
                <v-icon small>mdi-sync</v-icon>
              </v-btn> Game-Controller
            </v-container>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
const socket = namespace("socket");
@Component
export default class Menu extends Vue {
  @Prop({ required: true }) readonly drawer!: boolean;

  @socket.Getter
  public isCSocketConnected!: boolean;

  @socket.Getter
  public isMSBConnected!: boolean;

  @socket.Action
  public connectGamepadControl!: () => void;

  @socket.Action
  public connectMsb!: () => void;
}
</script>