import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { Employee } from './models/employee.model';
import { EmployeeService } from './services/employee.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    Employee,
    EmployeeService
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
