interface ArgOptions {
  /**
   * Argument name this.args[name] (if not provided the property name will be used)
   */
  name?: string;

  /**
   * Default value for that argument. If this is a function, it will be executed in the context of the component.
   */
  default?: any;
}

/**
 * Maps arguments to properties (with different name) and can provide default values.
 *
 * @param options
 */
export function arg(options?: ArgOptions): PropertyDescriptor;
export function arg(name?: string): any;
export function arg(...args: any[]): any;
