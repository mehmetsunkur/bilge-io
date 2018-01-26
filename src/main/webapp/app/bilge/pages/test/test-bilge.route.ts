import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { TestStepperBilgeComponent } from './';

export const testBilgeRoute: Routes = [
    {
        path: 'test-stepper-bilge',
        component: TestStepperBilgeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.sparkDestinationTable.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
