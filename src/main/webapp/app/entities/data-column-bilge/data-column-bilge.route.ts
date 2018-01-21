import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DataColumnBilgeComponent } from './data-column-bilge.component';
import { DataColumnBilgeDetailComponent } from './data-column-bilge-detail.component';
import { DataColumnBilgePopupComponent } from './data-column-bilge-dialog.component';
import { DataColumnBilgeDeletePopupComponent } from './data-column-bilge-delete-dialog.component';

export const dataColumnRoute: Routes = [
    {
        path: 'data-column-bilge',
        component: DataColumnBilgeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.dataColumn.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'data-column-bilge/:id',
        component: DataColumnBilgeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.dataColumn.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dataColumnPopupRoute: Routes = [
    {
        path: 'data-column-bilge-new',
        component: DataColumnBilgePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.dataColumn.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'data-column-bilge/:id/edit',
        component: DataColumnBilgePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.dataColumn.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'data-column-bilge/:id/delete',
        component: DataColumnBilgeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.dataColumn.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
