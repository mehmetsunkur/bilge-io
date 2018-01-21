import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DataColumnBilge } from './data-column-bilge.model';
import { DataColumnBilgePopupService } from './data-column-bilge-popup.service';
import { DataColumnBilgeService } from './data-column-bilge.service';

@Component({
    selector: 'jhi-data-column-bilge-delete-dialog',
    templateUrl: './data-column-bilge-delete-dialog.component.html'
})
export class DataColumnBilgeDeleteDialogComponent {

    dataColumn: DataColumnBilge;

    constructor(
        private dataColumnService: DataColumnBilgeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dataColumnService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dataColumnListModification',
                content: 'Deleted an dataColumn'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-data-column-bilge-delete-popup',
    template: ''
})
export class DataColumnBilgeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dataColumnPopupService: DataColumnBilgePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dataColumnPopupService
                .open(DataColumnBilgeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
