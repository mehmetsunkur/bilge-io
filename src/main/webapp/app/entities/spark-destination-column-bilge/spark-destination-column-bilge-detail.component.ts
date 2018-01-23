import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SparkDestinationColumnBilge } from './spark-destination-column-bilge.model';
import { SparkDestinationColumnBilgeService } from './spark-destination-column-bilge.service';

@Component({
    selector: 'jhi-spark-destination-column-bilge-detail',
    templateUrl: './spark-destination-column-bilge-detail.component.html'
})
export class SparkDestinationColumnBilgeDetailComponent implements OnInit, OnDestroy {

    sparkDestinationColumn: SparkDestinationColumnBilge;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private sparkDestinationColumnService: SparkDestinationColumnBilgeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSparkDestinationColumns();
    }

    load(id) {
        this.sparkDestinationColumnService.find(id).subscribe((sparkDestinationColumn) => {
            this.sparkDestinationColumn = sparkDestinationColumn;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSparkDestinationColumns() {
        this.eventSubscriber = this.eventManager.subscribe(
            'sparkDestinationColumnListModification',
            (response) => this.load(this.sparkDestinationColumn.id)
        );
    }
}
