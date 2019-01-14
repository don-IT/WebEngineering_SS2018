import {Control} from './control';

declare global {
  class Device<C extends Control<any>> {
    readonly index: number;
    readonly type: string;
    readonly title: string;
    readonly control: C;

    /**
     * Method used to update the device image
     */
    updateDevice(): void;
  }
}

export {};
