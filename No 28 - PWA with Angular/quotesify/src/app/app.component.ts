import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DummyService } from './dummy.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, MatToolbarModule, MatCardModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Dummy Posts';
  readonly posts$ = this.dummyService.get();

  constructor(private dummyService: DummyService) {

  }
}
