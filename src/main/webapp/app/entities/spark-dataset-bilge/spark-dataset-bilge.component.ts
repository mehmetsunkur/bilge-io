import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SparkDatasetBilge } from './spark-dataset-bilge.model';
import { SparkDatasetBilgeService } from './spark-dataset-bilge.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-spark-dataset-bilge',
    templateUrl: './spark-dataset-bilge.component.html'
})
export class SparkDatasetBilgeComponent implements OnInit, OnDestroy {
sparkDatasets: SparkDatasetBilge[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sparkDatasetService: SparkDatasetBilgeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.sparkDatasetService.query().subscribe(
            (res: ResponseWrapper) => {
                this.sparkDatasets = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSparkDatasets();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SparkDatasetBilge) {
        return item.id;
    }
    registerChangeInSparkDatasets() {
        this.eventSubscriber = this.eventManager.subscribe('sparkDatasetListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
