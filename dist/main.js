'use strict';
function _interopDefault(e) {
  return e && 'object' == typeof e && 'default' in e ? e.default : e;
}
var React = _interopDefault(require('react'));
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
function createAttributesProxy(e) {
  const t = { classNames: [] };
  return new Proxy(e, {
    get: function e(s, r) {
      return 'string' != typeof r || blackList.includes(r)
        ? Reflect.get(s, r)
        : ((t.classNames = [...t.classNames, r]),
          new Proxy(
            e => {
              const r = s;
              return React.createElement(
                r,
                Object.assign({ className: t.classNames.join(' ') }, e)
              );
            },
            { get: e }
          ));
    },
  });
}
const Tagger = new Proxy({}, { get: (e, t) => createAttributesProxy(t) });
module.exports = Tagger;
