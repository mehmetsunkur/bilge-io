/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BilgeTestModule } from '../../../test.module';
import { SourceDbConnectionBilgeDialogComponent } from '../../../../../../main/webapp/app/entities/source-db-connection-bilge/source-db-connection-bilge-dialog.component';
import { SourceDbConnectionBilgeService } from '../../../../../../main/webapp/app/entities/source-db-connection-bilge/source-db-connection-bilge.service';
import { SourceDbConnectionBilge } from '../../../../../../main/webapp/app/entities/source-db-connection-bilge/source-db-connection-bilge.model';

describe('Component Tests', () => {

    describe('SourceDbConnectionBilge Management Dialog Component', () => {
        let comp: SourceDbConnectionBilgeDialogComponent;
        let fixture: ComponentFixture<SourceDbConnectionBilgeDialogComponent>;
        let service: SourceDbConnectionBilgeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [SourceDbConnectionBilgeDialogComponent],
                providers: [
                    SourceDbConnectionBilgeService
                ]
            })
            .overrideTemplate(SourceDbConnectionBilgeDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SourceDbConnectionBilgeDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SourceDbConnectionBilgeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SourceDbConnectionBilge(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.sourceDbConnection = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'sourceDbConnectionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SourceDbConnectionBilge();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.sourceDbConnection = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'sourceDbConnectionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
