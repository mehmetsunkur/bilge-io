import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SourceDbConnectionBilge } from '../../../../entities/source-db-connection-bilge';
import { SourceDbConnectionBilgePopupService } from './source-db-connection-bilge-popup.service';
import { BilgeSourceDbConnectionBilgeService } from '.';


@Component({
    selector: 'jhi-source-db-connection-bilge-dialog',
    templateUrl: './source-db-connection-bilge-dialog.component.html'
})
export class SourceDbConnectionBilgeDialogComponent implements OnInit {

    sourceDbConnection: SourceDbConnectionBilge;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private sourceDbConnectionService: BilgeSourceDbConnectionBilgeService,
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
        if (this.sourceDbConnection.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sourceDbConnectionService.update(this.sourceDbConnection));
        } else {
            this.subscribeToSaveResponse(
                this.sourceDbConnectionService.create(this.sourceDbConnection));
        }
    }

    private subscribeToSaveResponse(result: Observable<SourceDbConnectionBilge>) {
        result.subscribe((res: SourceDbConnectionBilge) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: SourceDbConnectionBilge) {
        this.eventManager.broadcast({ name: 'sourceDbConnectionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-source-db-connection-bilge-popup',
    template: ''
})
export class SourceDbConnectionBilgePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sourceDbConnectionPopupService: SourceDbConnectionBilgePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sourceDbConnectionPopupService
                    .open(SourceDbConnectionBilgeDialogComponent as Component, params['id']);
            } else {
                this.sourceDbConnectionPopupService
                    .open(SourceDbConnectionBilgeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
