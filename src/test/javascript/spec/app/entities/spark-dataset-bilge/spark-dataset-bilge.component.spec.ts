/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { BilgeTestModule } from '../../../test.module';
import { SparkDatasetBilgeComponent } from '../../../../../../main/webapp/app/entities/spark-dataset-bilge/spark-dataset-bilge.component';
import { SparkDatasetBilgeService } from '../../../../../../main/webapp/app/entities/spark-dataset-bilge/spark-dataset-bilge.service';
import { SparkDatasetBilge } from '../../../../../../main/webapp/app/entities/spark-dataset-bilge/spark-dataset-bilge.model';

describe('Component Tests', () => {

    describe('SparkDatasetBilge Management Component', () => {
        let comp: SparkDatasetBilgeComponent;
        let fixture: ComponentFixture<SparkDatasetBilgeComponent>;
        let service: SparkDatasetBilgeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [SparkDatasetBilgeComponent],
                providers: [
                    SparkDatasetBilgeService
                ]
            })
            .overrideTemplate(SparkDatasetBilgeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SparkDatasetBilgeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SparkDatasetBilgeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new SparkDatasetBilge(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.sparkDatasets[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
