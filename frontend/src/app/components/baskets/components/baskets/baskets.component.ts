import { Component, OnInit } from '@angular/core';
import { BasketModel } from '../../models/basket.model';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { BasketService } from '../../services/basket.service';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from 'src/app/common/services/swal.service';
import { OrdersService } from 'src/app/components/orders/services/orders.service';

@Component({
  selector: 'app-baskets',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.css']
})
export class BasketsComponent implements OnInit {

  baskets: BasketModel[] = [];
  total: number = 0;

  constructor(
    private _basket: BasketService,
    private _order: OrdersService,
    private _toastr: ToastrService,
    private _swal: SwalService,
  ) { }
  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._basket.getAll(res => {
      this.baskets = res;
      this.calculate();
    });
  }

  calculate() {
    this.total = 0;
    this.baskets.forEach(element => {
      this.total += (element.price * element.quantity);
    });
  }

  removeById(_id: string) {
    this._swal.callSwal("Are you sure delete this product", "Delete Product", "Delete", () => {
      let model = { _id: _id };
      this._basket.removeById(model, res => {
        this._toastr.info(res.message);
        this.getAll();
      })
    });
  }

  createOrder() {
    this._swal.callSwal("Are sure for order this products", "Buy Products", "Go to Payment Options", () => {
      this._order.create(res => {
        this._toastr.success(res.message);
        this.getAll();
      })
    })
  }
}
