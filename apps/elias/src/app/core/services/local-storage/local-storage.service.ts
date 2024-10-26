import { Injectable } from '@angular/core';
// import { UUID } from 'crypto';

interface IPlayer {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private playerDataKey = 'playerData';

  constructor() {}

  public setPlayerToStorage(name: string): void {
    const playerData = JSON.stringify({
      name,
    });
    localStorage.setItem(this.playerDataKey, playerData);
  }

  public getPlayerFromStorage(): IPlayer {
    const playerData = localStorage.getItem(this.playerDataKey);
    return playerData && JSON.parse(playerData);
  }

  public deletePlayerFromStorage(): void {
    const playerData = localStorage.getItem(this.playerDataKey);
    if (playerData) {
      localStorage.removeItem(this.playerDataKey);
    }
  }
}
