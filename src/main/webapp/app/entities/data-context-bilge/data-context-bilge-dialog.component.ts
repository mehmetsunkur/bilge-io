import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DataContextBilge } from './data-context-bilge.model';
import { DataContextBilgePopupService } from './data-context-bilge-popup.service';
import { DataContextBilgeService } from './data-context-bilge.service';
import { SourceDbConnectionBilge, SourceDbConnectionBilgeService } from '../source-db-connection-bilge';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-data-context-bilge-dialog',
    templateUrl: './data-context-bilge-dialog.component.html'
})
export class DataContextBilgeDialogComponent implements OnInit {

    dataContext: DataContextBilge;
    isSaving: boolean;

    sourcedbconnections: SourceDbConnectionBilge[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private dataContextService: DataContextBilgeService,
        private sourceDbConnectionService: SourceDbConnectionBilgeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.sourceDbConnectionService.query()
            .subscribe((res: ResponseWrapper) => { this.sourcedbconnections = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.dataContext.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dataContextService.update(this.dataContext));
        } else {
            this.subscribeToSaveResponse(
                this.dataContextService.create(this.dataContext));
        }
    }

    private subscribeToSaveResponse(result: Observable<DataContextBilge>) {
        result.subscribe((res: DataContextBilge) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: DataContextBilge) {
        this.eventManager.broadcast({ name: 'dataContextListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSourceDbConnectionById(index: number, item: SourceDbConnectionBilge) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-data-context-bilge-popup',
    template: ''
})
export class DataContextBilgePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dataContextPopupService: DataContextBilgePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dataContextPopupService
                    .open(DataContextBilgeDialogComponent as Component, params['id']);
            } else {
                this.dataContextPopupService
                    .open(DataContextBilgeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
