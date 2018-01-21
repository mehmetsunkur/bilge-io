import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SourceDbConnectionBilge } from './source-db-connection-bilge.model';
import { SourceDbConnectionBilgePopupService } from './source-db-connection-bilge-popup.service';
import { SourceDbConnectionBilgeService } from './source-db-connection-bilge.service';

@Component({
    selector: 'jhi-source-db-connection-bilge-delete-dialog',
    templateUrl: './source-db-connection-bilge-delete-dialog.component.html'
})
export class SourceDbConnectionBilgeDeleteDialogComponent {

    sourceDbConnection: SourceDbConnectionBilge;

    constructor(
        private sourceDbConnectionService: SourceDbConnectionBilgeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sourceDbConnectionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'sourceDbConnectionListModification',
                content: 'Deleted an sourceDbConnection'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-source-db-connection-bilge-delete-popup',
    template: ''
})
export class SourceDbConnectionBilgeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sourceDbConnectionPopupService: SourceDbConnectionBilgePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sourceDbConnectionPopupService
                .open(SourceDbConnectionBilgeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
