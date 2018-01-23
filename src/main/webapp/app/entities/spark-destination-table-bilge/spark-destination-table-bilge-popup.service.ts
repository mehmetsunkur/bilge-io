import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SparkDestinationTableBilge } from './spark-destination-table-bilge.model';
import { SparkDestinationTableBilgeService } from './spark-destination-table-bilge.service';

@Injectable()
export class SparkDestinationTableBilgePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private sparkDestinationTableService: SparkDestinationTableBilgeService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.sparkDestinationTableService.find(id).subscribe((sparkDestinationTable) => {
                    this.ngbModalRef = this.sparkDestinationTableModalRef(component, sparkDestinationTable);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.sparkDestinationTableModalRef(component, new SparkDestinationTableBilge());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    sparkDestinationTableModalRef(component: Component, sparkDestinationTable: SparkDestinationTableBilge): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.sparkDestinationTable = sparkDestinationTable;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
