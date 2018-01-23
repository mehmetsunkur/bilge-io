import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SparkDestinationTableBilge } from './spark-destination-table-bilge.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SparkDestinationTableBilgeService {

    private resourceUrl =  SERVER_API_URL + 'api/spark-destination-tables';

    constructor(private http: Http) { }

    create(sparkDestinationTable: SparkDestinationTableBilge): Observable<SparkDestinationTableBilge> {
        const copy = this.convert(sparkDestinationTable);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(sparkDestinationTable: SparkDestinationTableBilge): Observable<SparkDestinationTableBilge> {
        const copy = this.convert(sparkDestinationTable);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<SparkDestinationTableBilge> {
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
     * Convert a returned JSON object to SparkDestinationTableBilge.
     */
    private convertItemFromServer(json: any): SparkDestinationTableBilge {
        const entity: SparkDestinationTableBilge = Object.assign(new SparkDestinationTableBilge(), json);
        return entity;
    }

    /**
     * Convert a SparkDestinationTableBilge to a JSON which can be sent to the server.
     */
    private convert(sparkDestinationTable: SparkDestinationTableBilge): SparkDestinationTableBilge {
        const copy: SparkDestinationTableBilge = Object.assign({}, sparkDestinationTable);
        return copy;
    }
}
