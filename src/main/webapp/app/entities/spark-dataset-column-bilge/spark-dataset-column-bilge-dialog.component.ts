import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SparkDatasetColumnBilge } from './spark-dataset-column-bilge.model';
import { SparkDatasetColumnBilgePopupService } from './spark-dataset-column-bilge-popup.service';
import { SparkDatasetColumnBilgeService } from './spark-dataset-column-bilge.service';
import { SparkDatasetBilge, SparkDatasetBilgeService } from '../spark-dataset-bilge';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-spark-dataset-column-bilge-dialog',
    templateUrl: './spark-dataset-column-bilge-dialog.component.html'
})
export class SparkDatasetColumnBilgeDialogComponent implements OnInit {

    sparkDatasetColumn: SparkDatasetColumnBilge;
    isSaving: boolean;

    sparkdatasets: SparkDatasetBilge[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private sparkDatasetColumnService: SparkDatasetColumnBilgeService,
        private sparkDatasetService: SparkDatasetBilgeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.sparkDatasetService.query()
            .subscribe((res: ResponseWrapper) => { this.sparkdatasets = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.sparkDatasetColumn.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sparkDatasetColumnService.update(this.sparkDatasetColumn));
        } else {
            this.subscribeToSaveResponse(
                this.sparkDatasetColumnService.create(this.sparkDatasetColumn));
        }
    }

    private subscribeToSaveResponse(result: Observable<SparkDatasetColumnBilge>) {
        result.subscribe((res: SparkDatasetColumnBilge) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: SparkDatasetColumnBilge) {
        this.eventManager.broadcast({ name: 'sparkDatasetColumnListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSparkDatasetById(index: number, item: SparkDatasetBilge) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-spark-dataset-column-bilge-popup',
    template: ''
})
export class SparkDatasetColumnBilgePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sparkDatasetColumnPopupService: SparkDatasetColumnBilgePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sparkDatasetColumnPopupService
                    .open(SparkDatasetColumnBilgeDialogComponent as Component, params['id']);
            } else {
                this.sparkDatasetColumnPopupService
                    .open(SparkDatasetColumnBilgeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
