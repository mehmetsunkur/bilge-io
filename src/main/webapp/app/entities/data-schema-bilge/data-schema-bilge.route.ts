import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DataSchemaBilgeComponent } from './data-schema-bilge.component';
import { DataSchemaBilgeDetailComponent } from './data-schema-bilge-detail.component';
import { DataSchemaBilgePopupComponent } from './data-schema-bilge-dialog.component';
import { DataSchemaBilgeDeletePopupComponent } from './data-schema-bilge-delete-dialog.component';

export const dataSchemaRoute: Routes = [
    {
        path: 'data-schema-bilge',
        component: DataSchemaBilgeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.dataSchema.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'data-schema-bilge/:id',
        component: DataSchemaBilgeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.dataSchema.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dataSchemaPopupRoute: Routes = [
    {
        path: 'data-schema-bilge-new',
        component: DataSchemaBilgePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.dataSchema.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'data-schema-bilge/:id/edit',
        component: DataSchemaBilgePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.dataSchema.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'data-schema-bilge/:id/delete',
        component: DataSchemaBilgeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.dataSchema.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
