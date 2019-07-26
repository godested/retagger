import e from 'react';
const t = [
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
const s = new Proxy(
  {},
  {
    get: (s, o) =>
      (function(s) {
        const o = { classNames: [] };
        return new Proxy(s, {
          get: function s(r, a) {
            return 'string' != typeof a || t.includes(a)
              ? Reflect.get(r, a)
              : ((o.classNames = [...o.classNames, a]),
                new Proxy(
                  t => {
                    const s = r;
                    return e.createElement(
                      s,
                      Object.assign({ className: o.classNames.join(' ') }, t)
                    );
                  },
                  { get: s }
                ));
          },
        });
      })(o),
  }
);
export default s;
