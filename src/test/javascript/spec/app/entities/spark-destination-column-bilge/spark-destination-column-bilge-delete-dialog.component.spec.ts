/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BilgeTestModule } from '../../../test.module';
import { SparkDestinationColumnBilgeDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/spark-destination-column-bilge/spark-destination-column-bilge-delete-dialog.component';
import { SparkDestinationColumnBilgeService } from '../../../../../../main/webapp/app/entities/spark-destination-column-bilge/spark-destination-column-bilge.service';

describe('Component Tests', () => {

    describe('SparkDestinationColumnBilge Management Delete Component', () => {
        let comp: SparkDestinationColumnBilgeDeleteDialogComponent;
        let fixture: ComponentFixture<SparkDestinationColumnBilgeDeleteDialogComponent>;
        let service: SparkDestinationColumnBilgeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [SparkDestinationColumnBilgeDeleteDialogComponent],
                providers: [
                    SparkDestinationColumnBilgeService
                ]
            })
            .overrideTemplate(SparkDestinationColumnBilgeDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SparkDestinationColumnBilgeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SparkDestinationColumnBilgeService);
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
