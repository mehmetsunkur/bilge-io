/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { BilgeTestModule } from '../../../test.module';
import { SparkDestinationColumnBilgeDetailComponent } from '../../../../../../main/webapp/app/entities/spark-destination-column-bilge/spark-destination-column-bilge-detail.component';
import { SparkDestinationColumnBilgeService } from '../../../../../../main/webapp/app/entities/spark-destination-column-bilge/spark-destination-column-bilge.service';
import { SparkDestinationColumnBilge } from '../../../../../../main/webapp/app/entities/spark-destination-column-bilge/spark-destination-column-bilge.model';

describe('Component Tests', () => {

    describe('SparkDestinationColumnBilge Management Detail Component', () => {
        let comp: SparkDestinationColumnBilgeDetailComponent;
        let fixture: ComponentFixture<SparkDestinationColumnBilgeDetailComponent>;
        let service: SparkDestinationColumnBilgeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [SparkDestinationColumnBilgeDetailComponent],
                providers: [
                    SparkDestinationColumnBilgeService
                ]
            })
            .overrideTemplate(SparkDestinationColumnBilgeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SparkDestinationColumnBilgeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SparkDestinationColumnBilgeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new SparkDestinationColumnBilge(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.sparkDestinationColumn).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
