import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

import { LocalStorageService } from '../../core/services/local-storage/local-storage.service';

interface ISimpleRegisterForm {
  name: FormControl<string>;
}

@Component({
  selector: 'app-simple-register',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [LocalStorageService],
  templateUrl: './simple-register.component.html',
  styleUrl: './simple-register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleRegisterComponent {
  public simpleRegisterForm: FormGroup<ISimpleRegisterForm>;

  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);

  constructor() {
    this.simpleRegisterForm = new FormGroup<ISimpleRegisterForm>({
      name: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  public onSubmit(): void {
    const newPlayer = this.simpleRegisterForm.value;
    newPlayer.name &&
      this.localStorageService.setPlayerToStorage(newPlayer.name);

    this.router.navigate(['main-page']);
  }
}
