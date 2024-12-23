import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PoButtonModule, PoChartModule, PoChartType, PoLoadingModule, PoAvatarModule } from '@po-ui/ng-components';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, PoChartModule, PoButtonModule, PoLoadingModule, PoAvatarModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  chartTypeLine: PoChartType = PoChartType.Line;
  chartTypePie: PoChartType = PoChartType.Pie;
  chartTypeColumn: PoChartType = PoChartType.Column;
  chartTypeDonut: PoChartType = PoChartType.Donut;
  chartTypeBar: PoChartType = PoChartType.Bar;
  userName: string = 'John Doe';
  profileImage: string = ''; 
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.userName = user.displayName || user.email;
        this.profileImage = user.photoURL || ''; 
        console.log('User name set to:', this.userName);
        console.log('Profile image URL:', this.profileImage);
      } else {
        this.userName = '';
        this.profileImage = ''; 
      }
    });
  }
  

  navigateTo(route: string) {
    this.router.navigate([`/dashboard/${route}`]);
  }

  logout() {
    this.isLoading = true;
    this.authService.logout().then(() => {
      setTimeout(() => {
        this.isLoading = false;
        this.router.navigate(['/login']);
      }, 1000);
    });
  }
}
