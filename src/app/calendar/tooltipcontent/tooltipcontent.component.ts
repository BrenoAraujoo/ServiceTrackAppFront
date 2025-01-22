import { Component, inject, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-tooltipcontent',
  templateUrl: './tooltipcontent.component.html',
  styleUrls: ['./tooltipcontent.component.scss'],
  template:`<div>Conteúdo do Tooltip</div>`
})
export class TooltipcontentComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

}
