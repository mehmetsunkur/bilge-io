/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BilgeTestModule } from '../../../test.module';
import { SparkDestinationTableBilgeDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/spark-destination-table-bilge/spark-destination-table-bilge-delete-dialog.component';
import { SparkDestinationTableBilgeService } from '../../../../../../main/webapp/app/entities/spark-destination-table-bilge/spark-destination-table-bilge.service';

describe('Component Tests', () => {

    describe('SparkDestinationTableBilge Management Delete Component', () => {
        let comp: SparkDestinationTableBilgeDeleteDialogComponent;
        let fixture: ComponentFixture<SparkDestinationTableBilgeDeleteDialogComponent>;
        let service: SparkDestinationTableBilgeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [SparkDestinationTableBilgeDeleteDialogComponent],
                providers: [
                    SparkDestinationTableBilgeService
                ]
            })
            .overrideTemplate(SparkDestinationTableBilgeDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SparkDestinationTableBilgeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SparkDestinationTableBilgeService);
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
