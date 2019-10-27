import {Pipe, PipeTransform} from "@angular/core";
import {LogLevel} from "@senstate/client";

@Pipe({
  name: 'logLevelString'
})
export class LogLevelPipe implements PipeTransform {
  transform (value: LogLevel): any {
    switch (value) {
      case LogLevel.Debug:
        return 'Debug';
      case LogLevel.Info:
        return 'Info';
      case LogLevel.Warn:
        return 'Warn';
      case LogLevel.Error:
        return 'Error';
    }
  }

}
