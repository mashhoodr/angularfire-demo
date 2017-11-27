import { element } from 'protractor';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Router } from '@angular/router';
import { AngularFirestore} from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-zwitter',
  templateUrl: './zwitter.component.html',
  styleUrls: ['./zwitter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ZwitterComponent implements OnInit {
  collection;
  items;
  user: firebase.User;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth, private router: Router) {
    this.collection = db.collection('zweets');
    this.items = this.collection.snapshotChanges().map(zweets => {
      return zweets.map(zweet => {
        const data = zweet.payload.doc.data();
        const id = zweet.payload.doc.id;
        return { id, ...data };
      });
    });

    this.auth.authState.subscribe(user => {
      if (user) {
        this.user = user;
      } else {
        router.navigate(['']);
      }
    });
   }

  ngOnInit() {}

  add(input) {
    this.collection.add({
      text: input.value,
      user: this.user.email,
      createdAt: new Date(),
      likes: 0
    });

    input.value = '';
  }

  delete(id: string) {
    this.collection.doc(id).delete();
  }

  like(id: string, previousCount: number) {
    this.collection.doc(id).update({ likes: previousCount + 1 });
  }

  logout() {
    this.auth.auth.signOut();
  }

}
