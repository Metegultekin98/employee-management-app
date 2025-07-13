function t(t,e){void 0===e&&(e={});for(var n=function(t){for(var e=[],n=0;n<t.length;){var r=t[n];if("*"!==r&&"+"!==r&&"?"!==r)if("\\"!==r)if("{"!==r)if("}"!==r)if(":"!==r)if("("!==r)e.push({type:"CHAR",index:n,value:t[n++]});else{var o=1,i="";if("?"===t[a=n+1])throw new TypeError('Pattern cannot start with "?" at '.concat(a));for(;a<t.length;)if("\\"!==t[a]){if(")"===t[a]){if(0===--o){a++;break}}else if("("===t[a]&&(o++,"?"!==t[a+1]))throw new TypeError("Capturing groups are not allowed at ".concat(a));i+=t[a++]}else i+=t[a++]+t[a++];if(o)throw new TypeError("Unbalanced pattern at ".concat(n));if(!i)throw new TypeError("Missing pattern at ".concat(n));e.push({type:"PATTERN",index:n,value:i}),n=a}else{for(var s="",a=n+1;a<t.length;){var c=t.charCodeAt(a);if(!(c>=48&&c<=57||c>=65&&c<=90||c>=97&&c<=122||95===c))break;s+=t[a++]}if(!s)throw new TypeError("Missing parameter name at ".concat(n));e.push({type:"NAME",index:n,value:s}),n=a}else e.push({type:"CLOSE",index:n,value:t[n++]});else e.push({type:"OPEN",index:n,value:t[n++]});else e.push({type:"ESCAPED_CHAR",index:n++,value:t[n++]});else e.push({type:"MODIFIER",index:n,value:t[n++]})}return e.push({type:"END",index:n,value:""}),e}(t),o=e.prefixes,i=void 0===o?"./":o,s=e.delimiter,a=void 0===s?"/#?":s,c=[],u=0,l=0,h="",f=function(t){if(l<n.length&&n[l].type===t)return n[l++].value},d=function(t){var e=f(t);if(void 0!==e)return e;var r=n[l],o=r.type,i=r.index;throw new TypeError("Unexpected ".concat(o," at ").concat(i,", expected ").concat(t))},p=function(){for(var t,e="";t=f("CHAR")||f("ESCAPED_CHAR");)e+=t;return e},y=function(t){var e=c[c.length-1],n=t||(e&&"string"==typeof e?e:"");if(e&&!n)throw new TypeError('Must have text between two parameters, missing text after "'.concat(e.name,'"'));return!n||function(t){for(var e=0,n=a;e<n.length;e++){var r=n[e];if(t.indexOf(r)>-1)return!0}return!1}(n)?"[^".concat(r(a),"]+?"):"(?:(?!".concat(r(n),")[^").concat(r(a),"])+?")};l<n.length;){var w=f("CHAR"),m=f("NAME"),b=f("PATTERN");if(m||b){var v=w||"";-1===i.indexOf(v)&&(h+=v,v=""),h&&(c.push(h),h=""),c.push({name:m||u++,prefix:v,suffix:"",pattern:b||y(v),modifier:f("MODIFIER")||""})}else{var g=w||f("ESCAPED_CHAR");if(g)h+=g;else if(h&&(c.push(h),h=""),f("OPEN")){v=p();var E=f("NAME")||"",S=f("PATTERN")||"",$=p();d("CLOSE"),c.push({name:E||(S?u++:""),pattern:E&&!S?y(v):S,prefix:v,suffix:$,modifier:f("MODIFIER")||""})}else d("END")}}return c}function e(e,r){return n(t(e,r),r)}function n(t,e){void 0===e&&(e={});var n=o(e),r=e.encode,i=void 0===r?function(t){return t}:r,s=e.validate,a=void 0===s||s,c=t.map(function(t){if("object"==typeof t)return new RegExp("^(?:".concat(t.pattern,")$"),n)});return function(e){for(var n="",r=0;r<t.length;r++){var o=t[r];if("string"!=typeof o){var s=e?e[o.name]:void 0,u="?"===o.modifier||"*"===o.modifier,l="*"===o.modifier||"+"===o.modifier;if(Array.isArray(s)){if(!l)throw new TypeError('Expected "'.concat(o.name,'" to not repeat, but got an array'));if(0===s.length){if(u)continue;throw new TypeError('Expected "'.concat(o.name,'" to not be empty'))}for(var h=0;h<s.length;h++){var f=i(s[h],o);if(a&&!c[r].test(f))throw new TypeError('Expected all "'.concat(o.name,'" to match "').concat(o.pattern,'", but got "').concat(f,'"'));n+=o.prefix+f+o.suffix}}else if("string"!=typeof s&&"number"!=typeof s){if(!u){var d=l?"an array":"a string";throw new TypeError('Expected "'.concat(o.name,'" to be ').concat(d))}}else{f=i(String(s),o);if(a&&!c[r].test(f))throw new TypeError('Expected "'.concat(o.name,'" to match "').concat(o.pattern,'", but got "').concat(f,'"'));n+=o.prefix+f+o.suffix}}else n+=o}return n}}function r(t){return t.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function o(t){return t&&t.sensitive?"":"i"}function i(e,n,i){return function(t,e,n){void 0===n&&(n={});for(var i=n.strict,s=void 0!==i&&i,a=n.start,c=void 0===a||a,u=n.end,l=void 0===u||u,h=n.encode,f=void 0===h?function(t){return t}:h,d=n.delimiter,p=void 0===d?"/#?":d,y=n.endsWith,w="[".concat(r(void 0===y?"":y),"]|$"),m="[".concat(r(p),"]"),b=c?"^":"",v=0,g=t;v<g.length;v++){var E=g[v];if("string"==typeof E)b+=r(f(E));else{var S=r(f(E.prefix)),$=r(f(E.suffix));if(E.pattern)if(e&&e.push(E),S||$)if("+"===E.modifier||"*"===E.modifier){var k="*"===E.modifier?"?":"";b+="(?:".concat(S,"((?:").concat(E.pattern,")(?:").concat($).concat(S,"(?:").concat(E.pattern,"))*)").concat($,")").concat(k)}else b+="(?:".concat(S,"(").concat(E.pattern,")").concat($,")").concat(E.modifier);else{if("+"===E.modifier||"*"===E.modifier)throw new TypeError('Can not repeat "'.concat(E.name,'" without a prefix and suffix'));b+="(".concat(E.pattern,")").concat(E.modifier)}else b+="(?:".concat(S).concat($,")").concat(E.modifier)}}if(l)s||(b+="".concat(m,"?")),b+=n.endsWith?"(?=".concat(w,")"):"$";else{var x=t[t.length-1],j="string"==typeof x?m.indexOf(x[x.length-1])>-1:void 0===x;s||(b+="(?:".concat(m,"(?=").concat(w,"))?")),j||(b+="(?=".concat(m,"|").concat(w,")"))}return new RegExp(b,o(n))}(t(e,i),n,i)}function s(t,e,n){return t instanceof RegExp?function(t,e){if(!e)return t;for(var n=/\((?:\?<(.*?)>)?(?!\?)/g,r=0,o=n.exec(t.source);o;)e.push({name:o[1]||r++,prefix:"",suffix:"",modifier:"",pattern:""}),o=n.exec(t.source);return t}(t,e):Array.isArray(t)?function(t,e,n){var r=t.map(function(t){return s(t,e,n).source});return new RegExp("(?:".concat(r.join("|"),")"),o(n))}(t,e,n):i(t,e,n)}function a(t){return"object"==typeof t&&!!t}function c(t){return"function"==typeof t}function u(t){return"string"==typeof t}function l(t=[]){return Array.isArray(t)?t:[t]}function h(t){return`[Vaadin.Router] ${t}`}class f extends Error{code;context;constructor(t){super(h(`Page not found (${t.pathname})`)),this.context=t,this.code=404}}const d=Symbol("NotFoundResult");function p(t){return new f(t)}function y(t){return(Array.isArray(t)?t[0]:t)??""}function w(t){return y(t?.path)}const m=new Map;function b(t){try{return decodeURIComponent(t)}catch{return t}}m.set("|false",{keys:[],pattern:/(?:)/u});var v=function(t,e,n=!1,r=[],o){const i=`${t}|${String(n)}`,a=y(e);let c=m.get(i);if(!c){const e=[];c={keys:e,pattern:s(t,e,{end:n,strict:""===t})},m.set(i,c)}const u=c.pattern.exec(a);if(!u)return null;const l={...o};for(let t=1;t<u.length;t++){const e=c.keys[t-1],n=e.name,r=u[t];void 0===r&&Object.hasOwn(l,n)||("+"===e.modifier||"*"===e.modifier?l[n]=r?r.split(/[/?#]/u).map(b):[]:l[n]=r?b(r):r)}return{keys:[...r,...c.keys],params:l,path:u[0]}};var g=function t(e,n,r,o,i){let s,a,c=0,u=w(e);return u.startsWith("/")&&(r&&(u=u.substring(1)),r=!0),{next(l){if(e===l)return{done:!0,value:void 0};e.i??=function(t){return Array.isArray(t)&&t.length>0?t:void 0}(e.children);const h=e.i??[],f=!e.i&&!e.children;if(!s&&(s=v(u,n,f,o,i),s))return{value:{keys:s.keys,params:s.params,path:s.path,route:e}};if(s&&h.length>0)for(;c<h.length;){if(!a){const o=h[c];o.parent=e;let i=s.path.length;i>0&&"/"===n.charAt(i)&&(i+=1),a=t(o,n.substring(i),r,s.keys,s.params)}const o=a.next(l);if(!o.done)return{done:!1,value:o.value};a=null,c+=1}return{done:!0,value:void 0}}}};function E(t){if(c(t.route.action))return t.route.action(t)}class S extends Error{code;context;constructor(t,e){let n=`Path '${t.pathname}' is not properly resolved due to an error.`;const r=w(t.route);r&&(n+=` Resolution had failed on route: '${r}'`),super(n,e),this.code=e?.code,this.context=t}warn(){console.warn(this.message)}}class ${baseUrl;#t;errorHandler;resolveRoute;#e;constructor(t,{baseUrl:e="",context:n,errorHandler:r,resolveRoute:o=E}={}){if(Object(t)!==t)throw new TypeError("Invalid routes");this.baseUrl=e,this.errorHandler=r,this.resolveRoute=o,Array.isArray(t)?this.#e={i:t,m:!0,action:()=>{},path:""}:this.#e={...t,parent:void 0},this.#t={...n,hash:"",next:async()=>d,params:{},pathname:"",resolver:this,route:this.#e,search:"",chain:[]}}get root(){return this.#e}get context(){return this.#t}get S(){return this.baseUrl?new URL(this.baseUrl,document.baseURI||document.URL).href.replace(/[^/]*$/u,""):""}getRoutes(){return[...this.#e.i??[]]}removeRoutes(){this.#e.i=[]}async resolve(t){const e=this,n={...this.#t,...u(t)?{pathname:t}:t,next:c},r=g(this.#e,this.A(n.pathname)??n.pathname,!!this.baseUrl),o=this.resolveRoute;let i=null,s=null,a=n;async function c(t=!1,u=i?.value?.route,l){const h=null===l?i?.value?.route:void 0;if(i=s??r.next(h),s=null,!t&&(i.done||!function(t,e){let n=t;for(;n;)if(n=n.parent,n===e)return!0;return!1}(i.value.route,u)))return s=i,d;if(i.done)throw p(n);a={...n,params:i.value.params,route:i.value.route,chain:a.chain?.slice()},function(t,e){const{path:n,route:r}=e;if(r&&!r.m){const e={path:n,route:r};if(r.parent&&t.chain)for(let e=t.chain.length-1;e>=0&&t.chain[e].route!==r.parent;e--)t.chain.pop();t.chain?.push(e)}}(a,i.value);const f=await o(a);return null!=f&&f!==d?(a.result=(y=f)&&"object"==typeof y&&"next"in y&&"params"in y&&"result"in y&&"route"in y?f.result:f,e.#t=a,a):await c(t,u,f);var y}try{return await c(!0,this.#e)}catch(t){const e=t instanceof f?t:new S(a,{code:500,cause:t});if(this.errorHandler)return a.result=this.errorHandler(e),a;throw t}}setRoutes(t){this.#e.i=[...l(t)]}A(t){if(!this.baseUrl)return t;const e=this.S,n=t.startsWith("/")?new URL(e).origin+t:`./${t}`,r=new URL(n,e).href;return r.startsWith(e)?r.slice(e.length):void 0}addRoutes(t){return this.#e.i=[...this.#e.i??[],...l(t)],this.getRoutes()}}function k(t,e,n,r){const o=e.name??r?.(e);if(o&&(t.has(o)?t.get(o)?.push(e):t.set(o,[e])),Array.isArray(n))for(const o of n)o.parent=e,k(t,o,o.i??o.children,r)}function x(t,e){const n=t.get(e);if(n){if(n.length>1)throw new Error(`Duplicate route with name "${e}". Try seting unique 'name' route properties.`);return n[0]}}var j=function(e,r={}){if(!(e instanceof $))throw new TypeError("An instance of Resolver is expected");const o=new Map,i=new Map;return(s,a)=>{let c=x(i,s);if(!c&&(i.clear(),k(i,e.root,e.root.i,r.cacheKeyProvider),c=x(i,s),!c))throw new Error(`Route "${s}" not found`);let l=c.fullPath?o.get(c.fullPath):void 0;if(!l){let e=w(c),n=c.parent;for(;n;){const t=w(n);t&&(e=`${t.replace(/\/$/u,"")}/${e.replace(/^\//u,"")}`),n=n.parent}const r=t(e),i=Object.create(null);for(const t of r)u(t)||(i[t.name]=!0);l={keys:i,tokens:r},o.set(e,l),c.fullPath=e}let h=n(l.tokens,{encode:encodeURIComponent,...r})(a)||"/";if(r.stringifyQueryParams&&a){const t={};for(const[e,n]of Object.entries(a))!(e in l.keys)&&n&&(t[e]=n);const e=r.stringifyQueryParams(t);e&&(h+=e.startsWith("?")?e:`?${e}`)}return h}};const C=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,O=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function A(t,e){if("function"!=typeof t)return;const n=C.exec(t.toString());if(n)try{t=new Function(n[1])}catch(t){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",t)}return t(e)}window.Vaadin=window.Vaadin||{};const R=function(t,e){if(window.Vaadin.developmentMode)return A(t,e)};function T(){
/*! vaadin-dev-mode:start
  (function () {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var getPolymerVersion = function getPolymerVersion() {
  return window.Polymer && window.Polymer.version;
};

var StatisticsGatherer = function () {
  function StatisticsGatherer(logger) {
    classCallCheck(this, StatisticsGatherer);

    this.now = new Date().getTime();
    this.logger = logger;
  }

  createClass(StatisticsGatherer, [{
    key: 'frameworkVersionDetectors',
    value: function frameworkVersionDetectors() {
      return {
        'Flow': function Flow() {
          if (window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients) {
            var flowVersions = Object.keys(window.Vaadin.Flow.clients).map(function (key) {
              return window.Vaadin.Flow.clients[key];
            }).filter(function (client) {
              return client.getVersionInfo;
            }).map(function (client) {
              return client.getVersionInfo().flow;
            });
            if (flowVersions.length > 0) {
              return flowVersions[0];
            }
          }
        },
        'Vaadin Framework': function VaadinFramework() {
          if (window.vaadin && window.vaadin.clients) {
            var frameworkVersions = Object.values(window.vaadin.clients).filter(function (client) {
              return client.getVersionInfo;
            }).map(function (client) {
              return client.getVersionInfo().vaadinVersion;
            });
            if (frameworkVersions.length > 0) {
              return frameworkVersions[0];
            }
          }
        },
        'AngularJs': function AngularJs() {
          if (window.angular && window.angular.version && window.angular.version) {
            return window.angular.version.full;
          }
        },
        'Angular': function Angular() {
          if (window.ng) {
            var tags = document.querySelectorAll("[ng-version]");
            if (tags.length > 0) {
              return tags[0].getAttribute("ng-version");
            }
            return "Unknown";
          }
        },
        'Backbone.js': function BackboneJs() {
          if (window.Backbone) {
            return window.Backbone.VERSION;
          }
        },
        'React': function React() {
          var reactSelector = '[data-reactroot], [data-reactid]';
          if (!!document.querySelector(reactSelector)) {
            // React does not publish the version by default
            return "unknown";
          }
        },
        'Ember': function Ember() {
          if (window.Em && window.Em.VERSION) {
            return window.Em.VERSION;
          } else if (window.Ember && window.Ember.VERSION) {
            return window.Ember.VERSION;
          }
        },
        'jQuery': function (_jQuery) {
          function jQuery() {
            return _jQuery.apply(this, arguments);
          }

          jQuery.toString = function () {
            return _jQuery.toString();
          };

          return jQuery;
        }(function () {
          if (typeof jQuery === 'function' && jQuery.prototype.jquery !== undefined) {
            return jQuery.prototype.jquery;
          }
        }),
        'Polymer': function Polymer() {
          var version = getPolymerVersion();
          if (version) {
            return version;
          }
        },
        'LitElement': function LitElement() {
          var version = window.litElementVersions && window.litElementVersions[0];
          if (version) {
            return version;
          }
        },
        'LitHtml': function LitHtml() {
          var version = window.litHtmlVersions && window.litHtmlVersions[0];
          if (version) {
            return version;
          }
        },
        'Vue.js': function VueJs() {
          if (window.Vue) {
            return window.Vue.version;
          }
        }
      };
    }
  }, {
    key: 'getUsedVaadinElements',
    value: function getUsedVaadinElements(elements) {
      var version = getPolymerVersion();
      var elementClasses = void 0;
      // NOTE: In case you edit the code here, YOU MUST UPDATE any statistics reporting code in Flow.
      // Check all locations calling the method getEntries() in
      // https://github.com/vaadin/flow/blob/master/flow-server/src/main/java/com/vaadin/flow/internal/UsageStatistics.java#L106
      // Currently it is only used by BootstrapHandler.
      if (version && version.indexOf('2') === 0) {
        // Polymer 2: components classes are stored in window.Vaadin
        elementClasses = Object.keys(window.Vaadin).map(function (c) {
          return window.Vaadin[c];
        }).filter(function (c) {
          return c.is;
        });
      } else {
        // Polymer 3: components classes are stored in window.Vaadin.registrations
        elementClasses = window.Vaadin.registrations || [];
      }
      elementClasses.forEach(function (klass) {
        var version = klass.version ? klass.version : "0.0.0";
        elements[klass.is] = { version: version };
      });
    }
  }, {
    key: 'getUsedVaadinThemes',
    value: function getUsedVaadinThemes(themes) {
      ['Lumo', 'Material'].forEach(function (themeName) {
        var theme;
        var version = getPolymerVersion();
        if (version && version.indexOf('2') === 0) {
          // Polymer 2: themes are stored in window.Vaadin
          theme = window.Vaadin[themeName];
        } else {
          // Polymer 3: themes are stored in custom element registry
          theme = customElements.get('vaadin-' + themeName.toLowerCase() + '-styles');
        }
        if (theme && theme.version) {
          themes[themeName] = { version: theme.version };
        }
      });
    }
  }, {
    key: 'getFrameworks',
    value: function getFrameworks(frameworks) {
      var detectors = this.frameworkVersionDetectors();
      Object.keys(detectors).forEach(function (framework) {
        var detector = detectors[framework];
        try {
          var version = detector();
          if (version) {
            frameworks[framework] = { version: version };
          }
        } catch (e) {}
      });
    }
  }, {
    key: 'gather',
    value: function gather(storage) {
      var storedStats = storage.read();
      var gatheredStats = {};
      var types = ["elements", "frameworks", "themes"];

      types.forEach(function (type) {
        gatheredStats[type] = {};
        if (!storedStats[type]) {
          storedStats[type] = {};
        }
      });

      var previousStats = JSON.stringify(storedStats);

      this.getUsedVaadinElements(gatheredStats.elements);
      this.getFrameworks(gatheredStats.frameworks);
      this.getUsedVaadinThemes(gatheredStats.themes);

      var now = this.now;
      types.forEach(function (type) {
        var keys = Object.keys(gatheredStats[type]);
        keys.forEach(function (key) {
          if (!storedStats[type][key] || _typeof(storedStats[type][key]) != _typeof({})) {
            storedStats[type][key] = { firstUsed: now };
          }
          // Discards any previously logged version number
          storedStats[type][key].version = gatheredStats[type][key].version;
          storedStats[type][key].lastUsed = now;
        });
      });

      var newStats = JSON.stringify(storedStats);
      storage.write(newStats);
      if (newStats != previousStats && Object.keys(storedStats).length > 0) {
        this.logger.debug("New stats: " + newStats);
      }
    }
  }]);
  return StatisticsGatherer;
}();

var StatisticsStorage = function () {
  function StatisticsStorage(key) {
    classCallCheck(this, StatisticsStorage);

    this.key = key;
  }

  createClass(StatisticsStorage, [{
    key: 'read',
    value: function read() {
      var localStorageStatsString = localStorage.getItem(this.key);
      try {
        return JSON.parse(localStorageStatsString ? localStorageStatsString : '{}');
      } catch (e) {
        return {};
      }
    }
  }, {
    key: 'write',
    value: function write(data) {
      localStorage.setItem(this.key, data);
    }
  }, {
    key: 'clear',
    value: function clear() {
      localStorage.removeItem(this.key);
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      var storedStats = this.read();
      var empty = true;
      Object.keys(storedStats).forEach(function (key) {
        if (Object.keys(storedStats[key]).length > 0) {
          empty = false;
        }
      });

      return empty;
    }
  }]);
  return StatisticsStorage;
}();

var StatisticsSender = function () {
  function StatisticsSender(url, logger) {
    classCallCheck(this, StatisticsSender);

    this.url = url;
    this.logger = logger;
  }

  createClass(StatisticsSender, [{
    key: 'send',
    value: function send(data, errorHandler) {
      var logger = this.logger;

      if (navigator.onLine === false) {
        logger.debug("Offline, can't send");
        errorHandler();
        return;
      }
      logger.debug("Sending data to " + this.url);

      var req = new XMLHttpRequest();
      req.withCredentials = true;
      req.addEventListener("load", function () {
        // Stats sent, nothing more to do
        logger.debug("Response: " + req.responseText);
      });
      req.addEventListener("error", function () {
        logger.debug("Send failed");
        errorHandler();
      });
      req.addEventListener("abort", function () {
        logger.debug("Send aborted");
        errorHandler();
      });
      req.open("POST", this.url);
      req.setRequestHeader("Content-Type", "application/json");
      req.send(data);
    }
  }]);
  return StatisticsSender;
}();

var StatisticsLogger = function () {
  function StatisticsLogger(id) {
    classCallCheck(this, StatisticsLogger);

    this.id = id;
  }

  createClass(StatisticsLogger, [{
    key: '_isDebug',
    value: function _isDebug() {
      return localStorage.getItem("vaadin." + this.id + ".debug");
    }
  }, {
    key: 'debug',
    value: function debug(msg) {
      if (this._isDebug()) {
        console.info(this.id + ": " + msg);
      }
    }
  }]);
  return StatisticsLogger;
}();

var UsageStatistics = function () {
  function UsageStatistics() {
    classCallCheck(this, UsageStatistics);

    this.now = new Date();
    this.timeNow = this.now.getTime();
    this.gatherDelay = 10; // Delay between loading this file and gathering stats
    this.initialDelay = 24 * 60 * 60;

    this.logger = new StatisticsLogger("statistics");
    this.storage = new StatisticsStorage("vaadin.statistics.basket");
    this.gatherer = new StatisticsGatherer(this.logger);
    this.sender = new StatisticsSender("https://tools.vaadin.com/usage-stats/submit", this.logger);
  }

  createClass(UsageStatistics, [{
    key: 'maybeGatherAndSend',
    value: function maybeGatherAndSend() {
      var _this = this;

      if (localStorage.getItem(UsageStatistics.optOutKey)) {
        return;
      }
      this.gatherer.gather(this.storage);
      setTimeout(function () {
        _this.maybeSend();
      }, this.gatherDelay * 1000);
    }
  }, {
    key: 'lottery',
    value: function lottery() {
      return true;
    }
  }, {
    key: 'currentMonth',
    value: function currentMonth() {
      return this.now.getYear() * 12 + this.now.getMonth();
    }
  }, {
    key: 'maybeSend',
    value: function maybeSend() {
      var firstUse = Number(localStorage.getItem(UsageStatistics.firstUseKey));
      var monthProcessed = Number(localStorage.getItem(UsageStatistics.monthProcessedKey));

      if (!firstUse) {
        // Use a grace period to avoid interfering with tests, incognito mode etc
        firstUse = this.timeNow;
        localStorage.setItem(UsageStatistics.firstUseKey, firstUse);
      }

      if (this.timeNow < firstUse + this.initialDelay * 1000) {
        this.logger.debug("No statistics will be sent until the initial delay of " + this.initialDelay + "s has passed");
        return;
      }
      if (this.currentMonth() <= monthProcessed) {
        this.logger.debug("This month has already been processed");
        return;
      }
      localStorage.setItem(UsageStatistics.monthProcessedKey, this.currentMonth());
      // Use random sampling
      if (this.lottery()) {
        this.logger.debug("Congratulations, we have a winner!");
      } else {
        this.logger.debug("Sorry, no stats from you this time");
        return;
      }

      this.send();
    }
  }, {
    key: 'send',
    value: function send() {
      // Ensure we have the latest data
      this.gatherer.gather(this.storage);

      // Read, send and clean up
      var data = this.storage.read();
      data["firstUse"] = Number(localStorage.getItem(UsageStatistics.firstUseKey));
      data["usageStatisticsVersion"] = UsageStatistics.version;
      var info = 'This request contains usage statistics gathered from the application running in development mode. \n\nStatistics gathering is automatically disabled and excluded from production builds.\n\nFor details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.\n\n\n\n';
      var self = this;
      this.sender.send(info + JSON.stringify(data), function () {
        // Revert the 'month processed' flag
        localStorage.setItem(UsageStatistics.monthProcessedKey, self.currentMonth() - 1);
      });
    }
  }], [{
    key: 'version',
    get: function get$1() {
      return '2.1.2';
    }
  }, {
    key: 'firstUseKey',
    get: function get$1() {
      return 'vaadin.statistics.firstuse';
    }
  }, {
    key: 'monthProcessedKey',
    get: function get$1() {
      return 'vaadin.statistics.monthProcessed';
    }
  }, {
    key: 'optOutKey',
    get: function get$1() {
      return 'vaadin.statistics.optout';
    }
  }]);
  return UsageStatistics;
}();

try {
  window.Vaadin = window.Vaadin || {};
  window.Vaadin.usageStatsChecker = window.Vaadin.usageStatsChecker || new UsageStatistics();
  window.Vaadin.usageStatsChecker.maybeGatherAndSend();
} catch (e) {
  // Intentionally ignored as this is not a problem in the app being developed
}

}());

  vaadin-dev-mode:end **/}void 0===window.Vaadin.developmentMode&&(window.Vaadin.developmentMode=function(){try{return!!localStorage.getItem("vaadin.developmentmode.force")||["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0&&(O?!(O&&Object.keys(O).map(t=>O[t]).filter(t=>t.productionMode).length>0):!A(function(){return!0}))}catch(t){return!1}}());!function(t,e=(window.Vaadin??={})){e.registrations??=[],e.registrations.push({is:"@vaadin/router",version:"2.0.0"})}(),R(T);var _=async function(t,e){return t.classList.add(e),await new Promise(n=>{if((t=>{const e=getComputedStyle(t).getPropertyValue("animation-name");return e&&"none"!==e})(t)){const r=t.getBoundingClientRect(),o=`height: ${r.bottom-r.top}px; width: ${r.right-r.left}px`;t.setAttribute("style",`position: absolute; ${o}`),((t,e)=>{const n=()=>{t.removeEventListener("animationend",n),e()};t.addEventListener("animationend",n)})(t,()=>{t.classList.remove(e),t.removeAttribute("style"),n()})}else t.classList.remove(e),n()})};function P(t){if(!t||!u(t.path))throw new Error(h('Expected route config to be an object with a "path" string property, or an array of such objects'));if(!(c(t.action)||Array.isArray(t.children)||c(t.children)||u(t.component)||u(t.redirect)))throw new Error(h(`Expected route config "${t.path}" to include either "component, redirect" or "action" function but none found.`));t.redirect&&["bundle","component"].forEach(e=>{e in t&&console.warn(h(`Route config "${String(t.path)}" has both "redirect" and "${e}" properties, and "redirect" will always override the latter. Did you mean to only use "${e}"?`))})}function M(t){l(t).forEach(t=>P(t))}function I(t,e){const n=e.S;return n?new URL(t.replace(/^\//u,""),n).pathname:t}function N(t){return t.map(t=>t.path).reduce((t,e)=>e.length?`${t.replace(/\/$/u,"")}/${e.replace(/^\//u,"")}`:t,"")}function D({chain:t=[],hash:n="",params:r={},pathname:o="",redirectFrom:i,resolver:s,search:a=""},c){const u=t.map(t=>t.route);return{baseUrl:s?.baseUrl??"",getUrl:(n={})=>s?I(e(function(t){return N(t.map(t=>t.route))}(t))({...r,...n}),s):"",hash:n,params:r,pathname:o,redirectFrom:i,route:c??(Array.isArray(u)?u.at(-1):void 0)??null,routes:u,search:a,searchParams:new URLSearchParams(a)}}function z(t,e){const n={...t.params};return{redirect:{from:t.pathname,params:n,pathname:e}}}function U(t,e,...n){if("function"==typeof t)return t.apply(e,n)}function F(t,e,...n){return r=>r&&a(r)&&("cancel"in r||"redirect"in r)?r:U(e?.[t],e,...n)}function L(t,e){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${t}`,{cancelable:"go"===t,detail:e}))}function W(t){if(t instanceof Element)return t.nodeName.toLowerCase()}function B(t){if(t.defaultPrevented)return;if(0!==t.button)return;if(t.shiftKey||t.ctrlKey||t.altKey||t.metaKey)return;let e=t.target;const n=t instanceof MouseEvent?t.composedPath():t.path??[];for(let t=0;t<n.length;t++){const r=n[t];if("nodeName"in r&&"a"===r.nodeName.toLowerCase()){e=r;break}}for(;e&&e instanceof Node&&"a"!==W(e);)e=e.parentNode;if(!e||"a"!==W(e))return;const r=e;if(r.target&&"_self"!==r.target.toLowerCase())return;if(r.hasAttribute("download"))return;if(r.hasAttribute("router-ignore"))return;if(r.pathname===window.location.pathname&&""!==r.hash)return;const o=r.origin||function(t){const{port:e,protocol:n}=t;return`${n}//${"http:"===n&&"80"===e||"https:"===n&&"443"===e?t.hostname:t.host}`}(r);if(o!==window.location.origin)return;const{hash:i,pathname:s,search:a}=r;L("go",{hash:i,pathname:s,search:a})&&t instanceof MouseEvent&&(t.preventDefault(),"click"===t.type&&window.scrollTo(0,0))}function H(t){if("vaadin-router-ignore"===t.state)return;const{hash:e,pathname:n,search:r}=window.location;L("go",{hash:e,pathname:n,search:r})}let q=[];const Y={CLICK:{activate(){window.document.addEventListener("click",B)},inactivate(){window.document.removeEventListener("click",B)}},POPSTATE:{activate(){window.addEventListener("popstate",H)},inactivate(){window.removeEventListener("popstate",H)}}};function J(t=[]){q.forEach(t=>t.inactivate()),t.forEach(t=>t.activate()),q=t}function K(){return{cancel:!0}}const V={R:-1,params:{},route:{m:!0,children:[],path:"",action(){}},pathname:"",next:async()=>d};const G={};function Z(t){localStorage.setItem("lang",t),document.documentElement.lang=t,window.dispatchEvent(new CustomEvent("lang-changed",{detail:t}))}function Q(){return localStorage.getItem("lang")||document.documentElement.lang||"en"}async function X(t,e){const n=`${t}:${e}`;if(G[n])return G[n];const r=`/public/localization/${t}/${e}.json`,o=await fetch(r);if(!o.ok)throw new Error(`Failed to load ${r}`);const i=await o.json();return G[n]=i,i}async function tt(t,e=Q()){const[n,...r]=t.split("."),o=r.join(".");return function(t,e){return e?e.split(".").reduce((t,e)=>{if(void 0!==t)return t[e]},t):t}(await X(e,n),o)??`[${t}]`}const et=[{path:"/",component:"main-layout",action:async()=>{await Promise.all([Promise.resolve().then(function(){return de}),X("en","common")])},children:[{path:"employees",component:"employees-page",action:async()=>{await Promise.resolve().then(function(){return pr})}}]}],nt=document.querySelector("#outlet");if(!nt)throw new Error("Missing #outlet element in index.html");const rt=new class extends ${location=D({resolver:this});ready=Promise.resolve(this.location);#n=new WeakSet;#r=new WeakSet;#o=this.#i.bind(this);#s=0;#a;P;#c;#u=null;#l=null;constructor(t,e){const n=document.head.querySelector("base"),r=n?.getAttribute("href");super([],{baseUrl:r?new URL(r,document.URL).href.replace(/[^/]*$/u,""):void 0,...e,resolveRoute:async t=>await this.#h(t)}),J(Object.values(Y)),this.setOutlet(t),this.subscribe()}async#h(t){const{route:e}=t;if(c(e.children)){let n=await e.children(function({next:t,...e}){return e}(t));c(e.children)||({children:n}=e),function(t,e){if(!Array.isArray(t)&&!a(t))throw new Error(h(`Incorrect "children" value for the route ${String(e.path)}: expected array or object, but got ${String(t)}`));const n=l(t);n.forEach(t=>P(t)),e.i=n}(n,e)}const n={component:t=>{const e=document.createElement(t);return this.#r.add(e),e},prevent:K,redirect:e=>z(t,e)};return await Promise.resolve().then(async()=>{if(this.#f(t))return await U(e.action,e,t,n)}).then(t=>null==t||"object"!=typeof t&&"symbol"!=typeof t||!(t instanceof HTMLElement||t===d||a(t)&&"redirect"in t)?u(e.redirect)?n.redirect(e.redirect):void 0:t).then(t=>null!=t?t:u(e.component)?n.component(e.component):void 0)}setOutlet(t){t&&this.#d(t),this.#a=t}getOutlet(){return this.#a}async setRoutes(t,e=!1){return this.P=void 0,this.#c=void 0,M(t),super.setRoutes(t),e||this.#i(),await this.ready}addRoutes(t){return M(t),super.addRoutes(t)}async render(t,e=!1){this.#s+=1;const n=this.#s,r={...V,...u(t)?{hash:"",search:"",pathname:t}:t,R:n};return this.ready=this.#p(r,e),await this.ready}async#p(t,e){const{R:n}=t;try{const r=await this.resolve(t),o=await this.#y(r);if(!this.#f(o))return this.location;const i=this.P;if(o===i)return this.#w(i,!0),this.location;if(this.location=D(o),e&&this.#w(o,1===n),L("location-changed",{router:this,location:this.location}),o.M)return this.#m(o,i),this.P=o,this.location;this.#b(o,i);const s=this.#v(o);if(this.#g(o),this.#E(o,i),await s,this.#f(o))return this.#S(),this.P=o,this.location}catch(r){if(n===this.#s){e&&this.#w(this.context);for(const t of this.#a?.children??[])t.remove();throw this.location=D(Object.assign(t,{resolver:this})),L("error",{router:this,error:r,...t}),r}}return this.location}async#y(t,e=t){const n=await this.#$(e),r=n!==e?n:t,o=I(N(n.chain??[]),this)===n.pathname,i=async(t,e=t.route,n)=>{const r=await t.next(!1,e,n);return null===r||r===d?o?t:null!=e.parent?await i(t,e.parent,r):r:r},s=await i(n);if(null==s||s===d)throw p(r);return s!==n?await this.#y(r,s):await this.#k(n)}async#$(t){const{result:e}=t;if(e instanceof HTMLElement)return function(t,e){if(e.location=D(t),t.chain){const n=t.chain.map(t=>t.route).indexOf(t.route);t.chain[n].element=e}}(t,e),t;if(e&&"redirect"in e){const n=await this.#x(e.redirect,t.I,t.R);return await this.#$(n)}throw e instanceof Error?e:new Error(h(`Invalid route resolution result for path "${t.pathname}". Expected redirect object or HTML element, but got: "${function(t){if("object"!=typeof t)return String(t);const[e="Unknown"]=/ (.*)\]$/u.exec(String(t))??[];return"Object"===e||"Array"===e?`${e} ${JSON.stringify(t)}`:e}(e)}". Double check the action return value for the route.`))}async#k(t){return await this.#j(t).then(async e=>e===this.P||e===t?e:await this.#y(e))}async#j(t){const e=this.P??{},n=e.chain??[],r=t.chain??[];let o=Promise.resolve(void 0);const i=e=>z(t,e);if(t.N=0,t.M=!1,n.length){for(let e=0;e<Math.min(n.length,r.length)&&(n[e].route===r[e].route&&(n[e].path===r[e].path||n[e].element===r[e].element)&&this.#C(n[e].element,r[e].element));t.N++,e++);if(t.M=r.length===n.length&&t.N===r.length&&this.#C(t.result,e.result),t.M){for(let e=r.length-1;e>=0;e--)o=this.#O(o,t,{prevent:K},n[e]);for(let e=0;e<r.length;e++)o=this.#A(o,t,{prevent:K,redirect:i},r[e]),n[e].element.location=D(t,n[e].route)}else for(let e=n.length-1;e>=t.N;e--)o=this.#O(o,t,{prevent:K},n[e])}if(!t.M)for(let e=0;e<r.length;e++)e<t.N?e<n.length&&n[e].element&&(n[e].element.location=D(t,n[e].route)):(o=this.#A(o,t,{prevent:K,redirect:i},r[e]),r[e].element&&(r[e].element.location=D(t,r[e].route)));return await o.then(async e=>{if(e&&a(e)){if("cancel"in e&&this.P)return this.P.R=t.R,this.P;if("redirect"in e)return await this.#x(e.redirect,t.I,t.R)}return t})}async#O(t,e,n,r){const o=D(e);let i=await t;if(this.#f(e)){i=F("onBeforeLeave",r.element,o,n,this)(i)}if(!a(i)||!("redirect"in i))return i}async#A(t,e,n,r){const o=D(e,r.route),i=await t;if(this.#f(e)){return F("onBeforeEnter",r.element,o,n,this)(i)}}#C(t,e){return t instanceof Element&&e instanceof Element&&(this.#r.has(t)&&this.#r.has(e)?t.localName===e.localName:t===e)}#f(t){return t.R===this.#s}async#x(t,e=0,n=0){if(e>256)throw new Error(h(`Too many redirects when rendering ${t.from}`));return await this.resolve({...V,pathname:this.urlForPath(t.pathname,t.params),redirectFrom:t.from,I:e+1,R:n})}#d(t=this.#a){if(!(t instanceof Element||t instanceof DocumentFragment))throw new TypeError(h(`Expected router outlet to be a valid DOM Element | DocumentFragment (but got ${t})`))}#w({pathname:t,search:e="",hash:n=""},r){if(window.location.pathname!==t||window.location.search!==e||window.location.hash!==n){const o=r?"replaceState":"pushState";window.history[o](null,document.title,t+e+n),window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}}#m(t,e){let n=this.#a;for(let r=0;r<(t.N??0);r++){const o=e?.chain?.[r].element;if(o){if(o.parentNode!==n)break;t.chain[r].element=o,n=o}}return n}#b(t,e){this.#d(),this.#R();const n=this.#m(t,e);this.#u=[],this.#l=Array.from(n?.children??[]).filter(e=>this.#n.has(e)&&e!==t.result);let r=n;for(let e=t.N??0;e<(t.chain?.length??0);e++){const o=t.chain[e].element;o&&(r?.appendChild(o),this.#n.add(o),r===n&&this.#u.push(o),r=o)}}#S(){if(this.#l)for(const t of this.#l)t.remove();this.#l=null,this.#u=null}#R(){if(this.#l&&this.#u){for(const t of this.#u)t.remove();this.#l=null,this.#u=null}}#E(t,e){if(e?.chain&&null!=t.N)for(let n=e.chain.length-1;n>=t.N&&this.#f(t);n--){const r=e.chain[n].element;if(r)try{const e=D(t);U(r.onAfterLeave,r,e,{},this)}finally{if(this.#l?.includes(r))for(const t of r.children)t.remove()}}}#g(t){if(t.chain&&null!=t.N)for(let e=t.N;e<t.chain.length&&this.#f(t);e++){const n=t.chain[e].element;if(n){const r=D(t,t.chain[e].route);U(n.onAfterEnter,n,r,{},this)}}}async#v(t){const e=this.#l?.[0],n=this.#u?.[0],r=[],{chain:o=[]}=t;let i;for(let t=o.length-1;t>=0;t--)if(o[t].route.animate){i=o[t].route.animate;break}if(e&&n&&i){const t=a(i)&&i.leave?i.leave:"leaving",o=a(i)&&i.enter?i.enter:"entering";r.push(_(e,t)),r.push(_(n,o))}return await Promise.all(r),t}subscribe(){window.addEventListener("vaadin-router-go",this.#o)}unsubscribe(){window.removeEventListener("vaadin-router-go",this.#o)}#i(t){const{pathname:e,search:n,hash:r}=t instanceof CustomEvent?t.detail:window.location;u(this.A(e))&&(t?.preventDefault&&t.preventDefault(),this.render({pathname:e,search:n,hash:r},!0))}static setTriggers(...t){J(t)}urlForName(t,e){return this.#c||(this.#c=j(this,{cacheKeyProvider:t=>"component"in t&&"string"==typeof t.component?t.component:void 0})),I(this.#c(t,e??void 0),this)}urlForPath(t,n){return I(e(t)(n??void 0),this)}static go(t){const{pathname:e,search:n,hash:r}=u(t)?new URL(t,"http://a"):t;return L("go",{pathname:e,search:n,hash:r})}}(nt);rt.setRoutes(et),console.log("NODE_ENV:","development");
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot=globalThis,it=ot.ShadowRoot&&(void 0===ot.ShadyCSS||ot.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,st=Symbol(),at=new WeakMap;let ct=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==st)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(it&&void 0===t){const n=void 0!==e&&1===e.length;n&&(t=at.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&at.set(e,t))}return t}toString(){return this.cssText}};const ut=(t,...e)=>{const n=1===t.length?t[0]:e.reduce((e,n,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[r+1],t[0]);return new ct(n,t,st)},lt=it?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return(t=>new ct("string"==typeof t?t:t+"",void 0,st))(e)})(t):t,{is:ht,defineProperty:ft,getOwnPropertyDescriptor:dt,getOwnPropertyNames:pt,getOwnPropertySymbols:yt,getPrototypeOf:wt}=Object,mt=globalThis,bt=mt.trustedTypes,vt=bt?bt.emptyScript:"",gt=mt.reactiveElementPolyfillSupport,Et=(t,e)=>t,St={toAttribute(t,e){switch(e){case Boolean:t=t?vt:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let n=t;switch(e){case Boolean:n=null!==t;break;case Number:n=null===t?null:Number(t);break;case Object:case Array:try{n=JSON.parse(t)}catch(t){n=null}}return n}},$t=(t,e)=>!ht(t,e),kt={attribute:!0,type:String,converter:St,reflect:!1,useDefault:!1,hasChanged:$t};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),mt.litPropertyMetadata??=new WeakMap;let xt=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=kt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const n=Symbol(),r=this.getPropertyDescriptor(t,n,e);void 0!==r&&ft(this.prototype,t,r)}}static getPropertyDescriptor(t,e,n){const{get:r,set:o}=dt(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const i=r?.call(this);o?.call(this,e),this.requestUpdate(t,i,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??kt}static _$Ei(){if(this.hasOwnProperty(Et("elementProperties")))return;const t=wt(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Et("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Et("properties"))){const t=this.properties,e=[...pt(t),...yt(t)];for(const n of e)this.createProperty(n,t[n])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,n]of e)this.elementProperties.set(t,n)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const n=this._$Eu(t,e);void 0!==n&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const n=new Set(t.flat(1/0).reverse());for(const t of n)e.unshift(lt(t))}else void 0!==t&&e.push(lt(t));return e}static _$Eu(t,e){const n=e.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const n of e.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(it)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const n of e){const e=document.createElement("style"),r=ot.litNonce;void 0!==r&&e.setAttribute("nonce",r),e.textContent=n.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,n){this._$AK(t,n)}_$ET(t,e){const n=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,n);if(void 0!==r&&!0===n.reflect){const o=(void 0!==n.converter?.toAttribute?n.converter:St).toAttribute(e,n.type);this._$Em=t,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(t,e){const n=this.constructor,r=n._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=n.getPropertyOptions(r),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:St;this._$Em=r,this[r]=o.fromAttribute(e,t.type)??this._$Ej?.get(r)??null,this._$Em=null}}requestUpdate(t,e,n){if(void 0!==t){const r=this.constructor,o=this[t];if(n??=r.getPropertyOptions(t),!((n.hasChanged??$t)(o,e)||n.useDefault&&n.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,n))))return;this.C(t,e,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:n,reflect:r,wrapped:o},i){n&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,i??e??this[t]),!0!==o||void 0!==i)||(this._$AL.has(t)||(this.hasUpdated||n||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,n]of t){const{wrapped:t}=n,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,n,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};xt.elementStyles=[],xt.shadowRootOptions={mode:"open"},xt[Et("elementProperties")]=new Map,xt[Et("finalized")]=new Map,gt?.({ReactiveElement:xt}),(mt.reactiveElementVersions??=[]).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const jt=globalThis,Ct=jt.trustedTypes,Ot=Ct?Ct.createPolicy("lit-html",{createHTML:t=>t}):void 0,At="$lit$",Rt=`lit$${Math.random().toFixed(9).slice(2)}$`,Tt="?"+Rt,_t=`<${Tt}>`,Pt=document,Mt=()=>Pt.createComment(""),It=t=>null===t||"object"!=typeof t&&"function"!=typeof t,Nt=Array.isArray,Dt="[ \t\n\f\r]",zt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ut=/-->/g,Ft=/>/g,Lt=RegExp(`>|${Dt}(?:([^\\s"'>=/]+)(${Dt}*=${Dt}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Wt=/'/g,Bt=/"/g,Ht=/^(?:script|style|textarea|title)$/i,qt=(t=>(e,...n)=>({_$litType$:t,strings:e,values:n}))(1),Yt=Symbol.for("lit-noChange"),Jt=Symbol.for("lit-nothing"),Kt=new WeakMap,Vt=Pt.createTreeWalker(Pt,129);function Gt(t,e){if(!Nt(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==Ot?Ot.createHTML(e):e}const Zt=(t,e)=>{const n=t.length-1,r=[];let o,i=2===e?"<svg>":3===e?"<math>":"",s=zt;for(let e=0;e<n;e++){const n=t[e];let a,c,u=-1,l=0;for(;l<n.length&&(s.lastIndex=l,c=s.exec(n),null!==c);)l=s.lastIndex,s===zt?"!--"===c[1]?s=Ut:void 0!==c[1]?s=Ft:void 0!==c[2]?(Ht.test(c[2])&&(o=RegExp("</"+c[2],"g")),s=Lt):void 0!==c[3]&&(s=Lt):s===Lt?">"===c[0]?(s=o??zt,u=-1):void 0===c[1]?u=-2:(u=s.lastIndex-c[2].length,a=c[1],s=void 0===c[3]?Lt:'"'===c[3]?Bt:Wt):s===Bt||s===Wt?s=Lt:s===Ut||s===Ft?s=zt:(s=Lt,o=void 0);const h=s===Lt&&t[e+1].startsWith("/>")?" ":"";i+=s===zt?n+_t:u>=0?(r.push(a),n.slice(0,u)+At+n.slice(u)+Rt+h):n+Rt+(-2===u?e:h)}return[Gt(t,i+(t[n]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class Qt{constructor({strings:t,_$litType$:e},n){let r;this.parts=[];let o=0,i=0;const s=t.length-1,a=this.parts,[c,u]=Zt(t,e);if(this.el=Qt.createElement(c,n),Vt.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=Vt.nextNode())&&a.length<s;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(At)){const e=u[i++],n=r.getAttribute(t).split(Rt),s=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:s[2],strings:n,ctor:"."===s[1]?re:"?"===s[1]?oe:"@"===s[1]?ie:ne}),r.removeAttribute(t)}else t.startsWith(Rt)&&(a.push({type:6,index:o}),r.removeAttribute(t));if(Ht.test(r.tagName)){const t=r.textContent.split(Rt),e=t.length-1;if(e>0){r.textContent=Ct?Ct.emptyScript:"";for(let n=0;n<e;n++)r.append(t[n],Mt()),Vt.nextNode(),a.push({type:2,index:++o});r.append(t[e],Mt())}}}else if(8===r.nodeType)if(r.data===Tt)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=r.data.indexOf(Rt,t+1));)a.push({type:7,index:o}),t+=Rt.length-1}o++}}static createElement(t,e){const n=Pt.createElement("template");return n.innerHTML=t,n}}function Xt(t,e,n=t,r){if(e===Yt)return e;let o=void 0!==r?n._$Co?.[r]:n._$Cl;const i=It(e)?void 0:e._$litDirective$;return o?.constructor!==i&&(o?._$AO?.(!1),void 0===i?o=void 0:(o=new i(t),o._$AT(t,n,r)),void 0!==r?(n._$Co??=[])[r]=o:n._$Cl=o),void 0!==o&&(e=Xt(t,o._$AS(t,e.values),o,r)),e}class te{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:n}=this._$AD,r=(t?.creationScope??Pt).importNode(e,!0);Vt.currentNode=r;let o=Vt.nextNode(),i=0,s=0,a=n[0];for(;void 0!==a;){if(i===a.index){let e;2===a.type?e=new ee(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new se(o,this,t)),this._$AV.push(e),a=n[++s]}i!==a?.index&&(o=Vt.nextNode(),i++)}return Vt.currentNode=Pt,r}p(t){let e=0;for(const n of this._$AV)void 0!==n&&(void 0!==n.strings?(n._$AI(t,n,e),e+=n.strings.length-2):n._$AI(t[e])),e++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,n,r){this.type=2,this._$AH=Jt,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Xt(this,t,e),It(t)?t===Jt||null==t||""===t?(this._$AH!==Jt&&this._$AR(),this._$AH=Jt):t!==this._$AH&&t!==Yt&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>Nt(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Jt&&It(this._$AH)?this._$AA.nextSibling.data=t:this.T(Pt.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:n}=t,r="number"==typeof n?this._$AC(t):(void 0===n.el&&(n.el=Qt.createElement(Gt(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new te(r,this),n=t.u(this.options);t.p(e),this.T(n),this._$AH=t}}_$AC(t){let e=Kt.get(t.strings);return void 0===e&&Kt.set(t.strings,e=new Qt(t)),e}k(t){Nt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let n,r=0;for(const o of t)r===e.length?e.push(n=new ee(this.O(Mt()),this.O(Mt()),this,this.options)):n=e[r],n._$AI(o),r++;r<e.length&&(this._$AR(n&&n._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class ne{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,n,r,o){this.type=1,this._$AH=Jt,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=o,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Jt}_$AI(t,e=this,n,r){const o=this.strings;let i=!1;if(void 0===o)t=Xt(this,t,e,0),i=!It(t)||t!==this._$AH&&t!==Yt,i&&(this._$AH=t);else{const r=t;let s,a;for(t=o[0],s=0;s<o.length-1;s++)a=Xt(this,r[n+s],e,s),a===Yt&&(a=this._$AH[s]),i||=!It(a)||a!==this._$AH[s],a===Jt?t=Jt:t!==Jt&&(t+=(a??"")+o[s+1]),this._$AH[s]=a}i&&!r&&this.j(t)}j(t){t===Jt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class re extends ne{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Jt?void 0:t}}class oe extends ne{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Jt)}}class ie extends ne{constructor(t,e,n,r,o){super(t,e,n,r,o),this.type=5}_$AI(t,e=this){if((t=Xt(this,t,e,0)??Jt)===Yt)return;const n=this._$AH,r=t===Jt&&n!==Jt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==Jt&&(n===Jt||r);r&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class se{constructor(t,e,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Xt(this,t)}}const ae=jt.litHtmlPolyfillSupport;ae?.(Qt,ee),(jt.litHtmlVersions??=[]).push("3.3.0");const ce=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ue extends xt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,n)=>{const r=n?.renderBefore??e;let o=r._$litPart$;if(void 0===o){const t=n?.renderBefore??null;r._$litPart$=o=new ee(e.insertBefore(Mt(),t),t,void 0,n??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Yt}}ue._$litElement$=!0,ue.finalized=!0,ce.litElementHydrateSupport?.({LitElement:ue});const le=ce.litElementPolyfillSupport;le?.({LitElement:ue}),(ce.litElementVersions??=[]).push("4.2.0");class he extends ue{static properties={lang:{type:String},getLang:{type:Function},setLang:{type:Function}};static styles=ut`
    button {
      border: none;
      background: white;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;constructor(){super(),this.getLang=Q,this.setLang=Z,this.lang=this.getLang()}connectedCallback(){super.connectedCallback(),this.lang=this.getLang(),window.addEventListener("lang-changed",this._onLangChanged)}disconnectedCallback(){window.removeEventListener("lang-changed",this._onLangChanged),super.disconnectedCallback()}_onLangChanged=t=>{this.lang=t.detail};toggleLanguage(){const t="en"===this.lang?"tr":"en";this.setLang(t)}render(){return qt`
      <button @click=${this.toggleLanguage}>
        <img
          src="/public/icons/flags/${"en"===this.lang?"tr":"en"}.png"
          alt="Language Icon"
          width="24"
          height="16"
        />
      </button>
    `}}customElements.define("language-switcher",he);class fe extends ue{static properties={navigation:{type:Object},t:{type:Function}};static styles=ut`
    nav {
      padding: 0.75rem;
      background: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
    }
    main {
      padding: 4.5rem 2rem 2rem 2rem;
      background: var(--color-background);
      min-height: 100vh;
    }
    nav .logo {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    nav .logo img {
      height: 32px;
      border-radius: 4px;
    }
    nav .logo-text {
      font-size: 1rem;
      font-weight: 500;
      color: var(--color-text);
    }
    nav a {
      text-decoration: none;
      color: var(--color-primary);
      font-weight: 500;
      display: flex;
      align-items: center;
      opacity: 0.5;
      transition: all 0.25s ease-in-out;
    }
    nav a:hover {
      opacity: 1;
    }
    nav .links {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  `;constructor(){super(),this.navigation={},this.t=tt}connectedCallback(){super.connectedCallback(),this.loadTranslations(),this.langObserver=new MutationObserver(()=>this.loadTranslations()),this.langObserver.observe(document.documentElement,{attributes:!0,attributeFilter:["lang"]})}disconnectedCallback(){this.langObserver?.disconnect(),super.disconnectedCallback()}async loadTranslations(){this.navigation=await this.t("common.mainLayout")}render(){const t=this.navigation||{},e=window.location.pathname,n=t=>e===t?"opacity: 1;":"";return qt`
      <nav>
        <div class="logo">
          <img src="/public/images/ing-logo.png" alt="Logo" />
          <span class="logo-text">ING</span>
        </div>
        <div class="links">
          <a href="/employees" style="${n("/employees")}">
            <img
              src="/public/icons/employee.png"
              alt="Employees Icon"
              width="24"
              height="24"
            />
            ${t.employees}
          </a>
          <a href="/employees/add" style="${n("/employees/add")}">
            <img
              src="/public/icons/add.png"
              alt="Employees Icon"
              width="24"
              height="24"
            />
            ${t.addEmployee}
          </a>
          <language-switcher></language-switcher>
        </div>
      </nav>
      <main>
        <slot></slot>
      </main>
    `}}customElements.define("main-layout",fe);var de=Object.freeze({__proto__:null,MainLayout:fe});class pe extends ue{static properties={columns:{type:Array},rows:{type:Array},selectedRows:{type:Array},selectable:{type:Boolean},multiSelect:{type:Boolean}};constructor(){super(),this.columns=[],this.rows=[],this.selectedRows=[],this.selectable=!1,this.multiSelect=!1}static styles=ut`
    table {
      width: 100%;
      border-collapse: collapse;
    }

    th,
    td {
      padding: 0.75rem;
      border: 1px solid #ddd;
      text-align: left;
    }

    th {
      background-color: #f4f4f4;
    }

    tbody tr:nth-child(even) {
      background-color: #fafafa;
    }

    tbody tr.selected {
      background-color: #d0ebff;
    }

    tbody tr:hover {
      cursor: pointer;
      background-color: #f1faff;
    }
  `;isSelected(t){return this.selectedRows.includes(t)}toggleRow(t){if(!this.selectable)return;let e;e=this.multiSelect?this.isSelected(t)?this.selectedRows.filter(e=>e!==t):[...this.selectedRows,t]:this.isSelected(t)?[]:[t],this.selectedRows=e,this.dispatchEvent(new CustomEvent("selection-changed",{detail:{selectedRows:this.selectedRows},bubbles:!0,composed:!0}))}render(){return qt`
      <table>
        <thead>
          <tr>
            ${this.columns.map(t=>qt`<th>${t.label}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${this.rows.map(t=>qt`
              <tr
                class=${this.isSelected(t)?"selected":""}
                @click=${()=>this.toggleRow(t)}
              >
                ${this.columns.map(e=>qt`<td>${t[e.key]}</td>`)}
              </tr>
            `)}
        </tbody>
        <tfoot>
          <slot name="footer"></slot>
        </tfoot>
      </table>
    `}}customElements.define("data-table",pe);var ye=(()=>"function"==typeof Symbol&&Symbol.observable||"@@observable")(),we=()=>Math.random().toString(36).substring(7).split("").join("."),me={INIT:`@@redux/INIT${we()}`,REPLACE:`@@redux/REPLACE${we()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${we()}`};function be(t){if("object"!=typeof t||null===t)return!1;let e=t;for(;null!==Object.getPrototypeOf(e);)e=Object.getPrototypeOf(e);return Object.getPrototypeOf(t)===e||null===Object.getPrototypeOf(t)}function ve(t){if(void 0===t)return"undefined";if(null===t)return"null";const e=typeof t;switch(e){case"boolean":case"string":case"number":case"symbol":case"function":return e}if(Array.isArray(t))return"array";if(function(t){return t instanceof Date||"function"==typeof t.toDateString&&"function"==typeof t.getDate&&"function"==typeof t.setDate}(t))return"date";if(function(t){return t instanceof Error||"string"==typeof t.message&&t.constructor&&"number"==typeof t.constructor.stackTraceLimit}(t))return"error";const n=function(t){return"function"==typeof t.constructor?t.constructor.name:null}(t);switch(n){case"Symbol":case"Promise":case"WeakMap":case"WeakSet":case"Map":case"Set":return n}return Object.prototype.toString.call(t).slice(8,-1).toLowerCase().replace(/\s/g,"")}function ge(t){let e=typeof t;return e=ve(t),e}function Ee(t,e,n){if("function"!=typeof t)throw new Error(`Expected the root reducer to be a function. Instead, received: '${ge(t)}'`);if("function"==typeof e&&"function"==typeof n||"function"==typeof n&&"function"==typeof arguments[3])throw new Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");if("function"==typeof e&&void 0===n&&(n=e,e=void 0),void 0!==n){if("function"!=typeof n)throw new Error(`Expected the enhancer to be a function. Instead, received: '${ge(n)}'`);return n(Ee)(t,e)}let r=t,o=e,i=new Map,s=i,a=0,c=!1;function u(){s===i&&(s=new Map,i.forEach((t,e)=>{s.set(e,t)}))}function l(){if(c)throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");return o}function h(t){if("function"!=typeof t)throw new Error(`Expected the listener to be a function. Instead, received: '${ge(t)}'`);if(c)throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");let e=!0;u();const n=a++;return s.set(n,t),function(){if(e){if(c)throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");e=!1,u(),s.delete(n),i=null}}}function f(t){if(!be(t))throw new Error(`Actions must be plain objects. Instead, the actual type was: '${ge(t)}'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.`);if(void 0===t.type)throw new Error('Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');if("string"!=typeof t.type)throw new Error(`Action "type" property must be a string. Instead, the actual type was: '${ge(t.type)}'. Value was: '${t.type}' (stringified)`);if(c)throw new Error("Reducers may not dispatch actions.");try{c=!0,o=r(o,t)}finally{c=!1}return(i=s).forEach(t=>{t()}),t}f({type:me.INIT});return{dispatch:f,subscribe:h,getState:l,replaceReducer:function(t){if("function"!=typeof t)throw new Error(`Expected the nextReducer to be a function. Instead, received: '${ge(t)}`);r=t,f({type:me.REPLACE})},[ye]:function(){const t=h;return{subscribe(e){if("object"!=typeof e||null===e)throw new Error(`Expected the observer to be an object. Instead, received: '${ge(e)}'`);function n(){const t=e;t.next&&t.next(l())}n();return{unsubscribe:t(n)}},[ye](){return this}}}}}function Se(t){"undefined"!=typeof console&&"function"==typeof console.error&&console.error(t);try{throw new Error(t)}catch(t){}}function $e(t){const e=Object.keys(t),n={};for(let r=0;r<e.length;r++){const o=e[r];void 0===t[o]&&Se(`No reducer provided for key "${o}"`),"function"==typeof t[o]&&(n[o]=t[o])}const r=Object.keys(n);let o,i;o={};try{!function(t){Object.keys(t).forEach(e=>{const n=t[e];if(void 0===n(void 0,{type:me.INIT}))throw new Error(`The slice reducer for key "${e}" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`);if(void 0===n(void 0,{type:me.PROBE_UNKNOWN_ACTION()}))throw new Error(`The slice reducer for key "${e}" returned undefined when probed with a random type. Don't try to handle '${me.INIT}' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.`)})}(n)}catch(t){i=t}return function(t={},e){if(i)throw i;{const r=function(t,e,n,r){const o=Object.keys(e),i=n&&n.type===me.INIT?"preloadedState argument passed to createStore":"previous state received by the reducer";if(0===o.length)return"Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";if(!be(t))return`The ${i} has unexpected type of "${ge(t)}". Expected argument to be an object with the following keys: "${o.join('", "')}"`;const s=Object.keys(t).filter(t=>!e.hasOwnProperty(t)&&!r[t]);return s.forEach(t=>{r[t]=!0}),n&&n.type===me.REPLACE?void 0:s.length>0?`Unexpected ${s.length>1?"keys":"key"} "${s.join('", "')}" found in ${i}. Expected to find one of the known reducer keys instead: "${o.join('", "')}". Unexpected keys will be ignored.`:void 0}(t,n,e,o);r&&Se(r)}let s=!1;const a={};for(let o=0;o<r.length;o++){const i=r[o],c=n[i],u=t[i],l=c(u,e);if(void 0===l){const t=e&&e.type;throw new Error(`When called with an action of type ${t?`"${String(t)}"`:"(unknown type)"}, the slice reducer for key "${i}" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.`)}a[i]=l,s=s||l!==u}return s=s||r.length!==Object.keys(t).length,s?a:t}}function ke(...t){return 0===t.length?t=>t:1===t.length?t[0]:t.reduce((t,e)=>(...n)=>t(e(...n)))}function xe(t){return be(t)&&"type"in t&&"string"==typeof t.type}var je=Symbol.for("immer-nothing"),Ce=Symbol.for("immer-draftable"),Oe=Symbol.for("immer-state"),Ae=[function(t){return`The plugin for '${t}' has not been loaded into Immer. To enable the plugin, import and call \`enable${t}()\` when initializing your application.`},function(t){return`produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${t}'`},"This object has been frozen and should not be mutated",function(t){return"Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? "+t},"An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.","Immer forbids circular references","The first or second argument to `produce` must be a function","The third argument to `produce` must be a function or undefined","First argument to `createDraft` must be a plain object, an array, or an immerable object","First argument to `finishDraft` must be a draft returned by `createDraft`",function(t){return`'current' expects a draft, got: ${t}`},"Object.defineProperty() cannot be used on an Immer draft","Object.setPrototypeOf() cannot be used on an Immer draft","Immer only supports deleting array indices","Immer only supports setting array indices and the 'length' property",function(t){return`'original' expects a draft, got: ${t}`}];function Re(t,...e){{const n=Ae[t],r="function"==typeof n?n.apply(null,e):n;throw new Error(`[Immer] ${r}`)}}var Te=Object.getPrototypeOf;function _e(t){return!!t&&!!t[Oe]}function Pe(t){return!!t&&(Ie(t)||Array.isArray(t)||!!t[Ce]||!!t.constructor?.[Ce]||Fe(t)||Le(t))}var Me=Object.prototype.constructor.toString();function Ie(t){if(!t||"object"!=typeof t)return!1;const e=Te(t);if(null===e)return!0;const n=Object.hasOwnProperty.call(e,"constructor")&&e.constructor;return n===Object||"function"==typeof n&&Function.toString.call(n)===Me}function Ne(t,e){0===De(t)?Reflect.ownKeys(t).forEach(n=>{e(n,t[n],t)}):t.forEach((n,r)=>e(r,n,t))}function De(t){const e=t[Oe];return e?e.type_:Array.isArray(t)?1:Fe(t)?2:Le(t)?3:0}function ze(t,e){return 2===De(t)?t.has(e):Object.prototype.hasOwnProperty.call(t,e)}function Ue(t,e,n){const r=De(t);2===r?t.set(e,n):3===r?t.add(n):t[e]=n}function Fe(t){return t instanceof Map}function Le(t){return t instanceof Set}function We(t){return t.copy_||t.base_}function Be(t,e){if(Fe(t))return new Map(t);if(Le(t))return new Set(t);if(Array.isArray(t))return Array.prototype.slice.call(t);const n=Ie(t);if(!0===e||"class_only"===e&&!n){const e=Object.getOwnPropertyDescriptors(t);delete e[Oe];let n=Reflect.ownKeys(e);for(let r=0;r<n.length;r++){const o=n[r],i=e[o];!1===i.writable&&(i.writable=!0,i.configurable=!0),(i.get||i.set)&&(e[o]={configurable:!0,writable:!0,enumerable:i.enumerable,value:t[o]})}return Object.create(Te(t),e)}{const e=Te(t);if(null!==e&&n)return{...t};const r=Object.create(e);return Object.assign(r,t)}}function He(t,e=!1){return Ye(t)||_e(t)||!Pe(t)||(De(t)>1&&(t.set=t.add=t.clear=t.delete=qe),Object.freeze(t),e&&Object.entries(t).forEach(([t,e])=>He(e,!0))),t}function qe(){Re(2)}function Ye(t){return Object.isFrozen(t)}var Je,Ke={};function Ve(t){const e=Ke[t];return e||Re(0,t),e}function Ge(){return Je}function Ze(t,e){e&&(Ve("Patches"),t.patches_=[],t.inversePatches_=[],t.patchListener_=e)}function Qe(t){Xe(t),t.drafts_.forEach(en),t.drafts_=null}function Xe(t){t===Je&&(Je=t.parent_)}function tn(t){return Je={drafts_:[],parent_:Je,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0}}function en(t){const e=t[Oe];0===e.type_||1===e.type_?e.revoke_():e.revoked_=!0}function nn(t,e){e.unfinalizedDrafts_=e.drafts_.length;const n=e.drafts_[0];return void 0!==t&&t!==n?(n[Oe].modified_&&(Qe(e),Re(4)),Pe(t)&&(t=rn(e,t),e.parent_||sn(e,t)),e.patches_&&Ve("Patches").generateReplacementPatches_(n[Oe].base_,t,e.patches_,e.inversePatches_)):t=rn(e,n,[]),Qe(e),e.patches_&&e.patchListener_(e.patches_,e.inversePatches_),t!==je?t:void 0}function rn(t,e,n){if(Ye(e))return e;const r=e[Oe];if(!r)return Ne(e,(o,i)=>on(t,r,e,o,i,n)),e;if(r.scope_!==t)return e;if(!r.modified_)return sn(t,r.base_,!0),r.base_;if(!r.finalized_){r.finalized_=!0,r.scope_.unfinalizedDrafts_--;const e=r.copy_;let o=e,i=!1;3===r.type_&&(o=new Set(e),e.clear(),i=!0),Ne(o,(o,s)=>on(t,r,e,o,s,n,i)),sn(t,e,!1),n&&t.patches_&&Ve("Patches").generatePatches_(r,n,t.patches_,t.inversePatches_)}return r.copy_}function on(t,e,n,r,o,i,s){if(o===n&&Re(5),_e(o)){const s=rn(t,o,i&&e&&3!==e.type_&&!ze(e.assigned_,r)?i.concat(r):void 0);if(Ue(n,r,s),!_e(s))return;t.canAutoFreeze_=!1}else s&&n.add(o);if(Pe(o)&&!Ye(o)){if(!t.immer_.autoFreeze_&&t.unfinalizedDrafts_<1)return;rn(t,o),e&&e.scope_.parent_||"symbol"==typeof r||!Object.prototype.propertyIsEnumerable.call(n,r)||sn(t,o)}}function sn(t,e,n=!1){!t.parent_&&t.immer_.autoFreeze_&&t.canAutoFreeze_&&He(e,n)}var an={get(t,e){if(e===Oe)return t;const n=We(t);if(!ze(n,e))return function(t,e,n){const r=ln(e,n);return r?"value"in r?r.value:r.get?.call(t.draft_):void 0}(t,n,e);const r=n[e];return t.finalized_||!Pe(r)?r:r===un(t.base_,e)?(fn(t),t.copy_[e]=dn(r,t)):r},has:(t,e)=>e in We(t),ownKeys:t=>Reflect.ownKeys(We(t)),set(t,e,n){const r=ln(We(t),e);if(r?.set)return r.set.call(t.draft_,n),!0;if(!t.modified_){const r=un(We(t),e),o=r?.[Oe];if(o&&o.base_===n)return t.copy_[e]=n,t.assigned_[e]=!1,!0;if(function(t,e){return t===e?0!==t||1/t==1/e:t!=t&&e!=e}(n,r)&&(void 0!==n||ze(t.base_,e)))return!0;fn(t),hn(t)}return t.copy_[e]===n&&(void 0!==n||e in t.copy_)||Number.isNaN(n)&&Number.isNaN(t.copy_[e])||(t.copy_[e]=n,t.assigned_[e]=!0),!0},deleteProperty:(t,e)=>(void 0!==un(t.base_,e)||e in t.base_?(t.assigned_[e]=!1,fn(t),hn(t)):delete t.assigned_[e],t.copy_&&delete t.copy_[e],!0),getOwnPropertyDescriptor(t,e){const n=We(t),r=Reflect.getOwnPropertyDescriptor(n,e);return r?{writable:!0,configurable:1!==t.type_||"length"!==e,enumerable:r.enumerable,value:n[e]}:r},defineProperty(){Re(11)},getPrototypeOf:t=>Te(t.base_),setPrototypeOf(){Re(12)}},cn={};function un(t,e){const n=t[Oe];return(n?We(n):t)[e]}function ln(t,e){if(!(e in t))return;let n=Te(t);for(;n;){const t=Object.getOwnPropertyDescriptor(n,e);if(t)return t;n=Te(n)}}function hn(t){t.modified_||(t.modified_=!0,t.parent_&&hn(t.parent_))}function fn(t){t.copy_||(t.copy_=Be(t.base_,t.scope_.immer_.useStrictShallowCopy_))}Ne(an,(t,e)=>{cn[t]=function(){return arguments[0]=arguments[0][0],e.apply(this,arguments)}}),cn.deleteProperty=function(t,e){return isNaN(parseInt(e))&&Re(13),cn.set.call(this,t,e,void 0)},cn.set=function(t,e,n){return"length"!==e&&isNaN(parseInt(e))&&Re(14),an.set.call(this,t[0],e,n,t[0])};function dn(t,e){const n=Fe(t)?Ve("MapSet").proxyMap_(t,e):Le(t)?Ve("MapSet").proxySet_(t,e):function(t,e){const n=Array.isArray(t),r={type_:n?1:0,scope_:e?e.scope_:Ge(),modified_:!1,finalized_:!1,assigned_:{},parent_:e,base_:t,draft_:null,copy_:null,revoke_:null,isManual_:!1};let o=r,i=an;n&&(o=[r],i=cn);const{revoke:s,proxy:a}=Proxy.revocable(o,i);return r.draft_=a,r.revoke_=s,a}(t,e);return(e?e.scope_:Ge()).drafts_.push(n),n}function pn(t){if(!Pe(t)||Ye(t))return t;const e=t[Oe];let n;if(e){if(!e.modified_)return e.base_;e.finalized_=!0,n=Be(t,e.scope_.immer_.useStrictShallowCopy_)}else n=Be(t,!0);return Ne(n,(t,e)=>{Ue(n,t,pn(e))}),e&&(e.finalized_=!1),n}var yn=new class{constructor(t){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.produce=(t,e,n)=>{if("function"==typeof t&&"function"!=typeof e){const n=e;e=t;const r=this;return function(t=n,...o){return r.produce(t,t=>e.call(this,t,...o))}}let r;if("function"!=typeof e&&Re(6),void 0!==n&&"function"!=typeof n&&Re(7),Pe(t)){const o=tn(this),i=dn(t,void 0);let s=!0;try{r=e(i),s=!1}finally{s?Qe(o):Xe(o)}return Ze(o,n),nn(r,o)}if(!t||"object"!=typeof t){if(r=e(t),void 0===r&&(r=t),r===je&&(r=void 0),this.autoFreeze_&&He(r,!0),n){const e=[],o=[];Ve("Patches").generateReplacementPatches_(t,r,e,o),n(e,o)}return r}Re(1,t)},this.produceWithPatches=(t,e)=>{if("function"==typeof t)return(e,...n)=>this.produceWithPatches(e,e=>t(e,...n));let n,r;const o=this.produce(t,e,(t,e)=>{n=t,r=e});return[o,n,r]},"boolean"==typeof t?.autoFreeze&&this.setAutoFreeze(t.autoFreeze),"boolean"==typeof t?.useStrictShallowCopy&&this.setUseStrictShallowCopy(t.useStrictShallowCopy)}createDraft(t){Pe(t)||Re(8),_e(t)&&(t=function(t){_e(t)||Re(10,t);return pn(t)}(t));const e=tn(this),n=dn(t,void 0);return n[Oe].isManual_=!0,Xe(e),n}finishDraft(t,e){const n=t&&t[Oe];n&&n.isManual_||Re(9);const{scope_:r}=n;return Ze(r,e),nn(void 0,r)}setAutoFreeze(t){this.autoFreeze_=t}setUseStrictShallowCopy(t){this.useStrictShallowCopy_=t}applyPatches(t,e){let n;for(n=e.length-1;n>=0;n--){const r=e[n];if(0===r.path.length&&"replace"===r.op){t=r.value;break}}n>-1&&(e=e.slice(n+1));const r=Ve("Patches").applyPatches_;return _e(t)?r(t,e):this.produce(t,t=>r(t,e))}},wn=yn.produce;yn.produceWithPatches.bind(yn),yn.setAutoFreeze.bind(yn),yn.setUseStrictShallowCopy.bind(yn),yn.applyPatches.bind(yn),yn.createDraft.bind(yn),yn.finishDraft.bind(yn);var mn=(t,e,n)=>{if(1===e.length&&e[0]===n){let e=!1;try{const n={};t(n)===n&&(e=!0)}catch{}if(e){let t;try{throw new Error}catch(e){({stack:t}=e)}console.warn("The result function returned its own inputs without modification. e.g\n`createSelector([state => state.todos], todos => todos)`\nThis could lead to inefficient memoization and unnecessary re-renders.\nEnsure transformation logic is in the result function, and extraction logic is in the input selectors.",{stack:t})}}},bn=(t,e,n)=>{const{memoize:r,memoizeOptions:o}=e,{inputSelectorResults:i,inputSelectorResultsCopy:s}=t,a=r(()=>({}),...o);if(!(a.apply(null,i)===a.apply(null,s))){let t;try{throw new Error}catch(e){({stack:t}=e)}console.warn("An input selector returned a different result when passed same arguments.\nThis means your output selector will likely run more frequently than intended.\nAvoid returning a new reference inside your input selector, e.g.\n`createSelector([state => state.todos.map(todo => todo.id)], todoIds => todoIds.length)`",{arguments:n,firstInputs:i,secondInputs:s,stack:t})}},vn={inputStabilityCheck:"once",identityFunctionCheck:"once"};var gn=t=>Array.isArray(t)?t:[t];function En(t){const e=Array.isArray(t[0])?t[0]:t;return function(t,e="expected all items to be functions, instead received the following types: "){if(!t.every(t=>"function"==typeof t)){const n=t.map(t=>"function"==typeof t?`function ${t.name||"unnamed"}()`:typeof t).join(", ");throw new TypeError(`${e}[${n}]`)}}(e,"createSelector expects all input-selectors to be functions, but received the following types: "),e}function Sn(t,e){const n=[],{length:r}=t;for(let o=0;o<r;o++)n.push(t[o].apply(null,e));return n}var $n="undefined"!=typeof WeakRef?WeakRef:class{constructor(t){this.value=t}deref(){return this.value}};function kn(){return{s:0,v:void 0,o:null,p:null}}function xn(t,e={}){let n={s:0,v:void 0,o:null,p:null};const{resultEqualityCheck:r}=e;let o,i=0;function s(){let e=n;const{length:s}=arguments;for(let t=0,n=s;t<n;t++){const n=arguments[t];if("function"==typeof n||"object"==typeof n&&null!==n){let t=e.o;null===t&&(e.o=t=new WeakMap);const r=t.get(n);void 0===r?(e=kn(),t.set(n,e)):e=r}else{let t=e.p;null===t&&(e.p=t=new Map);const r=t.get(n);void 0===r?(e=kn(),t.set(n,e)):e=r}}const a=e;let c;if(1===e.s)c=e.v;else if(c=t.apply(null,arguments),i++,r){const t=o?.deref?.()??o;null!=t&&r(t,c)&&(c=t,0!==i&&i--);o="object"==typeof c&&null!==c||"function"==typeof c?new $n(c):c}return a.s=1,a.v=c,c}return s.clearCache=()=>{n={s:0,v:void 0,o:null,p:null},s.resetResultsCount()},s.resultsCount=()=>i,s.resetResultsCount=()=>{i=0},s}function jn(t,...e){const n="function"==typeof t?{memoize:t,memoizeOptions:e}:t,r=(...t)=>{let e,r=0,o=0,i={},s=t.pop();"object"==typeof s&&(i=s,s=t.pop()),function(t,e="expected a function, instead received "+typeof t){if("function"!=typeof t)throw new TypeError(e)}(s,`createSelector expects an output function after the inputs, but received: [${typeof s}]`);const a={...n,...i},{memoize:c,memoizeOptions:u=[],argsMemoize:l=xn,argsMemoizeOptions:h=[],devModeChecks:f={}}=a,d=gn(u),p=gn(h),y=En(t),w=c(function(){return r++,s.apply(null,arguments)},...d);let m=!0;const b=l(function(){o++;const t=Sn(y,arguments);e=w.apply(null,t);{const{identityFunctionCheck:n,inputStabilityCheck:r}=((t,e)=>{const{identityFunctionCheck:n,inputStabilityCheck:r}={...vn,...e};return{identityFunctionCheck:{shouldRun:"always"===n||"once"===n&&t,run:mn},inputStabilityCheck:{shouldRun:"always"===r||"once"===r&&t,run:bn}}})(m,f);if(n.shouldRun&&n.run(s,t,e),r.shouldRun){const e=Sn(y,arguments);r.run({inputSelectorResults:t,inputSelectorResultsCopy:e},{memoize:c,memoizeOptions:d},arguments)}m&&(m=!1)}return e},...p);return Object.assign(b,{resultFunc:s,memoizedResultFunc:w,dependencies:y,dependencyRecomputations:()=>o,resetDependencyRecomputations:()=>{o=0},lastResult:()=>e,recomputations:()=>r,resetRecomputations:()=>{r=0},memoize:c,argsMemoize:l})};return Object.assign(r,{withTypes:()=>r}),r}var Cn=jn(xn),On=Object.assign((t,e=Cn)=>{!function(t,e="expected an object, instead received "+typeof t){if("object"!=typeof t)throw new TypeError(e)}(t,"createStructuredSelector expects first argument to be an object where each property is a selector, instead received a "+typeof t);const n=Object.keys(t);return e(n.map(e=>t[e]),(...t)=>t.reduce((t,e,r)=>(t[n[r]]=e,t),{}))},{withTypes:()=>On});function An(t){return({dispatch:e,getState:n})=>r=>o=>"function"==typeof o?o(e,n,t):r(o)}var Rn=An(),Tn=An,_n="undefined"!=typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(0!==arguments.length)return"object"==typeof arguments[0]?ke:ke.apply(null,arguments)};function Pn(t,e){function n(...n){if(e){let r=e(...n);if(!r)throw new Error("prepareAction did not return an object");return{type:t,payload:r.payload,..."meta"in r&&{meta:r.meta},..."error"in r&&{error:r.error}}}return{type:t,payload:n[0]}}return n.toString=()=>`${t}`,n.type=t,n.match=e=>xe(e)&&e.type===t,n}function Mn(t){return"function"==typeof t&&"type"in t&&(t=>t&&"function"==typeof t.match)(t)}function In(t,e){let n=0;return{measureTime(t){const e=Date.now();try{return t()}finally{const t=Date.now();n+=t-e}},warnIfExceeded(){n>t&&console.warn(`${e} took ${n}ms, which is more than the warning threshold of ${t}ms. \nIf your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.\nIt is disabled in production builds, so you don't need to worry about that.`)}}}var Nn=class t extends Array{constructor(...e){super(...e),Object.setPrototypeOf(this,t.prototype)}static get[Symbol.species](){return t}concat(...t){return super.concat.apply(this,t)}prepend(...e){return 1===e.length&&Array.isArray(e[0])?new t(...e[0].concat(this)):new t(...e.concat(this))}};function Dn(t){return Pe(t)?wn(t,()=>{}):t}function zn(t,e,n){return t.has(e)?t.get(e):t.set(e,n(e)).get(e)}function Un(t){return"object"!=typeof t||null==t||Object.isFrozen(t)}function Fn(t,e,n){const r=Ln(t,e,n);return{detectMutations:()=>Wn(t,e,r,n)}}function Ln(t,e=[],n,r="",o=new Set){const i={value:n};if(!t(n)&&!o.has(n)){o.add(n),i.children={};for(const o in n){const s=r?r+"."+o:o;e.length&&-1!==e.indexOf(s)||(i.children[o]=Ln(t,e,n[o],s))}}return i}function Wn(t,e=[],n,r,o=!1,i=""){const s=n?n.value:void 0,a=s===r;if(o&&!a&&!Number.isNaN(r))return{wasMutated:!0,path:i};if(t(s)||t(r))return{wasMutated:!1};const c={};for(let t in n.children)c[t]=!0;for(let t in r)c[t]=!0;const u=e.length>0;for(let o in c){const s=i?i+"."+o:o;if(u){if(e.some(t=>t instanceof RegExp?t.test(s):s===t))continue}const c=Wn(t,e,n.children[o],r[o],a,s);if(c.wasMutated)return c}return{wasMutated:!1}}function Bn(t){const e=typeof t;return null==t||"string"===e||"boolean"===e||"number"===e||Array.isArray(t)||be(t)}function Hn(t,e="",n=Bn,r,o=[],i){let s;if(!n(t))return{keyPath:e||"<root>",value:t};if("object"!=typeof t||null===t)return!1;if(i?.has(t))return!1;const a=null!=r?r(t):Object.entries(t),c=o.length>0;for(const[t,u]of a){const a=e?e+"."+t:t;if(c){if(o.some(t=>t instanceof RegExp?t.test(a):a===t))continue}if(!n(u))return{keyPath:a,value:u};if("object"==typeof u&&(s=Hn(u,a,n,r,o,i),s))return s}return i&&qn(t)&&i.add(t),!1}function qn(t){if(!Object.isFrozen(t))return!1;for(const e of Object.values(t))if("object"==typeof e&&null!==e&&!qn(e))return!1;return!0}function Yn(t){return"boolean"==typeof t}var Jn=()=>function(t){const{thunk:e=!0,immutableCheck:n=!0,serializableCheck:r=!0,actionCreatorCheck:o=!0}=t??{};let i=new Nn;if(e&&(Yn(e)?i.push(Rn):i.push(Tn(e.extraArgument))),n){let t={};Yn(n)||(t=n),i.unshift(function(t={}){{let e=function(t,e,r,o){return JSON.stringify(t,n(e,o),r)},n=function(t,e){let n=[],r=[];return e||(e=function(t,e){return n[0]===e?"[Circular ~]":"[Circular ~."+r.slice(0,n.indexOf(e)).join(".")+"]"}),function(o,i){if(n.length>0){var s=n.indexOf(this);~s?n.splice(s+1):n.push(this),~s?r.splice(s,1/0,o):r.push(o),~n.indexOf(i)&&(i=e.call(this,o,i))}else n.push(i);return null==t?i:t.call(this,o,i)}},{isImmutable:r=Un,ignoredPaths:o,warnAfter:i=32}=t;const s=Fn.bind(null,r,o);return({getState:t})=>{let n,r=t(),o=s(r);return a=>c=>{const u=In(i,"ImmutableStateInvariantMiddleware");u.measureTime(()=>{if(r=t(),n=o.detectMutations(),o=s(r),n.wasMutated)throw new Error(`A state mutation was detected between dispatches, in the path '${n.path||""}'.  This may cause incorrect behavior. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`)});const l=a(c);return u.measureTime(()=>{if(r=t(),n=o.detectMutations(),o=s(r),n.wasMutated)throw new Error(`A state mutation was detected inside a dispatch, in the path: ${n.path||""}. Take a look at the reducer(s) handling the action ${e(c)}. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`)}),u.warnIfExceeded(),l}}}}(t))}if(r){let t={};Yn(r)||(t=r),i.push(function(t={}){{const{isSerializable:e=Bn,getEntries:n,ignoredActions:r=[],ignoredActionPaths:o=["meta.arg","meta.baseQueryMeta"],ignoredPaths:i=[],warnAfter:s=32,ignoreState:a=!1,ignoreActions:c=!1,disableCache:u=!1}=t,l=!u&&WeakSet?new WeakSet:void 0;return t=>u=>h=>{if(!xe(h))return u(h);const f=u(h),d=In(s,"SerializableStateInvariantMiddleware");return c||r.length&&-1!==r.indexOf(h.type)||d.measureTime(()=>{const t=Hn(h,"",e,n,o,l);if(t){const{keyPath:e,value:n}=t;console.error(`A non-serializable value was detected in an action, in the path: \`${e}\`. Value:`,n,"\nTake a look at the logic that dispatched this action: ",h,"\n(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)","\n(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)")}}),a||(d.measureTime(()=>{const r=Hn(t.getState(),"",e,n,i,l);if(r){const{keyPath:t,value:e}=r;console.error(`A non-serializable value was detected in the state, in the path: \`${t}\`. Value:`,e,`\nTake a look at the reducer(s) handling this action type: ${h.type}.\n(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)`)}}),d.warnIfExceeded()),f}}}(t))}if(o){let t={};Yn(o)||(t=o),i.unshift(function(t={}){const{isActionCreator:e=Mn}=t;return()=>t=>n=>(e(n)&&console.warn(function(t){const e=t?`${t}`.split("/"):[],n=e[e.length-1]||"actionCreator";return`Detected an action creator with type "${t||"unknown"}" being dispatched. \nMake sure you're calling the action creator before dispatching, i.e. \`dispatch(${n}())\` instead of \`dispatch(${n})\`. This is necessary even if the action has no payload.`}(n.type)),t(n))}(t))}return i},Kn=t=>e=>{setTimeout(e,t)},Vn=t=>function(e){const{autoBatch:n=!0}=e??{};let r=new Nn(t);return n&&r.push(((t={type:"raf"})=>e=>(...n)=>{const r=e(...n);let o=!0,i=!1,s=!1;const a=new Set,c="tick"===t.type?queueMicrotask:"raf"===t.type?"undefined"!=typeof window&&window.requestAnimationFrame?window.requestAnimationFrame:Kn(10):"callback"===t.type?t.queueNotification:Kn(t.timeout),u=()=>{s=!1,i&&(i=!1,a.forEach(t=>t()))};return Object.assign({},r,{subscribe(t){const e=r.subscribe(()=>o&&t());return a.add(t),()=>{e(),a.delete(t)}},dispatch(t){try{return o=!t?.meta?.RTK_autoBatch,i=!o,i&&(s||(s=!0,c(u))),r.dispatch(t)}finally{o=!0}}})})("object"==typeof n?n:void 0)),r};function Gn(t){const e={},n=[];let r;const o={addCase(t,i){if(n.length>0)throw new Error("`builder.addCase` should only be called before calling `builder.addMatcher`");if(r)throw new Error("`builder.addCase` should only be called before calling `builder.addDefaultCase`");const s="string"==typeof t?t:t.type;if(!s)throw new Error("`builder.addCase` cannot be called with an empty action type");if(s in e)throw new Error(`\`builder.addCase\` cannot be called with two reducers for the same action type '${s}'`);return e[s]=i,o},addMatcher(t,e){if(r)throw new Error("`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");return n.push({matcher:t,reducer:e}),o},addDefaultCase(t){if(r)throw new Error("`builder.addDefaultCase` can only be called once");return r=t,o}};return t(o),[e,n,r]}var Zn=(t=21)=>{let e="",n=t;for(;n--;)e+="ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW"[64*Math.random()|0];return e},Qn=Symbol.for("rtk-slice-createasyncthunk");function Xn(t,e){return`${t}/${e}`}function tr({creators:t}={}){const e=t?.asyncThunk?.[Qn];return function(t){const{name:n,reducerPath:r=n}=t;if(!n)throw new Error("`name` is a required option for createSlice");"undefined"!=typeof process&&void 0===t.initialState&&console.error("You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`");const o=("function"==typeof t.reducers?t.reducers(function(){function t(t,e){return{_reducerDefinitionType:"asyncThunk",payloadCreator:t,...e}}return t.withTypes=()=>t,{reducer:t=>Object.assign({[t.name]:(...e)=>t(...e)}[t.name],{_reducerDefinitionType:"reducer"}),preparedReducer:(t,e)=>({_reducerDefinitionType:"reducerWithPrepare",prepare:t,reducer:e}),asyncThunk:t}}()):t.reducers)||{},i=Object.keys(o),s={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},a={addCase(t,e){const n="string"==typeof t?t:t.type;if(!n)throw new Error("`context.addCase` cannot be called with an empty action type");if(n in s.sliceCaseReducersByType)throw new Error("`context.addCase` cannot be called with two reducers for the same action type: "+n);return s.sliceCaseReducersByType[n]=e,a},addMatcher:(t,e)=>(s.sliceMatchers.push({matcher:t,reducer:e}),a),exposeAction:(t,e)=>(s.actionCreators[t]=e,a),exposeCaseReducer:(t,e)=>(s.sliceCaseReducersByName[t]=e,a)};function c(){if("object"==typeof t.extraReducers)throw new Error("The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice");const[e={},n=[],r]="function"==typeof t.extraReducers?Gn(t.extraReducers):[t.extraReducers],o={...e,...s.sliceCaseReducersByType};return function(t,e){if("object"==typeof e)throw new Error("The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer");let n,[r,o,i]=Gn(e);if(function(t){return"function"==typeof t}(t))n=()=>Dn(t());else{const e=Dn(t);n=()=>e}function s(t=n(),e){let s=[r[e.type],...o.filter(({matcher:t})=>t(e)).map(({reducer:t})=>t)];return 0===s.filter(t=>!!t).length&&(s=[i]),s.reduce((t,n)=>{if(n){if(_e(t)){const r=n(t,e);return void 0===r?t:r}if(Pe(t))return wn(t,t=>n(t,e));{const r=n(t,e);if(void 0===r){if(null===t)return t;throw Error("A case reducer on a non-draftable value must not return undefined")}return r}}return t},t)}return s.getInitialState=n,s}(t.initialState,t=>{for(let e in o)t.addCase(e,o[e]);for(let e of s.sliceMatchers)t.addMatcher(e.matcher,e.reducer);for(let e of n)t.addMatcher(e.matcher,e.reducer);r&&t.addDefaultCase(r)})}i.forEach(r=>{const i=o[r],s={reducerName:r,type:Xn(n,r),createNotation:"function"==typeof t.reducers};!function(t){return"asyncThunk"===t._reducerDefinitionType}(i)?function({type:t,reducerName:e,createNotation:n},r,o){let i,s;if("reducer"in r){if(n&&!function(t){return"reducerWithPrepare"===t._reducerDefinitionType}(r))throw new Error("Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.");i=r.reducer,s=r.prepare}else i=r;o.addCase(t,i).exposeCaseReducer(e,i).exposeAction(e,s?Pn(t,s):Pn(t))}(s,i,a):function({type:t,reducerName:e},n,r,o){if(!o)throw new Error("Cannot use `create.asyncThunk` in the built-in `createSlice`. Use `buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })` to create a customised version of `createSlice`.");const{payloadCreator:i,fulfilled:s,pending:a,rejected:c,settled:u,options:l}=n,h=o(t,i,l);r.exposeAction(e,h),s&&r.addCase(h.fulfilled,s);a&&r.addCase(h.pending,a);c&&r.addCase(h.rejected,c);u&&r.addMatcher(h.settled,u);r.exposeCaseReducer(e,{fulfilled:s||nr,pending:a||nr,rejected:c||nr,settled:u||nr})}(s,i,a,e)});const u=t=>t,l=new Map,h=new WeakMap;let f;function d(t,e){return f||(f=c()),f(t,e)}function p(){return f||(f=c()),f.getInitialState()}function y(e,n=!1){function r(t){let o=t[e];if(void 0===o){if(!n)throw new Error("selectSlice returned undefined for an uninjected slice reducer");o=zn(h,r,p)}return o}function o(e=u){const r=zn(l,n,()=>new WeakMap);return zn(r,e,()=>{const r={};for(const[o,i]of Object.entries(t.selectors??{}))r[o]=er(i,e,()=>zn(h,e,p),n);return r})}return{reducerPath:e,getSelectors:o,get selectors(){return o(r)},selectSlice:r}}const w={name:n,reducer:d,actions:s.actionCreators,caseReducers:s.sliceCaseReducersByName,getInitialState:p,...y(r),injectInto(t,{reducerPath:e,...n}={}){const o=e??r;return t.inject({reducerPath:o,reducer:d},n),{...w,...y(o,!0)}}};return w}}function er(t,e,n,r){function o(o,...i){let s=e(o);if(void 0===s){if(!r)throw new Error("selectState returned undefined for an uninjected slice reducer");s=n()}return t(s,...i)}return o.unwrapped=t,o}function nr(){}const rr=tr()({name:"employees",initialState:{employees:[]},reducers:{setEmployees(t,e){t.employees=e.payload},addEmployee:{reducer(t,e){t.employees.push(e.payload)},prepare:t=>({payload:{id:Zn(),...t}})},updateEmployee(t,e){const{id:n,changes:r}=e.payload,o=t.employees.findIndex(t=>t.id===n);-1!==o&&(t.employees[o]={...t.employees[o],...r})},deleteEmployee(t,e){t.employees=t.employees.filter(t=>t.id!==e.payload)}}}),{setEmployees:or,addEmployee:ir,updateEmployee:sr,deleteEmployee:ar}=rr.actions;var cr=rr.reducer;const ur="employeeAppState";const lr=function(){try{const t=localStorage.getItem(ur);return t?JSON.parse(t):void 0}catch(t){return void console.error("Failed to load state from localStorage:",t)}}(),hr=function(t){const e=Jn(),{reducer:n,middleware:r,devTools:o=!0,duplicateMiddlewareCheck:i=!0,preloadedState:s,enhancers:a}=t||{};let c,u;if("function"==typeof n)c=n;else{if(!be(n))throw new Error("`reducer` is a required argument, and must be a function or an object of functions that can be passed to combineReducers");c=$e(n)}if(r&&"function"!=typeof r)throw new Error("`middleware` field must be a callback");if("function"==typeof r){if(u=r(e),!Array.isArray(u))throw new Error("when using a middleware builder function, an array of middleware must be returned")}else u=e();if(u.some(t=>"function"!=typeof t))throw new Error("each middleware provided to configureStore must be a function");if(i){let t=new Set;u.forEach(e=>{if(t.has(e))throw new Error("Duplicate middleware references found when creating the store. Ensure that each middleware is only included once.");t.add(e)})}let l=ke;o&&(l=_n({trace:!0,..."object"==typeof o&&o}));const h=function(...t){return e=>(n,r)=>{const o=e(n,r);let i=()=>{throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.")};const s={getState:o.getState,dispatch:(t,...e)=>i(t,...e)},a=t.map(t=>t(s));return i=ke(...a)(o.dispatch),{...o,dispatch:i}}}(...u),f=Vn(h);if(a&&"function"!=typeof a)throw new Error("`enhancers` field must be a callback");let d="function"==typeof a?a(f):f();if(!Array.isArray(d))throw new Error("`enhancers` callback must return an array");if(d.some(t=>"function"!=typeof t))throw new Error("each enhancer provided to configureStore must be a function");return u.length&&!d.includes(h)&&console.error("middlewares were provided, but middleware enhancer was not included in final enhancers - make sure to call `getDefaultEnhancers`"),Ee(c,s,l(...d))}({reducer:{employees:cr},preloadedState:lr});hr.subscribe(()=>{!function(t){try{localStorage.setItem(ur,JSON.stringify(t))}catch(t){console.error("Failed to save state to localStorage:",t)}}(hr.getState())});
/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const fr=t=>e=>class extends e{connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._storeUnsubscribe=t.subscribe(()=>this.stateChanged(t.getState())),this.stateChanged(t.getState())}disconnectedCallback(){this._storeUnsubscribe(),super.disconnectedCallback&&super.disconnectedCallback()}stateChanged(t){}};class dr extends(fr(hr)(ue)){static properties={translation:{type:Object},t:{type:Function},employees:{type:Array}};static styles=ut`
    main h2 {
      margin: 1rem 0 1rem 0;
      font-weight: 500;
      color: var(--color-primary);
    }
  `;constructor(){super(),this.translation={},this.t=tt,this.employees=[]}connectedCallback(){super.connectedCallback(),this.loadTranslations(),this.langObserver=new MutationObserver(()=>this.loadTranslations()),this.langObserver.observe(document.documentElement,{attributes:!0,attributeFilter:["lang"]})}disconnectedCallback(){this.langObserver?.disconnect(),super.disconnectedCallback()}async loadTranslations(){this.translation=await this.t("employees-page")}render(){const t=this.translation||{};return t.headers.firstName,t.headers.lastName,t.headers.dateOfEmployment,t.headers.dateOfBirth,t.headers.phone,t.headers.email,t.headers.department,t.headers.position,t.headers.actions,qt`
      <main>
        <h2>${t.title}</h2>
      </main>
    `}}customElements.define("employees-page",dr);var pr=Object.freeze({__proto__:null,EmployeesPage:dr});
