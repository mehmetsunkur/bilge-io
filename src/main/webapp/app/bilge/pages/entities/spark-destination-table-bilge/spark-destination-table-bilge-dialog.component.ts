import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SparkDestinationTableBilge } from './spark-destination-table-bilge.model';
import { SparkDestinationTableBilgePopupService } from './spark-destination-table-bilge-popup.service';
import { SparkDestinationTableBilgeService } from './spark-destination-table-bilge.service';

@Component({
    selector: 'jhi-spark-destination-table-bilge-dialog',
    templateUrl: './spark-destination-table-bilge-dialog.component.html'
})
export class SparkDestinationTableBilgeDialogComponent implements OnInit {

    sparkDestinationTable: SparkDestinationTableBilge;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private sparkDestinationTableService: SparkDestinationTableBilgeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.sparkDestinationTable.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sparkDestinationTableService.update(this.sparkDestinationTable));
        } else {
            this.subscribeToSaveResponse(
                this.sparkDestinationTableService.create(this.sparkDestinationTable));
        }
    }

    private subscribeToSaveResponse(result: Observable<SparkDestinationTableBilge>) {
        result.subscribe((res: SparkDestinationTableBilge) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: SparkDestinationTableBilge) {
        this.eventManager.broadcast({ name: 'sparkDestinationTableListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-spark-destination-table-bilge-popup',
    template: ''
})
export class SparkDestinationTableBilgePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sparkDestinationTablePopupService: SparkDestinationTableBilgePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sparkDestinationTablePopupService
                    .open(SparkDestinationTableBilgeDialogComponent as Component, params['id']);
            } else {
                this.sparkDestinationTablePopupService
                    .open(SparkDestinationTableBilgeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
