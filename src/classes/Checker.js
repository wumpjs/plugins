import {
  InvalidType,
  NotRequestedFormat,
  DataLimitExceeded
} from "../structures/Error.js";

const upperFirst = (str = "string!") => (String(str).replace(/^\w/, (c) => c.toUpperCase()));

export class Checker {
  /**
   * Creates new Checker.
   * @param {any} data
   * @constructor 
   */
  constructor(data) {
    /**
     * @protected
     */
    this.data = data;
  };

  /**
   * Get provided data type.
   * @param {any} data
   * @param {boolean} upper
   * @returns {("string" | "object" | "array" | "symbol" | "null" | "boolean" | "bigint" | "number" | "function") | ("String" | "Object" | "Array" | "Symbol" | "Null" | "Boolean" | "Bigint" | "Number" | "Function")}
   */
  type(data = this.data, upper) {
    if (upper && typeof upper === "boolean") return;

    let type = (typeof data);

    if (Array.isArray(data)) type = "array";
    else if (data == null || data == "null" || data == "undefined") type = "null";

    return (upper ? upperFirst(type) : type);
  };

  /**
   * Checks if data is Boolean.
   * @returns {boolean}
   */
  get isBoolean() {
    if (this.isNull || this.isUndefined) return false;

    if (this.type() === "boolean" || this.type() === "Boolean") return true;
    else return false;
  };

  /**
   * Checks if data is String.
   * @returns {boolean}
   */
  get isString() {
    if (this.isNull || this.isUndefined) return false;

    if (this.type() === "string" || this.type() === "String") return true;
    else return false;
  };

  /**
   * Checks if data is Object.
   * @returns {boolean}
   */
  get isObject() {
    if (this.isNull || this.isUndefined) return false;

    if (this.type() === "object" || this.type() === "Object") return true;
    else return false;
  };

  /**
   * Checks if data is Symbol.
   * @returns {boolean}
   */
  get isSymbol() {
    if (this.isNull || this.isUndefined) return false;

    if (this.type() === "symbol" || this.type() === "Symbol") return true;
    else return false;
  };

  /**
   * Checks if data is Array.
   * @returns {boolean}
   */
  get isArray() {
    if (this.isNull || this.isUndefined) return false;

    if (this.type() === "array" || this.type() === "Array") return true;
    else return false;
  };

  /**
   * Checks if data is Number.
   * @returns {boolean}
   */
  get isNumber() {
    if (this.isNull || this.isUndefined) return false;

    if (this.type() === "number" || this.type() === "Number") return true;
    else return false;
  };

  /**
   * Checks if data is Function.
   * @returns {boolean}
   */
  get isFunction() {
    if (this.isNull || this.isUndefined) return false;

    if (this.type() === "function" || this.type() === "Function") return true;
    else return false;
  };

  /**
   * Checks if data is Undefined (Null).
   * @returns {boolean}
   */
  get isUndefined() {
    if (this.type() === "null" || this.type() === "Null") return true;
    else return false;
  };

  /**
   * Checks if data is Null.
   * @returns {boolean}
   */
  get isNull() {
    if (this.isUndefined) return true;
    else return false;
  };

  /**
   * Checks if data is BigInt.
   * @returns {boolean}
   */
  get isBigInt() {
    if (this.isNull || this.isUndefined) return false;

    if (this.type() === "bigint" || this.type() === "Bigint") return true;
    else return false;
  };

  /**
   * Checks if data is Available.
   * @returns {boolean}
   */
  get isAvailable() {
    if (this.isNull || this.isUndefined) return false;
    else return true;
  };

  /**
   * Checks that the data is not Boolean.
   * @returns {boolean}
   */
  get isNotBoolean() {
    if (this.isBoolean) return false;
    else return true;
  };

  /**
   * Checks that the data is not String.
   * @returns {boolean}
   */
  get isNotString() {
    if (this.isString) return false;
    else return true;
  };

  /**
   * Checks that the data is not Object.
   * @returns {boolean}
   */
  get isNotObject() {
    if (this.isObject) return false;
    else return true;
  };

  /**
   * Checks that the data is not Symbol.
   * @returns {boolean}
   */
  get isNotSymbol() {
    if (this.isSymbol) return false;
    else return true;
  };

  /**
   * Checks that the data is not Array.
   * @returns {boolean}
   */
  get isNotArray() {
    if (this.isArray) return false;
    else return true;
  };

  /**
   * Checks that the data is not Number.
   * @returns {boolean}
   */
  get isNotNumber() {
    if (this.isNumber) return false;
    else return true;
  };

  /**
   * Checks that the data is not Function.
   * @returns {boolean}
   */
  get isNotFunction() {
    if (this.isFunction) return false;
    else return true;
  };

  /**
   * Checks that the data is not Undefined.
   * @returns {boolean}
   */
  get isNotUndefined() {
    if (this.isUndefined) return false;
    else return true;
  };

  /**
   * Checks that the data is not Null.
   * @returns {boolean}
   */
  get isNotNull() {
    if (this.isNull) return false;
    else return true;
  };

  /**
   * Checks that the data is not BigInt.
   * @returns {boolean}
   */
  get isNotBigInt() {
    if (this.isBigInt) return false;
    else return true;
  };

  /**
   * Checks that the data is not Available.
   * @returns {boolean}
   */
  get isNotAvailable() {
    if (this.isAvailable) return false;
    else return true;
  };

  /**
   * Creates a new Error.
   * @param {{ argument: string, errorType?: string, expected?: string, received: string | null}}
   * @returns {{ throw: () => void }}
   */
  createError({ argument = null, errorType = "InvalidType", expected = "String", received }) {
    if (this.type(argument) !== "string") throw new InvalidType("argument", { expected: "String", received: upperFirst(typeof argument) });
    if (this.type(errorType) !== "string") throw new InvalidType("type", { expected: "String", received: upperFirst(typeof errorType) });

    const type = (errorType.replace(/ /g, "_")).toUpperCase();

    const fetched = upperFirst(received ?? this.toString());

    let error = new InvalidType(argument, { expected, received: fetched });

    if (type === "NOT_FOUND") error = new NotFound(argument);
    else if (type === "NOT_REQUESTED_FORMAT") error = new NotRequestedFormat(argument, { expected, received: fetched });
    else if (type === "DATA_LIMIT_EXCEEDED") error = new DataLimitExceeded(argument, expected, fetched);

    const isNotUndefined = this.isNotUndefined;
    const isNotNull = this.isNotNull;

    const getType = this.type;
    /**
     * Send the created error to the console.
     * @param {boolean} condition 
     * @returns {void}
     */
    function throwError(condition) {
      if (getType(condition) === "boolean") throw new InvalidType("condition", { expected: "Boolean", received: upperFirst(typeof condition) });

      if (condition && isNotUndefined && isNotNull) throw error;
    };

    return { throw: throwError };
  };

  /**
   * Default type of the "this.data" value.
   * @param {boolean} upperFirstChar
   * @returns {string}
   */
  toString(upperFirstChar = true) {
    return (this.type(this.data, upperFirstChar));
  };
};