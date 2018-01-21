import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SourceDbConnectionBilge } from './source-db-connection-bilge.model';
import { SourceDbConnectionBilgeService } from './source-db-connection-bilge.service';

@Component({
    selector: 'jhi-source-db-connection-bilge-detail',
    templateUrl: './source-db-connection-bilge-detail.component.html'
})
export class SourceDbConnectionBilgeDetailComponent implements OnInit, OnDestroy {

    sourceDbConnection: SourceDbConnectionBilge;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private sourceDbConnectionService: SourceDbConnectionBilgeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSourceDbConnections();
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
}
