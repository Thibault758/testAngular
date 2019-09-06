import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  messageError : string = null;
  
  constructor(
    private router: Router // service router
  ) { }

  ngOnInit() {
  }

  onSubmit(formSearch : NgForm) {
    if(formSearch.value['password'] == 'Jackson1234' && formSearch.value['email'] == 'roux.thibault@gmail.com'){
      this.router.navigate(
        ['/albums'], // destination donc l'uri
        {queryParams : { message : 'succes'}} // on peux récuperer ces informations (TODO)
      );
    } else {
      this.messageError = "Error email or password"
    }
  }

}
