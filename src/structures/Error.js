import { redBright, greenBright } from "colorette";

class BaseError extends Error {
  constructor(message) {
    super(message);
  };

  name = this.constructor.name;
};

export class InvalidType extends BaseError {
  constructor(argument, options = { expected: [], received: "Number" }) {
    super(`The required type for '${redBright(argument)}' was not specified.`);

    const { expected, received } = options;

    this.expected = expected;
    this.received = received;
  };
};

export class NotRequestedFormat extends BaseError {
  constructor(argument, options = { expected: [], received: "aa,bb" }) {
    super(`'${redBright(argument)}' is not in the requested format.`);

    const { expected, received } = options;

    this.expected = expected;
    this.received = received;
  };
};

export class DataLimitExceeded extends BaseError {
  constructor(name, storageSize, maxLimit) {
    super(`The maximum data limit of '${greenBright(name)}' has been exceeded.`);

    this.size = storageSize;
    this.maxLimit = maxLimit;
  };
};