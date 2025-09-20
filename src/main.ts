import { Component, provideZonelessChangeDetection } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter, RouterLink, RouterOutlet, Routes } from "@angular/router";
import "./main.css";
import { Dashboard } from "./dashboard";
import { Home } from "./home";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav class="app-nav">
      <a routerLink="/" class="nav-link">Home</a>
      <a routerLink="dashboard" class="nav-link">Dashboard</a>
    </nav>
    <router-outlet />
  `,
})
export class App { }

const routes: Routes = [
  { path: "", component: Home },
  { path: "dashboard", component: Dashboard },
];

bootstrapApplication(App, {
  providers: [provideZonelessChangeDetection(), provideRouter(routes)],
});
