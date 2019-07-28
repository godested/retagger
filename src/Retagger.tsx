import React, { ElementType, ReactHTML, AllHTMLAttributes } from 'react';
import { classNames } from './utils';

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

function createAttributesProxy(Component: ElementType) {
  const attributes: AllHTMLAttributes<typeof Component> = {};

  return new Proxy((props: object) => <Component {...props} />, {
    get: function get(target: Record<any, any>, property: string): any {
      const isPropertyCantBeAttribute =
        property in target ||
        typeof property !== 'string' ||
        blackList.has(property);

      if (isPropertyCantBeAttribute) {
        return target[property];
      }

      attributes.className = classNames(attributes.className, property);

      const ResultComponent = target as ElementType;

      return new Proxy(
        (props: object) => {
          return <ResultComponent {...attributes} {...props} />;
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
