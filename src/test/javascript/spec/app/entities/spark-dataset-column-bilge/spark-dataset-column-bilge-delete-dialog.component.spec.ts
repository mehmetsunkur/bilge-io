/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BilgeTestModule } from '../../../test.module';
import { SparkDatasetColumnBilgeDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/spark-dataset-column-bilge/spark-dataset-column-bilge-delete-dialog.component';
import { SparkDatasetColumnBilgeService } from '../../../../../../main/webapp/app/entities/spark-dataset-column-bilge/spark-dataset-column-bilge.service';

describe('Component Tests', () => {

    describe('SparkDatasetColumnBilge Management Delete Component', () => {
        let comp: SparkDatasetColumnBilgeDeleteDialogComponent;
        let fixture: ComponentFixture<SparkDatasetColumnBilgeDeleteDialogComponent>;
        let service: SparkDatasetColumnBilgeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [SparkDatasetColumnBilgeDeleteDialogComponent],
                providers: [
                    SparkDatasetColumnBilgeService
                ]
            })
            .overrideTemplate(SparkDatasetColumnBilgeDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SparkDatasetColumnBilgeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SparkDatasetColumnBilgeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
