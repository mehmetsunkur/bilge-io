import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SparkDatasetColumnBilge } from './spark-dataset-column-bilge.model';
import { SparkDatasetColumnBilgeService } from './spark-dataset-column-bilge.service';

@Component({
    selector: 'jhi-spark-dataset-column-bilge-detail',
    templateUrl: './spark-dataset-column-bilge-detail.component.html'
})
export class SparkDatasetColumnBilgeDetailComponent implements OnInit, OnDestroy {

    sparkDatasetColumn: SparkDatasetColumnBilge;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private sparkDatasetColumnService: SparkDatasetColumnBilgeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSparkDatasetColumns();
    }

    load(id) {
        this.sparkDatasetColumnService.find(id).subscribe((sparkDatasetColumn) => {
            this.sparkDatasetColumn = sparkDatasetColumn;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSparkDatasetColumns() {
        this.eventSubscriber = this.eventManager.subscribe(
            'sparkDatasetColumnListModification',
            (response) => this.load(this.sparkDatasetColumn.id)
        );
    }
}
