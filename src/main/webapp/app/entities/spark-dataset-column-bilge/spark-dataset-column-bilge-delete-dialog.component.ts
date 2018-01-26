import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SparkDatasetColumnBilge } from './spark-dataset-column-bilge.model';
import { SparkDatasetColumnBilgePopupService } from './spark-dataset-column-bilge-popup.service';
import { SparkDatasetColumnBilgeService } from './spark-dataset-column-bilge.service';

@Component({
    selector: 'jhi-spark-dataset-column-bilge-delete-dialog',
    templateUrl: './spark-dataset-column-bilge-delete-dialog.component.html'
})
export class SparkDatasetColumnBilgeDeleteDialogComponent {

    sparkDatasetColumn: SparkDatasetColumnBilge;

    constructor(
        private sparkDatasetColumnService: SparkDatasetColumnBilgeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sparkDatasetColumnService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'sparkDatasetColumnListModification',
                content: 'Deleted an sparkDatasetColumn'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-spark-dataset-column-bilge-delete-popup',
    template: ''
})
export class SparkDatasetColumnBilgeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sparkDatasetColumnPopupService: SparkDatasetColumnBilgePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sparkDatasetColumnPopupService
                .open(SparkDatasetColumnBilgeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
