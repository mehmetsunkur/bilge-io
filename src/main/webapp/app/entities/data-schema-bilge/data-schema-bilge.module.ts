import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BilgeSharedModule } from '../../shared';
import {
    DataSchemaBilgeService,
    DataSchemaBilgePopupService,
    DataSchemaBilgeComponent,
    DataSchemaBilgeDetailComponent,
    DataSchemaBilgeDialogComponent,
    DataSchemaBilgePopupComponent,
    DataSchemaBilgeDeletePopupComponent,
    DataSchemaBilgeDeleteDialogComponent,
    dataSchemaRoute,
    dataSchemaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...dataSchemaRoute,
    ...dataSchemaPopupRoute,
];

@NgModule({
    imports: [
        BilgeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DataSchemaBilgeComponent,
        DataSchemaBilgeDetailComponent,
        DataSchemaBilgeDialogComponent,
        DataSchemaBilgeDeleteDialogComponent,
        DataSchemaBilgePopupComponent,
        DataSchemaBilgeDeletePopupComponent,
    ],
    entryComponents: [
        DataSchemaBilgeComponent,
        DataSchemaBilgeDialogComponent,
        DataSchemaBilgePopupComponent,
        DataSchemaBilgeDeleteDialogComponent,
        DataSchemaBilgeDeletePopupComponent,
    ],
    providers: [
        DataSchemaBilgeService,
        DataSchemaBilgePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BilgeDataSchemaBilgeModule {}
