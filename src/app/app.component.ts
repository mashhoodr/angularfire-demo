import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  items: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.items = db.collection('users').valueChanges();

    this.items.subscribe(items => {
      console.log(items);
    });
  }
}
