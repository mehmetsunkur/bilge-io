import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BilgeSharedModule } from '../../shared';
import {
    DataColumnBilgeService,
    DataColumnBilgePopupService,
    DataColumnBilgeComponent,
    DataColumnBilgeDetailComponent,
    DataColumnBilgeDialogComponent,
    DataColumnBilgePopupComponent,
    DataColumnBilgeDeletePopupComponent,
    DataColumnBilgeDeleteDialogComponent,
    dataColumnRoute,
    dataColumnPopupRoute,
} from './';

const ENTITY_STATES = [
    ...dataColumnRoute,
    ...dataColumnPopupRoute,
];

@NgModule({
    imports: [
        BilgeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DataColumnBilgeComponent,
        DataColumnBilgeDetailComponent,
        DataColumnBilgeDialogComponent,
        DataColumnBilgeDeleteDialogComponent,
        DataColumnBilgePopupComponent,
        DataColumnBilgeDeletePopupComponent,
    ],
    entryComponents: [
        DataColumnBilgeComponent,
        DataColumnBilgeDialogComponent,
        DataColumnBilgePopupComponent,
        DataColumnBilgeDeleteDialogComponent,
        DataColumnBilgeDeletePopupComponent,
    ],
    providers: [
        DataColumnBilgeService,
        DataColumnBilgePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BilgeDataColumnBilgeModule {}
