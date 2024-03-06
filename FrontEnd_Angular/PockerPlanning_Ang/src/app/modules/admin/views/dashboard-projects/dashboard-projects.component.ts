import { Component, OnInit } from '@angular/core';
import Chart, { ChartConfiguration, ChartData, ChartOptions } from 'chart.js/auto';
import { ProjectServiceService } from 'src/app/core/services/project-service.service';

@Component({
  selector: 'app-dashboard-projects',
  templateUrl: './dashboard-projects.component.html',
  styleUrls: ['./dashboard-projects.component.css']
})
export class DashboardProjectsComponent implements OnInit {
  projectStats: any;

  constructor(private projectService: ProjectServiceService) {}

  ngOnInit(): void {
    this.getProjectStats();
  }

  getProjectStats(): void {
    this.projectService.getProjectStats()
      .subscribe(
        (data) => {
          this.projectStats = data;
          this.renderCharts();
        },
        (error) => {
          console.error('Error fetching project stats:', error);
        }
      );
  }

  renderCharts(): void {
    // Render Total Projects Chart
    this.renderTotalProjectsChart();

    // Render Project Status Rectangles
    this.renderProjectStatusRectangles();
  }

  renderTotalProjectsChart(): void {
    const ctx = document.getElementById('totalProjectsChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: ['In Progress', 'Pending', 'Completed'],
          datasets: [{
            label: 'Total Projects',
            data: [
              this.projectStats.inProgress,
              this.projectStats.pending,
              this.projectStats.completed
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(75, 192, 192, 0.8)'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Total Projects'
            },
            legend: {
              display: true,
              position: 'bottom'
            }
          }
        }
      });
    }
  }

  renderProjectStatusRectangles(): void {
    const ctx = document.getElementById('projectStatusRectangles') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Completed', 'Pending', 'In Progress'],
          datasets: [{
            label: 'Project Status',
            data: [
              this.projectStats.completed,
              this.projectStats.pending,
              this.projectStats.inProgress
            ],
            backgroundColor: [
              'rgba(75, 192, 192, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 99, 132, 0.8)'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Project Status Rectangles'
            },
            legend: {
              display: true,
              position: 'bottom'
            }
          }
        }
      });
    }
  }
}


















/*
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ProjectServiceService } from 'src/app/core/services/project-service.service';

@Component({
  selector: 'app-dashboard-projects',
  templateUrl: './dashboard-projects.component.html',
  styleUrls: ['./dashboard-projects.component.css']
})
export class DashboardProjectsComponent implements OnInit {
  projectStats: any;

  constructor(private projectService: ProjectServiceService) {}

  ngOnInit(): void {
    this.getProjectStats();
  }

  getProjectStats(): void {
    this.projectService.getProjectStats()
      .subscribe(
        (data) => {
          this.projectStats = data;
          this.renderCharts();
        },
        (error) => {
          console.error('Error fetching project stats:', error);
        }
      );
  }

  renderCharts(): void {
    // Créer un graphique pour le nombre total de projets
    this.renderTotalProjectsChart();

    // Créer un graphique en barres pour la répartition des projets par état
    this.renderProjectStatusChart();
  }

  renderTotalProjectsChart(): void {
    const ctx = document.getElementById('totalProjectsChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Total Projects'],
          datasets: [{
            label: 'Total Projects',
            data: [this.projectStats.totalProjects],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Total Projects'
            }
          }
        }
      });
    }
  }

  renderProjectStatusChart(): void {
    const ctx = document.getElementById('projectStatusChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['In Progress', 'Pending', 'Completed'],
          datasets: [{
            label: 'Project Status',
            data: [
              this.projectStats.inProgress,
              this.projectStats.pending,
              this.projectStats.completed
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(75, 192, 192, 0.6)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Project Status Distribution'
            }
          }
        }
      });
    }
  }
}*/