import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ChatModule } from './chat/chat.module';
import { SocketService } from './chat/shared/services/socket.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ChatModule
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
