import { Routes } from '@angular/router';
import { AssetStepperComponent } from './pages/asset-stepper.component';
import { AssetsComponent } from './pages/assets/assets.component';

export const routes: Routes = [
  { path: '', redirectTo: 'assets', pathMatch: 'full' },
  { path: 'assets', component: AssetsComponent },
  { path: 'assets/list', component: AssetsComponent },
  { path: 'add-asset', component: AssetStepperComponent },
  { path: 'assets/add-asset', component: AssetStepperComponent },
  { path: 'admin-dashboard', component: AssetsComponent },
  { path: 'it-dashboard', component: AssetsComponent },
  { path: 'AdminViewAssetRequest', component: AssetsComponent },
  { path: 'ViewAssetRequest', component: AssetsComponent },
  { path: 'reports', component: AssetsComponent },
  { path: 'users', component: AssetsComponent },
  { path: 'my-profile', component: AssetsComponent },
  { path: 'allocation-review', component: AssetsComponent },
  { path: 'add-asset/:id', component: AssetStepperComponent }
];
