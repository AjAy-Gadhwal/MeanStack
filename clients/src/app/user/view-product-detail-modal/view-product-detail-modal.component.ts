import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-product-detail-modal',
  templateUrl: './view-product-detail-modal.component.html',
  styleUrls: ['./view-product-detail-modal.component.scss']
})
export class ViewProductDetailModalComponent implements OnInit {

  @Input() product: any = {};
  
  serverDomain: string = environment.serverUrl;
  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  trackByFn(index: string = '', item: any = {}) {
    return item._id;
  }
}
