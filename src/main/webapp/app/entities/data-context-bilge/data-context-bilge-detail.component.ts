import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DataContextBilge } from './data-context-bilge.model';
import { DataContextBilgeService } from './data-context-bilge.service';

@Component({
    selector: 'jhi-data-context-bilge-detail',
    templateUrl: './data-context-bilge-detail.component.html'
})
export class DataContextBilgeDetailComponent implements OnInit, OnDestroy {

    dataContext: DataContextBilge;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataContextService: DataContextBilgeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDataContexts();
    }

    load(id) {
        this.dataContextService.find(id).subscribe((dataContext) => {
            this.dataContext = dataContext;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDataContexts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dataContextListModification',
            (response) => this.load(this.dataContext.id)
        );
    }
}
