/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BilgeTestModule } from '../../../test.module';
import { DataTableBilgeDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/data-table-bilge/data-table-bilge-delete-dialog.component';
import { DataTableBilgeService } from '../../../../../../main/webapp/app/entities/data-table-bilge/data-table-bilge.service';

describe('Component Tests', () => {

    describe('DataTableBilge Management Delete Component', () => {
        let comp: DataTableBilgeDeleteDialogComponent;
        let fixture: ComponentFixture<DataTableBilgeDeleteDialogComponent>;
        let service: DataTableBilgeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [DataTableBilgeDeleteDialogComponent],
                providers: [
                    DataTableBilgeService
                ]
            })
            .overrideTemplate(DataTableBilgeDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataTableBilgeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataTableBilgeService);
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
