/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { BilgeTestModule } from '../../../test.module';
import { DataColumnBilgeComponent } from '../../../../../../main/webapp/app/entities/data-column-bilge/data-column-bilge.component';
import { DataColumnBilgeService } from '../../../../../../main/webapp/app/entities/data-column-bilge/data-column-bilge.service';
import { DataColumnBilge } from '../../../../../../main/webapp/app/entities/data-column-bilge/data-column-bilge.model';

describe('Component Tests', () => {

    describe('DataColumnBilge Management Component', () => {
        let comp: DataColumnBilgeComponent;
        let fixture: ComponentFixture<DataColumnBilgeComponent>;
        let service: DataColumnBilgeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [DataColumnBilgeComponent],
                providers: [
                    DataColumnBilgeService
                ]
            })
            .overrideTemplate(DataColumnBilgeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataColumnBilgeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataColumnBilgeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new DataColumnBilge(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.dataColumns[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
