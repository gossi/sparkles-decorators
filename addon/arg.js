import { tracked } from 'sparkles-component';

export function arg(...args) {
  if (args.length === 1) {
    return function(target, key, descriptor) {
      return arg(target, key, descriptor, args[0]);
    };
  }
  let [target, key, descriptor, config] = args;
  let name = config && config.name ? config.name : key;

  descriptor = descriptor || {};
  descriptor.get = function () {
    if (this.args && this.args[name]) {
      return this.args[name];
    }

    if (config.default) {
      if (typeof (config.default) === 'function') {
        return config.default.call(this);
      }
      return config.default;
    }
  };

  // this will confuse @tracked - so remove it for now
  if ('initializer' in descriptor) {
    delete descriptor.initializer;
  }

  return tracked(target, key, descriptor, 'args');
}
