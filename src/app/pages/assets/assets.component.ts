import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, FormsModule],
  templateUrl: './assets.component.html',
})
export class AssetsComponent implements OnInit {

  assets: any[] = [];
  filteredData: any[] = [];
  search: string = "";

  // ✅ Columns
  allColumns: string[] = [
    "assetId","assetNumber","assetClass","assetDescription",
    "custodianName","locationId","department",
    "materialNumber","poNumber","wbsNumber","assetVendor","remarks"
  ];

  displayedColumns: string[] = [...this.allColumns, 'actions'];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAssets();
  }

  fetchAssets() {
    this.http.get<any[]>('http://localhost:5000/api/assets')
      .subscribe({
        next: (data) => {
          this.assets = data || [];
          this.filteredData = [...this.assets];
        },
        error: () => {
          this.assets = [];
        }
      });
  }

  // 🔍 Search
  handleSearch() {
    this.filteredData = this.assets.filter(item =>
      (
        item.assetId +
        item.assetNumber +
        item.assetClass +
        item.department +
        item.assetVendor
      )
      .toLowerCase()
      .includes(this.search.toLowerCase())
    );
  }

  // 🗑 Delete
  deleteAsset(id: number) {
    if (!confirm('Delete asset?')) return;

    this.http.delete(`http://localhost:5000/api/assets/${id}`)
      .subscribe(() => this.fetchAssets());
  }
}