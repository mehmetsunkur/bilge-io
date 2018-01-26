import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { SparkDestinationTableBilge } from '../../../../entities/spark-destination-table-bilge';
import { SparkDestinationTableBilgeService  } from '../spark-destination-table-bilge';
import { Principal, ResponseWrapper } from '../../../../shared';
import { SourceDbConnectionBilge } from '../source-db-connection-bilge';
import { SparkDestinationColumnBilge } from '../spark-destination-column-bilge';
import { DataSchemaBilge, DataSchemaBilgeService } from '../../../../entities/data-schema-bilge';
import { DataTableBilge, DataTableBilgeService } from '../../../../entities/data-table-bilge';
import { DataColumnBilge, DataColumnBilgeService } from '../../../../entities/data-column-bilge';
import { BilgeSourceDbConnectionBilgeService } from '../source-db-connection-bilge';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
    selector: 'jhi-spark-table-mapping-bilge',
    templateUrl: './spark-table-mapping-bilge.component.html'
})
export class SparkTableMappingBilgeComponent implements OnInit, OnDestroy {
    sparkDestinationTables: SparkDestinationTableBilge[];
    sparkDestinationColumns: SparkDestinationColumnBilge[];
    sourceDbConnections: SourceDbConnectionBilge[];
    dataSchemas: DataSchemaBilge[];
    dataTables: DataTableBilge[];
    dataColumns: DataColumnBilge[];
    currentAccount: any;
    eventSubscriber: Subscription;
    isLinear = false;
    zeroFormGroup: FormGroup;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;
    columnListFormGroup: FormGroup;

    source: LocalDataSource = new LocalDataSource();
    columns:any[]= new Array();

    constructor(
        private sparkDestinationTableService: SparkDestinationTableBilgeService,
        private bilgeSourceDbConnectionBilgeService: BilgeSourceDbConnectionBilgeService,
        private dataSchemaBilgeService: DataSchemaBilgeService,
        private dataTableBilgeService: DataTableBilgeService,
        private dataColumnsBilgeService: DataColumnBilgeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private _formBuilder: FormBuilder,
        private smartTableService: SmartTableService
    ) {
        /*
        const data = this.smartTableService.getData();
        this.source.load(data);
        */

       
    }

/*
    settings = {
        add: {
          addButtonContent: '<i class="nb-plus"></i>',
          createButtonContent: '<i class="nb-checkmark"></i>',
          cancelButtonContent: '<i class="nb-close"></i>',
        },
        edit: {
          editButtonContent: '<i class="nb-edit"></i>',
          saveButtonContent: '<i class="nb-checkmark"></i>',
          cancelButtonContent: '<i class="nb-close"></i>',
        },
        delete: {
          deleteButtonContent: '<i class="nb-trash"></i>',
          confirmDelete: true,
        },
        columns: {
          id: {
            title: 'ID',
            type: 'number',
          },
          firstName: {
            title: 'First Name',
            type: 'string',
          },
          lastName: {
            title: 'Last Name',
            type: 'string',
          },
          username: {
            title: 'Username',
            type: 'string',
          },
          email: {
            title: 'E-mail',
            type: 'string',
          },
          age: {
            title: 'Age',
            type: 'number',
          },
        },
      };
*/


settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
        dbSourceID: {
        title: 'dbSourceID',
        type: 'string',
      },
      dbSourceName: {
        title: 'DB Source Name',
        type: 'string',
      },
      schemaName: {
        title: 'Schema Name',
        type: 'string',
      },
      tableName: {
        title: 'Table Name',
        type: 'string',
      },
      columnName: {
        title: 'Column Name',
        type: 'string',
      }
    }
  };
    loadAll() {
        this.sparkDestinationTableService.query().subscribe(
            (res: ResponseWrapper) => {
                this.sparkDestinationTables = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.bilgeSourceDbConnectionBilgeService.query().subscribe(
            (res: ResponseWrapper)=> {
                this.sourceDbConnections = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );

         
        
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSparkDestinationTables();
        this.zeroFormGroup = this._formBuilder.group({
            destinationTableSelect: ['', Validators.required]
          });
        this.firstFormGroup = this._formBuilder.group({
            sourceConSelect: ['', Validators.required],
          });
        this.secondFormGroup = this._formBuilder.group({
            sourceSchemaSelect: ['', Validators.required]
        });
        this.thirdFormGroup = this._formBuilder.group({
            sourceTableSelect: ['', Validators.required]
        });
        this.columnListFormGroup = this._formBuilder.group({
            sourceColumnSelect: ['', Validators.required]
        });
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SparkDestinationTableBilge) {
        return item.id;
    }
    registerChangeInSparkDestinationTables() {
        this.eventSubscriber = this.eventManager.subscribe('sparkDestinationTableListModification', (response) => this.loadAll());
    }

    loadSchemas(){
        var selectedConId = this.firstFormGroup.get('sourceConSelect').value;
        this.bilgeSourceDbConnectionBilgeService.listSchemas(selectedConId).subscribe(
            (res: ResponseWrapper)=> {
                this.dataSchemas = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        )
    }

    loadTables(){
        var selectedConId = this.firstFormGroup.get('sourceConSelect').value;
        var selectedSchmId = this.secondFormGroup.get('sourceSchemaSelect').value;
        this.bilgeSourceDbConnectionBilgeService.listTables(selectedConId ,selectedSchmId).subscribe(
            (res: ResponseWrapper)=> {
                this.dataTables = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        )
    }

    loadColumns(){
        var selectedConId = this.firstFormGroup.get('sourceConSelect').value;
        var selectedSchmId = this.secondFormGroup.get('sourceSchemaSelect').value;
        var selectedTblId = this.thirdFormGroup.get('sourceTableSelect').value;
        this.bilgeSourceDbConnectionBilgeService.listColumns(selectedConId ,selectedSchmId, selectedTblId).subscribe(
            (res: ResponseWrapper)=> {
                this.dataColumns = res.json;                
            },
            (res: ResponseWrapper) => this.onError(res.json)
        )

        
    }

    loadColumnsToTable(arr: Array<String>){
        var selectedConId = this.firstFormGroup.get('sourceConSelect').value;
        var selectedSchmId = this.secondFormGroup.get('sourceSchemaSelect').value;
        var selectedTblId = this.thirdFormGroup.get('sourceTableSelect').value; 

        this.bilgeSourceDbConnectionBilgeService.listColumns(selectedConId ,selectedSchmId, selectedTblId).subscribe(
            (res: ResponseWrapper)=> {
                this.dataColumns = res.json;
                this.columns = new Array();
                this.dataColumns.forEach(element => {
                    
                    var d = {                        
                                dbSourceID: selectedConId,
                                dbSourceName: this.sourceDbConnections.find(x => x.id == selectedConId).name,
                                schemaName: selectedSchmId,
                                tableName: selectedTblId,
                                columnName: element.name                          
                            }
                    this.columns.push(d);                    
                });
                this.source.load(this.columns);
            },
            (res: ResponseWrapper) => this.onError(res.json)
        )        
    }

    onDeleteConfirm(event): void {
        if (window.confirm('Are you sure you want to delete?')) {
          event.confirm.resolve();
        } else {
          event.confirm.reject();
        }
      }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
