/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { BilgeTestModule } from '../../../test.module';
import { DataContextBilgeDetailComponent } from '../../../../../../main/webapp/app/entities/data-context-bilge/data-context-bilge-detail.component';
import { DataContextBilgeService } from '../../../../../../main/webapp/app/entities/data-context-bilge/data-context-bilge.service';
import { DataContextBilge } from '../../../../../../main/webapp/app/entities/data-context-bilge/data-context-bilge.model';

describe('Component Tests', () => {

    describe('DataContextBilge Management Detail Component', () => {
        let comp: DataContextBilgeDetailComponent;
        let fixture: ComponentFixture<DataContextBilgeDetailComponent>;
        let service: DataContextBilgeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [DataContextBilgeDetailComponent],
                providers: [
                    DataContextBilgeService
                ]
            })
            .overrideTemplate(DataContextBilgeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataContextBilgeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataContextBilgeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new DataContextBilge(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.dataContext).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
