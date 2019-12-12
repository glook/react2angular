"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fromPairs = require("lodash.frompairs");
const ngcomponent_1 = require("ngcomponent");
const React = require("react");
const react_dom_1 = require("react-dom");
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
function react2angular(Class, bindingNames = null, injectNames = []) {
    const bindingsList = bindingNames
        || (Class.propTypes && Object.keys(Class.propTypes))
        || [];
    const bindings = Array.isArray(bindingsList) ? fromPairs(bindingsList.map(_ => [_, '<'])) : bindingsList;
    return {
        bindings,
        controller: ['$element', ...injectNames, class extends ngcomponent_1.default {
                constructor($element, ...injectedProps) {
                    super();
                    this.$element = $element;
                    this.isDestroyed = false;
                    this.injectedProps = {};
                    injectNames.forEach((name, i) => {
                        this.injectedProps[name] = injectedProps[i];
                    });
                }
                static get $$ngIsClass() {
                    return true;
                }
                render() {
                    if (!this.isDestroyed) {
                        const controller = this;
                        const props = Object.keys(bindings).reduce((props, key) => {
                            props[key] = controller[key];
                            return props;
                        }, this.props);
                        react_dom_1.render(React.createElement(Class, Object.assign({}, props, this.injectedProps)), this.$element[0]);
                    }
                }
                componentWillUnmount() {
                    this.isDestroyed = true;
                    react_dom_1.unmountComponentAtNode(this.$element[0]);
                }
            }]
    };
}
exports.react2angular = react2angular;
//# sourceMappingURL=index.js.map