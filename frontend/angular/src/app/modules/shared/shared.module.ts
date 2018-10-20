import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';

import { DataTableComponent } from './components/data-table/data-table.component';
import { DataColumnComponent } from './components/data-column/data-column.component';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatSidenavModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatSidenavModule,
    DataTableComponent,
    DataColumnComponent
  ],
  declarations: [
    DataTableComponent,
    DataColumnComponent
  ]
})
export class SharedModule { }
