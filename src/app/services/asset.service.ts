import { Injectable } from '@angular/core';

export interface Asset {
  assetId: string;
  assetNumber?: string;
  subAssetNumber?: string;
  assetClass?: string;
  assetDescription?: string;
  intenderName?: string;
  custodianName?: string;
  locationId?: string;
  block?: string;
  department?: string;
  serialNumber?: string;
  macId?: string;
  model?: string;
  materialNumber?: string;
  grNumber?: string;
  costCenter?: string;
  assetVendor?: string;
  poNumber?: string;
  wbsNumber?: string;
  yearOfPurchase?: string;
  capitalizationDate?: string;
  installationDate?: string;
  acceptDate?: string;
  expiryDate?: string;
  remarks?: string;
  status? : 'Active' | 'Inactive';
  trustworthiness?: string;
  rating?: number;
  software?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private STORAGE_KEY = 'angular_assets';

  constructor() {
    // Initialize storage if empty
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
    }
  }

  getAssets(): Asset[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  getAssetById(id: string): Asset | undefined {
    return this.getAssets().find(a => a.assetId === id);
  }

  saveAsset(asset: Asset): void {
    const assets = this.getAssets();
    const index = assets.findIndex(a => a.assetId === asset.assetId);
    
    if (index !== -1) {
      assets[index] = asset; // Update
    } else {
      assets.push(asset); // Create
    }
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(assets));
  }

  deleteAsset(id: string): void {
    const assets = this.getAssets();
    const filtered = assets.filter(a => a.assetId !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
  }
}
