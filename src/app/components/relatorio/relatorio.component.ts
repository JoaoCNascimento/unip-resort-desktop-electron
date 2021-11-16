import { Component, OnInit } from '@angular/core';
import { faChartLine, faCoins, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  faChartLine = faChartLine;
  faCoins = faCoins;
  faUsers = faUsers;

  constructor() { }

  ngOnInit(): void {
  }

}
