import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ProdConfig } from './blocks/config/prod.config';
import { BilgeAppModule } from './app.module';
import { NgxAdminAppModule } from './ngx-admin/app.module';

ProdConfig();

if (module['hot']) {
    module['hot'].accept();
}
if(document.URL.indexOf('ngx-admin.html')>1){
    platformBrowserDynamic().bootstrapModule(NgxAdminAppModule)
    .then((success) => console.log(`NgxAdminAppModule Application started`))
    .catch((err) => console.error(err));   
}else{
    platformBrowserDynamic().bootstrapModule(BilgeAppModule)
    .then((success) => console.log(`Application started`))
    .catch((err) => console.error(err));
}
