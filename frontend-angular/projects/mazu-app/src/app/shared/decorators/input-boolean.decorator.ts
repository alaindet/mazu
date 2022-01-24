import { propDecoratorFactory } from './prop-decorator-factory.decorator';

export function InputBoolean(): any {
  return propDecoratorFactory(
    function (x?: boolean | string | undefined): boolean {
      return x === true || (typeof x === 'string' && (!!x || x === ''));
    }
  );
}
