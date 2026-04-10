import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  jobs: string[] = [];

  addJob(value: string): void {
    if (value !== '') {
      this.jobs.push(value);
    } else {
      alert('Bir görev girmelisin... ;)');
    }
  }

  removeJob(job: string): void {
    const index = this.jobs.indexOf(job);
    if (index !== -1) {
      this.jobs.splice(index, 1);
    }
  }
}
