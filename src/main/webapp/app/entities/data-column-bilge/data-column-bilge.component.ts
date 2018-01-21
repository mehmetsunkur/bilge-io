import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DataColumnBilge } from './data-column-bilge.model';
import { DataColumnBilgeService } from './data-column-bilge.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-data-column-bilge',
    templateUrl: './data-column-bilge.component.html'
})
export class DataColumnBilgeComponent implements OnInit, OnDestroy {
dataColumns: DataColumnBilge[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private dataColumnService: DataColumnBilgeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.dataColumnService.query().subscribe(
            (res: ResponseWrapper) => {
                this.dataColumns = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDataColumns();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DataColumnBilge) {
        return item.id;
    }
    registerChangeInDataColumns() {
        this.eventSubscriber = this.eventManager.subscribe('dataColumnListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
