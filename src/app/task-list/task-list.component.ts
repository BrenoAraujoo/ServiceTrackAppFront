import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [FileUploadModule, CommonModule]
})
export class TaskListComponent implements OnInit {

  constructor() { }


  uploadedFiles: any[] = [];

  ngOnInit() {
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    console.log(this.uploadedFiles)

  }
}

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
