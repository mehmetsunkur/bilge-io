/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { BilgeTestModule } from '../../../test.module';
import { SparkDestinationColumnBilgeComponent } from '../../../../../../main/webapp/app/entities/spark-destination-column-bilge/spark-destination-column-bilge.component';
import { SparkDestinationColumnBilgeService } from '../../../../../../main/webapp/app/entities/spark-destination-column-bilge/spark-destination-column-bilge.service';
import { SparkDestinationColumnBilge } from '../../../../../../main/webapp/app/entities/spark-destination-column-bilge/spark-destination-column-bilge.model';

describe('Component Tests', () => {

    describe('SparkDestinationColumnBilge Management Component', () => {
        let comp: SparkDestinationColumnBilgeComponent;
        let fixture: ComponentFixture<SparkDestinationColumnBilgeComponent>;
        let service: SparkDestinationColumnBilgeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [SparkDestinationColumnBilgeComponent],
                providers: [
                    SparkDestinationColumnBilgeService
                ]
            })
            .overrideTemplate(SparkDestinationColumnBilgeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SparkDestinationColumnBilgeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SparkDestinationColumnBilgeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new SparkDestinationColumnBilge(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.sparkDestinationColumns[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
