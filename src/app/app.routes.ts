import { Routes } from '@angular/router';
import { AssetStepperComponent } from './pages/asset-stepper.component';
import { AssetsComponent } from './pages/assets/assets.component';

export const routes: Routes = [
  { path: '', redirectTo: 'assets', pathMatch: 'full' },
  { path: 'assets', component: AssetsComponent },
  { path: 'add-asset', component: AssetStepperComponent },
  { path: 'add-asset/:id', component: AssetStepperComponent }
];
