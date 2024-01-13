//reddit monthly: https://api.battlemetrics.com/servers/3344761
//reddit weekly: https://api.battlemetrics.com/servers/3344762

import axios from "axios";
import { makeAutoObservable } from "mobx";

interface ServerInfo {
  name: string;
  ip: string;
  players: number;
  maxPlayers: number;
  rust_queued_players: number;
  id: number;
  thumbnailUrl: string;
}

const serverIDs = [3344761, 16643963, 12747928];

export class rootStore {
  ids: string[] = [];
  public serverList: ServerInfo[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadIds();
  }

  addId(id: string) {
    if (id && !this.ids.includes(id)) {
      this.ids.push(id);
      this.saveIds();
    }
  }

  removeId(id: string) {
    this.ids = this.ids.filter((storedId) => storedId !== id);
    this.saveIds();
  }

  private saveIds() {
    localStorage.setItem("userIds", JSON.stringify(this.ids));
  }

  private loadIds() {
    const savedIds = localStorage.getItem("userIds");
    if (savedIds) {
      this.ids = JSON.parse(savedIds);
    }
  }

  public loadData(id: number) {
    axios
      .get(`https://api.battlemetrics.com/servers/${id}`, {})
      .then((response) => {
        const serverData = response.data.data;
        this.serverList = [
          {
            name: serverData.attributes.name,
            ip: serverData.attributes.ip,
            players: serverData.attributes.players,
            maxPlayers: serverData.attributes.maxPlayers,
            rust_queued_players:
              serverData.attributes.details.rust_queued_players,
            id: parseInt(serverData.id, 10),
            thumbnailUrl: serverData.attributes.details.rust_maps.thumbnailUrl,
          },
        ];
        console.log(JSON.stringify(this.serverList, null, 2));
      })
      .catch((error) => {
        console.error("Error loading server data:", error);
      });
  }
}
const store = new rootStore();
export default store;
