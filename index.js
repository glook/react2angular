"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fromPairs = require("lodash.frompairs");
var ngcomponent_1 = require("ngcomponent");
var React = require("react");
var react_dom_1 = require("react-dom");
/**
 * Wraps a React component in Angular. Returns a new Angular component.
 *
 * Usage:
 *
 *   ```ts
 *   type Props = { foo: number }
 *   class ReactComponent extends React.Component<Props, S> {}
 *   const AngularComponent = react2angular(ReactComponent, ['foo'])
 *   const AngularComponent = react2angular(ReactComponent, {foo:'<'})
 *   ```
 *
 *   ```ts
 *   type Props = { foo: number }
 *   class ReactComponent extends React.Component<Props, S> {}
 *   const AngularComponent = react2angular(ReactComponent, {foo:'<'})
 *   ```
 */
function react2angular(Class, bindingNames, injectNames) {
    if (bindingNames === void 0) { bindingNames = null; }
    if (injectNames === void 0) { injectNames = []; }
    var bindingsList = bindingNames
        || (Class.propTypes && Object.keys(Class.propTypes))
        || [];
    var bindings = Array.isArray(bindingsList) ? fromPairs(bindingsList.map(function (_) { return [_, '<']; })) : bindingsList;
    return {
        bindings: bindings,
        controller: __spreadArrays(['$element'], injectNames, [/** @class */ (function (_super) {
                __extends(class_1, _super);
                function class_1($element) {
                    var injectedProps = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        injectedProps[_i - 1] = arguments[_i];
                    }
                    var _this = _super.call(this) || this;
                    _this.$element = $element;
                    _this.isDestroyed = false;
                    _this.injectedProps = {};
                    injectNames.forEach(function (name, i) {
                        _this.injectedProps[name] = injectedProps[i];
                    });
                    return _this;
                }
                Object.defineProperty(class_1, "$$ngIsClass", {
                    get: function () {
                        return true;
                    },
                    enumerable: true,
                    configurable: true
                });
                class_1.prototype.render = function () {
                    if (!this.isDestroyed) {
                        var controller_1 = this;
                        var props = Object.keys(bindings).reduce(function (props, key) {
                            props[key] = controller_1[key];
                            return props;
                        }, this.props);
                        react_dom_1.render(React.createElement(Class, __assign({}, props, this.injectedProps)), this.$element[0]);
                    }
                };
                class_1.prototype.componentWillUnmount = function () {
                    this.isDestroyed = true;
                    react_dom_1.unmountComponentAtNode(this.$element[0]);
                };
                return class_1;
            }(ngcomponent_1.default))])
    };
}
exports.react2angular = react2angular;
//# sourceMappingURL=index.js.map