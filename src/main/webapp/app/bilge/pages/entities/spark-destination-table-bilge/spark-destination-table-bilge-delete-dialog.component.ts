import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SparkDestinationTableBilge } from './spark-destination-table-bilge.model';

import { SparkDestinationTableBilgeService, SparkDestinationTableBilgePopupService } from './';

@Component({
    selector: 'jhi-spark-destination-table-bilge-delete-dialog',
    templateUrl: './spark-destination-table-bilge-delete-dialog.component.html'
})
export class SparkDestinationTableBilgeDeleteDialogComponent {

    sparkDestinationTable: SparkDestinationTableBilge;

    constructor(
        private sparkDestinationTableService: SparkDestinationTableBilgeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sparkDestinationTableService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'sparkDestinationTableListModification',
                content: 'Deleted an sparkDestinationTable'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-spark-destination-table-bilge-delete-popup',
    template: ''
})
export class SparkDestinationTableBilgeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sparkDestinationTablePopupService: SparkDestinationTableBilgePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sparkDestinationTablePopupService
                .open(SparkDestinationTableBilgeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
