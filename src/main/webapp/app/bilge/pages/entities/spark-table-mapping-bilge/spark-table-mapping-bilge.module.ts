import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BilgeSharedModule } from '../../../../shared';
import {
    SparkDestinationTableBilgeService
} from '../spark-destination-table-bilge';
import{
    sparkTableMappingRoute
} from './spark-table-mapping-bilge.route';
import { SparkTableMappingBilgeComponent } from './spark-table-mapping-bilge.component';
import { MatButtonModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatStepper } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataSchemaBilgeService } from '../../../../entities/data-schema-bilge';
import { DataTableBilgeService } from '../../../../entities/data-table-bilge';
import { DataColumnBilgeService } from '../../../../entities/data-column-bilge';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
const ENTITY_STATES = [
    ...sparkTableMappingRoute
];

@NgModule({
    imports: [
        BilgeSharedModule,
        MatButtonModule,
        MatStepperModule,
        MatFormFieldModule,
        FormsModule, 
        ReactiveFormsModule,
        MatFormFieldModule, 
        MatInputModule, 
        MatSelectModule,
        Ng2SmartTableModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SparkTableMappingBilgeComponent
    ],
    entryComponents: [
        SparkTableMappingBilgeComponent
    ],
    providers: [
        SparkDestinationTableBilgeService,
        DataSchemaBilgeService,
        DataTableBilgeService,
        DataColumnBilgeService,
        SmartTableService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SparkTableMappingBilgeModule {}
