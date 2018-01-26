import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BilgeSharedModule } from '../../shared';
import {
    SparkDatasetColumnBilgeService,
    SparkDatasetColumnBilgePopupService,
    SparkDatasetColumnBilgeComponent,
    SparkDatasetColumnBilgeDetailComponent,
    SparkDatasetColumnBilgeDialogComponent,
    SparkDatasetColumnBilgePopupComponent,
    SparkDatasetColumnBilgeDeletePopupComponent,
    SparkDatasetColumnBilgeDeleteDialogComponent,
    sparkDatasetColumnRoute,
    sparkDatasetColumnPopupRoute,
} from './';

const ENTITY_STATES = [
    ...sparkDatasetColumnRoute,
    ...sparkDatasetColumnPopupRoute,
];

@NgModule({
    imports: [
        BilgeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SparkDatasetColumnBilgeComponent,
        SparkDatasetColumnBilgeDetailComponent,
        SparkDatasetColumnBilgeDialogComponent,
        SparkDatasetColumnBilgeDeleteDialogComponent,
        SparkDatasetColumnBilgePopupComponent,
        SparkDatasetColumnBilgeDeletePopupComponent,
    ],
    entryComponents: [
        SparkDatasetColumnBilgeComponent,
        SparkDatasetColumnBilgeDialogComponent,
        SparkDatasetColumnBilgePopupComponent,
        SparkDatasetColumnBilgeDeleteDialogComponent,
        SparkDatasetColumnBilgeDeletePopupComponent,
    ],
    providers: [
        SparkDatasetColumnBilgeService,
        SparkDatasetColumnBilgePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BilgeSparkDatasetColumnBilgeModule {}
