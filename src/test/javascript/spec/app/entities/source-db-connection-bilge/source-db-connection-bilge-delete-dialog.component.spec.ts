/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BilgeTestModule } from '../../../test.module';
import { SourceDbConnectionBilgeDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/source-db-connection-bilge/source-db-connection-bilge-delete-dialog.component';
import { SourceDbConnectionBilgeService } from '../../../../../../main/webapp/app/entities/source-db-connection-bilge/source-db-connection-bilge.service';

describe('Component Tests', () => {

    describe('SourceDbConnectionBilge Management Delete Component', () => {
        let comp: SourceDbConnectionBilgeDeleteDialogComponent;
        let fixture: ComponentFixture<SourceDbConnectionBilgeDeleteDialogComponent>;
        let service: SourceDbConnectionBilgeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [SourceDbConnectionBilgeDeleteDialogComponent],
                providers: [
                    SourceDbConnectionBilgeService
                ]
            })
            .overrideTemplate(SourceDbConnectionBilgeDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SourceDbConnectionBilgeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SourceDbConnectionBilgeService);
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
