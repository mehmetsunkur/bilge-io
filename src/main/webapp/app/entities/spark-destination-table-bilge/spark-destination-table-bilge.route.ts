import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SparkDestinationTableBilgeComponent } from './spark-destination-table-bilge.component';
import { SparkDestinationTableBilgeDetailComponent } from './spark-destination-table-bilge-detail.component';
import { SparkDestinationTableBilgePopupComponent } from './spark-destination-table-bilge-dialog.component';
import { SparkDestinationTableBilgeDeletePopupComponent } from './spark-destination-table-bilge-delete-dialog.component';

export const sparkDestinationTableRoute: Routes = [
    {
        path: 'spark-destination-table-bilge',
        component: SparkDestinationTableBilgeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.sparkDestinationTable.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'spark-destination-table-bilge/:id',
        component: SparkDestinationTableBilgeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.sparkDestinationTable.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sparkDestinationTablePopupRoute: Routes = [
    {
        path: 'spark-destination-table-bilge-new',
        component: SparkDestinationTableBilgePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.sparkDestinationTable.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'spark-destination-table-bilge/:id/edit',
        component: SparkDestinationTableBilgePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.sparkDestinationTable.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'spark-destination-table-bilge/:id/delete',
        component: SparkDestinationTableBilgeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.sparkDestinationTable.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
