import { tracked } from 'sparkles-component';
import { decoratorWithParams } from '@ember-decorators/utils/decorator';

export const arg = decoratorWithParams(function (target, key, descriptor, params) {
  const config = params[0] || {};
  let name = config.name ? config.name : key;
  let lastArgValue;
  const values = new WeakMap();

  descriptor = descriptor || {};

  if ('value' in descriptor && descriptor.value !== null && !config.default) {
    config.default = descriptor.value;
  }

  if ('initializer' in descriptor && descriptor.initializer !== null && !config.default) {
    config.initializer = descriptor.initializer;
  }

  delete descriptor.value;
  delete descriptor.initializer;
  delete descriptor.writable;

  descriptor.get = function () {
    if (this.args && this.args[name] && this.args[name] !== lastArgValue) {
      return this.args[name];
    }

    if (values.has(this)) {
      return values.get(this);
    }

    if (config.default) {
      if (typeof (config.default) === 'function') {
        return config.default.call(this);
      }
      return config.default;
    }

    if (config.initializer) {
      let init = config.initializer();

      if (typeof(init) === 'function') {
        init = init.call(this);
      }

      return init;
    }
  };

  descriptor.set = function(value) {
    if (values.has(this)) {
      lastArgValue = this.args && this.args[name] ? this.args[name] : undefined;
    }
    values.set(this, value);
  };

  return tracked('args')(target, key, descriptor);
});