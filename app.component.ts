import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-main',
  template:`
    <router-outlet></router-outlet> 
  `,
  styleUrls: [
    '/public/stylessheets/bootstrap.min.css',
    '/public/stylessheets/style.css'
    ]  
})

export class AppComponent {}