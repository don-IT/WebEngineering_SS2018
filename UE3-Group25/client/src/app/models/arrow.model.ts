import './device.model';

declare global {
  class Arrow {
    readonly startDevice: Device<any>;
    endDevice: Device<any> | null;
  }
}

export {};
