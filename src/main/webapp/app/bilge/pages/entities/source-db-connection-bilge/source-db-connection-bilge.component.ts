import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SourceDbConnectionBilge } from './source-db-connection-bilge.model';
import { SourceDbConnectionBilgeService } from './source-db-connection-bilge.service';
import { Principal, ResponseWrapper } from '../../../../shared';

@Component({
    selector: 'jhi-source-db-connection-bilge',
    templateUrl: './source-db-connection-bilge.component.html'
})
export class SourceDbConnectionBilgeComponent implements OnInit, OnDestroy {
sourceDbConnections: SourceDbConnectionBilge[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sourceDbConnectionService: SourceDbConnectionBilgeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
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
