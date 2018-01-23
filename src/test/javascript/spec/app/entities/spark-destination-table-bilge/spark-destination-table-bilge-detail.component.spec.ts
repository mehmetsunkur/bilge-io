/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { BilgeTestModule } from '../../../test.module';
import { SparkDestinationTableBilgeDetailComponent } from '../../../../../../main/webapp/app/entities/spark-destination-table-bilge/spark-destination-table-bilge-detail.component';
import { SparkDestinationTableBilgeService } from '../../../../../../main/webapp/app/entities/spark-destination-table-bilge/spark-destination-table-bilge.service';
import { SparkDestinationTableBilge } from '../../../../../../main/webapp/app/entities/spark-destination-table-bilge/spark-destination-table-bilge.model';

describe('Component Tests', () => {

    describe('SparkDestinationTableBilge Management Detail Component', () => {
        let comp: SparkDestinationTableBilgeDetailComponent;
        let fixture: ComponentFixture<SparkDestinationTableBilgeDetailComponent>;
        let service: SparkDestinationTableBilgeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [SparkDestinationTableBilgeDetailComponent],
                providers: [
                    SparkDestinationTableBilgeService
                ]
            })
            .overrideTemplate(SparkDestinationTableBilgeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SparkDestinationTableBilgeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SparkDestinationTableBilgeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new SparkDestinationTableBilge(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.sparkDestinationTable).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
