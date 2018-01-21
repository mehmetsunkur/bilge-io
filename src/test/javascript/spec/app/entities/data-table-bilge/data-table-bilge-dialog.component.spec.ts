/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BilgeTestModule } from '../../../test.module';
import { DataTableBilgeDialogComponent } from '../../../../../../main/webapp/app/entities/data-table-bilge/data-table-bilge-dialog.component';
import { DataTableBilgeService } from '../../../../../../main/webapp/app/entities/data-table-bilge/data-table-bilge.service';
import { DataTableBilge } from '../../../../../../main/webapp/app/entities/data-table-bilge/data-table-bilge.model';
import { DataSchemaBilgeService } from '../../../../../../main/webapp/app/entities/data-schema-bilge';

describe('Component Tests', () => {

    describe('DataTableBilge Management Dialog Component', () => {
        let comp: DataTableBilgeDialogComponent;
        let fixture: ComponentFixture<DataTableBilgeDialogComponent>;
        let service: DataTableBilgeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [DataTableBilgeDialogComponent],
                providers: [
                    DataSchemaBilgeService,
                    DataTableBilgeService
                ]
            })
            .overrideTemplate(DataTableBilgeDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataTableBilgeDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataTableBilgeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DataTableBilge(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.dataTable = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'dataTableListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DataTableBilge();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.dataTable = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'dataTableListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
