import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DataSchemaBilge } from './data-schema-bilge.model';
import { DataSchemaBilgeService } from './data-schema-bilge.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-data-schema-bilge',
    templateUrl: './data-schema-bilge.component.html'
})
export class DataSchemaBilgeComponent implements OnInit, OnDestroy {
dataSchemas: DataSchemaBilge[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private dataSchemaService: DataSchemaBilgeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.dataSchemaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.dataSchemas = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDataSchemas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DataSchemaBilge) {
        return item.id;
    }
    registerChangeInDataSchemas() {
        this.eventSubscriber = this.eventManager.subscribe('dataSchemaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
