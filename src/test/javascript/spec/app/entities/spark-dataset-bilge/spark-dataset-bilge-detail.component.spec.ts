/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { BilgeTestModule } from '../../../test.module';
import { SparkDatasetBilgeDetailComponent } from '../../../../../../main/webapp/app/entities/spark-dataset-bilge/spark-dataset-bilge-detail.component';
import { SparkDatasetBilgeService } from '../../../../../../main/webapp/app/entities/spark-dataset-bilge/spark-dataset-bilge.service';
import { SparkDatasetBilge } from '../../../../../../main/webapp/app/entities/spark-dataset-bilge/spark-dataset-bilge.model';

describe('Component Tests', () => {

    describe('SparkDatasetBilge Management Detail Component', () => {
        let comp: SparkDatasetBilgeDetailComponent;
        let fixture: ComponentFixture<SparkDatasetBilgeDetailComponent>;
        let service: SparkDatasetBilgeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [SparkDatasetBilgeDetailComponent],
                providers: [
                    SparkDatasetBilgeService
                ]
            })
            .overrideTemplate(SparkDatasetBilgeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SparkDatasetBilgeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SparkDatasetBilgeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new SparkDatasetBilge(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.sparkDataset).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
