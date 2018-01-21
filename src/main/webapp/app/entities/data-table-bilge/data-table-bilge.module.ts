import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BilgeSharedModule } from '../../shared';
import {
    DataTableBilgeService,
    DataTableBilgePopupService,
    DataTableBilgeComponent,
    DataTableBilgeDetailComponent,
    DataTableBilgeDialogComponent,
    DataTableBilgePopupComponent,
    DataTableBilgeDeletePopupComponent,
    DataTableBilgeDeleteDialogComponent,
    dataTableRoute,
    dataTablePopupRoute,
} from './';

const ENTITY_STATES = [
    ...dataTableRoute,
    ...dataTablePopupRoute,
];

@NgModule({
    imports: [
        BilgeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DataTableBilgeComponent,
        DataTableBilgeDetailComponent,
        DataTableBilgeDialogComponent,
        DataTableBilgeDeleteDialogComponent,
        DataTableBilgePopupComponent,
        DataTableBilgeDeletePopupComponent,
    ],
    entryComponents: [
        DataTableBilgeComponent,
        DataTableBilgeDialogComponent,
        DataTableBilgePopupComponent,
        DataTableBilgeDeleteDialogComponent,
        DataTableBilgeDeletePopupComponent,
    ],
    providers: [
        DataTableBilgeService,
        DataTableBilgePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BilgeDataTableBilgeModule {}
