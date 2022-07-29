import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { MediaComponent } from './media/media.component';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import { PostsListComponent } from './posts-list/posts-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    MediaComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    PostsListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
