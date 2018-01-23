import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../../shared';
import { SparkDestinationColumnBilgeComponent } from './spark-destination-column-bilge.component';
import { SparkDestinationColumnBilgeDetailComponent } from './spark-destination-column-bilge-detail.component';
import { SparkDestinationColumnBilgePopupComponent } from './spark-destination-column-bilge-dialog.component';
import { SparkDestinationColumnBilgeDeletePopupComponent } from './spark-destination-column-bilge-delete-dialog.component';

export const sparkDestinationColumnRoute: Routes = [
    {
        path: 'spark-destination-column-bilge',
        component: SparkDestinationColumnBilgeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.sparkDestinationColumn.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'spark-destination-column-bilge/:id',
        component: SparkDestinationColumnBilgeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.sparkDestinationColumn.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sparkDestinationColumnPopupRoute: Routes = [
    {
        path: 'spark-destination-column-bilge-new',
        component: SparkDestinationColumnBilgePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.sparkDestinationColumn.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'spark-destination-column-bilge/:id/edit',
        component: SparkDestinationColumnBilgePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.sparkDestinationColumn.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'spark-destination-column-bilge/:id/delete',
        component: SparkDestinationColumnBilgeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.sparkDestinationColumn.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
