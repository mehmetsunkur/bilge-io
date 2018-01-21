/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { BilgeTestModule } from '../../../test.module';
import { DataTableBilgeComponent } from '../../../../../../main/webapp/app/entities/data-table-bilge/data-table-bilge.component';
import { DataTableBilgeService } from '../../../../../../main/webapp/app/entities/data-table-bilge/data-table-bilge.service';
import { DataTableBilge } from '../../../../../../main/webapp/app/entities/data-table-bilge/data-table-bilge.model';

describe('Component Tests', () => {

    describe('DataTableBilge Management Component', () => {
        let comp: DataTableBilgeComponent;
        let fixture: ComponentFixture<DataTableBilgeComponent>;
        let service: DataTableBilgeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BilgeTestModule],
                declarations: [DataTableBilgeComponent],
                providers: [
                    DataTableBilgeService
                ]
            })
            .overrideTemplate(DataTableBilgeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataTableBilgeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataTableBilgeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new DataTableBilge(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.dataTables[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
