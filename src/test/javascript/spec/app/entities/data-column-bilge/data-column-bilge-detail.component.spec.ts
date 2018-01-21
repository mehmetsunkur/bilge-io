/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { BilgeTestModule } from '../../../test.module';
import { DataColumnBilgeDetailComponent } from '../../../../../../main/webapp/app/entities/data-column-bilge/data-column-bilge-detail.component';
import { DataColumnBilgeService } from '../../../../../../main/webapp/app/entities/data-column-bilge/data-column-bilge.service';
import { DataColumnBilge } from '../../../../../../main/webapp/app/entities/data-column-bilge/data-column-bilge.model';

describe('Component Tests', () => {

    describe('DataColumnBilge Management Detail Component', () => {
        let comp: DataColumnBilgeDetailComponent;
        let fixture: ComponentFixture<DataColumnBilgeDetailComponent>;
        let service: DataColumnBilgeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [DataColumnBilgeDetailComponent],
                providers: [
                    DataColumnBilgeService
                ]
            })
            .overrideTemplate(DataColumnBilgeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataColumnBilgeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataColumnBilgeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new DataColumnBilge(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.dataColumn).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
