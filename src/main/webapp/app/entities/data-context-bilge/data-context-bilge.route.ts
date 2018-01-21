import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DataContextBilgeComponent } from './data-context-bilge.component';
import { DataContextBilgeDetailComponent } from './data-context-bilge-detail.component';
import { DataContextBilgePopupComponent } from './data-context-bilge-dialog.component';
import { DataContextBilgeDeletePopupComponent } from './data-context-bilge-delete-dialog.component';

export const dataContextRoute: Routes = [
    {
        path: 'data-context-bilge',
        component: DataContextBilgeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.dataContext.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'data-context-bilge/:id',
        component: DataContextBilgeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.dataContext.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dataContextPopupRoute: Routes = [
    {
        path: 'data-context-bilge-new',
        component: DataContextBilgePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.dataContext.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'data-context-bilge/:id/edit',
        component: DataContextBilgePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.dataContext.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'data-context-bilge/:id/delete',
        component: DataContextBilgeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bilgeApp.dataContext.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
