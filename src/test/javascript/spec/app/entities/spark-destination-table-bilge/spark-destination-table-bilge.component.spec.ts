/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { BilgeTestModule } from '../../../test.module';
import { SparkDestinationTableBilgeComponent } from '../../../../../../main/webapp/app/entities/spark-destination-table-bilge/spark-destination-table-bilge.component';
import { SparkDestinationTableBilgeService } from '../../../../../../main/webapp/app/entities/spark-destination-table-bilge/spark-destination-table-bilge.service';
import { SparkDestinationTableBilge } from '../../../../../../main/webapp/app/entities/spark-destination-table-bilge/spark-destination-table-bilge.model';

describe('Component Tests', () => {

    describe('SparkDestinationTableBilge Management Component', () => {
        let comp: SparkDestinationTableBilgeComponent;
        let fixture: ComponentFixture<SparkDestinationTableBilgeComponent>;
        let service: SparkDestinationTableBilgeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [SparkDestinationTableBilgeComponent],
                providers: [
                    SparkDestinationTableBilgeService
                ]
            })
            .overrideTemplate(SparkDestinationTableBilgeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SparkDestinationTableBilgeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SparkDestinationTableBilgeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new SparkDestinationTableBilge(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.sparkDestinationTables[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
