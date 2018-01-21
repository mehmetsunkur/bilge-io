import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DataSchemaBilge } from './data-schema-bilge.model';
import { DataSchemaBilgePopupService } from './data-schema-bilge-popup.service';
import { DataSchemaBilgeService } from './data-schema-bilge.service';

@Component({
    selector: 'jhi-data-schema-bilge-delete-dialog',
    templateUrl: './data-schema-bilge-delete-dialog.component.html'
})
export class DataSchemaBilgeDeleteDialogComponent {

    dataSchema: DataSchemaBilge;

    constructor(
        private dataSchemaService: DataSchemaBilgeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dataSchemaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dataSchemaListModification',
                content: 'Deleted an dataSchema'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-data-schema-bilge-delete-popup',
    template: ''
})
export class DataSchemaBilgeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dataSchemaPopupService: DataSchemaBilgePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dataSchemaPopupService
                .open(DataSchemaBilgeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
