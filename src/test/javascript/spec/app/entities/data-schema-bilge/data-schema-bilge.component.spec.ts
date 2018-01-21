/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { BilgeTestModule } from '../../../test.module';
import { DataSchemaBilgeComponent } from '../../../../../../main/webapp/app/entities/data-schema-bilge/data-schema-bilge.component';
import { DataSchemaBilgeService } from '../../../../../../main/webapp/app/entities/data-schema-bilge/data-schema-bilge.service';
import { DataSchemaBilge } from '../../../../../../main/webapp/app/entities/data-schema-bilge/data-schema-bilge.model';

describe('Component Tests', () => {

    describe('DataSchemaBilge Management Component', () => {
        let comp: DataSchemaBilgeComponent;
        let fixture: ComponentFixture<DataSchemaBilgeComponent>;
        let service: DataSchemaBilgeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [DataSchemaBilgeComponent],
                providers: [
                    DataSchemaBilgeService
                ]
            })
            .overrideTemplate(DataSchemaBilgeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataSchemaBilgeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataSchemaBilgeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new DataSchemaBilge(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.dataSchemas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
