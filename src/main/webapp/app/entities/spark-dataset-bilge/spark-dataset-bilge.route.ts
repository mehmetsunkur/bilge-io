import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SparkDatasetBilgeComponent } from './spark-dataset-bilge.component';
import { SparkDatasetBilgeDetailComponent } from './spark-dataset-bilge-detail.component';
import { SparkDatasetBilgePopupComponent } from './spark-dataset-bilge-dialog.component';
import { SparkDatasetBilgeDeletePopupComponent } from './spark-dataset-bilge-delete-dialog.component';

export const sparkDatasetRoute: Routes = [
    {
        path: 'spark-dataset-bilge',
        component: SparkDatasetBilgeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.sparkDataset.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'spark-dataset-bilge/:id',
        component: SparkDatasetBilgeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.sparkDataset.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sparkDatasetPopupRoute: Routes = [
    {
        path: 'spark-dataset-bilge-new',
        component: SparkDatasetBilgePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.sparkDataset.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'spark-dataset-bilge/:id/edit',
        component: SparkDatasetBilgePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.sparkDataset.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'spark-dataset-bilge/:id/delete',
        component: SparkDatasetBilgeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.sparkDataset.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
