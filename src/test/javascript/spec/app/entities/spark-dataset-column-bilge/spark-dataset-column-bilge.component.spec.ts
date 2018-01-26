/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { BilgeTestModule } from '../../../test.module';
import { SparkDatasetColumnBilgeComponent } from '../../../../../../main/webapp/app/entities/spark-dataset-column-bilge/spark-dataset-column-bilge.component';
import { SparkDatasetColumnBilgeService } from '../../../../../../main/webapp/app/entities/spark-dataset-column-bilge/spark-dataset-column-bilge.service';
import { SparkDatasetColumnBilge } from '../../../../../../main/webapp/app/entities/spark-dataset-column-bilge/spark-dataset-column-bilge.model';

describe('Component Tests', () => {

    describe('SparkDatasetColumnBilge Management Component', () => {
        let comp: SparkDatasetColumnBilgeComponent;
        let fixture: ComponentFixture<SparkDatasetColumnBilgeComponent>;
        let service: SparkDatasetColumnBilgeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [SparkDatasetColumnBilgeComponent],
                providers: [
                    SparkDatasetColumnBilgeService
                ]
            })
            .overrideTemplate(SparkDatasetColumnBilgeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SparkDatasetColumnBilgeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SparkDatasetColumnBilgeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new SparkDatasetColumnBilge(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.sparkDatasetColumns[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
