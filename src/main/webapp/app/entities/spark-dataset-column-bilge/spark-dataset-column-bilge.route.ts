import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SparkDatasetColumnBilgeComponent } from './spark-dataset-column-bilge.component';
import { SparkDatasetColumnBilgeDetailComponent } from './spark-dataset-column-bilge-detail.component';
import { SparkDatasetColumnBilgePopupComponent } from './spark-dataset-column-bilge-dialog.component';
import { SparkDatasetColumnBilgeDeletePopupComponent } from './spark-dataset-column-bilge-delete-dialog.component';

export const sparkDatasetColumnRoute: Routes = [
    {
        path: 'spark-dataset-column-bilge',
        component: SparkDatasetColumnBilgeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.sparkDatasetColumn.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'spark-dataset-column-bilge/:id',
        component: SparkDatasetColumnBilgeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.sparkDatasetColumn.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sparkDatasetColumnPopupRoute: Routes = [
    {
        path: 'spark-dataset-column-bilge-new',
        component: SparkDatasetColumnBilgePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.sparkDatasetColumn.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'spark-dataset-column-bilge/:id/edit',
        component: SparkDatasetColumnBilgePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.sparkDatasetColumn.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'spark-dataset-column-bilge/:id/delete',
        component: SparkDatasetColumnBilgeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.sparkDatasetColumn.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
