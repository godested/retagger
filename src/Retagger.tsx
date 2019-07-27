import React, { ElementType, ReactHTML } from 'react';

const blackList = new Set([
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
]);

interface Attributes {
  classNames: string[];
}

function createAttributesProxy(Component: ElementType) {
  const attributes: Attributes = {
    classNames: [],
  };

  return new Proxy((props: object) => <Component {...props} />, {
    get: function get(target: Record<any, any>, property: string): any {
      const isPropertyCantBeAttribute =
        property in target ||
        typeof property !== 'string' ||
        blackList.has(property);

      if (isPropertyCantBeAttribute) {
        return target[property];
      }

      attributes.classNames = [...attributes.classNames, property];

      const ResultComponent = target as ElementType;

      return new Proxy(
        (props: object) => {
          return (
            <ResultComponent
              className={attributes.classNames.join(' ')}
              {...props}
            />
          );
        },
        { get }
      );
    },
  });
}

export const Retagger = new Proxy({} as Record<keyof ReactHTML, any>, {
  get(_, Component: keyof ReactHTML) {
    return createAttributesProxy(Component);
  },
});
