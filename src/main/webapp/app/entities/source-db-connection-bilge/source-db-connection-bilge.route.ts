import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SourceDbConnectionBilgeComponent } from './source-db-connection-bilge.component';
import { SourceDbConnectionBilgeDetailComponent } from './source-db-connection-bilge-detail.component';
import { SourceDbConnectionBilgePopupComponent } from './source-db-connection-bilge-dialog.component';
import { SourceDbConnectionBilgeDeletePopupComponent } from './source-db-connection-bilge-delete-dialog.component';

export const sourceDbConnectionRoute: Routes = [
    {
        path: 'source-db-connection-bilge',
        component: SourceDbConnectionBilgeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.sourceDbConnection.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'source-db-connection-bilge/:id',
        component: SourceDbConnectionBilgeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.sourceDbConnection.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sourceDbConnectionPopupRoute: Routes = [
    {
        path: 'source-db-connection-bilge-new',
        component: SourceDbConnectionBilgePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.sourceDbConnection.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'source-db-connection-bilge/:id/edit',
        component: SourceDbConnectionBilgePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.sourceDbConnection.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'source-db-connection-bilge/:id/delete',
        component: SourceDbConnectionBilgeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.sourceDbConnection.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
