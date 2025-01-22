import {
  Component,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import dayGridPlugin from '@fullcalendar/daygrid'; // Plugin de exibição mensal
import { CalendarOptions, EventClickArg, EventDropArg, EventHoveringArg } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // Módulo principal do FullCalendar
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'; // Plugin de interação (cliques, arrastar, etc.)
import tippy from 'tippy.js'; // Biblioteca para tooltips
import { TooltipcontentComponent } from './tooltipcontent/tooltipcontent.component'; // Componente customizado do tooltip

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true, // Indica que este componente pode ser usado sem um módulo Angular explícito
  imports: [FullCalendarModule, CommonModule], // Módulos necessários
})
export class CalendarComponent {
  /**
   * Referência para o container de tooltips no DOM.
   * O elemento com `#tooltipContainer` no template será injetado aqui.
   */
  @ViewChild('tooltipContainer', { read: ViewContainerRef })
  tooltipContainer!: ViewContainerRef;

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
      { title: 'event 1', date: '2025-01-21', description: 'descricao 1' },
      { title: 'event 2', date: '2025-01-21', description: 'descricao 2' },
      { title: 'event 3', date: '2025-01-21', description: 'descricao 3' },
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
    eventDidMount: this.addTooltip.bind(this), // Monta os tooltips nos eventos
  };


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


  addTooltip(info: any): void {
    // Cria uma instância do componente do tooltip dinamicamente
    const componentRef = this.tooltipContainer.createComponent(TooltipcontentComponent);

    // Configura o tooltip usando Tippy.js
    tippy(info.el, {
      content: componentRef.location.nativeElement, // Usa o elemento do componente como conteúdo
      theme: 'light', 
      animation: 'scale', 
      duration: [1000, 0], 
      placement: 'right', 
      arrow: true, 
      allowHTML: true, // Permite HTML no conteúdo do tooltip
    });
  }
}
