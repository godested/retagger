import React, { ElementType } from 'react';

const blackList = [
  'defaultProps',
  'tag',
  'displayName',
  'propTypes',
  'getDefaultProps',
  'getDerivedStateFromProps',
  'isReactClassApproved',
  'prototype',
  'contextType',
  'contextTypes',
  'name',
  'PropTypes',
];

interface Result {
  classNames: string[];
}

type parameterType = string | number | symbol;

function createAttributesProxy(Component: ElementType): ElementType {
  const result: Result = {
    classNames: [],
  };

  return new Proxy(Component as object, {
    get: function get(target: object, property: parameterType): any {
      if (typeof property !== 'string' || blackList.includes(property)) {
        return Reflect.get(target, property);
      }

      result.classNames = [...result.classNames, property];

      return new Proxy(
        (props: object) => {
          const Target = target as ElementType;

          return <Target className={result.classNames.join(' ')} {...props} />;
        },
        { get }
      );
    },
  }) as ElementType;
}

interface AnyObject {
  [x: string]: any;
}

export const Tagger = new Proxy({} as AnyObject, {
  get(_, Component: parameterType): ElementType {
    return createAttributesProxy(Component as ElementType);
  },
});
