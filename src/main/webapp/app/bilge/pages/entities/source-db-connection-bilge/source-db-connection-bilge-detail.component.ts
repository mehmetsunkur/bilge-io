import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SourceDbConnectionBilge, BilgeSourceDbConnectionBilgeService } from '.';
import { SourceDbConnectionBilgePopupService, SourceDbConnectionBilgeDialogComponent } from '.';
import { ResponseWrapper } from '../../../../shared';
import { DataSchemaBilge } from '../../../../entities/data-schema-bilge';
import { DataTableBilge } from '../../../../entities/data-table-bilge';
import { DataColumnBilge } from '../../../../entities/data-column-bilge';
import { scheduleMicroTask } from '@angular/core/src/util';

@Component({
    selector: 'jhi-source-db-connection-bilge-detail',
    templateUrl: './source-db-connection-bilge-detail.component.html'
})
export class SourceDbConnectionBilgeDetailComponent implements OnInit, OnDestroy {

    sourceDbConnection: SourceDbConnectionBilge;
    dataSchemas: DataSchemaBilge[];
    selectedSchemaName: String;
    tables: DataTableBilge[];
    selecttedTableName: String;
    columns: DataColumnBilge[];
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private sourceDbConnectionService: BilgeSourceDbConnectionBilgeService,
        private jhiAlertService: JhiAlertService,
        private route: ActivatedRoute,
        private sourceDbConnectionPopupService: SourceDbConnectionBilgePopupService

    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSourceDbConnections();
    }
    edit(sourceDbConnection: SourceDbConnectionBilge) {
        this.sourceDbConnectionPopupService
        .open(SourceDbConnectionBilgeDialogComponent as Component, sourceDbConnection.id);
    }

    listSchemas(sourceDbConnection: SourceDbConnectionBilge) {
        this.sourceDbConnectionService.listSchemas(sourceDbConnection.id).subscribe(
            (res: ResponseWrapper) => {
                this.dataSchemas = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json())
        );
    }

    listTables(sourceDbConnection: SourceDbConnectionBilge, schema: DataSchemaBilge) {
        this.sourceDbConnectionService.listTables(sourceDbConnection.id, schema.name) .subscribe(
            (res: ResponseWrapper) => {
                this.selectedSchemaName = schema.name;
                this.tables = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    
    listColumns(sourceDbConnection: SourceDbConnectionBilge,  table: DataTableBilge) {
        this.sourceDbConnectionService.listColumns(sourceDbConnection.id, this.selectedSchemaName, table.name) .subscribe(
            (res: ResponseWrapper) => {
                this.selecttedTableName = table.name;
                this.columns = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    

    load(id) {
        this.sourceDbConnectionService.find(id).subscribe((sourceDbConnection) => {
            this.sourceDbConnection = sourceDbConnection;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSourceDbConnections() {
        this.eventSubscriber = this.eventManager.subscribe(
            'sourceDbConnectionListModification',
            (response) => this.load(this.sourceDbConnection.id)
        );
    }
    private onError(errorObj) {
        this.jhiAlertService.error(errorObj.detail, null, null);
    }
}
