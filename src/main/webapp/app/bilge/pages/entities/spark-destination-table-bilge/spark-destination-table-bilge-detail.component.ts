import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SparkDestinationTableBilge } from './spark-destination-table-bilge.model';
import { SparkDestinationTableBilgeService } from './spark-destination-table-bilge.service';

@Component({
    selector: 'jhi-spark-destination-table-bilge-detail',
    templateUrl: './spark-destination-table-bilge-detail.component.html'
})
export class SparkDestinationTableBilgeDetailComponent implements OnInit, OnDestroy {

    sparkDestinationTable: SparkDestinationTableBilge;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private sparkDestinationTableService: SparkDestinationTableBilgeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSparkDestinationTables();
    }

    load(id) {
        this.sparkDestinationTableService.find(id).subscribe((sparkDestinationTable) => {
            this.sparkDestinationTable = sparkDestinationTable;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSparkDestinationTables() {
        this.eventSubscriber = this.eventManager.subscribe(
            'sparkDestinationTableListModification',
            (response) => this.load(this.sparkDestinationTable.id)
        );
    }
}
