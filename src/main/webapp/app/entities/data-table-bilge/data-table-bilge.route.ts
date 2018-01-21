import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DataTableBilgeComponent } from './data-table-bilge.component';
import { DataTableBilgeDetailComponent } from './data-table-bilge-detail.component';
import { DataTableBilgePopupComponent } from './data-table-bilge-dialog.component';
import { DataTableBilgeDeletePopupComponent } from './data-table-bilge-delete-dialog.component';

export const dataTableRoute: Routes = [
    {
        path: 'data-table-bilge',
        component: DataTableBilgeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.dataTable.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'data-table-bilge/:id',
        component: DataTableBilgeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.dataTable.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dataTablePopupRoute: Routes = [
    {
        path: 'data-table-bilge-new',
        component: DataTableBilgePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.dataTable.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'data-table-bilge/:id/edit',
        component: DataTableBilgePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.dataTable.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'data-table-bilge/:id/delete',
        component: DataTableBilgeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.dataTable.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
