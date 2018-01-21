/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BilgeTestModule } from '../../../test.module';
import { DataSchemaBilgeDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/data-schema-bilge/data-schema-bilge-delete-dialog.component';
import { DataSchemaBilgeService } from '../../../../../../main/webapp/app/entities/data-schema-bilge/data-schema-bilge.service';

describe('Component Tests', () => {

    describe('DataSchemaBilge Management Delete Component', () => {
        let comp: DataSchemaBilgeDeleteDialogComponent;
        let fixture: ComponentFixture<DataSchemaBilgeDeleteDialogComponent>;
        let service: DataSchemaBilgeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [DataSchemaBilgeDeleteDialogComponent],
                providers: [
                    DataSchemaBilgeService
                ]
            })
            .overrideTemplate(DataSchemaBilgeDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataSchemaBilgeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataSchemaBilgeService);
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
