import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BilgeSharedModule } from '../../shared';
import {
    SourceDbConnectionBilgeService,
    SourceDbConnectionBilgePopupService,
    SourceDbConnectionBilgeComponent,
    SourceDbConnectionBilgeDetailComponent,
    SourceDbConnectionBilgeDialogComponent,
    SourceDbConnectionBilgePopupComponent,
    SourceDbConnectionBilgeDeletePopupComponent,
    SourceDbConnectionBilgeDeleteDialogComponent,
    sourceDbConnectionRoute,
    sourceDbConnectionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...sourceDbConnectionRoute,
    ...sourceDbConnectionPopupRoute,
];

@NgModule({
    imports: [
        BilgeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SourceDbConnectionBilgeComponent,
        SourceDbConnectionBilgeDetailComponent,
        SourceDbConnectionBilgeDialogComponent,
        SourceDbConnectionBilgeDeleteDialogComponent,
        SourceDbConnectionBilgePopupComponent,
        SourceDbConnectionBilgeDeletePopupComponent,
    ],
    entryComponents: [
        SourceDbConnectionBilgeComponent,
        SourceDbConnectionBilgeDialogComponent,
        SourceDbConnectionBilgePopupComponent,
        SourceDbConnectionBilgeDeleteDialogComponent,
        SourceDbConnectionBilgeDeletePopupComponent,
    ],
    providers: [
        SourceDbConnectionBilgeService,
        SourceDbConnectionBilgePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BilgeSourceDbConnectionBilgeModule {}
