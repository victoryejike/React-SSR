/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Grid = function Grid(_ref) {
    var repos = _ref.repos;

    console.log(repos);
    return _react2.default.createElement(
        'ul',
        { className: 'grid' },
        repos.map(function (_ref2, i) {
            var name = _ref2.name,
                owner = _ref2.owner,
                stargazers_count = _ref2.stargazers_count,
                html_url = _ref2.html_url;
            return _react2.default.createElement(
                'li',
                { key: name },
                _react2.default.createElement(
                    'h2',
                    null,
                    '#',
                    i + 1
                ),
                _react2.default.createElement(
                    'h3',
                    null,
                    _react2.default.createElement(
                        'a',
                        { href: html_url },
                        name
                    )
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    'by ',
                    _react2.default.createElement(
                        'a',
                        { href: 'https://github.com/' + owner.login },
                        '@',
                        owner.login
                    )
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    stargazers_count.toLocaleString(),
                    ' stars'
                )
            );
        })
    );
};

exports.default = Grid;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPopularRepos = fetchPopularRepos;

var _isomorphicFetch = __webpack_require__(10);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchPopularRepos() {
  var language = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';

  var encodedURI = encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');

  return (0, _isomorphicFetch2.default)(encodedURI).then(function (data) {
    return data.json();
  }).then(function (repos) {
    return repos.items;
  }).catch(function (error) {
    console.warn(error);
    return null;
  });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(5);

var _express2 = _interopRequireDefault(_express);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _cors = __webpack_require__(6);

var _cors2 = _interopRequireDefault(_cors);

var _server = __webpack_require__(7);

var _styledComponents = __webpack_require__(1);

var _App = __webpack_require__(8);

var _App2 = _interopRequireDefault(_App);

var _serializeJavascript = __webpack_require__(9);

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _api = __webpack_require__(3);

var _reactRouterDom = __webpack_require__(11);

var _routes = __webpack_require__(12);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import Html from './client/Html';
var app = (0, _express2.default)();
app.use((0, _cors2.default)());
app.use(_express2.default.static('dist'));

app.get('/', function (req, res, next) {
  var sheet = new _styledComponents.ServerStyleSheet(); //creates stylesheet

  var activeRoute = _routes2.default.find(function (route) {
    return (0, _reactRouterDom.matchPath)(req.url, route);
  }) || {};
  console.log(activeRoute);

  var promise = activeRoute.fetchInitialData ? activeRoute.fetchInitialData(req.path) : Promise.resolve();

  promise.then(function (data) {
    var body = (0, _server.renderToString)(sheet.collectStyles(_react2.default.createElement(_App2.default, { data: data }))); //collects stylesheet
    var styleTags = sheet.getStyleTags(); //gets all the tags in the html
    var title = 'Server Side Rendered React Application';
    res.send('\n      <!DOCTYPE html>\n      <html>\n        <head>\n          <title>' + title + '</title>\n          <script src="/bundle.js" defer></script>\n          ' + styleTags + '\n          <script>window.__INITIAL_DATA__ = ' + (0, _serializeJavascript2.default)(data) + '</script>\n        </head>\n\n        <body>\n          <div id="app">' + body + '</div>\n        </body>\n      </html>\n    ');
  }).catch(next);
});

var port = 3000;

app.listen(port);
console.log('server running on ' + port);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  min-width: 100%;\n  min-height: 100%;\n  font-size: 40px;\n  background: linear-gradient(20deg, rgb(219, 112, 147), #daa357);\n'], ['\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  min-width: 100%;\n  min-height: 100%;\n  font-size: 40px;\n  background: linear-gradient(20deg, rgb(219, 112, 147), #daa357);\n']);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _styledComponents = __webpack_require__(1);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _grid = __webpack_require__(2);

var _grid2 = _interopRequireDefault(_grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// Our single Styled Component definition
var AppContainer = _styledComponents2.default.div(_templateObject);

var App = function App(_ref) {
  var data = _ref.data;

  return _react2.default.createElement(
    AppContainer,
    null,
    _react2.default.createElement(_grid2.default, { repos: data })
  );
};

exports.default = App;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Home = __webpack_require__(13);

var _Home2 = _interopRequireDefault(_Home);

var _grid = __webpack_require__(2);

var _grid2 = _interopRequireDefault(_grid);

var _api = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = [{
    path: '/',
    component: _Home2.default,
    exact: true
}, {
    path: '/popular/:id',
    component: _grid2.default,
    fetchInitialData: function fetchInitialData() {
        var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        return (0, _api.fetchPopularRepos)(path.split('/').pop());
    }

}];

exports.default = routes;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function Home() {
    return _react2.default.createElement(
        'h2',
        null,
        'Select a Language'
    );
};

exports.default = Home;

/***/ })
/******/ ]);