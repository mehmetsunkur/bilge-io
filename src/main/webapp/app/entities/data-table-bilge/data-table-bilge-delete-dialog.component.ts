import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DataTableBilge } from './data-table-bilge.model';
import { DataTableBilgePopupService } from './data-table-bilge-popup.service';
import { DataTableBilgeService } from './data-table-bilge.service';

@Component({
    selector: 'jhi-data-table-bilge-delete-dialog',
    templateUrl: './data-table-bilge-delete-dialog.component.html'
})
export class DataTableBilgeDeleteDialogComponent {

    dataTable: DataTableBilge;

    constructor(
        private dataTableService: DataTableBilgeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dataTableService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dataTableListModification',
                content: 'Deleted an dataTable'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-data-table-bilge-delete-popup',
    template: ''
})
export class DataTableBilgeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dataTablePopupService: DataTableBilgePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dataTablePopupService
                .open(DataTableBilgeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
