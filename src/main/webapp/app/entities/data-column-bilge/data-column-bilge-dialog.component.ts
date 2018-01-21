import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DataColumnBilge } from './data-column-bilge.model';
import { DataColumnBilgePopupService } from './data-column-bilge-popup.service';
import { DataColumnBilgeService } from './data-column-bilge.service';
import { DataTableBilge, DataTableBilgeService } from '../data-table-bilge';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-data-column-bilge-dialog',
    templateUrl: './data-column-bilge-dialog.component.html'
})
export class DataColumnBilgeDialogComponent implements OnInit {

    dataColumn: DataColumnBilge;
    isSaving: boolean;

    datatables: DataTableBilge[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private dataColumnService: DataColumnBilgeService,
        private dataTableService: DataTableBilgeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.dataTableService.query()
            .subscribe((res: ResponseWrapper) => { this.datatables = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.dataColumn.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dataColumnService.update(this.dataColumn));
        } else {
            this.subscribeToSaveResponse(
                this.dataColumnService.create(this.dataColumn));
        }
    }

    private subscribeToSaveResponse(result: Observable<DataColumnBilge>) {
        result.subscribe((res: DataColumnBilge) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: DataColumnBilge) {
        this.eventManager.broadcast({ name: 'dataColumnListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDataTableById(index: number, item: DataTableBilge) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-data-column-bilge-popup',
    template: ''
})
export class DataColumnBilgePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dataColumnPopupService: DataColumnBilgePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dataColumnPopupService
                    .open(DataColumnBilgeDialogComponent as Component, params['id']);
            } else {
                this.dataColumnPopupService
                    .open(DataColumnBilgeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
