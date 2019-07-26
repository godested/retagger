var retagger = (function(e) {
  'use strict';
  e = e && e.hasOwnProperty('default') ? e.default : e;
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
  return new Proxy(
    {},
    {
      get: (s, r) =>
        (function(s) {
          const r = { classNames: [] };
          return new Proxy(s, {
            get: function s(a, n) {
              return 'string' != typeof n || t.includes(n)
                ? Reflect.get(a, n)
                : ((r.classNames = [...r.classNames, n]),
                  new Proxy(
                    t => {
                      const s = a;
                      return e.createElement(
                        s,
                        Object.assign({ className: r.classNames.join(' ') }, t)
                      );
                    },
                    { get: s }
                  ));
            },
          });
        })(r),
    }
  );
})(React);
