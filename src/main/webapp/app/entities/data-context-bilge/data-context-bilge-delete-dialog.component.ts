import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DataContextBilge } from './data-context-bilge.model';
import { DataContextBilgePopupService } from './data-context-bilge-popup.service';
import { DataContextBilgeService } from './data-context-bilge.service';

@Component({
    selector: 'jhi-data-context-bilge-delete-dialog',
    templateUrl: './data-context-bilge-delete-dialog.component.html'
})
export class DataContextBilgeDeleteDialogComponent {

    dataContext: DataContextBilge;

    constructor(
        private dataContextService: DataContextBilgeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dataContextService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dataContextListModification',
                content: 'Deleted an dataContext'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-data-context-bilge-delete-popup',
    template: ''
})
export class DataContextBilgeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dataContextPopupService: DataContextBilgePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dataContextPopupService
                .open(DataContextBilgeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
