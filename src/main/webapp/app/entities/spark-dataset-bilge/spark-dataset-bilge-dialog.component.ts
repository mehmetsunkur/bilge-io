import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SparkDatasetBilge } from './spark-dataset-bilge.model';
import { SparkDatasetBilgePopupService } from './spark-dataset-bilge-popup.service';
import { SparkDatasetBilgeService } from './spark-dataset-bilge.service';

@Component({
    selector: 'jhi-spark-dataset-bilge-dialog',
    templateUrl: './spark-dataset-bilge-dialog.component.html'
})
export class SparkDatasetBilgeDialogComponent implements OnInit {

    sparkDataset: SparkDatasetBilge;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private sparkDatasetService: SparkDatasetBilgeService,
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
        if (this.sparkDataset.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sparkDatasetService.update(this.sparkDataset));
        } else {
            this.subscribeToSaveResponse(
                this.sparkDatasetService.create(this.sparkDataset));
        }
    }

    private subscribeToSaveResponse(result: Observable<SparkDatasetBilge>) {
        result.subscribe((res: SparkDatasetBilge) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: SparkDatasetBilge) {
        this.eventManager.broadcast({ name: 'sparkDatasetListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-spark-dataset-bilge-popup',
    template: ''
})
export class SparkDatasetBilgePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sparkDatasetPopupService: SparkDatasetBilgePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sparkDatasetPopupService
                    .open(SparkDatasetBilgeDialogComponent as Component, params['id']);
            } else {
                this.sparkDatasetPopupService
                    .open(SparkDatasetBilgeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
