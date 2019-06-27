
import { Component, OnInit } from '@angular/core';

import { Store }        from '@ngrx/store';
import { Observable }   from 'rxjs';

import { User }         from './models/user.models';
import * as userActions from './actions/user.actions';
import { AngularFireAuth }            from 'angularfire2/auth';
import * as firebase from 'firebase/app';

interface AppState {
  user: User;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user$: Observable<User>;

  constructor(private store: Store<AppState>,public auth:AngularFireAuth) {}

  ngOnInit() {
    this.user$ = this.store.select('user').source;
    console.log( this.user$);
    this.store.dispatch(new userActions.GetUser());
    // firebase.auth().onAuthStateChanged(function(user){
    //   if (user) {
    //     console.log(user.uid)
    //   } else {
    //   }
    // })
  }

  googleLogin() {
    this.store.dispatch(new userActions.GoogleLogin());
  }

  logout() {
    this.store.dispatch(new userActions.Logout());
    // if(firebase.auth().currentUser){
    //   this.auth.auth.signOut();
    // }
  }


}
