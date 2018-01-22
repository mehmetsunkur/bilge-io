import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { SourceDbConnectionBilge, BilgeSourceDbConnectionBilgeService } from '.';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../../shared';
import { SourceDbConnectionBilgePopupService, SourceDbConnectionBilgeDeleteDialogComponent, SourceDbConnectionBilgeDialogComponent } from './index';

@Component({
    selector: 'jhi-source-db-connection-bilge',
    templateUrl: './source-db-connection-bilge.component.html'
})
export class SourceDbConnectionBilgeComponent implements OnInit, OnDestroy {
sourceDbConnections: SourceDbConnectionBilge[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sourceDbConnectionService: BilgeSourceDbConnectionBilgeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private sourceDbConnectionPopupService: SourceDbConnectionBilgePopupService
    ) {
    }

    loadAll() {
        this.sourceDbConnectionService.query().subscribe(
            (res: ResponseWrapper) => {
                this.sourceDbConnections = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSourceDbConnections();
    }

    delete(sourceDbConnection: SourceDbConnectionBilge) {
        this.sourceDbConnectionPopupService
        .open(SourceDbConnectionBilgeDeleteDialogComponent as Component, sourceDbConnection.id);
    }
    edit(sourceDbConnection: SourceDbConnectionBilge) {
        this.sourceDbConnectionPopupService
        .open(SourceDbConnectionBilgeDialogComponent as Component, sourceDbConnection.id);
    }
    newSourceDbConnection(){
        this.sourceDbConnectionPopupService
        .open(SourceDbConnectionBilgeDialogComponent as Component);
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SourceDbConnectionBilge) {
        return item.id;
    }
    registerChangeInSourceDbConnections() {
        this.eventSubscriber = this.eventManager.subscribe('sourceDbConnectionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
