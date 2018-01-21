/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { BilgeTestModule } from '../../../test.module';
import { SourceDbConnectionBilgeComponent } from '../../../../../../main/webapp/app/entities/source-db-connection-bilge/source-db-connection-bilge.component';
import { SourceDbConnectionBilgeService } from '../../../../../../main/webapp/app/entities/source-db-connection-bilge/source-db-connection-bilge.service';
import { SourceDbConnectionBilge } from '../../../../../../main/webapp/app/entities/source-db-connection-bilge/source-db-connection-bilge.model';

describe('Component Tests', () => {

    describe('SourceDbConnectionBilge Management Component', () => {
        let comp: SourceDbConnectionBilgeComponent;
        let fixture: ComponentFixture<SourceDbConnectionBilgeComponent>;
        let service: SourceDbConnectionBilgeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [SourceDbConnectionBilgeComponent],
                providers: [
                    SourceDbConnectionBilgeService
                ]
            })
            .overrideTemplate(SourceDbConnectionBilgeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SourceDbConnectionBilgeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SourceDbConnectionBilgeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new SourceDbConnectionBilge(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.sourceDbConnections[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
