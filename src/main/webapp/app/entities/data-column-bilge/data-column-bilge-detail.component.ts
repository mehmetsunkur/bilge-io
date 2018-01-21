import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DataColumnBilge } from './data-column-bilge.model';
import { DataColumnBilgeService } from './data-column-bilge.service';

@Component({
    selector: 'jhi-data-column-bilge-detail',
    templateUrl: './data-column-bilge-detail.component.html'
})
export class DataColumnBilgeDetailComponent implements OnInit, OnDestroy {

    dataColumn: DataColumnBilge;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataColumnService: DataColumnBilgeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDataColumns();
    }

    load(id) {
        this.dataColumnService.find(id).subscribe((dataColumn) => {
            this.dataColumn = dataColumn;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDataColumns() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dataColumnListModification',
            (response) => this.load(this.dataColumn.id)
        );
    }
}
