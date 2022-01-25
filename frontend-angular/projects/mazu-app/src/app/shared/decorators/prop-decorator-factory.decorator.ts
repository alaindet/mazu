/**
 * Turns a property with type A in a getter/setter alias for accessing a private
 * property with type B
 *
 * Accepts a function to run when setting the private property
 */
 export function propDecoratorFactory<A, B>(
  transform: (propValue: A) => B
): (target: any, propName: string) => any {

  return function (target: any, propName: string): any {

    // This is have the transformed value
    const privateProp = '_l_' + propName;

    Object.defineProperty(
      target,
      privateProp,
      {
        configurable: true,
        writable: true,
      }
    );

    return {

      get(): B {
        return this[privateProp];
      },

      // Use existing setter?
      set(value: A) {
        this[privateProp] = transform(value);
      }

    };

  }
}
