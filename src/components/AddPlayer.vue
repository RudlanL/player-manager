<template>
  <v-app>
    <v-container align="center">
      <v-card class="mx-auto">
        <v-btn @click="goBack">
          <v-icon color="error" fab dark>mdi-arrow-left</v-icon>Back
        </v-btn>
        <v-row align="center" justify="center">
          <v-form ref="form" v-model="valid" class="ma-2">
            <v-container class="d-flex align-space justify-center">
              <v-text-field label="Name" v-model="value.name" :rules="nameRule" required></v-text-field>
              <v-col>
                <template v-slot:label>Teams</template>
                <v-radio-group
                  row
                  v-model="value.team"
                >
                  <v-radio label="Yellow"></v-radio>
                  <v-radio label="Blue"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col>
                <template v-slot:label>Controller Or KeyBoard</template>
                <v-radio-group
                  row
                  :rules="[v => !!v || 'Controller is required']"
                  v-model="value.controller"
                >
                  <v-radio label="Controller" value="controller"></v-radio>
                  <v-radio label="PC" value="pc"></v-radio>
                </v-radio-group>
              </v-col>
              <v-text-field 
                v-if="value.controller === 'controller'" 
                v-model.number="value.botId"
                :rules="botIdRule"
                label="Bot ID"
              >
              </v-text-field>
            </v-container>
            <v-col v-if="value.controller === 'controller'" class="d-flex" cols="12" sm="6">
              <v-select
                :items="gamepadsAvailable"
                v-model="value.deviceID"
                name="gamepad"
                item-text="description"
                item-value="deviceID"
                label="Controller"
              ></v-select>
            </v-col>
            <v-btn color="success" @click="validate">Save</v-btn>
          </v-form>
        </v-row>
      </v-card>
    </v-container>
  </v-app>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Player, GamepadInstance } from "../type";
import { namespace } from "vuex-class";
const p = namespace("player");
const g = namespace("gamepad");
@Component
export default class AddPlayer extends Vue {
  private valid = false;
  public gamepads: Array<GamepadInstance> = [];
  private value: Player = {
    name: "",
    team: 0,
    controller: "",
  };
  private nameRule =  [(v: any) => !!v || 'Name is required']
  private botIdRule = [(v: any) => !isNaN(parseFloat(v)) || 'Must be a number']
  @p.Getter
  public get!: Array<Player>;

  @g.Getter
  public getList!: Array<GamepadInstance>;

  @p.Action
  public add!: (value: Player) => void;

  get gamepadsAvailable(): Array<GamepadInstance> {
    const gamepadUsed = this.get.map((e) => e.deviceID)
    return this.getList.filter((e) => !gamepadUsed.includes(e.deviceID))
  }

  mounted() {
    setInterval(() => {
      this.gamepads = this.getList;
    }, 16);
  }
  public validate() {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.add(this.value);
      this.$router.push("/");
    }
  }
  public goBack() {
    this.$router.go(-1);
  }
}
</script>