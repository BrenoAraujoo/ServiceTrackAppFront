import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions, EventApi, EventClickArg, EventDropArg, EventHoveringArg } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import tippy from 'tippy.js';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
  imports: [FullCalendarModule, CommonModule]
})
export class CalendarComponent implements OnInit{


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dayMaxEvents:5,
    height: 'auto',
    locale: 'pt-br',
    themeSystem: 'custom',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    eventMouseEnter: (arg) => this.eventMouseEnter(arg),
    eventDisplay:'list-item', // Exibe o evento com um ponto
    eventClick: this.handleEventClick.bind(this), 
    eventDrop: this.handleEventDrop.bind(this),
    moreLinkContent: 'Ver mais',
    eventDidMount: this.addTooltip.bind(this),
    headerToolbar:
    {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'

    },
    buttonText: {
      today: 'Hoje',
      month: 'Mês',
      week: 'Semana',
      day: 'Dia'
    },
    eventHint:'sim',
    editable: true,
    droppable: true,
    events: [
      { title: 'event 1', date: '2025-01-21' , description: 'descricao 1'},
      { title: 'event 1', date: '2025-01-21' , description: 'descricao 1'},
      { title: 'event 1', date: '2025-01-21' , description: 'descricao 1'},
      { title: 'event 1', date: '2025-01-21' , description: 'descricao 1'},
      { title: 'event 1', date: '2025-01-21' , description: 'descricao 1'},
      { title: 'event 1', date: '2025-01-21' , description: 'descricao 1'},
      { title: 'event 1', date: '2025-01-21' , description: 'descricao 1'},
      { title: 'event 1', date: '2025-01-21' , description: 'descricao 1'},

    ]
  };


  constructor() { }

  ngOnInit() {
  }


  handleDateClick(arg: DateClickArg) {   
    alert('criar novo evento?')
    console.log('date click! ' + arg.dateStr)
  }
  eventMouseEnter(arg: EventHoveringArg) {
    console.log('hover ' + arg.event);
  }

  handleEventClick(clickInfo: EventClickArg): void {
    console.log('Evento: ' + clickInfo.event.title + '\nData: ' + clickInfo.event.start);
  }
  handleEventDrop(dropInfo: EventDropArg): void {
    console.log('Evento movido para: ' + dropInfo.event.start);
  }



  addTooltip(info: any) {

    const tooltipContent = `
    <div class="custom-tooltip">
      <p><span class="icon">&#x1F7E1;</span> <strong>Status:</strong> Finalizada com Pendência</p>
      <p><span class="icon">&#x1F4CB;</span> <strong>Tipo de tarefa:</strong> Serviços de Montagem Haix</p>
      <p><span class="icon">&#x1F464;</span> <strong>Cliente:</strong> 046668-REBOUCAS 1700 EMPREENDIMENTOS SPE LTDA</p>
      <p><span class="icon">&#x1F4CD;</span> <strong>Endereço:</strong> Rua Lisboa,45-PINHEIROS-SÃO PAULO,SP</p>
      <p><span class="icon">&#x1F468;</span> <strong>Colaborador:</strong> Rodrigo Ferreira de Lima</p>
    </div>
  `;


    tippy(info.el, {
      content: tooltipContent,
      theme: 'light',
      animation: 'scale',
      duration: [1000, 0],
      placement: 'right', // Posição do tooltip
      arrow: true,
      allowHTML: true
    });
  }
}
