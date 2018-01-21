import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DataColumnBilge } from './data-column-bilge.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DataColumnBilgeService {

    private resourceUrl =  SERVER_API_URL + 'api/data-columns';

    constructor(private http: Http) { }

    create(dataColumn: DataColumnBilge): Observable<DataColumnBilge> {
        const copy = this.convert(dataColumn);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(dataColumn: DataColumnBilge): Observable<DataColumnBilge> {
        const copy = this.convert(dataColumn);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<DataColumnBilge> {
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
     * Convert a returned JSON object to DataColumnBilge.
     */
    private convertItemFromServer(json: any): DataColumnBilge {
        const entity: DataColumnBilge = Object.assign(new DataColumnBilge(), json);
        return entity;
    }

    /**
     * Convert a DataColumnBilge to a JSON which can be sent to the server.
     */
    private convert(dataColumn: DataColumnBilge): DataColumnBilge {
        const copy: DataColumnBilge = Object.assign({}, dataColumn);
        return copy;
    }
}
