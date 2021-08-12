import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import Chart from 'chart.js/auto';
import { AppState } from '../../store/app.store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Cartera } from '../../models/cartera.model';
import { Sobre } from '../../models/sobre.model';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.page.html',
  styleUrls: ['./resumen.page.scss'],
})
export class ResumenPage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;

  subs: Subscription[] = [];
  cartera: Cartera;
  sobres: Sobre[];

  constructor(
    private store: Store<AppState>
  ) {
    this.subs[0] = this.store.select('app').subscribe(x => this.cartera = x.cartera);
    this.subs[1] = this.store.select('app').subscribe(x => this.sobres = x.sobres);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      var myChart = new Chart(this.doughnutCanvas.nativeElement, {
        type: 'doughnut',
        data: {
          labels: ['Activos', 'Pasivos'],
          datasets: [{
            label: '# of Votes',
            data: [10000, 500],
            backgroundColor: [
              'green',
              'red'
            ],
          }]
        },

      });
    }, 1);
  }

  ngOnInit() {

  }

}
