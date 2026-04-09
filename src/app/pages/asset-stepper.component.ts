import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.basicForm = this.fb.group({
      assetId: [''],
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

  submit() {
    const data = {
      ...this.basicForm.value,
      ...this.ownershipForm.value,
      ...this.technicalForm.value,
      ...this.financialForm.value
    };

    console.log(data);
  }
}