import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SparkDestinationColumnBilge } from './spark-destination-column-bilge.model';
import { SparkDestinationColumnBilgePopupService } from './spark-destination-column-bilge-popup.service';
import { SparkDestinationColumnBilgeService } from './spark-destination-column-bilge.service';

@Component({
    selector: 'jhi-spark-destination-column-bilge-delete-dialog',
    templateUrl: './spark-destination-column-bilge-delete-dialog.component.html'
})
export class SparkDestinationColumnBilgeDeleteDialogComponent {

    sparkDestinationColumn: SparkDestinationColumnBilge;

    constructor(
        private sparkDestinationColumnService: SparkDestinationColumnBilgeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sparkDestinationColumnService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'sparkDestinationColumnListModification',
                content: 'Deleted an sparkDestinationColumn'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-spark-destination-column-bilge-delete-popup',
    template: ''
})
export class SparkDestinationColumnBilgeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sparkDestinationColumnPopupService: SparkDestinationColumnBilgePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sparkDestinationColumnPopupService
                .open(SparkDestinationColumnBilgeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
