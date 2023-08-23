import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './pages/list/list.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AddComponent } from './pages/add/add.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { EditComponent } from './pages/edit/edit.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    HeaderComponent,
    SidebarComponent,
    AddComponent,
    LoaderComponent,
    EditComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, MatIconModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
