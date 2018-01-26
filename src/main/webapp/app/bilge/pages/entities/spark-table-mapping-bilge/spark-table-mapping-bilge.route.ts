import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../../shared';
import { SparkTableMappingBilgeComponent } from './spark-table-mapping-bilge.component';

export const sparkTableMappingRoute: Routes = [
    {
        path: 'spark-table-mapping-bilge',
        component: SparkTableMappingBilgeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.sparkTableMapping.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
