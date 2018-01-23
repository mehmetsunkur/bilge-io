import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SparkDestinationTableBilge } from './spark-destination-table-bilge.model';
import { SparkDestinationTableBilgeService } from './spark-destination-table-bilge.service';
import { Principal, ResponseWrapper } from '../../../../shared';

@Component({
    selector: 'jhi-spark-destination-table-bilge',
    templateUrl: './spark-destination-table-bilge.component.html'
})
export class SparkDestinationTableBilgeComponent implements OnInit, OnDestroy {
sparkDestinationTables: SparkDestinationTableBilge[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sparkDestinationTableService: SparkDestinationTableBilgeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.sparkDestinationTableService.query().subscribe(
            (res: ResponseWrapper) => {
                this.sparkDestinationTables = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSparkDestinationTables();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SparkDestinationTableBilge) {
        return item.id;
    }
    registerChangeInSparkDestinationTables() {
        this.eventSubscriber = this.eventManager.subscribe('sparkDestinationTableListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
