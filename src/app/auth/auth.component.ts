import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.auth.authState.subscribe(state => {
      if (state) {
        router.navigate(['zwitter']);
      }
    });
   }

  ngOnInit() {
  }

  login(form: { email: string, password: string }) {
    this.auth.auth.signInWithCredential(firebase.auth.EmailAuthProvider.credential(
     form.email,
     form.password,
    ));
  }

  signup(form: { email: string, password: string }) {
    this.auth.auth.createUserWithEmailAndPassword(form.email, form.password);
  }

}
