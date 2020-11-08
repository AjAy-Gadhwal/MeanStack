import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authService';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, AfterViewInit {
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadScripts();
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


  logout(): void {
    this.authService.adminLogout();
  }
}
