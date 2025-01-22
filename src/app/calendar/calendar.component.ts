import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions, EventClickArg, EventDropArg, EventHoveringArg } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import ptBrLocale from '@angular/common/locales/pt-PT'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
  imports: [FullCalendarModule, CommonModule]
})
export class CalendarComponent implements OnInit {


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dayMaxEvents:5,
    height: 'auto', //  Ajusta o tamanho máximo do container de eventos
    locale: 'pt-br',
    themeSystem: 'custom',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    eventMouseEnter: (arg) => this.eventMouseEnter(arg),
    eventDisplay:'list-item', // Exibe o evento com um ponto
    eventClick: this.handleEventClick.bind(this), 
    eventDrop: this.handleEventDrop.bind(this),
    moreLinkContent: 'Ver mais',
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
      { title: 'event 1', date: '2025-01-21' },
      { title: 'event 1', date: '2025-01-21' },
      { title: 'event 1', date: '2025-01-21' },
      { title: 'event 1', date: '2025-01-21' },
      { title: 'event 1', date: '2025-01-21' },
      { title: 'event 1', date: '2025-01-21' },
      { title: 'event 1', date: '2025-01-21' },
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

}
