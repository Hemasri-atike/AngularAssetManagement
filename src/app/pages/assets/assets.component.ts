import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AssetService, Asset } from '../../services/asset.service';
import { MatIconModule } from '@angular/material/icon';

// Syncfusion Imports
import { 
  FilterService, 
  SortService, 
  GridComponent, 
  VirtualScrollService, 
  GridModule, 
  SelectionService
} from '@syncfusion/ej2-angular-grids';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';
import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule,
    DropDownListModule, 
    GridModule, 
    RatingModule,
    MatIconModule
  ],
  providers: [FilterService, SortService, VirtualScrollService, SelectionService],
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit, AfterViewInit {

  public data: any;
  public query!: Query;
  public filterSettings!: Object;
  public selectionSettings!: Object;
  public loadingIndicator!: Object;
  public height: string = '400px';
  public stTime: any;
  public isDataChanged: boolean = true;
  public dtTime: boolean = false;
  public clrIntervalFun: any;
  public clrIntervalFun2: any;

  @ViewChild('overviewgrid')
  public gridInstance!: GridComponent;

  public ddlData: Object[] = [
    { text: 'Local Asset Data', value: 'local' },
    { text: '1,000 Rows (Demo)', value: '1000' },
    { text: '10,000 Rows (Demo)', value: '10000' }
  ];
  public fields: Object = { text: 'text', value: 'value' };

  constructor(
    private assetService: AssetService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLocalData();
    this.filterSettings = { type: "Menu" };
    this.loadingIndicator = { indicatorType: 'Shimmer' };
    this.selectionSettings = { persistSelection: true, type: "Multiple", checkboxOnly: true };
    this.stTime = performance.now();
  }

  loadLocalData() {
    const assets = this.assetService.getAssets();
    // Ensure all assets have required fields for the grid templates
    const formattedAssets = assets.map(asset => ({
      ...asset,
      status: asset.status || (Math.random() > 0.5 ? 'Active' : 'Inactive'),
      trustworthiness: asset.trustworthiness || 'Sufficient',
      rating: asset.rating || Math.floor(Math.random() * 5) + 1,
      software: asset.software || Math.floor(Math.random() * 100)
    }));
    this.data = formattedAssets;
  }

  ngAfterViewInit(): void {
    var observer = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.forEach(() => {
        if (this.stTime && this.isDataChanged) {
          let msgEle = document.getElementById('msg');
          if (msgEle) {
            let val: any = (performance.now() - this.stTime).toFixed(0);
            this.stTime = null;
            this.dtTime = false;
            this.isDataChanged = false;
            msgEle.innerHTML = 'Grid Load Time: ' + "<b>" + val + "</b>" + '<b>ms</b>';
            msgEle.classList.remove('e-hide');
          }
        }
      });
    });
    
    const gridEle = document.getElementById('overviewgrid');
    if (gridEle) {
      observer.observe(gridEle, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }
  }

  public softwareValue(args: any): number {
    if (args <= 20) {
      args = args + 30;
    }
    return args;
  }

  valueChange(args: any): void {
    let value = args.value;
    this.isDataChanged = true;
    this.stTime = performance.now();

    if (value === 'local') {
      this.loadLocalData();
    } else {
      // For demo purposes, we connect to Syncfusion's demo service as requested in your code
      const SERVICE_URI = 'https://services.syncfusion.com/angular/production/';
      this.data = new DataManager({ 
        url: SERVICE_URI + 'api/UrlDataSource', 
        adaptor: new UrlAdaptor 
      });
      this.query = new Query().addParams('dataCount', value);
    }
  }

  onDataBound(args: any): void {
    clearTimeout(this.clrIntervalFun);
    this.dtTime = true;
  }

  // Action methods preserved from previous implementation
  editAsset(id: string) {
    this.router.navigate(['/add-asset', id]);
  }

  deleteAsset(id: string) {
    if (!confirm('Are you sure you want to delete this asset?')) return;
    this.assetService.deleteAsset(id);
    this.loadLocalData();
    this.isDataChanged = true;
    this.stTime = performance.now();
  }
}