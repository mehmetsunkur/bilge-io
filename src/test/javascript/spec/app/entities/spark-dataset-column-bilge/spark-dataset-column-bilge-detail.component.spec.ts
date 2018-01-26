/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { BilgeTestModule } from '../../../test.module';
import { SparkDatasetColumnBilgeDetailComponent } from '../../../../../../main/webapp/app/entities/spark-dataset-column-bilge/spark-dataset-column-bilge-detail.component';
import { SparkDatasetColumnBilgeService } from '../../../../../../main/webapp/app/entities/spark-dataset-column-bilge/spark-dataset-column-bilge.service';
import { SparkDatasetColumnBilge } from '../../../../../../main/webapp/app/entities/spark-dataset-column-bilge/spark-dataset-column-bilge.model';

describe('Component Tests', () => {

    describe('SparkDatasetColumnBilge Management Detail Component', () => {
        let comp: SparkDatasetColumnBilgeDetailComponent;
        let fixture: ComponentFixture<SparkDatasetColumnBilgeDetailComponent>;
        let service: SparkDatasetColumnBilgeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [SparkDatasetColumnBilgeDetailComponent],
                providers: [
                    SparkDatasetColumnBilgeService
                ]
            })
            .overrideTemplate(SparkDatasetColumnBilgeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SparkDatasetColumnBilgeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SparkDatasetColumnBilgeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new SparkDatasetColumnBilge(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.sparkDatasetColumn).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
