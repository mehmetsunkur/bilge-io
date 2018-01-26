import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SparkDestinationColumnBilge } from './spark-destination-column-bilge.model';
import { SparkDestinationColumnBilgeService } from './spark-destination-column-bilge.service';
import { Principal, ResponseWrapper } from '../../../../shared';
import { SparkDestinationColumnBilgeDialogComponent, SparkDestinationColumnBilgePopupService } from './';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'jhi-spark-destination-column-bilge',
    templateUrl: './spark-destination-column-bilge.component.html'
})
export class SparkDestinationColumnBilgeComponent implements OnInit, OnDestroy {
    sparkDestinationColumns: SparkDestinationColumnBilge[];
    currentAccount: any;
    eventSubscriber: Subscription;
    isLinear = false;
    zeroFormGroup: FormGroup;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

    constructor(
        private sparkDestinationColumnService: SparkDestinationColumnBilgeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private sparkDestinationColumnBilgePopupService: SparkDestinationColumnBilgePopupService,
        private _formBuilder: FormBuilder
    ) {
    }

    loadAll() {
        this.sparkDestinationColumnService.query().subscribe(
            (res: ResponseWrapper) => {
                this.sparkDestinationColumns = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
          });
          this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
          });
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSparkDestinationColumns();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SparkDestinationColumnBilge) {
        return item.id;
    }
    registerChangeInSparkDestinationColumns() {
        this.eventSubscriber = this.eventManager.subscribe('sparkDestinationColumnListModification', (response) => this.loadAll());
    }

    newDestinationColumn(){
        this.sparkDestinationColumnBilgePopupService
        .open(SparkDestinationColumnBilgeDialogComponent as Component);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
