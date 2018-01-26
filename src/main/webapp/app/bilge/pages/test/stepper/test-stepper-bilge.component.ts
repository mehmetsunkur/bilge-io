import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Principal, ResponseWrapper } from '../../../../shared';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatHorizontalStepper, MatSelectChange } from '@angular/material';
import { BilgeSourceDbConnectionBilgeService } from '../../entities/source-db-connection-bilge/bilge-source-db-connection-bilge.service';
import { DataSchemaBilge } from '../../../../entities/data-schema-bilge/data-schema-bilge.model';
import { SourceDbConnectionBilge } from '../../../../entities/source-db-connection-bilge';
import { AbstractControl } from '@angular/forms/src/model';
import { DataTableBilge } from '../../../../entities/data-table-bilge/index';

@Component({
    selector: 'jhi-test-stepper-bilge',
    templateUrl: './test-stepper-bilge.component.html'
})
export class TestStepperBilgeComponent implements OnInit, OnDestroy {

    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

    currentAccount: any;
    eventSubscriber: Subscription;

    
    sourceDbConnections: SourceDbConnectionBilge[];
    sourceDbConSelectControl: FormControl = new FormControl(['', Validators.required]);
    sourceDbConnectionForm = new FormGroup ({
        sourceDbConSelectControl: this.sourceDbConSelectControl
    });

    dataSchemas: DataSchemaBilge[];
    schemaSelectControl: FormControl = new FormControl(['', Validators.required]);
    schemaForm = new FormGroup ({
        schemaSelectControl: this.schemaSelectControl
    });

    dataTables: DataTableBilge[];
    tableSelectControl: FormControl = new FormControl(['', Validators.required]);
    tableForm = new FormGroup ({
        tableSelectControl: this.tableSelectControl
    });


    showProgressBar: Boolean = false;

    constructor(
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private _formBuilder: FormBuilder,
        private bilgeSourceDbConnectionBilgeService: BilgeSourceDbConnectionBilgeService,
    ) {
    }




    ngOnInit() {
        this.loadSourceDbConnections();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
          this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
          });
    }

    loadSourceDbConnections(){
        this.bilgeSourceDbConnectionBilgeService.query().subscribe((res: ResponseWrapper) => {
            this.sourceDbConnections = res.json;
        },
        (res: ResponseWrapper) => {
            this.onError(res.json)
            }
        )
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    selectionChange(event :StepperSelectionEvent){
        console.log(event.selectedIndex+":"+event.selectedStep.label);
    }

    nextStep(stepper :MatHorizontalStepper){
        stepper.next();
        console.log("nextStep");
    }

    stepToSchemaSelection(stepper :MatHorizontalStepper){
        this.showProgressBar=true;
        var conId = this.sourceDbConSelectControl.value;
        this.bilgeSourceDbConnectionBilgeService.listSchemas(conId).subscribe((res: ResponseWrapper) => {
            this.dataSchemas = res.json;
            this.showProgressBar=false;
            stepper.next();
        },
        (res: ResponseWrapper) => {
            this.showProgressBar=false;
            this.onError(res.json)
            }
        )
    }
    stepToTableSelection(stepper :MatHorizontalStepper){
        this.showProgressBar=true;
        var conId = this.sourceDbConSelectControl.value;
        var schemaName = this.schemaSelectControl.value;
        this.bilgeSourceDbConnectionBilgeService.listTables(conId,schemaName).subscribe((res: ResponseWrapper) => {
            this.dataTables = res.json;
            this.showProgressBar=false;
            stepper.next();
        },
        (res: ResponseWrapper) => {
            this.showProgressBar=false;
            this.onError(res.json)
            }
        )
    }

    prevStep(){
        console.log("prevStep");
    }

    sourceDbConSelectChanged(event: MatSelectChange){
        this.schemaSelectControl.setValue(null);
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
















  vegetables = [
    {name: 'Carrot', type: 'vegetable'},
    {name: 'Onion', type: 'vegetable'},
    {name: 'Potato', type: 'vegetable'},
    {name: 'Capsicum', type: 'vegetable'}];

  fruits = [
    {name: 'Apple', type: 'fruit'},
    {name: 'Orange', type: 'fruit'},
    {name: 'Mango', type: 'fruit'},
    {name: 'Banana', type: 'fruit'}];

  droppedFruits = [];
  droppedVegetables = [];
  droppedItems = [];
  fruitDropEnabled = true;
  dragEnabled = true;

  onFruitDrop(e: any) {
    this.droppedFruits.push(e.dragData);
    this.removeItem(e.dragData, this.fruits);
  }

  onVegetableDrop(e: any) {
    this.droppedVegetables.push(e.dragData);
    this.removeItem(e.dragData, this.vegetables);
  }

  onAnyDrop(e: any) {
    this.droppedItems.push(e.dragData);

    if (e.dragData.type === 'vegetable') {
      this.removeItem(e.dragData, this.vegetables);
    } else {
      this.removeItem(e.dragData, this.fruits);
    }
  }

  removeItem(item: any, list: Array<any>) {
    let index = list.map(function (e) {
      return e.name
    }).indexOf(item.name);
    list.splice(index, 1);
  }
}
