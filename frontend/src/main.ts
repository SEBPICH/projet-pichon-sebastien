import { AppModule } from './app/app.module';
import { platformBrowser } from '@angular/platform-browser';
import 'zone.js';
platformBrowser().bootstrapModule(AppModule);
