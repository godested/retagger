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

function createAttributesProxy(Component) {
  const result = {
    classNames: [],
  };

  return new Proxy(Component, {
    get: function get(target, property) {
      if (typeof property !== 'string' || blackList.includes(property)) {
        return target[property];
      }

      result.classNames = [...result.classNames, property];

      return new Proxy(
        props => {
          return <target className={result.classNames.join(' ')} {...props} />;
        },
        {
          get,
        }
      );
    },
  });
}

const tagger = new Proxy(
  {},
  {
    get(_, Tag) {
      return createAttributesProxy(props => {
        return React.createElement(Tag, { ...props });
      });
    },
  }
);

