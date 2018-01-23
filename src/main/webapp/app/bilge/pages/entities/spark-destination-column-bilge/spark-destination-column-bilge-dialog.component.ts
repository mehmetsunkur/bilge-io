import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SparkDestinationColumnBilge } from './spark-destination-column-bilge.model';
import { SparkDestinationColumnBilgePopupService } from './spark-destination-column-bilge-popup.service';
import { SparkDestinationColumnBilgeService } from './spark-destination-column-bilge.service';
import { SparkDestinationTableBilge, SparkDestinationTableBilgeService } from '../spark-destination-table-bilge';
import { ResponseWrapper } from '../../../../shared';

@Component({
    selector: 'jhi-spark-destination-column-bilge-dialog',
    templateUrl: './spark-destination-column-bilge-dialog.component.html'
})
export class SparkDestinationColumnBilgeDialogComponent implements OnInit {

    sparkDestinationColumn: SparkDestinationColumnBilge;
    isSaving: boolean;

    sparkdestinationtables: SparkDestinationTableBilge[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private sparkDestinationColumnService: SparkDestinationColumnBilgeService,
        private sparkDestinationTableService: SparkDestinationTableBilgeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.sparkDestinationTableService.query()
            .subscribe((res: ResponseWrapper) => { this.sparkdestinationtables = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.sparkDestinationColumn.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sparkDestinationColumnService.update(this.sparkDestinationColumn));
        } else {
            this.subscribeToSaveResponse(
                this.sparkDestinationColumnService.create(this.sparkDestinationColumn));
        }
    }

    private subscribeToSaveResponse(result: Observable<SparkDestinationColumnBilge>) {
        result.subscribe((res: SparkDestinationColumnBilge) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: SparkDestinationColumnBilge) {
        this.eventManager.broadcast({ name: 'sparkDestinationColumnListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSparkDestinationTableById(index: number, item: SparkDestinationTableBilge) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-spark-destination-column-bilge-popup',
    template: ''
})
export class SparkDestinationColumnBilgePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sparkDestinationColumnPopupService: SparkDestinationColumnBilgePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sparkDestinationColumnPopupService
                    .open(SparkDestinationColumnBilgeDialogComponent as Component, params['id']);
            } else {
                this.sparkDestinationColumnPopupService
                    .open(SparkDestinationColumnBilgeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
