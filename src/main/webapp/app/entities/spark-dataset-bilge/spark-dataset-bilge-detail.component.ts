import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SparkDatasetBilge } from './spark-dataset-bilge.model';
import { SparkDatasetBilgeService } from './spark-dataset-bilge.service';

@Component({
    selector: 'jhi-spark-dataset-bilge-detail',
    templateUrl: './spark-dataset-bilge-detail.component.html'
})
export class SparkDatasetBilgeDetailComponent implements OnInit, OnDestroy {

    sparkDataset: SparkDatasetBilge;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private sparkDatasetService: SparkDatasetBilgeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSparkDatasets();
    }

    load(id) {
        this.sparkDatasetService.find(id).subscribe((sparkDataset) => {
            this.sparkDataset = sparkDataset;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSparkDatasets() {
        this.eventSubscriber = this.eventManager.subscribe(
            'sparkDatasetListModification',
            (response) => this.load(this.sparkDataset.id)
        );
    }
}
