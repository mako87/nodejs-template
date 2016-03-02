"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('ember-template/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'ember-template/config/environment'], function (exports, _ember, _emberResolver, _emberLoadInitializers, _emberTemplateConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _emberTemplateConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _emberTemplateConfigEnvironment['default'].podModulePrefix,
    Resolver: _emberResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _emberTemplateConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('ember-template/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'ember-template/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _emberTemplateConfigEnvironment) {

  var name = _emberTemplateConfigEnvironment['default'].APP.name;
  var version = _emberTemplateConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('ember-template/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define("ember-template/controllers/login", ["exports", "ember"], function (exports, _ember) {
    var service = _ember["default"].inject.service;
    var Controller = _ember["default"].Controller;
    var get = _ember["default"].get;
    var set = _ember["default"].set;
    exports["default"] = Controller.extend({

        session: service("session"),

        actions: {
            authenticate: function authenticate(username, password) {
                var _this = this;

                return get(this, "session").authenticate('authenticator:jwt', { identification: username, password: password })["catch"](function (reason) {
                    console.log(reason);
                    _this.set('errorMessage', reason);
                });
            }
        }
    });
});
define('ember-template/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('ember-template/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ember-template/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _emberTemplateConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_emberTemplateConfigEnvironment['default'].APP.name, _emberTemplateConfigEnvironment['default'].APP.version)
  };
});
define('ember-template/initializers/ember-simple-auth', ['exports', 'ember', 'ember-template/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service'], function (exports, _ember, _emberTemplateConfigEnvironment, _emberSimpleAuthConfiguration, _emberSimpleAuthInitializersSetupSession, _emberSimpleAuthInitializersSetupSessionService) {
  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(registry) {
      var config = _emberTemplateConfigEnvironment['default']['ember-simple-auth'] || {};
      config.baseURL = _emberTemplateConfigEnvironment['default'].baseURL;
      _emberSimpleAuthConfiguration['default'].load(config);

      (0, _emberSimpleAuthInitializersSetupSession['default'])(registry);
      (0, _emberSimpleAuthInitializersSetupSessionService['default'])(registry);
    }
  };
});
define('ember-template/initializers/export-application-global', ['exports', 'ember', 'ember-template/config/environment'], function (exports, _ember, _emberTemplateConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_emberTemplateConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _emberTemplateConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_emberTemplateConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('ember-template/initializers/simple-auth-token', ['exports', 'ember-simple-auth-token/authenticators/token', 'ember-simple-auth-token/authenticators/jwt', 'ember-simple-auth-token/authorizers/token', 'ember-simple-auth-token/configuration', 'ember-template/config/environment'], function (exports, _emberSimpleAuthTokenAuthenticatorsToken, _emberSimpleAuthTokenAuthenticatorsJwt, _emberSimpleAuthTokenAuthorizersToken, _emberSimpleAuthTokenConfiguration, _emberTemplateConfigEnvironment) {

  /**
    Ember Simple Auth Token's Initializer.
    By default load both the Token and JWT (with refresh) Authenticators.
  */
  exports['default'] = {
    name: 'ember-simple-auth-token',
    before: 'ember-simple-auth',
    initialize: function initialize(container) {
      _emberSimpleAuthTokenConfiguration['default'].load(container, _emberTemplateConfigEnvironment['default']['ember-simple-auth-token'] || {});
      container.register('authorizer:token', _emberSimpleAuthTokenAuthorizersToken['default']);
      container.register('authenticator:token', _emberSimpleAuthTokenAuthenticatorsToken['default']);
      container.register('authenticator:jwt', _emberSimpleAuthTokenAuthenticatorsJwt['default']);
    }
  };
});
define('ember-template/initializers/websocket', ['exports'], function (exports) {
  exports.initialize = initialize;

  function initialize(application) {
    application.inject('route', 'websocket', 'service:websocket');
  }

  exports['default'] = {
    name: 'websocket',
    initialize: initialize
  };
});
define('ember-template/instance-initializers/ember-simple-auth', ['exports', 'ember-simple-auth/instance-initializers/setup-session-restoration'], function (exports, _emberSimpleAuthInstanceInitializersSetupSessionRestoration) {
  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(instance) {
      (0, _emberSimpleAuthInstanceInitializersSetupSessionRestoration['default'])(instance);
    }
  };
});
define('ember-template/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
    exports['default'] = _emberData['default'].Model.extend({
        username: _emberData['default'].attr('string'),
        password: _emberData['default'].attr('password')
    });
});
define('ember-template/router', ['exports', 'ember', 'ember-template/config/environment'], function (exports, _ember, _emberTemplateConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _emberTemplateConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('login');
  });

  exports['default'] = Router;
});
define('ember-template/routes/application', ['exports', 'ember', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsApplicationRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsApplicationRouteMixin['default']);
});
/**
 * Created by Marco on 29/02/16.
 */
define('ember-template/routes/index', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
    var service = _ember['default'].inject.service;
    var get = _ember['default'].get;
    var Route = _ember['default'].Route;
    exports['default'] = Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
        session: service("session"),
        actions: {
            invalidate: function invalidate() {
                get(this, "session").invalidate();
            }
        }
    });
});
define('ember-template/routes/login', ['exports', 'ember', 'ember-simple-auth/mixins/unauthenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsUnauthenticatedRouteMixin) {
  var Route = _ember['default'].Route;
  exports['default'] = Route.extend(_emberSimpleAuthMixinsUnauthenticatedRouteMixin['default'], {});
});
define('ember-template/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, _emberSimpleAuthServicesSession) {
  exports['default'] = _emberSimpleAuthServicesSession['default'];
});
define("ember-template/services/websocket", ["exports", "ember"], function (exports, _ember) {
    var service = _ember["default"].inject.service;
    var get = _ember["default"].get;
    var set = _ember["default"].set;
    var Service = _ember["default"].Service;
    var observer = _ember["default"].observer;
    exports["default"] = Service.extend({

        session: service("session"),

        init: function init() {
            this._super.apply(this, arguments);
            this._subscribers = {};
            get(this, "session");
        },

        setup: function setup(token) {
            var socket = window.io.connect('ws://localhost:4000', {
                "forceNew": true,
                "query": "token=" + token
            });
            socket.on("connect", this.connectHandler);
            socket.on('error', this.errorHandler);
            set(this, 'socket', socket);
        },

        connectHandler: function connectHandler() {
            console.log("Socket connected");
        },

        errorHandler: function errorHandler(e) {
            console.log(e);
        },

        observesAuth: observer('session.session.content.authenticated.token', function () {
            var _this = this;

            var token = get(this, 'session.session.content.authenticated.token');
            if (token) {
                _ember["default"].run(function () {
                    _this.setup(token);
                });
            }
        })
    });
});
define('ember-template/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _emberSimpleAuthSessionStoresAdaptive) {
  exports['default'] = _emberSimpleAuthSessionStoresAdaptive['default'].extend();
});
define("ember-template/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "ember-template/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("ember-template/templates/components/login-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.3.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 44,
            "column": 8
          }
        },
        "moduleName": "ember-template/templates/components/login-form.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "ui middle aligned center aligned grid");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "column");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h2");
        dom.setAttribute(el3, "class", "ui black image");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("<img src=\"logo.jpg\" alt=\"Logo\" />");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("form");
        dom.setAttribute(el3, "class", "ui large form");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "ui stacked segment");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "field");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "ui left icon input");
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("i");
        dom.setAttribute(el7, "class", "user icon");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                      ");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "field");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6, "class", "ui left icon input");
        var el7 = dom.createTextNode("\n                        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("i");
        dom.setAttribute(el7, "class", "lock icon");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                      ");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n                    ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        var el6 = dom.createTextNode("Login");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "ui error message");
        var el5 = dom.createTextNode("\n              ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("style");
        var el2 = dom.createTextNode("\n\n    body > .ember-view, body > .ember-view > .ember-view{\n        height: 100%;\n    }\n    .grid {\n        height: 100%;\n    }\n    .image {\n        margin-top: -100px;\n    }\n    .column {\n        max-width: 400px;\n    }\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1, 3]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [5]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(element1, [1, 1]), 3, 3);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [3, 1]), 3, 3);
        morphs[2] = dom.createAttrMorph(element2, 'class');
        morphs[3] = dom.createElementMorph(element2);
        morphs[4] = dom.createMorphAt(dom.childAt(element0, [3]), 1, 1);
        return morphs;
      },
      statements: [["inline", "input", [], ["enter", ["subexpr", "action", [["get", "authenticate", ["loc", [null, [11, 44], [11, 56]]]], ["get", "username", ["loc", [null, [11, 57], [11, 65]]]], ["get", "password", ["loc", [null, [11, 66], [11, 74]]]]], [], ["loc", [null, [11, 36], [11, 75]]]], "type", "text", "name", "email", "placeholder", "E-mail address", "value", ["subexpr", "@mut", [["get", "username", ["loc", [null, [11, 136], [11, 144]]]]], [], []]], ["loc", [null, [11, 22], [11, 146]]]], ["inline", "input", [], ["enter", ["subexpr", "action", [["get", "authenticate", ["loc", [null, [17, 44], [17, 56]]]], ["get", "username", ["loc", [null, [17, 57], [17, 65]]]], ["get", "password", ["loc", [null, [17, 66], [17, 74]]]]], [], ["loc", [null, [17, 36], [17, 75]]]], "type", "password", "name", "password", "placeholder", "Password", "value", ["subexpr", "@mut", [["get", "password", ["loc", [null, [17, 137], [17, 145]]]]], [], []]], ["loc", [null, [17, 22], [17, 147]]]], ["attribute", "class", ["concat", ["ui fluid large black submit button ", ["subexpr", "if", [["get", "loading", ["loc", [null, [20, 110], [20, 117]]]], "loading disabled"], [], ["loc", [null, [20, 105], [20, 138]]]]]]], ["element", "action", [["get", "authenticate", ["loc", [null, [20, 30], [20, 42]]]], ["get", "username", ["loc", [null, [20, 43], [20, 51]]]], ["get", "password", ["loc", [null, [20, 52], [20, 60]]]]], [], ["loc", [null, [20, 21], [20, 62]]]], ["content", "errorMessage", ["loc", [null, [24, 14], [24, 30]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("ember-template/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "modifiers",
          "modifiers": ["action"]
        },
        "revision": "Ember@2.3.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "ember-template/templates/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Logout");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(1);
        morphs[0] = dom.createElementMorph(element0);
        return morphs;
      },
      statements: [["element", "action", ["invalidate"], [], ["loc", [null, [1, 8], [1, 31]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("ember-template/templates/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "ember-template/templates/login.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "login-form", [], ["authenticate", ["subexpr", "action", ["authenticate"], [], ["loc", [null, [2, 15], [2, 38]]]], "errorMessage", ["subexpr", "@mut", [["get", "errorMessage", ["loc", [null, [3, 15], [3, 27]]]]], [], []]], ["loc", [null, [1, 0], [4, 2]]]]],
      locals: [],
      templates: []
    };
  })());
});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('ember-template/config/environment', ['ember'], function(Ember) {
  var prefix = 'ember-template';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (!runningTests) {
  require("ember-template/app")["default"].create({"name":"ember-template","version":"0.0.0+16e8b357"});
}

/* jshint ignore:end */
//# sourceMappingURL=ember-template.map