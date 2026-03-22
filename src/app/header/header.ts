import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
isCollapsed = false;
router = inject(Router);

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout(){
    debugger;
    localStorage.removeItem('employee');
    this.router.navigateByUrl("/login");
  }
}
