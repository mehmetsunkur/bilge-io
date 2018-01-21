import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DataTableBilge } from './data-table-bilge.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DataTableBilgeService {

    private resourceUrl =  SERVER_API_URL + 'api/data-tables';

    constructor(private http: Http) { }

    create(dataTable: DataTableBilge): Observable<DataTableBilge> {
        const copy = this.convert(dataTable);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(dataTable: DataTableBilge): Observable<DataTableBilge> {
        const copy = this.convert(dataTable);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<DataTableBilge> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to DataTableBilge.
     */
    private convertItemFromServer(json: any): DataTableBilge {
        const entity: DataTableBilge = Object.assign(new DataTableBilge(), json);
        return entity;
    }

    /**
     * Convert a DataTableBilge to a JSON which can be sent to the server.
     */
    private convert(dataTable: DataTableBilge): DataTableBilge {
        const copy: DataTableBilge = Object.assign({}, dataTable);
        return copy;
    }
}
