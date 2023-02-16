import TypedEmitter, { EventMap } from "typed-emitter";
import { EventEmitter as Emitter } from "node:events";

declare module "@wumpjs/plugins" {
  export class Checker<D> {
    public constructor(data: D);

    protected data: D;

    public type(data?: D, upper?: boolean): keyof TypeResult;

    public isBoolean: boolean;
    public isString: boolean;
    public isObject: boolean;
    public isSymbol: boolean;
    public isArray: boolean;
    public isNumber: boolean;
    public isFunction: boolean;
    public isUndefined: boolean;
    public isNull: boolean;
    public isBigInt: boolean;
    public isAvailable: boolean;

    public isNotBoolean: boolean;
    public isNotString: boolean;
    public isNotObject: boolean;
    public isNotSymbol: boolean;
    public isNotArray: boolean;
    public isNotNumber: boolean;
    public isNotFunction: boolean;
    public isNotUndefined: boolean;
    public isNotNull: boolean;
    public isNotBigInt: boolean;
    public isNotAvailable: boolean;

    public createError(options: ErrorCreateOptions): { throw: (condition: boolean) => void; };

    public toString(upperFirstChar?: boolean): string;
  }

  export class EventEmitter<EventList extends EventMap = EventMap> extends (Emitter as new <List extends EventMap = EventMap>() => TypedEmitter<List>)<EventList> {
    protected emittedEvents<E extends keyof EventList>: { name: E, args: Parameters<EventList<E>> }[];

    public hasListener<E extends keyof EventList>(name: E): boolean;
    public hasEmitted<E extends keyof EventList>(name: E): boolean;
    public fetch<E extends keyof EventList>(): { name: E, args: Parameters<EventList<E>> }[];
  }

  export interface ErrorCreateOptions {
    argument: string;
    errorType?: string;
    expected: string;
    received?: string;
  }

  export type TypeResult = ("string" | "object" | "array" | "symbol" | "null" | "boolean" | "bigint" | "number" | "function") | ("String" | "Object" | "Array" | "Symbol" | "Null" | "Boolean" | "Bigint" | "Number" | "Function");
}

