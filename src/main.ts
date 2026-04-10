import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjGyl/VkR+XU9Ff1RDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS3hTd0RgWX1acnRTRWBaUk91XQ==');

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
