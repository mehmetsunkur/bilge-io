import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DataSchemaBilge } from './data-schema-bilge.model';
import { DataSchemaBilgeService } from './data-schema-bilge.service';

@Component({
    selector: 'jhi-data-schema-bilge-detail',
    templateUrl: './data-schema-bilge-detail.component.html'
})
export class DataSchemaBilgeDetailComponent implements OnInit, OnDestroy {

    dataSchema: DataSchemaBilge;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataSchemaService: DataSchemaBilgeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDataSchemas();
    }

    load(id) {
        this.dataSchemaService.find(id).subscribe((dataSchema) => {
            this.dataSchema = dataSchema;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDataSchemas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dataSchemaListModification',
            (response) => this.load(this.dataSchema.id)
        );
    }
}
