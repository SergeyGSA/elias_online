import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LocalStorageService } from '../../core/services/local-storage/local-storage.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [],
  providers: [LocalStorageService],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
  private localStorageService = inject(LocalStorageService);

  public getPlayerName(): string {
    return this.localStorageService.getPlayerFromStorage().name;
  }
}
