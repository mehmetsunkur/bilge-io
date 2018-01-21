/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { BilgeTestModule } from '../../../test.module';
import { DataContextBilgeComponent } from '../../../../../../main/webapp/app/entities/data-context-bilge/data-context-bilge.component';
import { DataContextBilgeService } from '../../../../../../main/webapp/app/entities/data-context-bilge/data-context-bilge.service';
import { DataContextBilge } from '../../../../../../main/webapp/app/entities/data-context-bilge/data-context-bilge.model';

describe('Component Tests', () => {

    describe('DataContextBilge Management Component', () => {
        let comp: DataContextBilgeComponent;
        let fixture: ComponentFixture<DataContextBilgeComponent>;
        let service: DataContextBilgeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [DataContextBilgeComponent],
                providers: [
                    DataContextBilgeService
                ]
            })
            .overrideTemplate(DataContextBilgeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataContextBilgeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataContextBilgeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new DataContextBilge(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.dataContexts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
