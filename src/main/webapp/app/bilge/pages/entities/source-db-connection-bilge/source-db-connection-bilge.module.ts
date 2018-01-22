import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BilgeSharedModule } from '../../../../shared';
import {
    BilgeSourceDbConnectionBilgeService,
    SourceDbConnectionBilgePopupService,
    SourceDbConnectionBilgeComponent,
    SourceDbConnectionBilgeDetailComponent,
    SourceDbConnectionBilgeDialogComponent,
    SourceDbConnectionBilgePopupComponent,
    SourceDbConnectionBilgeDeletePopupComponent,
    SourceDbConnectionBilgeDeleteDialogComponent,
    sourceDbConnectionRoute,
} from './';

const ENTITY_STATES = [
    ...sourceDbConnectionRoute,
];

@NgModule({
    imports: [
        BilgeSharedModule,
        RouterModule.forChild(sourceDbConnectionRoute)
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
        BilgeSourceDbConnectionBilgeService,
        SourceDbConnectionBilgePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BilgeSourceDbConnectionBilgeModule {}
