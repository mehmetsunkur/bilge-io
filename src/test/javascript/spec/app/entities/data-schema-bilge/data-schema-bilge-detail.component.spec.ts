/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { BilgeTestModule } from '../../../test.module';
import { DataSchemaBilgeDetailComponent } from '../../../../../../main/webapp/app/entities/data-schema-bilge/data-schema-bilge-detail.component';
import { DataSchemaBilgeService } from '../../../../../../main/webapp/app/entities/data-schema-bilge/data-schema-bilge.service';
import { DataSchemaBilge } from '../../../../../../main/webapp/app/entities/data-schema-bilge/data-schema-bilge.model';

describe('Component Tests', () => {

    describe('DataSchemaBilge Management Detail Component', () => {
        let comp: DataSchemaBilgeDetailComponent;
        let fixture: ComponentFixture<DataSchemaBilgeDetailComponent>;
        let service: DataSchemaBilgeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [DataSchemaBilgeDetailComponent],
                providers: [
                    DataSchemaBilgeService
                ]
            })
            .overrideTemplate(DataSchemaBilgeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataSchemaBilgeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataSchemaBilgeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new DataSchemaBilge(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.dataSchema).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
