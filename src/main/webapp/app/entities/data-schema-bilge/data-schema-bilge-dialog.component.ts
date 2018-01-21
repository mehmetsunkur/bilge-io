import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DataSchemaBilge } from './data-schema-bilge.model';
import { DataSchemaBilgePopupService } from './data-schema-bilge-popup.service';
import { DataSchemaBilgeService } from './data-schema-bilge.service';
import { DataContextBilge, DataContextBilgeService } from '../data-context-bilge';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-data-schema-bilge-dialog',
    templateUrl: './data-schema-bilge-dialog.component.html'
})
export class DataSchemaBilgeDialogComponent implements OnInit {

    dataSchema: DataSchemaBilge;
    isSaving: boolean;

    datacontexts: DataContextBilge[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private dataSchemaService: DataSchemaBilgeService,
        private dataContextService: DataContextBilgeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.dataContextService.query()
            .subscribe((res: ResponseWrapper) => { this.datacontexts = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.dataSchema.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dataSchemaService.update(this.dataSchema));
        } else {
            this.subscribeToSaveResponse(
                this.dataSchemaService.create(this.dataSchema));
        }
    }

    private subscribeToSaveResponse(result: Observable<DataSchemaBilge>) {
        result.subscribe((res: DataSchemaBilge) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: DataSchemaBilge) {
        this.eventManager.broadcast({ name: 'dataSchemaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDataContextById(index: number, item: DataContextBilge) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-data-schema-bilge-popup',
    template: ''
})
export class DataSchemaBilgePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dataSchemaPopupService: DataSchemaBilgePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dataSchemaPopupService
                    .open(DataSchemaBilgeDialogComponent as Component, params['id']);
            } else {
                this.dataSchemaPopupService
                    .open(DataSchemaBilgeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
