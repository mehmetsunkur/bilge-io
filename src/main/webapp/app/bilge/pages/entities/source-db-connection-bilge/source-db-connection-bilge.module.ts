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
import { MatSlideToggleModule, MatSliderModule, MatButtonModule, MatIcon, MatIconModule } from '@angular/material';

const ENTITY_STATES = [
    ...sourceDbConnectionRoute,
];

@NgModule({
    imports: [
        BilgeSharedModule,
        RouterModule.forChild(sourceDbConnectionRoute),
        MatSlideToggleModule,
        MatSliderModule,
        MatButtonModule,
        MatIconModule,
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
