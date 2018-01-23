/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BilgeTestModule } from '../../../test.module';
import { SparkDestinationColumnBilgeDialogComponent } from '../../../../../../main/webapp/app/entities/spark-destination-column-bilge/spark-destination-column-bilge-dialog.component';
import { SparkDestinationColumnBilgeService } from '../../../../../../main/webapp/app/entities/spark-destination-column-bilge/spark-destination-column-bilge.service';
import { SparkDestinationColumnBilge } from '../../../../../../main/webapp/app/entities/spark-destination-column-bilge/spark-destination-column-bilge.model';
import { SparkDestinationTableBilgeService } from '../../../../../../main/webapp/app/entities/spark-destination-table-bilge';

describe('Component Tests', () => {

    describe('SparkDestinationColumnBilge Management Dialog Component', () => {
        let comp: SparkDestinationColumnBilgeDialogComponent;
        let fixture: ComponentFixture<SparkDestinationColumnBilgeDialogComponent>;
        let service: SparkDestinationColumnBilgeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [SparkDestinationColumnBilgeDialogComponent],
                providers: [
                    SparkDestinationTableBilgeService,
                    SparkDestinationColumnBilgeService
                ]
            })
            .overrideTemplate(SparkDestinationColumnBilgeDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SparkDestinationColumnBilgeDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SparkDestinationColumnBilgeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SparkDestinationColumnBilge(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.sparkDestinationColumn = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'sparkDestinationColumnListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SparkDestinationColumnBilge();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.sparkDestinationColumn = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'sparkDestinationColumnListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
