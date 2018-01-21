/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BilgeTestModule } from '../../../test.module';
import { DataColumnBilgeDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/data-column-bilge/data-column-bilge-delete-dialog.component';
import { DataColumnBilgeService } from '../../../../../../main/webapp/app/entities/data-column-bilge/data-column-bilge.service';

describe('Component Tests', () => {

    describe('DataColumnBilge Management Delete Component', () => {
        let comp: DataColumnBilgeDeleteDialogComponent;
        let fixture: ComponentFixture<DataColumnBilgeDeleteDialogComponent>;
        let service: DataColumnBilgeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [DataColumnBilgeDeleteDialogComponent],
                providers: [
                    DataColumnBilgeService
                ]
            })
            .overrideTemplate(DataColumnBilgeDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataColumnBilgeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataColumnBilgeService);
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
