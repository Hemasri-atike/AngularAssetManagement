import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetService, Asset } from '../services/asset.service';

@Component({
  selector: 'app-asset-stepper',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './asset-stepper.component.html',
})
export class AssetStepperComponent implements OnInit {

  basicForm!: FormGroup;
  ownershipForm!: FormGroup;
  technicalForm!: FormGroup;
  financialForm!: FormGroup;
  isEditMode = false;
  editingId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private assetService: AssetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForms();
    
    // Check for Edit Mode
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.editingId = params['id'];
        this.loadAssetData(params['id']);
      }
    });
  }

  private initForms() {
    this.basicForm = this.fb.group({
      assetId: [{ value: '', disabled: this.isEditMode }],
      assetNumber: [''],
      subAssetNumber: [''],
      assetClass: [''],
      assetDescription: ['']
    });

    this.ownershipForm = this.fb.group({
      intenderName: [''],
      custodianName: [''],
      locationId: [''],
      block: [''],
      department: ['']
    });

    this.technicalForm = this.fb.group({
      serialNumber: [''],
      macId: [''],
      model: [''],
      materialNumber: [''],
      grNumber: ['']
    });

    this.financialForm = this.fb.group({
      costCenter: [''],
      assetVendor: [''],
      poNumber: [''],
      wbsNumber: [''],
      yearOfPurchase: [''],
      capitalizationDate: [''],
      installationDate: [''],
      acceptDate: [''],
      expiryDate: [''],
      remarks: ['']
    });
  }

  private loadAssetData(id: string) {
    const asset = this.assetService.getAssetById(id);
    if (asset) {
      this.basicForm.patchValue(asset);
      this.ownershipForm.patchValue(asset);
      this.technicalForm.patchValue(asset);
      this.financialForm.patchValue(asset);
      
      // If editing, assetId should be disabled
      this.basicForm.get('assetId')?.disable();
    }
  }

  submit() {
    const data: Asset = {
      ...this.basicForm.getRawValue(),
      ...this.ownershipForm.value,
      ...this.technicalForm.value,
      ...this.financialForm.value
    };

    if (this.isEditMode && this.editingId) {
      data.assetId = this.editingId;
    }

    this.assetService.saveAsset(data);
    this.router.navigate(['/assets']);
  }
}