/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BilgeTestModule } from '../../../test.module';
import { SparkDatasetBilgeDialogComponent } from '../../../../../../main/webapp/app/entities/spark-dataset-bilge/spark-dataset-bilge-dialog.component';
import { SparkDatasetBilgeService } from '../../../../../../main/webapp/app/entities/spark-dataset-bilge/spark-dataset-bilge.service';
import { SparkDatasetBilge } from '../../../../../../main/webapp/app/entities/spark-dataset-bilge/spark-dataset-bilge.model';

describe('Component Tests', () => {

    describe('SparkDatasetBilge Management Dialog Component', () => {
        let comp: SparkDatasetBilgeDialogComponent;
        let fixture: ComponentFixture<SparkDatasetBilgeDialogComponent>;
        let service: SparkDatasetBilgeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [SparkDatasetBilgeDialogComponent],
                providers: [
                    SparkDatasetBilgeService
                ]
            })
            .overrideTemplate(SparkDatasetBilgeDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SparkDatasetBilgeDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SparkDatasetBilgeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SparkDatasetBilge(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.sparkDataset = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'sparkDatasetListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SparkDatasetBilge();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.sparkDataset = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'sparkDatasetListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
