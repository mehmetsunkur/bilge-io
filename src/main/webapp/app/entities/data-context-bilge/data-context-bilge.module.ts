import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BilgeSharedModule } from '../../shared';
import {
    DataContextBilgeService,
    DataContextBilgePopupService,
    DataContextBilgeComponent,
    DataContextBilgeDetailComponent,
    DataContextBilgeDialogComponent,
    DataContextBilgePopupComponent,
    DataContextBilgeDeletePopupComponent,
    DataContextBilgeDeleteDialogComponent,
    dataContextRoute,
    dataContextPopupRoute,
} from './';

const ENTITY_STATES = [
    ...dataContextRoute,
    ...dataContextPopupRoute,
];

@NgModule({
    imports: [
        BilgeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DataContextBilgeComponent,
        DataContextBilgeDetailComponent,
        DataContextBilgeDialogComponent,
        DataContextBilgeDeleteDialogComponent,
        DataContextBilgePopupComponent,
        DataContextBilgeDeletePopupComponent,
    ],
    entryComponents: [
        DataContextBilgeComponent,
        DataContextBilgeDialogComponent,
        DataContextBilgePopupComponent,
        DataContextBilgeDeleteDialogComponent,
        DataContextBilgeDeletePopupComponent,
    ],
    providers: [
        DataContextBilgeService,
        DataContextBilgePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BilgeDataContextBilgeModule {}
