import { Component } from '@angular/core';
import { isJsObject } from '@angular/core/src/change_detection/change_detection_util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', //Bu Typescript dosyasının hangi html ile ilişkili olduğu belirtiliyor
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  jobs = []; //görev listesinin tutulacağı dizi

  // yeni bir job eklemek için
  addJob(value) {
    if (value !== "") {
      this.jobs.push(value)
      // console.log(this.jobs)  // Tarayıcı console penceresine log düşürebiliriz
    } else {
      alert('Bir görev girmelisin... ;)')
    }
  }

  // bir görevi listeden çıkartmak için
  removeJob(job) {
    for (let i = 0; i <= this.jobs.length; i++) {
      if (job == this.jobs[i]) {
        this.jobs.splice(i, 1)
      }
    }
  }
}
