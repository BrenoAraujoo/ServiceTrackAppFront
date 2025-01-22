import {
  Component,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import dayGridPlugin from '@fullcalendar/daygrid'; 
import { CalendarOptions, EventClickArg, EventDropArg, EventHoveringArg } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'; // Plugin de interação (cliques, arrastar, etc.)
import tippy, { Placement } from 'tippy.js'; // Biblioteca para tooltips
import { TooltipcontentComponent } from './tooltipcontent/tooltipcontent.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true, 
  imports: [FullCalendarModule, CommonModule],
})
export class CalendarComponent {
  /**
   * Referência para o container de tooltips no DOM.
   * O elemento com `#tooltipContainer` no template será injetado aqui.
   */
  @ViewChild('tooltipContainer', { read: ViewContainerRef })
  tooltipContainer!: ViewContainerRef;

  currentView: string = 'dayGridMonth'; // Armazena a vizualização atual


  /**
   * Configurações do FullCalendar.
   */
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dayMaxEvents: 5, 
    height: 'auto',
    locale: 'pt-br', 
    themeSystem: 'custom', 
    plugins: [dayGridPlugin, interactionPlugin], 
    editable: true,
    droppable: true, 
    eventDisplay: 'list-item', // Eventos exibidos como itens de lista (com ponto marcador)
    moreLinkContent: 'Ver mais',
    events: [
      // Lista de eventos pré-carregados
      { cor: 'vermelho', title: 'event 1', date: '2025-01-21', description: 'descricao 1', taskType: 'taskType 1', creationDate: Date.now() },
      { cor: 'azul', title: 'event 2', date: '2025-01-21', description: 'descricao 2', taskType: 'taskType 2', creationDate: Date.now() },
      { cor: 'amarelo', title: 'event 3', date: '2025-01-21', description: 'descricao 3', taskType: 'taskType 3', creationDate: Date.now() },
      { cor: 'vermelho', title: 'event 1', date: '2025-01-21', description: 'descricao 1', taskType: 'taskType 1', creationDate: Date.now() },
      { cor: 'azul', title: 'event 2', date: '2025-01-21', description: 'descricao 2', taskType: 'taskType 2', creationDate: Date.now() },
      { cor: 'amarelo', title: 'event 3', date: '2025-01-21', description: 'descricao 3', taskType: 'taskType 3', creationDate: Date.now() },
    ],
    // Configurações da barra de navegação
    headerToolbar: {
      left: 'prev,next today', // Botões à esquerda
      center: 'title', // Título no centro
      right: 'dayGridMonth,dayGridWeek,dayGridDay', // Botões à direita
    },
    buttonText: {
      // Texto dos botões
      today: 'Hoje',
      month: 'Mês',
      week: 'Semana',
      day: 'Dia',
    },
    dateClick: (arg) => this.handleDateClick(arg),
    eventMouseEnter: (arg) => this.eventMouseEnter(arg), 
    eventClick: this.handleEventClick.bind(this), 
    eventDrop: this.handleEventDrop.bind(this), 
    eventDidMount: this.onEventDidMount.bind(this),
    datesSet: (arg) => this.handleViewChange(arg)
  };


  handleViewChange(arg: any): void {
    this.currentView = arg.view.type;
    console.log(`Visualição alterada para: ${this.currentView}`);
  } 

  handleDateClick(arg: DateClickArg): void {
    console.log('Data clicada:', arg.dateStr);
  }


  eventMouseEnter(arg: EventHoveringArg): void {
    console.log('Mouse sobre o evento:', arg.event.title);
  }

 
  handleEventClick(clickInfo: EventClickArg): void {
    console.log('Evento clicado:', clickInfo.event.title);
    console.log('Data do evento:', clickInfo.event.start);
  }

  handleEventDrop(dropInfo: EventDropArg): void {
    console.log('Evento movido para:', dropInfo.event.start);
  }

  onEventDidMount(events: any): void{

    this.setDayGridEventDotColor(events);

    this.addTooltip(events);

  }


  setDayGridEventDotColor(events: any) {
    const cor = events.event.extendedProps.cor;
    if (cor === 'vermelho')
      events.el.querySelector('.fc-daygrid-event-dot')?.classList.add('urgent-event');
    else if (cor === 'azul')
      events.el.querySelector('.fc-daygrid-event-dot')?.classList.add('common-task');
    else
      events.el.querySelector('.fc-daygrid-event-dot')?.classList.add('low-priority');
  }

  addTooltip(events: any): void {

    // Cria uma instância do componente do tooltip dinamicamente
    const componentRef = this.tooltipContainer.createComponent(TooltipcontentComponent);

    componentRef.instance.taskType = events.event.extendedProps.taskType;
    componentRef.instance.description = events.event.extendedProps.description;
    componentRef.instance.creationDate = events.event.extendedProps.creationDate;

    //Define o tipo local do ToolTip de acordo com a view atual
    const placement = this.getToolTipPlacement();

    // Configura o tooltip usando Tippy.js
    tippy(events.el, {
      content: componentRef.location.nativeElement, // Usa o elemento do componente como conteúdo
      theme: 'light', 
      animation: 'scale', 
      duration: [1000, 0], 
      placement: placement, 
      arrow: true, 
      allowHTML: true, // Permite HTML no conteúdo do tooltip
    });
  }

   /**
   * Define o posicionamento do tooltip com base na visualização atual.
   * @returns Placement - o valor válido de posicionamento
   */
  getToolTipPlacement(): Placement {

    switch (this.currentView) {
      case 'dayGridMonth':
        return 'right';
      case 'dayGridWeek':
        return 'top';
      case 'dayGridDay':
        return 'top';
      default:
        return 'right';
    }
  }
}
