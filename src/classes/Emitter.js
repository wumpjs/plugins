import EventEmitter from "node:events";

export class Emitter extends EventEmitter {
  /**
   * @param {boolean} captureRejections 
   * @constructor
   */
  constructor(captureRejections = true) {
    super({ captureRejections });

    /**
     * @protected
     */
    this.emittedEvents = [];
  };

  /**
   * @param {string | symbol} name 
   * @returns {boolean}
   */
  hasListener(name) {
    if (!name) return;

    const check = this.eventNames().some((event) => event === name);

    return check;
  };

  /**
   * Synchronously calls each of the listeners registered for the event named `name`, in the order they were registered, passing the supplied arguments to each.
   * @param {string | symbol} name 
   * @param {any[]} args
   * @returns {boolean}
   */
  emit(name, ...args) {
    this.emittedEvents.push({ name, args });

    return super.emit(name, ...args);
  };

  /**
   * @param {string | symbol} name 
   * @returns {boolean}
   */
  hasEmitted(name) {
    if (!name) return;

    const check = this.emittedEvents.some((event) => event.name === name);

    return check;
  };

  /**
   * Fetch emitted events informations.
   * @returns {{ name: string, args: any[] }[]}
   */
  fetch() {
    return this.emittedEvents;
  };
};