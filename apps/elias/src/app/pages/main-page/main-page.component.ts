import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { LocalStorageService } from '../../core/services/local-storage/local-storage.service';

// ================================================
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

interface DialogData {
  roomId: string;
}

// ========= Dialog component =========
@Component({
  selector: 'join-room-dialog',
  template: `
    <h2 mat-dialog-title>{{ getPlayerName() }}</h2>
    <mat-dialog-content>
      <p>Вкажіть Id комнати</p>
      <mat-form-field>
        <mat-label>Місце для Id</mat-label>
        <input matInput [(ngModel)]="animal" />
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Скасувати</button>
      <button mat-button [mat-dialog-close]="animal()" cdkFocusInitial>
        Доєднатися до кімнати
      </button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  providers: [LocalStorageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinRoomDialog {
  readonly dialogRef = inject(MatDialogRef<JoinRoomDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly animal = model(this.data.roomId);
  private localStorageService = inject(LocalStorageService);

  public getPlayerName(): string {
    return this.localStorageService.getPlayerFromStorage().name;
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
// ========= /Dialog component =========

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterModule, MatButtonModule],
  providers: [LocalStorageService],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
  public readonly dialog = inject(MatDialog);

  public readonly roomId = signal('');

  private localStorageService = inject(LocalStorageService);

  public getPlayerName(): string {
    return this.localStorageService.getPlayerFromStorage().name;
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(JoinRoomDialog, {
      data: { roomId: this.roomId() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.roomId.set(result);
      }
    });
  }
}
