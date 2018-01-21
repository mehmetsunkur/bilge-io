import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DataTableBilge } from './data-table-bilge.model';
import { DataTableBilgePopupService } from './data-table-bilge-popup.service';
import { DataTableBilgeService } from './data-table-bilge.service';
import { DataSchemaBilge, DataSchemaBilgeService } from '../data-schema-bilge';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-data-table-bilge-dialog',
    templateUrl: './data-table-bilge-dialog.component.html'
})
export class DataTableBilgeDialogComponent implements OnInit {

    dataTable: DataTableBilge;
    isSaving: boolean;

    dataschemas: DataSchemaBilge[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private dataTableService: DataTableBilgeService,
        private dataSchemaService: DataSchemaBilgeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.dataSchemaService.query()
            .subscribe((res: ResponseWrapper) => { this.dataschemas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.dataTable.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dataTableService.update(this.dataTable));
        } else {
            this.subscribeToSaveResponse(
                this.dataTableService.create(this.dataTable));
        }
    }

    private subscribeToSaveResponse(result: Observable<DataTableBilge>) {
        result.subscribe((res: DataTableBilge) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: DataTableBilge) {
        this.eventManager.broadcast({ name: 'dataTableListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDataSchemaById(index: number, item: DataSchemaBilge) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-data-table-bilge-popup',
    template: ''
})
export class DataTableBilgePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dataTablePopupService: DataTableBilgePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dataTablePopupService
                    .open(DataTableBilgeDialogComponent as Component, params['id']);
            } else {
                this.dataTablePopupService
                    .open(DataTableBilgeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
