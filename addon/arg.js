import { tracked } from 'sparkles-component';
import { decoratorWithParams } from '@ember-decorators/utils/decorator';

export const arg = decoratorWithParams((desc, params = []) => {
  const config = typeof(params[0]) === 'string' ? {name: params[0]} : params[0] || {};
  let name = config.name ? config.name : desc.key;
  let lastArgValue;
  const values = new WeakMap();
  const descriptor = { ...desc.descriptor };

  if ('value' in descriptor && descriptor.value !== null && !config.default) {
    config.default = descriptor.value;
  }

  if ('initializer' in desc && desc.initializer !== null && !config.default) {
    config.initializer = desc.initializer;
  }

  delete desc.initializer;
  delete descriptor.value;
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

  desc.kind = 'method';
  desc.placement = 'prototype';

  desc.finisher = target => {
    Object.defineProperty(target.prototype, desc.key, tracked('args')(target, desc.key, descriptor));

    return target;
  };

  return desc;
});
