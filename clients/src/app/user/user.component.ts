import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  products: any = [];
  constructor() { 
    this.getAllProduct();
  }

  ngOnInit(): void {
    this.loadScripts();
  }

  getAllProduct(): void {
    this.products = [
      {
        name: "Walter White",
        model: "Chief Executive Officer",
        image: "assets/img/team/team-1.jpg",
      },
      {
        name: "Sarah Jhonson",
        model: "Product Manager",
        image: "assets/img/team/team-2.jpg",
      },
      {
        name: "William Anderson",
        model: "CTO",
        image: "assets/img/team/team-3.jpg",
      },
      {
        name: "Amanda Jepson",
        model: "Accountant",
        image: "assets/img/team/team-4.jpg",
      },
      {
        name: "Walter White",
        model: "Chief Executive Officer",
        image: "assets/img/team/team-1.jpg",
      },
      {
        name: "Sarah Jhonson",
        model: "Product Manager",
        image: "assets/img/team/team-2.jpg",
      },
      {
        name: "William Anderson",
        model: "CTO",
        image: "assets/img/team/team-3.jpg",
      },
      {
        name: "Amanda Jepson",
        model: "Accountant",
        image: "assets/img/team/team-4.jpg",
      }
    ]
  }

  loadScripts() {
    const dynamicScripts = ['assets/js/landingPage.js'];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
}
