import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Ng2Webstorage, LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { ProfileService } from '../../../layouts/index';
import { customHttpProvider } from '../../../blocks/interceptor/http.provider';


import { BilgeSharedModule, UserRouteAccessService } from '../../../shared';
import { testBilgeRoute } from './test-bilge.route';
import { TestStepperBilgeComponent } from './stepper/test-stepper-bilge.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule, MatFormFieldModule, MatButtonModule, 
    MatInputModule, MatProgressBarModule, MatSelectModule, MatIconModule,
MatGridListModule } from '@angular/material';
import { BilgeSourceDbConnectionBilgeService } from '../entities/source-db-connection-bilge';
import { NgDragDropModule } from 'ng-drag-drop';

const ENTITY_STATES = [
    ...testBilgeRoute
];

@NgModule({
    imports: [
        BilgeSharedModule,
        ReactiveFormsModule,
        MatStepperModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatProgressBarModule,
        MatSelectModule,
        MatIconModule,
        MatGridListModule,
        RouterModule.forChild(ENTITY_STATES),
        NgDragDropModule.forRoot(),
    ],
    declarations: [
        TestStepperBilgeComponent,
    ],
    entryComponents: [
        TestStepperBilgeComponent,
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        UserRouteAccessService,
        LocalStorageService,
        SessionStorageService,
        BilgeSourceDbConnectionBilgeService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestBilgeModule {}
