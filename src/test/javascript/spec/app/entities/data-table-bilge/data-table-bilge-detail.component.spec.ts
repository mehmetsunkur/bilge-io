/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { BilgeTestModule } from '../../../test.module';
import { DataTableBilgeDetailComponent } from '../../../../../../main/webapp/app/entities/data-table-bilge/data-table-bilge-detail.component';
import { DataTableBilgeService } from '../../../../../../main/webapp/app/entities/data-table-bilge/data-table-bilge.service';
import { DataTableBilge } from '../../../../../../main/webapp/app/entities/data-table-bilge/data-table-bilge.model';

describe('Component Tests', () => {

    describe('DataTableBilge Management Detail Component', () => {
        let comp: DataTableBilgeDetailComponent;
        let fixture: ComponentFixture<DataTableBilgeDetailComponent>;
        let service: DataTableBilgeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [DataTableBilgeDetailComponent],
                providers: [
                    DataTableBilgeService
                ]
            })
            .overrideTemplate(DataTableBilgeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataTableBilgeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataTableBilgeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new DataTableBilge(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.dataTable).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
