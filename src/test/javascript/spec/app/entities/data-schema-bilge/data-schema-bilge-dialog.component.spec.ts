/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BilgeTestModule } from '../../../test.module';
import { DataSchemaBilgeDialogComponent } from '../../../../../../main/webapp/app/entities/data-schema-bilge/data-schema-bilge-dialog.component';
import { DataSchemaBilgeService } from '../../../../../../main/webapp/app/entities/data-schema-bilge/data-schema-bilge.service';
import { DataSchemaBilge } from '../../../../../../main/webapp/app/entities/data-schema-bilge/data-schema-bilge.model';
import { DataContextBilgeService } from '../../../../../../main/webapp/app/entities/data-context-bilge';

describe('Component Tests', () => {

    describe('DataSchemaBilge Management Dialog Component', () => {
        let comp: DataSchemaBilgeDialogComponent;
        let fixture: ComponentFixture<DataSchemaBilgeDialogComponent>;
        let service: DataSchemaBilgeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [DataSchemaBilgeDialogComponent],
                providers: [
                    DataContextBilgeService,
                    DataSchemaBilgeService
                ]
            })
            .overrideTemplate(DataSchemaBilgeDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataSchemaBilgeDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataSchemaBilgeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DataSchemaBilge(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.dataSchema = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'dataSchemaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DataSchemaBilge();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.dataSchema = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'dataSchemaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
