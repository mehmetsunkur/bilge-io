import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SparkDestinationColumnBilge } from './spark-destination-column-bilge.model';
import { SparkDestinationColumnBilgeService } from './spark-destination-column-bilge.service';

@Injectable()
export class SparkDestinationColumnBilgePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private sparkDestinationColumnService: SparkDestinationColumnBilgeService

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
                this.sparkDestinationColumnService.find(id).subscribe((sparkDestinationColumn) => {
                    this.ngbModalRef = this.sparkDestinationColumnModalRef(component, sparkDestinationColumn);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.sparkDestinationColumnModalRef(component, new SparkDestinationColumnBilge());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    sparkDestinationColumnModalRef(component: Component, sparkDestinationColumn: SparkDestinationColumnBilge): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.sparkDestinationColumn = sparkDestinationColumn;
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
