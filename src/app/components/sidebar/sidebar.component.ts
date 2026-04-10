import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  selectedRole: string = localStorage.getItem('role') || 'Admin';
  showRolePicker = false;

  openMenus: Record<string, boolean> = {
    'Asset Requests': true,
    'Asset Allocation': true
  };

  roleOptions = ['Admin', 'IT-Admin', 'Employee', 'Asset Manager'];

  constructor(public router: Router) {}

  roleMenus: Record<string, any[]> = {
    Admin: [
      {
        name: 'Dashboard',
        path: '/admin-dashboard',
        icon: 'dashboard'
      },
      {
        name: 'Asset Register',
        icon: 'inventory_2',
        subMenu: [
          { name: 'View Assets', path: '/assets' },
          { name: 'Add Asset', path: '/add-asset' }
        ]
      },
      {
        name: 'Reports',
        path: '/reports',
        icon: 'query_stats'
      },
      {
        name: 'Users',
        path: '/users',
        icon: 'people'
      }
    ],

    'IT-Admin': [
      {
        name: 'Dashboard',
        path: '/it-dashboard',
        icon: 'dashboard'
      },
      {
        name: 'Asset Requests',
        icon: 'assignment',
        subMenu: [
          { name: 'View Requests', path: '/AdminViewAssetRequest' },
          {
            name: 'Asset Allocation',
            subMenu: [
              { name: 'Approve Allocation', path: '/AdminViewAssetRequest' },
              { name: 'View Allocation', path: '/ViewAssetRequest' }
            ]
          }
        ]
      },
      {
        name: 'Reports',
        path: '/reports',
        icon: 'bar_chart'
      }
    ],

    Employee: [
      {
        name: 'My Assets',
        path: '/assets',
        icon: 'inventory'
      },
      {
        name: 'Request Asset',
        path: '/add-asset',
        icon: 'add_circle'
      },
      {
        name: 'Profile',
        path: '/users',
        icon: 'person'
      }
    ],

    'Asset Manager': [
      {
        name: 'Dashboard',
        path: '/assets',
        icon: 'dashboard'
      },
      {
        name: 'Allocation',
        icon: 'assignment',
        subMenu: [
          { name: 'Assign Asset', path: '/add-asset' },
          { name: 'Review Allocation', path: '/ViewAssetRequest' }
        ]
      },
      {
        name: 'Reports',
        path: '/reports',
        icon: 'insights'
      }
    ]
  };

  get menuItems() {
    return this.roleMenus[this.selectedRole] || [];
  }

  selectRole(role: string) {
    this.selectedRole = role;
    localStorage.setItem('role', role);
    this.showRolePicker = false;
  }

  toggleRolePicker() {
    this.showRolePicker = !this.showRolePicker;
  }

  toggleMenu(name: string) {
    this.openMenus[name] = !this.openMenus[name];
  }

  isGroupActive(item: any): boolean {
    if (item.path) {
      return this.isActive(item.path);
    }

    if (item.subMenu) {
      return item.subMenu.some((sub: any) => this.isGroupActive(sub));
    }

    return false;
  }

  isActive(path: string) {
    return this.router.url === path;
  }

  setHoverStyle(event: any, isHover: boolean) {
    if (isHover) {
      event.target.style.background = 'rgba(255,255,255,0.1)';
    } else {
      // Reset to original background based on active state
      const element = event.target;
      const currentBg = element.style.background;
      const isActive = currentBg && currentBg.includes('rgba(255,255,255,0.2)');
      element.style.background = isActive ? 'rgba(255,255,255,0.2)' : 'none';
    }
  }
}