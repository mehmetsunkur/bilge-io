import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DataTableBilge } from './data-table-bilge.model';
import { DataTableBilgeService } from './data-table-bilge.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-data-table-bilge',
    templateUrl: './data-table-bilge.component.html'
})
export class DataTableBilgeComponent implements OnInit, OnDestroy {
dataTables: DataTableBilge[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private dataTableService: DataTableBilgeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.dataTableService.query().subscribe(
            (res: ResponseWrapper) => {
                this.dataTables = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDataTables();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DataTableBilge) {
        return item.id;
    }
    registerChangeInDataTables() {
        this.eventSubscriber = this.eventManager.subscribe('dataTableListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
