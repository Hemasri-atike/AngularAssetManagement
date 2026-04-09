import { Routes } from '@angular/router';
import { AssetStepperComponent } from './pages/asset-stepper.component';

export const routes: Routes = [
  { path: '', redirectTo: 'add-asset', pathMatch: 'full' }, // Redirect to add-asset by default for now
  { path: 'add-asset', component: AssetStepperComponent }
];
