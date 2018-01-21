/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { BilgeTestModule } from '../../../test.module';
import { SourceDbConnectionBilgeDetailComponent } from '../../../../../../main/webapp/app/entities/source-db-connection-bilge/source-db-connection-bilge-detail.component';
import { SourceDbConnectionBilgeService } from '../../../../../../main/webapp/app/entities/source-db-connection-bilge/source-db-connection-bilge.service';
import { SourceDbConnectionBilge } from '../../../../../../main/webapp/app/entities/source-db-connection-bilge/source-db-connection-bilge.model';

describe('Component Tests', () => {

    describe('SourceDbConnectionBilge Management Detail Component', () => {
        let comp: SourceDbConnectionBilgeDetailComponent;
        let fixture: ComponentFixture<SourceDbConnectionBilgeDetailComponent>;
        let service: SourceDbConnectionBilgeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [SourceDbConnectionBilgeDetailComponent],
                providers: [
                    SourceDbConnectionBilgeService
                ]
            })
            .overrideTemplate(SourceDbConnectionBilgeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SourceDbConnectionBilgeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SourceDbConnectionBilgeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new SourceDbConnectionBilge(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.sourceDbConnection).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
