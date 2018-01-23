import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BilgeSharedModule } from '../../../../shared';
import {
    SparkDestinationColumnBilgeService,
    SparkDestinationColumnBilgePopupService,
    SparkDestinationColumnBilgeComponent,
    SparkDestinationColumnBilgeDetailComponent,
    SparkDestinationColumnBilgeDialogComponent,
    SparkDestinationColumnBilgePopupComponent,
    SparkDestinationColumnBilgeDeletePopupComponent,
    SparkDestinationColumnBilgeDeleteDialogComponent,
    sparkDestinationColumnRoute,
    sparkDestinationColumnPopupRoute,
} from './';

const ENTITY_STATES = [
    ...sparkDestinationColumnRoute,
    ...sparkDestinationColumnPopupRoute,
];

@NgModule({
    imports: [
        BilgeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SparkDestinationColumnBilgeComponent,
        SparkDestinationColumnBilgeDetailComponent,
        SparkDestinationColumnBilgeDialogComponent,
        SparkDestinationColumnBilgeDeleteDialogComponent,
        SparkDestinationColumnBilgePopupComponent,
        SparkDestinationColumnBilgeDeletePopupComponent,
    ],
    entryComponents: [
        SparkDestinationColumnBilgeComponent,
        SparkDestinationColumnBilgeDialogComponent,
        SparkDestinationColumnBilgePopupComponent,
        SparkDestinationColumnBilgeDeleteDialogComponent,
        SparkDestinationColumnBilgeDeletePopupComponent,
    ],
    providers: [
        SparkDestinationColumnBilgeService,
        SparkDestinationColumnBilgePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BilgeSparkDestinationColumnBilgeModule {}
