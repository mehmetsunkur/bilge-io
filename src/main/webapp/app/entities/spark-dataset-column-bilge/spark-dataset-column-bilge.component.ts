import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SparkDatasetColumnBilge } from './spark-dataset-column-bilge.model';
import { SparkDatasetColumnBilgeService } from './spark-dataset-column-bilge.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-spark-dataset-column-bilge',
    templateUrl: './spark-dataset-column-bilge.component.html'
})
export class SparkDatasetColumnBilgeComponent implements OnInit, OnDestroy {
sparkDatasetColumns: SparkDatasetColumnBilge[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sparkDatasetColumnService: SparkDatasetColumnBilgeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.sparkDatasetColumnService.query().subscribe(
            (res: ResponseWrapper) => {
                this.sparkDatasetColumns = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSparkDatasetColumns();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SparkDatasetColumnBilge) {
        return item.id;
    }
    registerChangeInSparkDatasetColumns() {
        this.eventSubscriber = this.eventManager.subscribe('sparkDatasetColumnListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
