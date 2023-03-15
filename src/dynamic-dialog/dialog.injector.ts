import {
  InjectFlags,
  InjectOptions,
  Injector,
  ProviderToken,
} from '@angular/core';

export class DialogInjector implements Injector {
  constructor(
    private _parentInjector: Injector,
    private _additionalTokens: WeakMap<any, any>
  ) {}
  get<T>(
    token: ProviderToken<T>,
    notFoundValue: undefined,
    options: InjectOptions & { optional?: false }
  ): T;
  get<T>(
    token: ProviderToken<T>,
    notFoundValue: null,
    options: InjectOptions
  ): T;
  get<T>(
    token: ProviderToken<T>,
    notFoundValue?: T,
    options?: InjectOptions | InjectFlags
  ): T;
  get<T>(token: ProviderToken<T>, notFoundValue?: T, flags?: InjectFlags): T;
  get(token: any, notFoundValue?: any);
  get(token: unknown, notFoundValue?: unknown, flags?: unknown): any {
    const value = this._additionalTokens.get(token);
    if (value) return value;
    return this._parentInjector.get(token, notFoundValue);
  }
}
