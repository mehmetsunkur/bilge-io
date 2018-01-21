import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DataTableBilge } from './data-table-bilge.model';
import { DataTableBilgeService } from './data-table-bilge.service';

@Component({
    selector: 'jhi-data-table-bilge-detail',
    templateUrl: './data-table-bilge-detail.component.html'
})
export class DataTableBilgeDetailComponent implements OnInit, OnDestroy {

    dataTable: DataTableBilge;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataTableService: DataTableBilgeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDataTables();
    }

    load(id) {
        this.dataTableService.find(id).subscribe((dataTable) => {
            this.dataTable = dataTable;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDataTables() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dataTableListModification',
            (response) => this.load(this.dataTable.id)
        );
    }
}
