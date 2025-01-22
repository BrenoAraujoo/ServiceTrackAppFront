import { Component, inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tooltipcontent',
  templateUrl: './tooltipcontent.component.html',
  styleUrls: ['./tooltipcontent.component.scss'],
  template:`<div>Conteúdo do Tooltip</div>`
})
export class TooltipcontentComponent {


  @Input() taskType!: string;
  @Input() description!: string;
  @Input() creationDate!: Date;


  constructor() { }


}
