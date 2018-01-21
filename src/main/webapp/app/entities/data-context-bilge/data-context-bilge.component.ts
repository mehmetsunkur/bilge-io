import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DataContextBilge } from './data-context-bilge.model';
import { DataContextBilgeService } from './data-context-bilge.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-data-context-bilge',
    templateUrl: './data-context-bilge.component.html'
})
export class DataContextBilgeComponent implements OnInit, OnDestroy {
dataContexts: DataContextBilge[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private dataContextService: DataContextBilgeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.dataContextService.query().subscribe(
            (res: ResponseWrapper) => {
                this.dataContexts = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDataContexts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DataContextBilge) {
        return item.id;
    }
    registerChangeInDataContexts() {
        this.eventSubscriber = this.eventManager.subscribe('dataContextListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
