import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BilgeSharedModule } from '../../shared';
import {
    SparkDestinationTableBilgeService,
    SparkDestinationTableBilgePopupService,
    SparkDestinationTableBilgeComponent,
    SparkDestinationTableBilgeDetailComponent,
    SparkDestinationTableBilgeDialogComponent,
    SparkDestinationTableBilgePopupComponent,
    SparkDestinationTableBilgeDeletePopupComponent,
    SparkDestinationTableBilgeDeleteDialogComponent,
    sparkDestinationTableRoute,
    sparkDestinationTablePopupRoute,
} from './';

const ENTITY_STATES = [
    ...sparkDestinationTableRoute,
    ...sparkDestinationTablePopupRoute,
];

@NgModule({
    imports: [
        BilgeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SparkDestinationTableBilgeComponent,
        SparkDestinationTableBilgeDetailComponent,
        SparkDestinationTableBilgeDialogComponent,
        SparkDestinationTableBilgeDeleteDialogComponent,
        SparkDestinationTableBilgePopupComponent,
        SparkDestinationTableBilgeDeletePopupComponent,
    ],
    entryComponents: [
        SparkDestinationTableBilgeComponent,
        SparkDestinationTableBilgeDialogComponent,
        SparkDestinationTableBilgePopupComponent,
        SparkDestinationTableBilgeDeleteDialogComponent,
        SparkDestinationTableBilgeDeletePopupComponent,
    ],
    providers: [
        SparkDestinationTableBilgeService,
        SparkDestinationTableBilgePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BilgeSparkDestinationTableBilgeModule {}
