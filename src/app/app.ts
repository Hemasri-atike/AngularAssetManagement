import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AssetStepperComponent } from './pages/asset-stepper.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,      // ✅ REQUIRED
    NavbarComponent,
    // AssetStepperComponent 
  ],
  templateUrl: './app.html',
})
export class App {}
