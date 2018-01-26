import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SparkDatasetBilge } from './spark-dataset-bilge.model';
import { SparkDatasetBilgePopupService } from './spark-dataset-bilge-popup.service';
import { SparkDatasetBilgeService } from './spark-dataset-bilge.service';

@Component({
    selector: 'jhi-spark-dataset-bilge-delete-dialog',
    templateUrl: './spark-dataset-bilge-delete-dialog.component.html'
})
export class SparkDatasetBilgeDeleteDialogComponent {

    sparkDataset: SparkDatasetBilge;

    constructor(
        private sparkDatasetService: SparkDatasetBilgeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sparkDatasetService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'sparkDatasetListModification',
                content: 'Deleted an sparkDataset'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-spark-dataset-bilge-delete-popup',
    template: ''
})
export class SparkDatasetBilgeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sparkDatasetPopupService: SparkDatasetBilgePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sparkDatasetPopupService
                .open(SparkDatasetBilgeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
