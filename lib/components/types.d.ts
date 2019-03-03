import {
  Component,
  ComponentType,
  createElement,
  ReactChild,
  ReactElement
} from 'react';

type PropMapper<Props, MappedProps> = (
  component: ComponentType<MappedProps>
) => ComponentType<Props>;

export type UrlStateProps<T> = {
  setUrlState: (newState: T) => void;
  urlState: T;
};

export type Parse<T> = (queryString: string) => T;

export type Stringify<T> = (state: T) => string;

export type Config<T> = {
  serialisation: {
    parse: Parse<T>;
    stringify: Stringify<T>;
  };
  shouldPushState: (next: T, current: T) => boolean;
};

export type Props<T> = {
  config?: Partial<Config<T>>;
  initialState: T;
  render: (renderProps: UrlStateProps<T>) => ReactElement<any>;
};
