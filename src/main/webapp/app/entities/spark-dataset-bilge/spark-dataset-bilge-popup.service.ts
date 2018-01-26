import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SparkDatasetBilge } from './spark-dataset-bilge.model';
import { SparkDatasetBilgeService } from './spark-dataset-bilge.service';

@Injectable()
export class SparkDatasetBilgePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private sparkDatasetService: SparkDatasetBilgeService

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
                this.sparkDatasetService.find(id).subscribe((sparkDataset) => {
                    this.ngbModalRef = this.sparkDatasetModalRef(component, sparkDataset);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.sparkDatasetModalRef(component, new SparkDatasetBilge());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    sparkDatasetModalRef(component: Component, sparkDataset: SparkDatasetBilge): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.sparkDataset = sparkDataset;
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
