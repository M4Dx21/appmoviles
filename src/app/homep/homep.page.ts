import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-homep',
  templateUrl: './homep.page.html',
  styleUrls: ['./homep.page.scss'],
})
export class HomepPage implements OnInit {
  userHome: string = 'Usuario'; 
  constructor(private route: ActivatedRoute) { } 
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['user']) {
        this.userHome = params['user'];  
      }
    });
  }
}
