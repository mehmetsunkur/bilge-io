import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BilgeSharedModule } from '../../shared';
import {
    SparkDatasetBilgeService,
    SparkDatasetBilgePopupService,
    SparkDatasetBilgeComponent,
    SparkDatasetBilgeDetailComponent,
    SparkDatasetBilgeDialogComponent,
    SparkDatasetBilgePopupComponent,
    SparkDatasetBilgeDeletePopupComponent,
    SparkDatasetBilgeDeleteDialogComponent,
    sparkDatasetRoute,
    sparkDatasetPopupRoute,
} from './';

const ENTITY_STATES = [
    ...sparkDatasetRoute,
    ...sparkDatasetPopupRoute,
];

@NgModule({
    imports: [
        BilgeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SparkDatasetBilgeComponent,
        SparkDatasetBilgeDetailComponent,
        SparkDatasetBilgeDialogComponent,
        SparkDatasetBilgeDeleteDialogComponent,
        SparkDatasetBilgePopupComponent,
        SparkDatasetBilgeDeletePopupComponent,
    ],
    entryComponents: [
        SparkDatasetBilgeComponent,
        SparkDatasetBilgeDialogComponent,
        SparkDatasetBilgePopupComponent,
        SparkDatasetBilgeDeleteDialogComponent,
        SparkDatasetBilgeDeletePopupComponent,
    ],
    providers: [
        SparkDatasetBilgeService,
        SparkDatasetBilgePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BilgeSparkDatasetBilgeModule {}
