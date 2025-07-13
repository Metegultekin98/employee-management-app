function t(t,e){void 0===e&&(e={});for(var n=function(t){for(var e=[],n=0;n<t.length;){var r=t[n];if("*"!==r&&"+"!==r&&"?"!==r)if("\\"!==r)if("{"!==r)if("}"!==r)if(":"!==r)if("("!==r)e.push({type:"CHAR",index:n,value:t[n++]});else{var i=1,o="";if("?"===t[a=n+1])throw new TypeError('Pattern cannot start with "?" at '.concat(a));for(;a<t.length;)if("\\"!==t[a]){if(")"===t[a]){if(0===--i){a++;break}}else if("("===t[a]&&(i++,"?"!==t[a+1]))throw new TypeError("Capturing groups are not allowed at ".concat(a));o+=t[a++]}else o+=t[a++]+t[a++];if(i)throw new TypeError("Unbalanced pattern at ".concat(n));if(!o)throw new TypeError("Missing pattern at ".concat(n));e.push({type:"PATTERN",index:n,value:o}),n=a}else{for(var s="",a=n+1;a<t.length;){var c=t.charCodeAt(a);if(!(c>=48&&c<=57||c>=65&&c<=90||c>=97&&c<=122||95===c))break;s+=t[a++]}if(!s)throw new TypeError("Missing parameter name at ".concat(n));e.push({type:"NAME",index:n,value:s}),n=a}else e.push({type:"CLOSE",index:n,value:t[n++]});else e.push({type:"OPEN",index:n,value:t[n++]});else e.push({type:"ESCAPED_CHAR",index:n++,value:t[n++]});else e.push({type:"MODIFIER",index:n,value:t[n++]})}return e.push({type:"END",index:n,value:""}),e}(t),i=e.prefixes,o=void 0===i?"./":i,s=e.delimiter,a=void 0===s?"/#?":s,c=[],l=0,u=0,d="",h=function(t){if(u<n.length&&n[u].type===t)return n[u++].value},f=function(t){var e=h(t);if(void 0!==e)return e;var r=n[u],i=r.type,o=r.index;throw new TypeError("Unexpected ".concat(i," at ").concat(o,", expected ").concat(t))},p=function(){for(var t,e="";t=h("CHAR")||h("ESCAPED_CHAR");)e+=t;return e},m=function(t){var e=c[c.length-1],n=t||(e&&"string"==typeof e?e:"");if(e&&!n)throw new TypeError('Must have text between two parameters, missing text after "'.concat(e.name,'"'));return!n||function(t){for(var e=0,n=a;e<n.length;e++){var r=n[e];if(t.indexOf(r)>-1)return!0}return!1}(n)?"[^".concat(r(a),"]+?"):"(?:(?!".concat(r(n),")[^").concat(r(a),"])+?")};u<n.length;){var y=h("CHAR"),b=h("NAME"),w=h("PATTERN");if(b||w){var g=y||"";-1===o.indexOf(g)&&(d+=g,g=""),d&&(c.push(d),d=""),c.push({name:b||l++,prefix:g,suffix:"",pattern:w||m(g),modifier:h("MODIFIER")||""})}else{var v=y||h("ESCAPED_CHAR");if(v)d+=v;else if(d&&(c.push(d),d=""),h("OPEN")){g=p();var x=h("NAME")||"",$=h("PATTERN")||"",E=p();f("CLOSE"),c.push({name:x||($?l++:""),pattern:x&&!$?m(g):$,prefix:g,suffix:E,modifier:h("MODIFIER")||""})}else f("END")}}return c}function e(e,r){return n(t(e,r),r)}function n(t,e){void 0===e&&(e={});var n=i(e),r=e.encode,o=void 0===r?function(t){return t}:r,s=e.validate,a=void 0===s||s,c=t.map(function(t){if("object"==typeof t)return new RegExp("^(?:".concat(t.pattern,")$"),n)});return function(e){for(var n="",r=0;r<t.length;r++){var i=t[r];if("string"!=typeof i){var s=e?e[i.name]:void 0,l="?"===i.modifier||"*"===i.modifier,u="*"===i.modifier||"+"===i.modifier;if(Array.isArray(s)){if(!u)throw new TypeError('Expected "'.concat(i.name,'" to not repeat, but got an array'));if(0===s.length){if(l)continue;throw new TypeError('Expected "'.concat(i.name,'" to not be empty'))}for(var d=0;d<s.length;d++){var h=o(s[d],i);if(a&&!c[r].test(h))throw new TypeError('Expected all "'.concat(i.name,'" to match "').concat(i.pattern,'", but got "').concat(h,'"'));n+=i.prefix+h+i.suffix}}else if("string"!=typeof s&&"number"!=typeof s){if(!l){var f=u?"an array":"a string";throw new TypeError('Expected "'.concat(i.name,'" to be ').concat(f))}}else{h=o(String(s),i);if(a&&!c[r].test(h))throw new TypeError('Expected "'.concat(i.name,'" to match "').concat(i.pattern,'", but got "').concat(h,'"'));n+=i.prefix+h+i.suffix}}else n+=i}return n}}function r(t){return t.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function i(t){return t&&t.sensitive?"":"i"}function o(e,n,o){return function(t,e,n){void 0===n&&(n={});for(var o=n.strict,s=void 0!==o&&o,a=n.start,c=void 0===a||a,l=n.end,u=void 0===l||l,d=n.encode,h=void 0===d?function(t){return t}:d,f=n.delimiter,p=void 0===f?"/#?":f,m=n.endsWith,y="[".concat(r(void 0===m?"":m),"]|$"),b="[".concat(r(p),"]"),w=c?"^":"",g=0,v=t;g<v.length;g++){var x=v[g];if("string"==typeof x)w+=r(h(x));else{var $=r(h(x.prefix)),E=r(h(x.suffix));if(x.pattern)if(e&&e.push(x),$||E)if("+"===x.modifier||"*"===x.modifier){var k="*"===x.modifier?"?":"";w+="(?:".concat($,"((?:").concat(x.pattern,")(?:").concat(E).concat($,"(?:").concat(x.pattern,"))*)").concat(E,")").concat(k)}else w+="(?:".concat($,"(").concat(x.pattern,")").concat(E,")").concat(x.modifier);else{if("+"===x.modifier||"*"===x.modifier)throw new TypeError('Can not repeat "'.concat(x.name,'" without a prefix and suffix'));w+="(".concat(x.pattern,")").concat(x.modifier)}else w+="(?:".concat($).concat(E,")").concat(x.modifier)}}if(u)s||(w+="".concat(b,"?")),w+=n.endsWith?"(?=".concat(y,")"):"$";else{var O=t[t.length-1],S="string"==typeof O?b.indexOf(O[O.length-1])>-1:void 0===O;s||(w+="(?:".concat(b,"(?=").concat(y,"))?")),S||(w+="(?=".concat(b,"|").concat(y,")"))}return new RegExp(w,i(n))}(t(e,o),n,o)}function s(t,e,n){return t instanceof RegExp?function(t,e){if(!e)return t;for(var n=/\((?:\?<(.*?)>)?(?!\?)/g,r=0,i=n.exec(t.source);i;)e.push({name:i[1]||r++,prefix:"",suffix:"",modifier:"",pattern:""}),i=n.exec(t.source);return t}(t,e):Array.isArray(t)?function(t,e,n){var r=t.map(function(t){return s(t,e,n).source});return new RegExp("(?:".concat(r.join("|"),")"),i(n))}(t,e,n):o(t,e,n)}function a(t){return"object"==typeof t&&!!t}function c(t){return"function"==typeof t}function l(t){return"string"==typeof t}function u(t=[]){return Array.isArray(t)?t:[t]}function d(t){return`[Vaadin.Router] ${t}`}class h extends Error{code;context;constructor(t){super(d(`Page not found (${t.pathname})`)),this.context=t,this.code=404}}const f=Symbol("NotFoundResult");function p(t){return new h(t)}function m(t){return(Array.isArray(t)?t[0]:t)??""}function y(t){return m(t?.path)}const b=new Map;function w(t){try{return decodeURIComponent(t)}catch{return t}}b.set("|false",{keys:[],pattern:/(?:)/u});var g=function(t,e,n=!1,r=[],i){const o=`${t}|${String(n)}`,a=m(e);let c=b.get(o);if(!c){const e=[];c={keys:e,pattern:s(t,e,{end:n,strict:""===t})},b.set(o,c)}const l=c.pattern.exec(a);if(!l)return null;const u={...i};for(let t=1;t<l.length;t++){const e=c.keys[t-1],n=e.name,r=l[t];void 0===r&&Object.hasOwn(u,n)||("+"===e.modifier||"*"===e.modifier?u[n]=r?r.split(/[/?#]/u).map(w):[]:u[n]=r?w(r):r)}return{keys:[...r,...c.keys],params:u,path:l[0]}};var v=function t(e,n,r,i,o){let s,a,c=0,l=y(e);return l.startsWith("/")&&(r&&(l=l.substring(1)),r=!0),{next(u){if(e===u)return{done:!0,value:void 0};e.i??=function(t){return Array.isArray(t)&&t.length>0?t:void 0}(e.children);const d=e.i??[],h=!e.i&&!e.children;if(!s&&(s=g(l,n,h,i,o),s))return{value:{keys:s.keys,params:s.params,path:s.path,route:e}};if(s&&d.length>0)for(;c<d.length;){if(!a){const i=d[c];i.parent=e;let o=s.path.length;o>0&&"/"===n.charAt(o)&&(o+=1),a=t(i,n.substring(o),r,s.keys,s.params)}const i=a.next(u);if(!i.done)return{done:!1,value:i.value};a=null,c+=1}return{done:!0,value:void 0}}}};function x(t){if(c(t.route.action))return t.route.action(t)}class $ extends Error{code;context;constructor(t,e){let n=`Path '${t.pathname}' is not properly resolved due to an error.`;const r=y(t.route);r&&(n+=` Resolution had failed on route: '${r}'`),super(n,e),this.code=e?.code,this.context=t}warn(){console.warn(this.message)}}class E{baseUrl;#t;errorHandler;resolveRoute;#e;constructor(t,{baseUrl:e="",context:n,errorHandler:r,resolveRoute:i=x}={}){if(Object(t)!==t)throw new TypeError("Invalid routes");this.baseUrl=e,this.errorHandler=r,this.resolveRoute=i,Array.isArray(t)?this.#e={i:t,m:!0,action:()=>{},path:""}:this.#e={...t,parent:void 0},this.#t={...n,hash:"",next:async()=>f,params:{},pathname:"",resolver:this,route:this.#e,search:"",chain:[]}}get root(){return this.#e}get context(){return this.#t}get S(){return this.baseUrl?new URL(this.baseUrl,document.baseURI||document.URL).href.replace(/[^/]*$/u,""):""}getRoutes(){return[...this.#e.i??[]]}removeRoutes(){this.#e.i=[]}async resolve(t){const e=this,n={...this.#t,...l(t)?{pathname:t}:t,next:c},r=v(this.#e,this.N(n.pathname)??n.pathname,!!this.baseUrl),i=this.resolveRoute;let o=null,s=null,a=n;async function c(t=!1,l=o?.value?.route,u){const d=null===u?o?.value?.route:void 0;if(o=s??r.next(d),s=null,!t&&(o.done||!function(t,e){let n=t;for(;n;)if(n=n.parent,n===e)return!0;return!1}(o.value.route,l)))return s=o,f;if(o.done)throw p(n);a={...n,params:o.value.params,route:o.value.route,chain:a.chain?.slice()},function(t,e){const{path:n,route:r}=e;if(r&&!r.m){const e={path:n,route:r};if(r.parent&&t.chain)for(let e=t.chain.length-1;e>=0&&t.chain[e].route!==r.parent;e--)t.chain.pop();t.chain?.push(e)}}(a,o.value);const h=await i(a);return null!=h&&h!==f?(a.result=(m=h)&&"object"==typeof m&&"next"in m&&"params"in m&&"result"in m&&"route"in m?h.result:h,e.#t=a,a):await c(t,l,h);var m}try{return await c(!0,this.#e)}catch(t){const e=t instanceof h?t:new $(a,{code:500,cause:t});if(this.errorHandler)return a.result=this.errorHandler(e),a;throw t}}setRoutes(t){this.#e.i=[...u(t)]}N(t){if(!this.baseUrl)return t;const e=this.S,n=t.startsWith("/")?new URL(e).origin+t:`./${t}`,r=new URL(n,e).href;return r.startsWith(e)?r.slice(e.length):void 0}addRoutes(t){return this.#e.i=[...this.#e.i??[],...u(t)],this.getRoutes()}}function k(t,e,n,r){const i=e.name??r?.(e);if(i&&(t.has(i)?t.get(i)?.push(e):t.set(i,[e])),Array.isArray(n))for(const i of n)i.parent=e,k(t,i,i.i??i.children,r)}function O(t,e){const n=t.get(e);if(n){if(n.length>1)throw new Error(`Duplicate route with name "${e}". Try seting unique 'name' route properties.`);return n[0]}}var S=function(e,r={}){if(!(e instanceof E))throw new TypeError("An instance of Resolver is expected");const i=new Map,o=new Map;return(s,a)=>{let c=O(o,s);if(!c&&(o.clear(),k(o,e.root,e.root.i,r.cacheKeyProvider),c=O(o,s),!c))throw new Error(`Route "${s}" not found`);let u=c.fullPath?i.get(c.fullPath):void 0;if(!u){let e=y(c),n=c.parent;for(;n;){const t=y(n);t&&(e=`${t.replace(/\/$/u,"")}/${e.replace(/^\//u,"")}`),n=n.parent}const r=t(e),o=Object.create(null);for(const t of r)l(t)||(o[t.name]=!0);u={keys:o,tokens:r},i.set(e,u),c.fullPath=e}let d=n(u.tokens,{encode:encodeURIComponent,...r})(a)||"/";if(r.stringifyQueryParams&&a){const t={};for(const[e,n]of Object.entries(a))!(e in u.keys)&&n&&(t[e]=n);const e=r.stringifyQueryParams(t);e&&(d+=e.startsWith("?")?e:`?${e}`)}return d}};const j=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,C=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function N(t,e){if("function"!=typeof t)return;const n=j.exec(t.toString());if(n)try{t=new Function(n[1])}catch(t){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",t)}return t(e)}window.Vaadin=window.Vaadin||{};const A=function(t,e){if(window.Vaadin.developmentMode)return N(t,e)};function T(){
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

  vaadin-dev-mode:end **/}void 0===window.Vaadin.developmentMode&&(window.Vaadin.developmentMode=function(){try{return!!localStorage.getItem("vaadin.developmentmode.force")||["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0&&(C?!(C&&Object.keys(C).map(t=>C[t]).filter(t=>t.productionMode).length>0):!N(function(){return!0}))}catch(t){return!1}}());!function(t,e=(window.Vaadin??={})){e.registrations??=[],e.registrations.push({is:"@vaadin/router",version:"2.0.0"})}(),A(T);var P=async function(t,e){return t.classList.add(e),await new Promise(n=>{if((t=>{const e=getComputedStyle(t).getPropertyValue("animation-name");return e&&"none"!==e})(t)){const r=t.getBoundingClientRect(),i=`height: ${r.bottom-r.top}px; width: ${r.right-r.left}px`;t.setAttribute("style",`position: absolute; ${i}`),((t,e)=>{const n=()=>{t.removeEventListener("animationend",n),e()};t.addEventListener("animationend",n)})(t,()=>{t.classList.remove(e),t.removeAttribute("style"),n()})}else t.classList.remove(e),n()})};function R(t){if(!t||!l(t.path))throw new Error(d('Expected route config to be an object with a "path" string property, or an array of such objects'));if(!(c(t.action)||Array.isArray(t.children)||c(t.children)||l(t.component)||l(t.redirect)))throw new Error(d(`Expected route config "${t.path}" to include either "component, redirect" or "action" function but none found.`));t.redirect&&["bundle","component"].forEach(e=>{e in t&&console.warn(d(`Route config "${String(t.path)}" has both "redirect" and "${e}" properties, and "redirect" will always override the latter. Did you mean to only use "${e}"?`))})}function M(t){u(t).forEach(t=>R(t))}function _(t,e){const n=e.S;return n?new URL(t.replace(/^\//u,""),n).pathname:t}function I(t){return t.map(t=>t.path).reduce((t,e)=>e.length?`${t.replace(/\/$/u,"")}/${e.replace(/^\//u,"")}`:t,"")}function z({chain:t=[],hash:n="",params:r={},pathname:i="",redirectFrom:o,resolver:s,search:a=""},c){const l=t.map(t=>t.route);return{baseUrl:s?.baseUrl??"",getUrl:(n={})=>s?_(e(function(t){return I(t.map(t=>t.route))}(t))({...r,...n}),s):"",hash:n,params:r,pathname:i,redirectFrom:o,route:c??(Array.isArray(l)?l.at(-1):void 0)??null,routes:l,search:a,searchParams:new URLSearchParams(a)}}function B(t,e){const n={...t.params};return{redirect:{from:t.pathname,params:n,pathname:e}}}function D(t,e,...n){if("function"==typeof t)return t.apply(e,n)}function F(t,e,...n){return r=>r&&a(r)&&("cancel"in r||"redirect"in r)?r:D(e?.[t],e,...n)}function U(t,e){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${t}`,{cancelable:"go"===t,detail:e}))}function L(t){if(t instanceof Element)return t.nodeName.toLowerCase()}function W(t){if(t.defaultPrevented)return;if(0!==t.button)return;if(t.shiftKey||t.ctrlKey||t.altKey||t.metaKey)return;let e=t.target;const n=t instanceof MouseEvent?t.composedPath():t.path??[];for(let t=0;t<n.length;t++){const r=n[t];if("nodeName"in r&&"a"===r.nodeName.toLowerCase()){e=r;break}}for(;e&&e instanceof Node&&"a"!==L(e);)e=e.parentNode;if(!e||"a"!==L(e))return;const r=e;if(r.target&&"_self"!==r.target.toLowerCase())return;if(r.hasAttribute("download"))return;if(r.hasAttribute("router-ignore"))return;if(r.pathname===window.location.pathname&&""!==r.hash)return;const i=r.origin||function(t){const{port:e,protocol:n}=t;return`${n}//${"http:"===n&&"80"===e||"https:"===n&&"443"===e?t.hostname:t.host}`}(r);if(i!==window.location.origin)return;const{hash:o,pathname:s,search:a}=r;U("go",{hash:o,pathname:s,search:a})&&t instanceof MouseEvent&&(t.preventDefault(),"click"===t.type&&window.scrollTo(0,0))}function J(t){if("vaadin-router-ignore"===t.state)return;const{hash:e,pathname:n,search:r}=window.location;U("go",{hash:e,pathname:n,search:r})}let H=[];const K={CLICK:{activate(){window.document.addEventListener("click",W)},inactivate(){window.document.removeEventListener("click",W)}},POPSTATE:{activate(){window.addEventListener("popstate",J)},inactivate(){window.removeEventListener("popstate",J)}}};function q(t=[]){H.forEach(t=>t.inactivate()),t.forEach(t=>t.activate()),H=t}function Y(){return{cancel:!0}}const V={A:-1,params:{},route:{m:!0,children:[],path:"",action(){}},pathname:"",next:async()=>f};const G={};function Z(t){localStorage.setItem("lang",t),document.documentElement.lang=t,window.dispatchEvent(new CustomEvent("lang-changed",{detail:t}))}function Q(){return localStorage.getItem("lang")||document.documentElement.lang||"en"}async function X(t,e){const n=`${t}:${e}`;if(G[n])return G[n];const r=`/public/localization/${t}/${e}.json`,i=await fetch(r);if(!i.ok)throw new Error(`Failed to load ${r}`);const o=await i.json();return G[n]=o,o}async function tt(t,e={},n=Q()){const[r,...i]=t.split("."),o=i.join("."),s=function(t,e){return e?e.split(".").reduce((t,e)=>{if(void 0!==t)return t[e]},t):t}(await X(n,r),o);return s?function(t,e){return"string"!=typeof t?t:e?t.replace(/{{(.*?)}}/g,(t,n)=>e[n.trim()]??""):t}(s,e):`[${t}]`}const et=[{path:"/",component:"main-layout",action:async()=>{await Promise.all([Promise.resolve().then(function(){return me}),X("en","common")])},children:[{path:"employees",component:"employees-page",action:async()=>{await Promise.resolve().then(function(){return Tr})}},{path:"employees/add",component:"employee-add-page",action:async()=>{await Promise.resolve().then(function(){return _r})}},{path:"employees/:id",component:"employee-edit-page",action:async()=>{await Promise.resolve().then(function(){return Br})}}]}],nt=document.querySelector("#outlet");if(!nt)throw new Error("Missing #outlet element in index.html");const rt=new class extends E{location=z({resolver:this});ready=Promise.resolve(this.location);#n=new WeakSet;#r=new WeakSet;#i=this.#o.bind(this);#s=0;#a;P;#c;#l=null;#u=null;constructor(t,e){const n=document.head.querySelector("base"),r=n?.getAttribute("href");super([],{baseUrl:r?new URL(r,document.URL).href.replace(/[^/]*$/u,""):void 0,...e,resolveRoute:async t=>await this.#d(t)}),q(Object.values(K)),this.setOutlet(t),this.subscribe()}async#d(t){const{route:e}=t;if(c(e.children)){let n=await e.children(function({next:t,...e}){return e}(t));c(e.children)||({children:n}=e),function(t,e){if(!Array.isArray(t)&&!a(t))throw new Error(d(`Incorrect "children" value for the route ${String(e.path)}: expected array or object, but got ${String(t)}`));const n=u(t);n.forEach(t=>R(t)),e.i=n}(n,e)}const n={component:t=>{const e=document.createElement(t);return this.#r.add(e),e},prevent:Y,redirect:e=>B(t,e)};return await Promise.resolve().then(async()=>{if(this.#h(t))return await D(e.action,e,t,n)}).then(t=>null==t||"object"!=typeof t&&"symbol"!=typeof t||!(t instanceof HTMLElement||t===f||a(t)&&"redirect"in t)?l(e.redirect)?n.redirect(e.redirect):void 0:t).then(t=>null!=t?t:l(e.component)?n.component(e.component):void 0)}setOutlet(t){t&&this.#f(t),this.#a=t}getOutlet(){return this.#a}async setRoutes(t,e=!1){return this.P=void 0,this.#c=void 0,M(t),super.setRoutes(t),e||this.#o(),await this.ready}addRoutes(t){return M(t),super.addRoutes(t)}async render(t,e=!1){this.#s+=1;const n=this.#s,r={...V,...l(t)?{hash:"",search:"",pathname:t}:t,A:n};return this.ready=this.#p(r,e),await this.ready}async#p(t,e){const{A:n}=t;try{const r=await this.resolve(t),i=await this.#m(r);if(!this.#h(i))return this.location;const o=this.P;if(i===o)return this.#y(o,!0),this.location;if(this.location=z(i),e&&this.#y(i,1===n),U("location-changed",{router:this,location:this.location}),i.R)return this.#b(i,o),this.P=i,this.location;this.#w(i,o);const s=this.#g(i);if(this.#v(i),this.#x(i,o),await s,this.#h(i))return this.#$(),this.P=i,this.location}catch(r){if(n===this.#s){e&&this.#y(this.context);for(const t of this.#a?.children??[])t.remove();throw this.location=z(Object.assign(t,{resolver:this})),U("error",{router:this,error:r,...t}),r}}return this.location}async#m(t,e=t){const n=await this.#E(e),r=n!==e?n:t,i=_(I(n.chain??[]),this)===n.pathname,o=async(t,e=t.route,n)=>{const r=await t.next(!1,e,n);return null===r||r===f?i?t:null!=e.parent?await o(t,e.parent,r):r:r},s=await o(n);if(null==s||s===f)throw p(r);return s!==n?await this.#m(r,s):await this.#k(n)}async#E(t){const{result:e}=t;if(e instanceof HTMLElement)return function(t,e){if(e.location=z(t),t.chain){const n=t.chain.map(t=>t.route).indexOf(t.route);t.chain[n].element=e}}(t,e),t;if(e&&"redirect"in e){const n=await this.#O(e.redirect,t.M,t.A);return await this.#E(n)}throw e instanceof Error?e:new Error(d(`Invalid route resolution result for path "${t.pathname}". Expected redirect object or HTML element, but got: "${function(t){if("object"!=typeof t)return String(t);const[e="Unknown"]=/ (.*)\]$/u.exec(String(t))??[];return"Object"===e||"Array"===e?`${e} ${JSON.stringify(t)}`:e}(e)}". Double check the action return value for the route.`))}async#k(t){return await this.#S(t).then(async e=>e===this.P||e===t?e:await this.#m(e))}async#S(t){const e=this.P??{},n=e.chain??[],r=t.chain??[];let i=Promise.resolve(void 0);const o=e=>B(t,e);if(t.I=0,t.R=!1,n.length){for(let e=0;e<Math.min(n.length,r.length)&&(n[e].route===r[e].route&&(n[e].path===r[e].path||n[e].element===r[e].element)&&this.#j(n[e].element,r[e].element));t.I++,e++);if(t.R=r.length===n.length&&t.I===r.length&&this.#j(t.result,e.result),t.R){for(let e=r.length-1;e>=0;e--)i=this.#C(i,t,{prevent:Y},n[e]);for(let e=0;e<r.length;e++)i=this.#N(i,t,{prevent:Y,redirect:o},r[e]),n[e].element.location=z(t,n[e].route)}else for(let e=n.length-1;e>=t.I;e--)i=this.#C(i,t,{prevent:Y},n[e])}if(!t.R)for(let e=0;e<r.length;e++)e<t.I?e<n.length&&n[e].element&&(n[e].element.location=z(t,n[e].route)):(i=this.#N(i,t,{prevent:Y,redirect:o},r[e]),r[e].element&&(r[e].element.location=z(t,r[e].route)));return await i.then(async e=>{if(e&&a(e)){if("cancel"in e&&this.P)return this.P.A=t.A,this.P;if("redirect"in e)return await this.#O(e.redirect,t.M,t.A)}return t})}async#C(t,e,n,r){const i=z(e);let o=await t;if(this.#h(e)){o=F("onBeforeLeave",r.element,i,n,this)(o)}if(!a(o)||!("redirect"in o))return o}async#N(t,e,n,r){const i=z(e,r.route),o=await t;if(this.#h(e)){return F("onBeforeEnter",r.element,i,n,this)(o)}}#j(t,e){return t instanceof Element&&e instanceof Element&&(this.#r.has(t)&&this.#r.has(e)?t.localName===e.localName:t===e)}#h(t){return t.A===this.#s}async#O(t,e=0,n=0){if(e>256)throw new Error(d(`Too many redirects when rendering ${t.from}`));return await this.resolve({...V,pathname:this.urlForPath(t.pathname,t.params),redirectFrom:t.from,M:e+1,A:n})}#f(t=this.#a){if(!(t instanceof Element||t instanceof DocumentFragment))throw new TypeError(d(`Expected router outlet to be a valid DOM Element | DocumentFragment (but got ${t})`))}#y({pathname:t,search:e="",hash:n=""},r){if(window.location.pathname!==t||window.location.search!==e||window.location.hash!==n){const i=r?"replaceState":"pushState";window.history[i](null,document.title,t+e+n),window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}}#b(t,e){let n=this.#a;for(let r=0;r<(t.I??0);r++){const i=e?.chain?.[r].element;if(i){if(i.parentNode!==n)break;t.chain[r].element=i,n=i}}return n}#w(t,e){this.#f(),this.#A();const n=this.#b(t,e);this.#l=[],this.#u=Array.from(n?.children??[]).filter(e=>this.#n.has(e)&&e!==t.result);let r=n;for(let e=t.I??0;e<(t.chain?.length??0);e++){const i=t.chain[e].element;i&&(r?.appendChild(i),this.#n.add(i),r===n&&this.#l.push(i),r=i)}}#$(){if(this.#u)for(const t of this.#u)t.remove();this.#u=null,this.#l=null}#A(){if(this.#u&&this.#l){for(const t of this.#l)t.remove();this.#u=null,this.#l=null}}#x(t,e){if(e?.chain&&null!=t.I)for(let n=e.chain.length-1;n>=t.I&&this.#h(t);n--){const r=e.chain[n].element;if(r)try{const e=z(t);D(r.onAfterLeave,r,e,{},this)}finally{if(this.#u?.includes(r))for(const t of r.children)t.remove()}}}#v(t){if(t.chain&&null!=t.I)for(let e=t.I;e<t.chain.length&&this.#h(t);e++){const n=t.chain[e].element;if(n){const r=z(t,t.chain[e].route);D(n.onAfterEnter,n,r,{},this)}}}async#g(t){const e=this.#u?.[0],n=this.#l?.[0],r=[],{chain:i=[]}=t;let o;for(let t=i.length-1;t>=0;t--)if(i[t].route.animate){o=i[t].route.animate;break}if(e&&n&&o){const t=a(o)&&o.leave?o.leave:"leaving",i=a(o)&&o.enter?o.enter:"entering";r.push(P(e,t)),r.push(P(n,i))}return await Promise.all(r),t}subscribe(){window.addEventListener("vaadin-router-go",this.#i)}unsubscribe(){window.removeEventListener("vaadin-router-go",this.#i)}#o(t){const{pathname:e,search:n,hash:r}=t instanceof CustomEvent?t.detail:window.location;l(this.N(e))&&(t?.preventDefault&&t.preventDefault(),this.render({pathname:e,search:n,hash:r},!0))}static setTriggers(...t){q(t)}urlForName(t,e){return this.#c||(this.#c=S(this,{cacheKeyProvider:t=>"component"in t&&"string"==typeof t.component?t.component:void 0})),_(this.#c(t,e??void 0),this)}urlForPath(t,n){return _(e(t)(n??void 0),this)}static go(t){const{pathname:e,search:n,hash:r}=l(t)?new URL(t,"http://a"):t;return U("go",{pathname:e,search:n,hash:r})}}(nt);rt.setRoutes(et);const it=customElements.define.bind(customElements);customElements.define=(t,e)=>{customElements.get(t)||it(t,e)},window.process={env:{NODE_ENV:"development"}};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot=globalThis,st=ot.ShadowRoot&&(void 0===ot.ShadyCSS||ot.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,at=Symbol(),ct=new WeakMap;let lt=class{constructor(t,e,n){if(this._$cssResult$=!0,n!==at)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(st&&void 0===t){const n=void 0!==e&&1===e.length;n&&(t=ct.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),n&&ct.set(e,t))}return t}toString(){return this.cssText}};const ut=(t,...e)=>{const n=1===t.length?t[0]:e.reduce((e,n,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[r+1],t[0]);return new lt(n,t,at)},dt=st?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return(t=>new lt("string"==typeof t?t:t+"",void 0,at))(e)})(t):t,{is:ht,defineProperty:ft,getOwnPropertyDescriptor:pt,getOwnPropertyNames:mt,getOwnPropertySymbols:yt,getPrototypeOf:bt}=Object,wt=globalThis,gt=wt.trustedTypes,vt=gt?gt.emptyScript:"",xt=wt.reactiveElementPolyfillSupport,$t=(t,e)=>t,Et={toAttribute(t,e){switch(e){case Boolean:t=t?vt:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let n=t;switch(e){case Boolean:n=null!==t;break;case Number:n=null===t?null:Number(t);break;case Object:case Array:try{n=JSON.parse(t)}catch(t){n=null}}return n}},kt=(t,e)=>!ht(t,e),Ot={attribute:!0,type:String,converter:Et,reflect:!1,useDefault:!1,hasChanged:kt};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),wt.litPropertyMetadata??=new WeakMap;let St=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Ot){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const n=Symbol(),r=this.getPropertyDescriptor(t,n,e);void 0!==r&&ft(this.prototype,t,r)}}static getPropertyDescriptor(t,e,n){const{get:r,set:i}=pt(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const o=r?.call(this);i?.call(this,e),this.requestUpdate(t,o,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ot}static _$Ei(){if(this.hasOwnProperty($t("elementProperties")))return;const t=bt(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($t("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($t("properties"))){const t=this.properties,e=[...mt(t),...yt(t)];for(const n of e)this.createProperty(n,t[n])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,n]of e)this.elementProperties.set(t,n)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const n=this._$Eu(t,e);void 0!==n&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const n=new Set(t.flat(1/0).reverse());for(const t of n)e.unshift(dt(t))}else void 0!==t&&e.push(dt(t));return e}static _$Eu(t,e){const n=e.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const n of e.keys())this.hasOwnProperty(n)&&(t.set(n,this[n]),delete this[n]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(st)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const n of e){const e=document.createElement("style"),r=ot.litNonce;void 0!==r&&e.setAttribute("nonce",r),e.textContent=n.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,n){this._$AK(t,n)}_$ET(t,e){const n=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,n);if(void 0!==r&&!0===n.reflect){const i=(void 0!==n.converter?.toAttribute?n.converter:Et).toAttribute(e,n.type);this._$Em=t,null==i?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(t,e){const n=this.constructor,r=n._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=n.getPropertyOptions(r),i="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:Et;this._$Em=r,this[r]=i.fromAttribute(e,t.type)??this._$Ej?.get(r)??null,this._$Em=null}}requestUpdate(t,e,n){if(void 0!==t){const r=this.constructor,i=this[t];if(n??=r.getPropertyOptions(t),!((n.hasChanged??kt)(i,e)||n.useDefault&&n.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,n))))return;this.C(t,e,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:n,reflect:r,wrapped:i},o){n&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==i||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||n||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,n]of t){const{wrapped:t}=n,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,n,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};St.elementStyles=[],St.shadowRootOptions={mode:"open"},St[$t("elementProperties")]=new Map,St[$t("finalized")]=new Map,xt?.({ReactiveElement:St}),(wt.reactiveElementVersions??=[]).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const jt=globalThis,Ct=jt.trustedTypes,Nt=Ct?Ct.createPolicy("lit-html",{createHTML:t=>t}):void 0,At="$lit$",Tt=`lit$${Math.random().toFixed(9).slice(2)}$`,Pt="?"+Tt,Rt=`<${Pt}>`,Mt=document,_t=()=>Mt.createComment(""),It=t=>null===t||"object"!=typeof t&&"function"!=typeof t,zt=Array.isArray,Bt="[ \t\n\f\r]",Dt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ft=/-->/g,Ut=/>/g,Lt=RegExp(`>|${Bt}(?:([^\\s"'>=/]+)(${Bt}*=${Bt}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Wt=/'/g,Jt=/"/g,Ht=/^(?:script|style|textarea|title)$/i,Kt=(t=>(e,...n)=>({_$litType$:t,strings:e,values:n}))(1),qt=Symbol.for("lit-noChange"),Yt=Symbol.for("lit-nothing"),Vt=new WeakMap,Gt=Mt.createTreeWalker(Mt,129);function Zt(t,e){if(!zt(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==Nt?Nt.createHTML(e):e}const Qt=(t,e)=>{const n=t.length-1,r=[];let i,o=2===e?"<svg>":3===e?"<math>":"",s=Dt;for(let e=0;e<n;e++){const n=t[e];let a,c,l=-1,u=0;for(;u<n.length&&(s.lastIndex=u,c=s.exec(n),null!==c);)u=s.lastIndex,s===Dt?"!--"===c[1]?s=Ft:void 0!==c[1]?s=Ut:void 0!==c[2]?(Ht.test(c[2])&&(i=RegExp("</"+c[2],"g")),s=Lt):void 0!==c[3]&&(s=Lt):s===Lt?">"===c[0]?(s=i??Dt,l=-1):void 0===c[1]?l=-2:(l=s.lastIndex-c[2].length,a=c[1],s=void 0===c[3]?Lt:'"'===c[3]?Jt:Wt):s===Jt||s===Wt?s=Lt:s===Ft||s===Ut?s=Dt:(s=Lt,i=void 0);const d=s===Lt&&t[e+1].startsWith("/>")?" ":"";o+=s===Dt?n+Rt:l>=0?(r.push(a),n.slice(0,l)+At+n.slice(l)+Tt+d):n+Tt+(-2===l?e:d)}return[Zt(t,o+(t[n]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class Xt{constructor({strings:t,_$litType$:e},n){let r;this.parts=[];let i=0,o=0;const s=t.length-1,a=this.parts,[c,l]=Qt(t,e);if(this.el=Xt.createElement(c,n),Gt.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=Gt.nextNode())&&a.length<s;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(At)){const e=l[o++],n=r.getAttribute(t).split(Tt),s=/([.?@])?(.*)/.exec(e);a.push({type:1,index:i,name:s[2],strings:n,ctor:"."===s[1]?ie:"?"===s[1]?oe:"@"===s[1]?se:re}),r.removeAttribute(t)}else t.startsWith(Tt)&&(a.push({type:6,index:i}),r.removeAttribute(t));if(Ht.test(r.tagName)){const t=r.textContent.split(Tt),e=t.length-1;if(e>0){r.textContent=Ct?Ct.emptyScript:"";for(let n=0;n<e;n++)r.append(t[n],_t()),Gt.nextNode(),a.push({type:2,index:++i});r.append(t[e],_t())}}}else if(8===r.nodeType)if(r.data===Pt)a.push({type:2,index:i});else{let t=-1;for(;-1!==(t=r.data.indexOf(Tt,t+1));)a.push({type:7,index:i}),t+=Tt.length-1}i++}}static createElement(t,e){const n=Mt.createElement("template");return n.innerHTML=t,n}}function te(t,e,n=t,r){if(e===qt)return e;let i=void 0!==r?n._$Co?.[r]:n._$Cl;const o=It(e)?void 0:e._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),void 0===o?i=void 0:(i=new o(t),i._$AT(t,n,r)),void 0!==r?(n._$Co??=[])[r]=i:n._$Cl=i),void 0!==i&&(e=te(t,i._$AS(t,e.values),i,r)),e}class ee{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:n}=this._$AD,r=(t?.creationScope??Mt).importNode(e,!0);Gt.currentNode=r;let i=Gt.nextNode(),o=0,s=0,a=n[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new ne(i,i.nextSibling,this,t):1===a.type?e=new a.ctor(i,a.name,a.strings,this,t):6===a.type&&(e=new ae(i,this,t)),this._$AV.push(e),a=n[++s]}o!==a?.index&&(i=Gt.nextNode(),o++)}return Gt.currentNode=Mt,r}p(t){let e=0;for(const n of this._$AV)void 0!==n&&(void 0!==n.strings?(n._$AI(t,n,e),e+=n.strings.length-2):n._$AI(t[e])),e++}}class ne{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,n,r){this.type=2,this._$AH=Yt,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=te(this,t,e),It(t)?t===Yt||null==t||""===t?(this._$AH!==Yt&&this._$AR(),this._$AH=Yt):t!==this._$AH&&t!==qt&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>zt(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Yt&&It(this._$AH)?this._$AA.nextSibling.data=t:this.T(Mt.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:n}=t,r="number"==typeof n?this._$AC(t):(void 0===n.el&&(n.el=Xt.createElement(Zt(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new ee(r,this),n=t.u(this.options);t.p(e),this.T(n),this._$AH=t}}_$AC(t){let e=Vt.get(t.strings);return void 0===e&&Vt.set(t.strings,e=new Xt(t)),e}k(t){zt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let n,r=0;for(const i of t)r===e.length?e.push(n=new ne(this.O(_t()),this.O(_t()),this,this.options)):n=e[r],n._$AI(i),r++;r<e.length&&(this._$AR(n&&n._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class re{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,n,r,i){this.type=1,this._$AH=Yt,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=i,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Yt}_$AI(t,e=this,n,r){const i=this.strings;let o=!1;if(void 0===i)t=te(this,t,e,0),o=!It(t)||t!==this._$AH&&t!==qt,o&&(this._$AH=t);else{const r=t;let s,a;for(t=i[0],s=0;s<i.length-1;s++)a=te(this,r[n+s],e,s),a===qt&&(a=this._$AH[s]),o||=!It(a)||a!==this._$AH[s],a===Yt?t=Yt:t!==Yt&&(t+=(a??"")+i[s+1]),this._$AH[s]=a}o&&!r&&this.j(t)}j(t){t===Yt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ie extends re{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Yt?void 0:t}}class oe extends re{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Yt)}}class se extends re{constructor(t,e,n,r,i){super(t,e,n,r,i),this.type=5}_$AI(t,e=this){if((t=te(this,t,e,0)??Yt)===qt)return;const n=this._$AH,r=t===Yt&&n!==Yt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,i=t!==Yt&&(n===Yt||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ae{constructor(t,e,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){te(this,t)}}const ce=jt.litHtmlPolyfillSupport;ce?.(Xt,ne),(jt.litHtmlVersions??=[]).push("3.3.0");const le=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ue extends St{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,n)=>{const r=n?.renderBefore??e;let i=r._$litPart$;if(void 0===i){const t=n?.renderBefore??null;r._$litPart$=i=new ne(e.insertBefore(_t(),t),t,void 0,n??{})}return i._$AI(t),i})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return qt}}ue._$litElement$=!0,ue.finalized=!0,le.litElementHydrateSupport?.({LitElement:ue});const de=le.litElementPolyfillSupport;de?.({LitElement:ue}),(le.litElementVersions??=[]).push("4.2.0");const he=ut`
  nav {
    padding: 0.75rem;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index: 10;
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
`,fe=ut`
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
`;customElements.define("language-switcher",class extends ue{static properties={lang:{type:String}};static styles=fe;#T=t=>{this.lang=t.detail};constructor(){super(),this.getLang=Q,this.setLang=Z,this.lang=this.getLang()}connectedCallback(){super.connectedCallback(),this.lang=this.getLang(),window.addEventListener("lang-changed",this.#T)}disconnectedCallback(){window.removeEventListener("lang-changed",this.#T),super.disconnectedCallback()}toggleLanguage(){const t=["en","tr"],e=t.indexOf(this.lang),n=t[(e+1)%t.length];this.setLang(n)}render(){const t="en"===this.lang?"tr":"en";return Kt`
      <button @click=${this.toggleLanguage}>
        <img
          src="/public/icons/flags/${t}.png"
          alt="Switch to ${t}"
          width="24"
          height="16"
        />
      </button>
    `}});class pe extends ue{static properties={navigation:{type:Object},t:{type:Function},currentPath:{type:String}};static styles=he;constructor(){super(),this.navigation={},this.t=tt,this.currentPath=window.location.pathname}connectedCallback(){super.connectedCallback(),this.loadTranslations(),this._onPopState=()=>{this.currentPath=window.location.pathname},window.addEventListener("popstate",this._onPopState),this.langObserver=new MutationObserver(()=>this.loadTranslations()),this.langObserver.observe(document.documentElement,{attributes:!0,attributeFilter:["lang"]})}disconnectedCallback(){window.removeEventListener("popstate",this._onPopState),this.langObserver?.disconnect(),super.disconnectedCallback()}async loadTranslations(){this.navigation=await this.t("common.mainLayout")}render(){const t=this.navigation||{},e=t=>this.currentPath===t?"opacity: 1;":"";return Kt`
      <nav>
        <div class="logo">
          <img src="/public/images/ing-logo.png" alt="Logo" />
          <span class="logo-text">ING</span>
        </div>
        <div class="links">
          <a href="/employees" style=${e("/employees")}>
            <img
              src="/public/icons/employee.png"
              alt="Employees Icon"
              width="24"
              height="24"
            />
            ${t.employees}
          </a>
          <a href="/employees/add" style=${e("/employees/add")}>
            <img
              src="/public/icons/add.png"
              alt="Add Icon"
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
    `}}customElements.define("main-layout",pe);var me=Object.freeze({__proto__:null,MainLayout:pe});const ye=ut`
  .table-wrapper {
    overflow-x: auto;
    width: 100%;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    min-width: 600px;
  }

  th,
  td {
    padding: 0.75rem;
    text-align: center;
    font-size: 0.8rem;
    white-space: nowrap;
  }

  .table-wrapper::-webkit-scrollbar {
    height: 6px;
  }

  .table-wrapper::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }

  th {
    color: var(--color-primary);
    font-weight: 400;
  }

  td {
    color: var(--color-text-secondary);
    font-weight: 300;
  }

  tr {
    border-top: 1px solid #f6f6f6;
  }

  thead tr {
    border-top: none;
  }

  tbody tr {
    transition: all 0.2s ease-in-out;
  }

  tbody tr:hover {
    cursor: pointer;
    background-color: var(--color-primary-light);
  }

  tr.selected {
    background-color: var(--color-primary-light);
  }

  .large-checkbox {
    height: 18px;
    width: 18px;
    accent-color: var(--color-primary);
    border: 1px solid var(--color-text-secondary);
    border-radius: 6px;
  }

  .select-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem 0.5rem;
  }
`;class be extends ue{static properties={columns:{type:Array},rows:{type:Array},selectedRows:{type:Array},selectable:{type:Boolean},multiSelect:{type:Boolean}};static styles=ye;constructor(){super(),this.columns=[],this.rows=[],this.selectedRows=[],this.selectable=!1,this.multiSelect=!1}isSelected(t){return this.selectedRows.includes(t)}_dispatchSelectionChanged(){this.dispatchEvent(new CustomEvent("selection-changed",{detail:{selectedRows:this.selectedRows},bubbles:!0,composed:!0}))}toggleRow(t){this.selectable&&(this.multiSelect?this.selectedRows=this.isSelected(t)?this.selectedRows.filter(e=>e!==t):[...this.selectedRows,t]:this.selectedRows=this.isSelected(t)?[]:[t],this._dispatchSelectionChanged())}toggleSelectAll(t){this.multiSelect&&(this.selectedRows=t.target.checked?[...this.rows]:[],this._dispatchSelectionChanged())}renderHeader(){return Kt`
      <thead>
        <tr>
          ${this.selectable?Kt`<th class="select-cell">
                ${this.multiSelect?Kt`<input
                      class="large-checkbox"
                      type="checkbox"
                      .checked=${this.selectedRows.length===this.rows.length&&this.rows.length>0}
                      @change=${this.toggleSelectAll}
                      aria-label="Select all rows"
                    />`:""}
              </th>`:""}
          ${this.columns.map(t=>Kt`<th class="column-header">${t.label}</th>`)}
        </tr>
      </thead>
    `}renderBody(){return Kt`
      <tbody>
        ${this.rows.map(t=>Kt`
            <tr
              class=${this.isSelected(t)?"selected":""}
              @click=${()=>this.toggleRow(t)}
            >
              ${this.selectable?Kt`<td
                    class="select-cell"
                    @click=${t=>t.stopPropagation()}
                  >
                    <input
                      class="large-checkbox"
                      type=${this.multiSelect?"checkbox":"radio"}
                      name="select-row"
                      .checked=${this.isSelected(t)}
                      @change=${()=>this.toggleRow(t)}
                      aria-label="Select row"
                    />
                  </td>`:""}
              ${this.columns.map(e=>Kt`<td class="cell-content">
                    ${e.render?e.render(t):t[e.key]}
                  </td>`)}
            </tr>
          `)}
      </tbody>
    `}render(){return Kt`
      <div class="table-wrapper">
        <table>
          ${this.renderHeader()} ${this.renderBody()}
          <tfoot>
            <slot name="footer"></slot>
          </tfoot>
        </table>
      </div>
    `}}customElements.define("data-table",be);const we=ut`
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 3rem 8rem;
  }

  .card {
    position: relative;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 1rem;
    background: white;
    cursor: pointer;
    user-select: none;
    box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
    transition: box-shadow 0.2s ease;
    display: flex;
    flex-direction: column;
  }

  .card.selected {
    background-color: var(--color-primary-light);
    border-color: var(--color-primary);
    box-shadow: 0 0 10px #339af0;
  }

  .card:hover {
    box-shadow: 0 4px 8px rgb(0 0 0 / 0.15);
  }

  .card-header {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
  }

  .card-checkbox {
    margin: 0;
    height: 18px;
    width: 18px;
    accent-color: var(--color-primary);
    border: 1px solid var(--color-text-secondary);
    border-radius: 6px;
  }

  .card-field {
    margin-bottom: 0.25rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .card-content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  .card-label {
    font-weight: 300;
    color: var(--color-text-secondary);
  }

  .card-value {
    font-weight: 400;
    color: var(--color-text);
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;class ge extends ue{static properties={columns:{type:Array},rows:{type:Array},selectedRows:{type:Array},selectable:{type:Boolean},multiSelect:{type:Boolean}};static styles=we;constructor(){super(),this.columns=[],this.rows=[],this.selectedRows=[],this.selectable=!1,this.multiSelect=!1}isSelected(t){return this.selectedRows.includes(t)}toggleRow(t){if(!this.selectable)return;let e;e=this.multiSelect?this.isSelected(t)?this.selectedRows.filter(e=>e!==t):[...this.selectedRows,t]:this.isSelected(t)?[]:[t],this.selectedRows=e,this.dispatchEvent(new CustomEvent("selection-changed",{detail:{selectedRows:this.selectedRows},bubbles:!0,composed:!0}))}render(){return Kt`
      <div class="grid">
        ${this.rows.map(t=>Kt`
            <div
              class="card ${this.isSelected(t)?"selected":""}"
              @click=${()=>this.toggleRow(t)}
            >
              ${this.selectable?Kt`
                    <label
                      class="card-header"
                      @click=${t=>t.stopPropagation()}
                    >
                      <input
                        type=${this.multiSelect?"checkbox":"radio"}
                        name="select-row"
                        class="card-checkbox"
                        .checked=${this.isSelected(t)}
                        @change=${()=>this.toggleRow(t)}
                        aria-label="Select row"
                      />
                    </label>
                  `:""}
              <div class="card-content">
                ${this.columns.map(e=>Kt`
                    <div class="card-field">
                      ${e.hideLabel?"":Kt`<span class="card-label">${e.label}:</span>`}
                      ${e.render?e.render(t):Kt`<span class="card-value">${t[e.key]}</span>`}
                    </div>
                  `)}
              </div>
            </div>
          `)}
      </div>
    `}}customElements.define("data-grid",ge);const ve=ut`
  .pagination {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    margin-top: 1.5rem;
    flex-wrap: wrap;
  }

  button {
    background: transparent;
    border: none;
    width: 32px;
    height: 32px;
    cursor: pointer;
    border-radius: 9999px;
    transition: all 0.2s ease-in-out;
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button.active {
    background: var(--color-primary, #339af0);
    color: white;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .arrows svg path {
    stroke: var(--color-primary) !important;
  }

  .arrows:disabled svg path {
    stroke: var(--color-text-secondary) !important;
  }
`;customElements.define("pagination-controls",class extends ue{static properties={totalItems:{type:Number},itemsPerPage:{type:Number},currentPage:{type:Number}};static styles=ve;constructor(){super(),this.totalItems=0,this.itemsPerPage=10,this.currentPage=1}get totalPages(){return Math.max(1,Math.ceil(this.totalItems/this.itemsPerPage))}changePage(t){t===this.currentPage||t<1||t>this.totalPages||this.dispatchEvent(new CustomEvent("page-changed",{detail:{page:t},bubbles:!0,composed:!0}))}render(){const t=this.totalPages,e=this.currentPage,n=[];if(n.push(1),t<=7)for(let e=2;e<=t;e++)n.push(e);else{if(e<=3){for(let t=2;t<=5;t++)n.push(t);n.push("...")}else if(e>=t-2){n.push("...");for(let e=t-4;e<t;e++)n.push(e)}else n.push("..."),n.push(e-1),n.push(e),n.push(e+1),n.push("...");n.push(t)}return Kt`
      <div class="pagination">
        <button
          class="arrows"
          @click=${()=>this.changePage(e-1)}
          ?disabled=${1===e}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15 6L9 12L15 18"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        ${n.map(t=>"..."===t?Kt`<span style="padding: 0 0.25rem;">...</span>`:Kt`
                <button
                  class=${t===e?"active":""}
                  @click=${()=>this.changePage(t)}
                >
                  ${t}
                </button>
              `)}

        <button
          class="arrows"
          @click=${()=>this.changePage(e+1)}
          ?disabled=${e===t}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            style="transform: rotateY(180deg)"
          >
            <path
              d="M15 6L9 12L15 18"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    `}});const xe=ut`
  :host {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 1000;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
    animation: fadeOut 0.3s forwards;
  }

  :host([open]) {
    display: flex;
    animation: fadeIn 0.3s forwards;
  }

  .modal {
    background: white;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow: auto;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    position: relative;
    padding: 1.5rem 1.5rem 2rem 1.5rem;
    box-sizing: border-box;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  button.close-button {
    background: none;
    border: none;
    font-size: 2.5rem;
    cursor: pointer;
    line-height: 1;
    padding: 0;
    opacity: 0.7;
    color: var(--color-primary);
    transition: opacity 0.2s ease;
  }

  #modal-title {
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--color-primary);
  }

  button.close-button:hover {
    opacity: 1;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;class $e extends ue{static properties={open:{type:Boolean,reflect:!0},title:{type:String}};static styles=xe;constructor(){super(),this.open=!1,this.title="",this._handleKeydown=this._handleKeydown.bind(this)}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this._handleKeydown)}disconnectedCallback(){document.removeEventListener("keydown",this._handleKeydown),super.disconnectedCallback()}_handleKeydown(t){this.open&&"Escape"===t.key&&this.close()}close(){this.open=!1,this.dispatchEvent(new CustomEvent("modal-closed",{bubbles:!0,composed:!0}))}_onBackdropClick(t){t.target===this.shadowRoot.querySelector(".backdrop")&&this.close()}render(){return Kt`
      <div class="backdrop" @click=${this._onBackdropClick} part="backdrop">
        <section
          class="modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          tabindex="-1"
        >
          <header>
            <span id="modal-title">${this.title}</span>
            <button
              class="close-button"
              aria-label="Close modal"
              @click=${this.close}
            >
              &times;
            </button>
          </header>
          <slot></slot>
        </section>
      </div>
    `}}customElements.define("modal-dialog",$e);var Ee=(()=>"function"==typeof Symbol&&Symbol.observable||"@@observable")(),ke=()=>Math.random().toString(36).substring(7).split("").join("."),Oe={INIT:`@@redux/INIT${ke()}`,REPLACE:`@@redux/REPLACE${ke()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${ke()}`};function Se(t){if("object"!=typeof t||null===t)return!1;let e=t;for(;null!==Object.getPrototypeOf(e);)e=Object.getPrototypeOf(e);return Object.getPrototypeOf(t)===e||null===Object.getPrototypeOf(t)}function je(t){if(void 0===t)return"undefined";if(null===t)return"null";const e=typeof t;switch(e){case"boolean":case"string":case"number":case"symbol":case"function":return e}if(Array.isArray(t))return"array";if(function(t){return t instanceof Date||"function"==typeof t.toDateString&&"function"==typeof t.getDate&&"function"==typeof t.setDate}(t))return"date";if(function(t){return t instanceof Error||"string"==typeof t.message&&t.constructor&&"number"==typeof t.constructor.stackTraceLimit}(t))return"error";const n=function(t){return"function"==typeof t.constructor?t.constructor.name:null}(t);switch(n){case"Symbol":case"Promise":case"WeakMap":case"WeakSet":case"Map":case"Set":return n}return Object.prototype.toString.call(t).slice(8,-1).toLowerCase().replace(/\s/g,"")}function Ce(t){let e=typeof t;return e=je(t),e}function Ne(t,e,n){if("function"!=typeof t)throw new Error(`Expected the root reducer to be a function. Instead, received: '${Ce(t)}'`);if("function"==typeof e&&"function"==typeof n||"function"==typeof n&&"function"==typeof arguments[3])throw new Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");if("function"==typeof e&&void 0===n&&(n=e,e=void 0),void 0!==n){if("function"!=typeof n)throw new Error(`Expected the enhancer to be a function. Instead, received: '${Ce(n)}'`);return n(Ne)(t,e)}let r=t,i=e,o=new Map,s=o,a=0,c=!1;function l(){s===o&&(s=new Map,o.forEach((t,e)=>{s.set(e,t)}))}function u(){if(c)throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");return i}function d(t){if("function"!=typeof t)throw new Error(`Expected the listener to be a function. Instead, received: '${Ce(t)}'`);if(c)throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");let e=!0;l();const n=a++;return s.set(n,t),function(){if(e){if(c)throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");e=!1,l(),s.delete(n),o=null}}}function h(t){if(!Se(t))throw new Error(`Actions must be plain objects. Instead, the actual type was: '${Ce(t)}'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.`);if(void 0===t.type)throw new Error('Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');if("string"!=typeof t.type)throw new Error(`Action "type" property must be a string. Instead, the actual type was: '${Ce(t.type)}'. Value was: '${t.type}' (stringified)`);if(c)throw new Error("Reducers may not dispatch actions.");try{c=!0,i=r(i,t)}finally{c=!1}return(o=s).forEach(t=>{t()}),t}h({type:Oe.INIT});return{dispatch:h,subscribe:d,getState:u,replaceReducer:function(t){if("function"!=typeof t)throw new Error(`Expected the nextReducer to be a function. Instead, received: '${Ce(t)}`);r=t,h({type:Oe.REPLACE})},[Ee]:function(){const t=d;return{subscribe(e){if("object"!=typeof e||null===e)throw new Error(`Expected the observer to be an object. Instead, received: '${Ce(e)}'`);function n(){const t=e;t.next&&t.next(u())}n();return{unsubscribe:t(n)}},[Ee](){return this}}}}}function Ae(t){"undefined"!=typeof console&&"function"==typeof console.error&&console.error(t);try{throw new Error(t)}catch(t){}}function Te(t){const e=Object.keys(t),n={};for(let r=0;r<e.length;r++){const i=e[r];void 0===t[i]&&Ae(`No reducer provided for key "${i}"`),"function"==typeof t[i]&&(n[i]=t[i])}const r=Object.keys(n);let i,o;i={};try{!function(t){Object.keys(t).forEach(e=>{const n=t[e];if(void 0===n(void 0,{type:Oe.INIT}))throw new Error(`The slice reducer for key "${e}" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`);if(void 0===n(void 0,{type:Oe.PROBE_UNKNOWN_ACTION()}))throw new Error(`The slice reducer for key "${e}" returned undefined when probed with a random type. Don't try to handle '${Oe.INIT}' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.`)})}(n)}catch(t){o=t}return function(t={},e){if(o)throw o;{const r=function(t,e,n,r){const i=Object.keys(e),o=n&&n.type===Oe.INIT?"preloadedState argument passed to createStore":"previous state received by the reducer";if(0===i.length)return"Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";if(!Se(t))return`The ${o} has unexpected type of "${Ce(t)}". Expected argument to be an object with the following keys: "${i.join('", "')}"`;const s=Object.keys(t).filter(t=>!e.hasOwnProperty(t)&&!r[t]);return s.forEach(t=>{r[t]=!0}),n&&n.type===Oe.REPLACE?void 0:s.length>0?`Unexpected ${s.length>1?"keys":"key"} "${s.join('", "')}" found in ${o}. Expected to find one of the known reducer keys instead: "${i.join('", "')}". Unexpected keys will be ignored.`:void 0}(t,n,e,i);r&&Ae(r)}let s=!1;const a={};for(let i=0;i<r.length;i++){const o=r[i],c=n[o],l=t[o],u=c(l,e);if(void 0===u){const t=e&&e.type;throw new Error(`When called with an action of type ${t?`"${String(t)}"`:"(unknown type)"}, the slice reducer for key "${o}" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.`)}a[o]=u,s=s||u!==l}return s=s||r.length!==Object.keys(t).length,s?a:t}}function Pe(...t){return 0===t.length?t=>t:1===t.length?t[0]:t.reduce((t,e)=>(...n)=>t(e(...n)))}function Re(t){return Se(t)&&"type"in t&&"string"==typeof t.type}var Me=Symbol.for("immer-nothing"),_e=Symbol.for("immer-draftable"),Ie=Symbol.for("immer-state"),ze=[function(t){return`The plugin for '${t}' has not been loaded into Immer. To enable the plugin, import and call \`enable${t}()\` when initializing your application.`},function(t){return`produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${t}'`},"This object has been frozen and should not be mutated",function(t){return"Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? "+t},"An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.","Immer forbids circular references","The first or second argument to `produce` must be a function","The third argument to `produce` must be a function or undefined","First argument to `createDraft` must be a plain object, an array, or an immerable object","First argument to `finishDraft` must be a draft returned by `createDraft`",function(t){return`'current' expects a draft, got: ${t}`},"Object.defineProperty() cannot be used on an Immer draft","Object.setPrototypeOf() cannot be used on an Immer draft","Immer only supports deleting array indices","Immer only supports setting array indices and the 'length' property",function(t){return`'original' expects a draft, got: ${t}`}];function Be(t,...e){{const n=ze[t],r="function"==typeof n?n.apply(null,e):n;throw new Error(`[Immer] ${r}`)}}var De=Object.getPrototypeOf;function Fe(t){return!!t&&!!t[Ie]}function Ue(t){return!!t&&(We(t)||Array.isArray(t)||!!t[_e]||!!t.constructor?.[_e]||Ye(t)||Ve(t))}var Le=Object.prototype.constructor.toString();function We(t){if(!t||"object"!=typeof t)return!1;const e=De(t);if(null===e)return!0;const n=Object.hasOwnProperty.call(e,"constructor")&&e.constructor;return n===Object||"function"==typeof n&&Function.toString.call(n)===Le}function Je(t,e){0===He(t)?Reflect.ownKeys(t).forEach(n=>{e(n,t[n],t)}):t.forEach((n,r)=>e(r,n,t))}function He(t){const e=t[Ie];return e?e.type_:Array.isArray(t)?1:Ye(t)?2:Ve(t)?3:0}function Ke(t,e){return 2===He(t)?t.has(e):Object.prototype.hasOwnProperty.call(t,e)}function qe(t,e,n){const r=He(t);2===r?t.set(e,n):3===r?t.add(n):t[e]=n}function Ye(t){return t instanceof Map}function Ve(t){return t instanceof Set}function Ge(t){return t.copy_||t.base_}function Ze(t,e){if(Ye(t))return new Map(t);if(Ve(t))return new Set(t);if(Array.isArray(t))return Array.prototype.slice.call(t);const n=We(t);if(!0===e||"class_only"===e&&!n){const e=Object.getOwnPropertyDescriptors(t);delete e[Ie];let n=Reflect.ownKeys(e);for(let r=0;r<n.length;r++){const i=n[r],o=e[i];!1===o.writable&&(o.writable=!0,o.configurable=!0),(o.get||o.set)&&(e[i]={configurable:!0,writable:!0,enumerable:o.enumerable,value:t[i]})}return Object.create(De(t),e)}{const e=De(t);if(null!==e&&n)return{...t};const r=Object.create(e);return Object.assign(r,t)}}function Qe(t,e=!1){return tn(t)||Fe(t)||!Ue(t)||(He(t)>1&&(t.set=t.add=t.clear=t.delete=Xe),Object.freeze(t),e&&Object.entries(t).forEach(([t,e])=>Qe(e,!0))),t}function Xe(){Be(2)}function tn(t){return Object.isFrozen(t)}var en,nn={};function rn(t){const e=nn[t];return e||Be(0,t),e}function on(){return en}function sn(t,e){e&&(rn("Patches"),t.patches_=[],t.inversePatches_=[],t.patchListener_=e)}function an(t){cn(t),t.drafts_.forEach(un),t.drafts_=null}function cn(t){t===en&&(en=t.parent_)}function ln(t){return en={drafts_:[],parent_:en,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0}}function un(t){const e=t[Ie];0===e.type_||1===e.type_?e.revoke_():e.revoked_=!0}function dn(t,e){e.unfinalizedDrafts_=e.drafts_.length;const n=e.drafts_[0];return void 0!==t&&t!==n?(n[Ie].modified_&&(an(e),Be(4)),Ue(t)&&(t=hn(e,t),e.parent_||pn(e,t)),e.patches_&&rn("Patches").generateReplacementPatches_(n[Ie].base_,t,e.patches_,e.inversePatches_)):t=hn(e,n,[]),an(e),e.patches_&&e.patchListener_(e.patches_,e.inversePatches_),t!==Me?t:void 0}function hn(t,e,n){if(tn(e))return e;const r=e[Ie];if(!r)return Je(e,(i,o)=>fn(t,r,e,i,o,n)),e;if(r.scope_!==t)return e;if(!r.modified_)return pn(t,r.base_,!0),r.base_;if(!r.finalized_){r.finalized_=!0,r.scope_.unfinalizedDrafts_--;const e=r.copy_;let i=e,o=!1;3===r.type_&&(i=new Set(e),e.clear(),o=!0),Je(i,(i,s)=>fn(t,r,e,i,s,n,o)),pn(t,e,!1),n&&t.patches_&&rn("Patches").generatePatches_(r,n,t.patches_,t.inversePatches_)}return r.copy_}function fn(t,e,n,r,i,o,s){if(i===n&&Be(5),Fe(i)){const s=hn(t,i,o&&e&&3!==e.type_&&!Ke(e.assigned_,r)?o.concat(r):void 0);if(qe(n,r,s),!Fe(s))return;t.canAutoFreeze_=!1}else s&&n.add(i);if(Ue(i)&&!tn(i)){if(!t.immer_.autoFreeze_&&t.unfinalizedDrafts_<1)return;hn(t,i),e&&e.scope_.parent_||"symbol"==typeof r||!Object.prototype.propertyIsEnumerable.call(n,r)||pn(t,i)}}function pn(t,e,n=!1){!t.parent_&&t.immer_.autoFreeze_&&t.canAutoFreeze_&&Qe(e,n)}var mn={get(t,e){if(e===Ie)return t;const n=Ge(t);if(!Ke(n,e))return function(t,e,n){const r=wn(e,n);return r?"value"in r?r.value:r.get?.call(t.draft_):void 0}(t,n,e);const r=n[e];return t.finalized_||!Ue(r)?r:r===bn(t.base_,e)?(vn(t),t.copy_[e]=xn(r,t)):r},has:(t,e)=>e in Ge(t),ownKeys:t=>Reflect.ownKeys(Ge(t)),set(t,e,n){const r=wn(Ge(t),e);if(r?.set)return r.set.call(t.draft_,n),!0;if(!t.modified_){const r=bn(Ge(t),e),i=r?.[Ie];if(i&&i.base_===n)return t.copy_[e]=n,t.assigned_[e]=!1,!0;if(function(t,e){return t===e?0!==t||1/t==1/e:t!=t&&e!=e}(n,r)&&(void 0!==n||Ke(t.base_,e)))return!0;vn(t),gn(t)}return t.copy_[e]===n&&(void 0!==n||e in t.copy_)||Number.isNaN(n)&&Number.isNaN(t.copy_[e])||(t.copy_[e]=n,t.assigned_[e]=!0),!0},deleteProperty:(t,e)=>(void 0!==bn(t.base_,e)||e in t.base_?(t.assigned_[e]=!1,vn(t),gn(t)):delete t.assigned_[e],t.copy_&&delete t.copy_[e],!0),getOwnPropertyDescriptor(t,e){const n=Ge(t),r=Reflect.getOwnPropertyDescriptor(n,e);return r?{writable:!0,configurable:1!==t.type_||"length"!==e,enumerable:r.enumerable,value:n[e]}:r},defineProperty(){Be(11)},getPrototypeOf:t=>De(t.base_),setPrototypeOf(){Be(12)}},yn={};function bn(t,e){const n=t[Ie];return(n?Ge(n):t)[e]}function wn(t,e){if(!(e in t))return;let n=De(t);for(;n;){const t=Object.getOwnPropertyDescriptor(n,e);if(t)return t;n=De(n)}}function gn(t){t.modified_||(t.modified_=!0,t.parent_&&gn(t.parent_))}function vn(t){t.copy_||(t.copy_=Ze(t.base_,t.scope_.immer_.useStrictShallowCopy_))}Je(mn,(t,e)=>{yn[t]=function(){return arguments[0]=arguments[0][0],e.apply(this,arguments)}}),yn.deleteProperty=function(t,e){return isNaN(parseInt(e))&&Be(13),yn.set.call(this,t,e,void 0)},yn.set=function(t,e,n){return"length"!==e&&isNaN(parseInt(e))&&Be(14),mn.set.call(this,t[0],e,n,t[0])};function xn(t,e){const n=Ye(t)?rn("MapSet").proxyMap_(t,e):Ve(t)?rn("MapSet").proxySet_(t,e):function(t,e){const n=Array.isArray(t),r={type_:n?1:0,scope_:e?e.scope_:on(),modified_:!1,finalized_:!1,assigned_:{},parent_:e,base_:t,draft_:null,copy_:null,revoke_:null,isManual_:!1};let i=r,o=mn;n&&(i=[r],o=yn);const{revoke:s,proxy:a}=Proxy.revocable(i,o);return r.draft_=a,r.revoke_=s,a}(t,e);return(e?e.scope_:on()).drafts_.push(n),n}function $n(t){if(!Ue(t)||tn(t))return t;const e=t[Ie];let n;if(e){if(!e.modified_)return e.base_;e.finalized_=!0,n=Ze(t,e.scope_.immer_.useStrictShallowCopy_)}else n=Ze(t,!0);return Je(n,(t,e)=>{qe(n,t,$n(e))}),e&&(e.finalized_=!1),n}var En=new class{constructor(t){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.produce=(t,e,n)=>{if("function"==typeof t&&"function"!=typeof e){const n=e;e=t;const r=this;return function(t=n,...i){return r.produce(t,t=>e.call(this,t,...i))}}let r;if("function"!=typeof e&&Be(6),void 0!==n&&"function"!=typeof n&&Be(7),Ue(t)){const i=ln(this),o=xn(t,void 0);let s=!0;try{r=e(o),s=!1}finally{s?an(i):cn(i)}return sn(i,n),dn(r,i)}if(!t||"object"!=typeof t){if(r=e(t),void 0===r&&(r=t),r===Me&&(r=void 0),this.autoFreeze_&&Qe(r,!0),n){const e=[],i=[];rn("Patches").generateReplacementPatches_(t,r,e,i),n(e,i)}return r}Be(1,t)},this.produceWithPatches=(t,e)=>{if("function"==typeof t)return(e,...n)=>this.produceWithPatches(e,e=>t(e,...n));let n,r;const i=this.produce(t,e,(t,e)=>{n=t,r=e});return[i,n,r]},"boolean"==typeof t?.autoFreeze&&this.setAutoFreeze(t.autoFreeze),"boolean"==typeof t?.useStrictShallowCopy&&this.setUseStrictShallowCopy(t.useStrictShallowCopy)}createDraft(t){Ue(t)||Be(8),Fe(t)&&(t=function(t){Fe(t)||Be(10,t);return $n(t)}(t));const e=ln(this),n=xn(t,void 0);return n[Ie].isManual_=!0,cn(e),n}finishDraft(t,e){const n=t&&t[Ie];n&&n.isManual_||Be(9);const{scope_:r}=n;return sn(r,e),dn(void 0,r)}setAutoFreeze(t){this.autoFreeze_=t}setUseStrictShallowCopy(t){this.useStrictShallowCopy_=t}applyPatches(t,e){let n;for(n=e.length-1;n>=0;n--){const r=e[n];if(0===r.path.length&&"replace"===r.op){t=r.value;break}}n>-1&&(e=e.slice(n+1));const r=rn("Patches").applyPatches_;return Fe(t)?r(t,e):this.produce(t,t=>r(t,e))}},kn=En.produce;En.produceWithPatches.bind(En),En.setAutoFreeze.bind(En),En.setUseStrictShallowCopy.bind(En),En.applyPatches.bind(En),En.createDraft.bind(En),En.finishDraft.bind(En);var On=(t,e,n)=>{if(1===e.length&&e[0]===n){let e=!1;try{const n={};t(n)===n&&(e=!0)}catch{}if(e){let t;try{throw new Error}catch(e){({stack:t}=e)}console.warn("The result function returned its own inputs without modification. e.g\n`createSelector([state => state.todos], todos => todos)`\nThis could lead to inefficient memoization and unnecessary re-renders.\nEnsure transformation logic is in the result function, and extraction logic is in the input selectors.",{stack:t})}}},Sn=(t,e,n)=>{const{memoize:r,memoizeOptions:i}=e,{inputSelectorResults:o,inputSelectorResultsCopy:s}=t,a=r(()=>({}),...i);if(!(a.apply(null,o)===a.apply(null,s))){let t;try{throw new Error}catch(e){({stack:t}=e)}console.warn("An input selector returned a different result when passed same arguments.\nThis means your output selector will likely run more frequently than intended.\nAvoid returning a new reference inside your input selector, e.g.\n`createSelector([state => state.todos.map(todo => todo.id)], todoIds => todoIds.length)`",{arguments:n,firstInputs:o,secondInputs:s,stack:t})}},jn={inputStabilityCheck:"once",identityFunctionCheck:"once"};var Cn=t=>Array.isArray(t)?t:[t];function Nn(t){const e=Array.isArray(t[0])?t[0]:t;return function(t,e="expected all items to be functions, instead received the following types: "){if(!t.every(t=>"function"==typeof t)){const n=t.map(t=>"function"==typeof t?`function ${t.name||"unnamed"}()`:typeof t).join(", ");throw new TypeError(`${e}[${n}]`)}}(e,"createSelector expects all input-selectors to be functions, but received the following types: "),e}function An(t,e){const n=[],{length:r}=t;for(let i=0;i<r;i++)n.push(t[i].apply(null,e));return n}var Tn="undefined"!=typeof WeakRef?WeakRef:class{constructor(t){this.value=t}deref(){return this.value}};function Pn(){return{s:0,v:void 0,o:null,p:null}}function Rn(t,e={}){let n={s:0,v:void 0,o:null,p:null};const{resultEqualityCheck:r}=e;let i,o=0;function s(){let e=n;const{length:s}=arguments;for(let t=0,n=s;t<n;t++){const n=arguments[t];if("function"==typeof n||"object"==typeof n&&null!==n){let t=e.o;null===t&&(e.o=t=new WeakMap);const r=t.get(n);void 0===r?(e=Pn(),t.set(n,e)):e=r}else{let t=e.p;null===t&&(e.p=t=new Map);const r=t.get(n);void 0===r?(e=Pn(),t.set(n,e)):e=r}}const a=e;let c;if(1===e.s)c=e.v;else if(c=t.apply(null,arguments),o++,r){const t=i?.deref?.()??i;null!=t&&r(t,c)&&(c=t,0!==o&&o--);i="object"==typeof c&&null!==c||"function"==typeof c?new Tn(c):c}return a.s=1,a.v=c,c}return s.clearCache=()=>{n={s:0,v:void 0,o:null,p:null},s.resetResultsCount()},s.resultsCount=()=>o,s.resetResultsCount=()=>{o=0},s}function Mn(t,...e){const n="function"==typeof t?{memoize:t,memoizeOptions:e}:t,r=(...t)=>{let e,r=0,i=0,o={},s=t.pop();"object"==typeof s&&(o=s,s=t.pop()),function(t,e="expected a function, instead received "+typeof t){if("function"!=typeof t)throw new TypeError(e)}(s,`createSelector expects an output function after the inputs, but received: [${typeof s}]`);const a={...n,...o},{memoize:c,memoizeOptions:l=[],argsMemoize:u=Rn,argsMemoizeOptions:d=[],devModeChecks:h={}}=a,f=Cn(l),p=Cn(d),m=Nn(t),y=c(function(){return r++,s.apply(null,arguments)},...f);let b=!0;const w=u(function(){i++;const t=An(m,arguments);e=y.apply(null,t);{const{identityFunctionCheck:n,inputStabilityCheck:r}=((t,e)=>{const{identityFunctionCheck:n,inputStabilityCheck:r}={...jn,...e};return{identityFunctionCheck:{shouldRun:"always"===n||"once"===n&&t,run:On},inputStabilityCheck:{shouldRun:"always"===r||"once"===r&&t,run:Sn}}})(b,h);if(n.shouldRun&&n.run(s,t,e),r.shouldRun){const e=An(m,arguments);r.run({inputSelectorResults:t,inputSelectorResultsCopy:e},{memoize:c,memoizeOptions:f},arguments)}b&&(b=!1)}return e},...p);return Object.assign(w,{resultFunc:s,memoizedResultFunc:y,dependencies:m,dependencyRecomputations:()=>i,resetDependencyRecomputations:()=>{i=0},lastResult:()=>e,recomputations:()=>r,resetRecomputations:()=>{r=0},memoize:c,argsMemoize:u})};return Object.assign(r,{withTypes:()=>r}),r}var _n=Mn(Rn),In=Object.assign((t,e=_n)=>{!function(t,e="expected an object, instead received "+typeof t){if("object"!=typeof t)throw new TypeError(e)}(t,"createStructuredSelector expects first argument to be an object where each property is a selector, instead received a "+typeof t);const n=Object.keys(t);return e(n.map(e=>t[e]),(...t)=>t.reduce((t,e,r)=>(t[n[r]]=e,t),{}))},{withTypes:()=>In});function zn(t){return({dispatch:e,getState:n})=>r=>i=>"function"==typeof i?i(e,n,t):r(i)}var Bn=zn(),Dn=zn,Fn="undefined"!=typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(0!==arguments.length)return"object"==typeof arguments[0]?Pe:Pe.apply(null,arguments)};function Un(t,e){function n(...n){if(e){let r=e(...n);if(!r)throw new Error("prepareAction did not return an object");return{type:t,payload:r.payload,..."meta"in r&&{meta:r.meta},..."error"in r&&{error:r.error}}}return{type:t,payload:n[0]}}return n.toString=()=>`${t}`,n.type=t,n.match=e=>Re(e)&&e.type===t,n}function Ln(t){return"function"==typeof t&&"type"in t&&(t=>t&&"function"==typeof t.match)(t)}function Wn(t,e){let n=0;return{measureTime(t){const e=Date.now();try{return t()}finally{const t=Date.now();n+=t-e}},warnIfExceeded(){n>t&&console.warn(`${e} took ${n}ms, which is more than the warning threshold of ${t}ms. \nIf your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.\nIt is disabled in production builds, so you don't need to worry about that.`)}}}var Jn=class t extends Array{constructor(...e){super(...e),Object.setPrototypeOf(this,t.prototype)}static get[Symbol.species](){return t}concat(...t){return super.concat.apply(this,t)}prepend(...e){return 1===e.length&&Array.isArray(e[0])?new t(...e[0].concat(this)):new t(...e.concat(this))}};function Hn(t){return Ue(t)?kn(t,()=>{}):t}function Kn(t,e,n){return t.has(e)?t.get(e):t.set(e,n(e)).get(e)}function qn(t){return"object"!=typeof t||null==t||Object.isFrozen(t)}function Yn(t,e,n){const r=Vn(t,e,n);return{detectMutations:()=>Gn(t,e,r,n)}}function Vn(t,e=[],n,r="",i=new Set){const o={value:n};if(!t(n)&&!i.has(n)){i.add(n),o.children={};for(const i in n){const s=r?r+"."+i:i;e.length&&-1!==e.indexOf(s)||(o.children[i]=Vn(t,e,n[i],s))}}return o}function Gn(t,e=[],n,r,i=!1,o=""){const s=n?n.value:void 0,a=s===r;if(i&&!a&&!Number.isNaN(r))return{wasMutated:!0,path:o};if(t(s)||t(r))return{wasMutated:!1};const c={};for(let t in n.children)c[t]=!0;for(let t in r)c[t]=!0;const l=e.length>0;for(let i in c){const s=o?o+"."+i:i;if(l){if(e.some(t=>t instanceof RegExp?t.test(s):s===t))continue}const c=Gn(t,e,n.children[i],r[i],a,s);if(c.wasMutated)return c}return{wasMutated:!1}}function Zn(t){const e=typeof t;return null==t||"string"===e||"boolean"===e||"number"===e||Array.isArray(t)||Se(t)}function Qn(t,e="",n=Zn,r,i=[],o){let s;if(!n(t))return{keyPath:e||"<root>",value:t};if("object"!=typeof t||null===t)return!1;if(o?.has(t))return!1;const a=null!=r?r(t):Object.entries(t),c=i.length>0;for(const[t,l]of a){const a=e?e+"."+t:t;if(c){if(i.some(t=>t instanceof RegExp?t.test(a):a===t))continue}if(!n(l))return{keyPath:a,value:l};if("object"==typeof l&&(s=Qn(l,a,n,r,i,o),s))return s}return o&&Xn(t)&&o.add(t),!1}function Xn(t){if(!Object.isFrozen(t))return!1;for(const e of Object.values(t))if("object"==typeof e&&null!==e&&!Xn(e))return!1;return!0}function tr(t){return"boolean"==typeof t}var er=()=>function(t){const{thunk:e=!0,immutableCheck:n=!0,serializableCheck:r=!0,actionCreatorCheck:i=!0}=t??{};let o=new Jn;if(e&&(tr(e)?o.push(Bn):o.push(Dn(e.extraArgument))),n){let t={};tr(n)||(t=n),o.unshift(function(t={}){{let e=function(t,e,r,i){return JSON.stringify(t,n(e,i),r)},n=function(t,e){let n=[],r=[];return e||(e=function(t,e){return n[0]===e?"[Circular ~]":"[Circular ~."+r.slice(0,n.indexOf(e)).join(".")+"]"}),function(i,o){if(n.length>0){var s=n.indexOf(this);~s?n.splice(s+1):n.push(this),~s?r.splice(s,1/0,i):r.push(i),~n.indexOf(o)&&(o=e.call(this,i,o))}else n.push(o);return null==t?o:t.call(this,i,o)}},{isImmutable:r=qn,ignoredPaths:i,warnAfter:o=32}=t;const s=Yn.bind(null,r,i);return({getState:t})=>{let n,r=t(),i=s(r);return a=>c=>{const l=Wn(o,"ImmutableStateInvariantMiddleware");l.measureTime(()=>{if(r=t(),n=i.detectMutations(),i=s(r),n.wasMutated)throw new Error(`A state mutation was detected between dispatches, in the path '${n.path||""}'.  This may cause incorrect behavior. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`)});const u=a(c);return l.measureTime(()=>{if(r=t(),n=i.detectMutations(),i=s(r),n.wasMutated)throw new Error(`A state mutation was detected inside a dispatch, in the path: ${n.path||""}. Take a look at the reducer(s) handling the action ${e(c)}. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`)}),l.warnIfExceeded(),u}}}}(t))}if(r){let t={};tr(r)||(t=r),o.push(function(t={}){{const{isSerializable:e=Zn,getEntries:n,ignoredActions:r=[],ignoredActionPaths:i=["meta.arg","meta.baseQueryMeta"],ignoredPaths:o=[],warnAfter:s=32,ignoreState:a=!1,ignoreActions:c=!1,disableCache:l=!1}=t,u=!l&&WeakSet?new WeakSet:void 0;return t=>l=>d=>{if(!Re(d))return l(d);const h=l(d),f=Wn(s,"SerializableStateInvariantMiddleware");return c||r.length&&-1!==r.indexOf(d.type)||f.measureTime(()=>{const t=Qn(d,"",e,n,i,u);if(t){const{keyPath:e,value:n}=t;console.error(`A non-serializable value was detected in an action, in the path: \`${e}\`. Value:`,n,"\nTake a look at the logic that dispatched this action: ",d,"\n(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)","\n(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)")}}),a||(f.measureTime(()=>{const r=Qn(t.getState(),"",e,n,o,u);if(r){const{keyPath:t,value:e}=r;console.error(`A non-serializable value was detected in the state, in the path: \`${t}\`. Value:`,e,`\nTake a look at the reducer(s) handling this action type: ${d.type}.\n(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)`)}}),f.warnIfExceeded()),h}}}(t))}if(i){let t={};tr(i)||(t=i),o.unshift(function(t={}){const{isActionCreator:e=Ln}=t;return()=>t=>n=>(e(n)&&console.warn(function(t){const e=t?`${t}`.split("/"):[],n=e[e.length-1]||"actionCreator";return`Detected an action creator with type "${t||"unknown"}" being dispatched. \nMake sure you're calling the action creator before dispatching, i.e. \`dispatch(${n}())\` instead of \`dispatch(${n})\`. This is necessary even if the action has no payload.`}(n.type)),t(n))}(t))}return o},nr=t=>e=>{setTimeout(e,t)},rr=t=>function(e){const{autoBatch:n=!0}=e??{};let r=new Jn(t);return n&&r.push(((t={type:"raf"})=>e=>(...n)=>{const r=e(...n);let i=!0,o=!1,s=!1;const a=new Set,c="tick"===t.type?queueMicrotask:"raf"===t.type?"undefined"!=typeof window&&window.requestAnimationFrame?window.requestAnimationFrame:nr(10):"callback"===t.type?t.queueNotification:nr(t.timeout),l=()=>{s=!1,o&&(o=!1,a.forEach(t=>t()))};return Object.assign({},r,{subscribe(t){const e=r.subscribe(()=>i&&t());return a.add(t),()=>{e(),a.delete(t)}},dispatch(t){try{return i=!t?.meta?.RTK_autoBatch,o=!i,o&&(s||(s=!0,c(l))),r.dispatch(t)}finally{i=!0}}})})("object"==typeof n?n:void 0)),r};function ir(t){const e={},n=[];let r;const i={addCase(t,o){if(n.length>0)throw new Error("`builder.addCase` should only be called before calling `builder.addMatcher`");if(r)throw new Error("`builder.addCase` should only be called before calling `builder.addDefaultCase`");const s="string"==typeof t?t:t.type;if(!s)throw new Error("`builder.addCase` cannot be called with an empty action type");if(s in e)throw new Error(`\`builder.addCase\` cannot be called with two reducers for the same action type '${s}'`);return e[s]=o,i},addMatcher(t,e){if(r)throw new Error("`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");return n.push({matcher:t,reducer:e}),i},addDefaultCase(t){if(r)throw new Error("`builder.addDefaultCase` can only be called once");return r=t,i}};return t(i),[e,n,r]}var or=(t=21)=>{let e="",n=t;for(;n--;)e+="ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW"[64*Math.random()|0];return e},sr=Symbol.for("rtk-slice-createasyncthunk");function ar(t,e){return`${t}/${e}`}function cr({creators:t}={}){const e=t?.asyncThunk?.[sr];return function(t){const{name:n,reducerPath:r=n}=t;if(!n)throw new Error("`name` is a required option for createSlice");"undefined"!=typeof process&&void 0===t.initialState&&console.error("You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`");const i=("function"==typeof t.reducers?t.reducers(function(){function t(t,e){return{_reducerDefinitionType:"asyncThunk",payloadCreator:t,...e}}return t.withTypes=()=>t,{reducer:t=>Object.assign({[t.name]:(...e)=>t(...e)}[t.name],{_reducerDefinitionType:"reducer"}),preparedReducer:(t,e)=>({_reducerDefinitionType:"reducerWithPrepare",prepare:t,reducer:e}),asyncThunk:t}}()):t.reducers)||{},o=Object.keys(i),s={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},a={addCase(t,e){const n="string"==typeof t?t:t.type;if(!n)throw new Error("`context.addCase` cannot be called with an empty action type");if(n in s.sliceCaseReducersByType)throw new Error("`context.addCase` cannot be called with two reducers for the same action type: "+n);return s.sliceCaseReducersByType[n]=e,a},addMatcher:(t,e)=>(s.sliceMatchers.push({matcher:t,reducer:e}),a),exposeAction:(t,e)=>(s.actionCreators[t]=e,a),exposeCaseReducer:(t,e)=>(s.sliceCaseReducersByName[t]=e,a)};function c(){if("object"==typeof t.extraReducers)throw new Error("The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice");const[e={},n=[],r]="function"==typeof t.extraReducers?ir(t.extraReducers):[t.extraReducers],i={...e,...s.sliceCaseReducersByType};return function(t,e){if("object"==typeof e)throw new Error("The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer");let n,[r,i,o]=ir(e);if(function(t){return"function"==typeof t}(t))n=()=>Hn(t());else{const e=Hn(t);n=()=>e}function s(t=n(),e){let s=[r[e.type],...i.filter(({matcher:t})=>t(e)).map(({reducer:t})=>t)];return 0===s.filter(t=>!!t).length&&(s=[o]),s.reduce((t,n)=>{if(n){if(Fe(t)){const r=n(t,e);return void 0===r?t:r}if(Ue(t))return kn(t,t=>n(t,e));{const r=n(t,e);if(void 0===r){if(null===t)return t;throw Error("A case reducer on a non-draftable value must not return undefined")}return r}}return t},t)}return s.getInitialState=n,s}(t.initialState,t=>{for(let e in i)t.addCase(e,i[e]);for(let e of s.sliceMatchers)t.addMatcher(e.matcher,e.reducer);for(let e of n)t.addMatcher(e.matcher,e.reducer);r&&t.addDefaultCase(r)})}o.forEach(r=>{const o=i[r],s={reducerName:r,type:ar(n,r),createNotation:"function"==typeof t.reducers};!function(t){return"asyncThunk"===t._reducerDefinitionType}(o)?function({type:t,reducerName:e,createNotation:n},r,i){let o,s;if("reducer"in r){if(n&&!function(t){return"reducerWithPrepare"===t._reducerDefinitionType}(r))throw new Error("Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.");o=r.reducer,s=r.prepare}else o=r;i.addCase(t,o).exposeCaseReducer(e,o).exposeAction(e,s?Un(t,s):Un(t))}(s,o,a):function({type:t,reducerName:e},n,r,i){if(!i)throw new Error("Cannot use `create.asyncThunk` in the built-in `createSlice`. Use `buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })` to create a customised version of `createSlice`.");const{payloadCreator:o,fulfilled:s,pending:a,rejected:c,settled:l,options:u}=n,d=i(t,o,u);r.exposeAction(e,d),s&&r.addCase(d.fulfilled,s);a&&r.addCase(d.pending,a);c&&r.addCase(d.rejected,c);l&&r.addMatcher(d.settled,l);r.exposeCaseReducer(e,{fulfilled:s||ur,pending:a||ur,rejected:c||ur,settled:l||ur})}(s,o,a,e)});const l=t=>t,u=new Map,d=new WeakMap;let h;function f(t,e){return h||(h=c()),h(t,e)}function p(){return h||(h=c()),h.getInitialState()}function m(e,n=!1){function r(t){let i=t[e];if(void 0===i){if(!n)throw new Error("selectSlice returned undefined for an uninjected slice reducer");i=Kn(d,r,p)}return i}function i(e=l){const r=Kn(u,n,()=>new WeakMap);return Kn(r,e,()=>{const r={};for(const[i,o]of Object.entries(t.selectors??{}))r[i]=lr(o,e,()=>Kn(d,e,p),n);return r})}return{reducerPath:e,getSelectors:i,get selectors(){return i(r)},selectSlice:r}}const y={name:n,reducer:f,actions:s.actionCreators,caseReducers:s.sliceCaseReducersByName,getInitialState:p,...m(r),injectInto(t,{reducerPath:e,...n}={}){const i=e??r;return t.inject({reducerPath:i,reducer:f},n),{...y,...m(i,!0)}}};return y}}function lr(t,e,n,r){function i(i,...o){let s=e(i);if(void 0===s){if(!r)throw new Error("selectState returned undefined for an uninjected slice reducer");s=n()}return t(s,...o)}return i.unwrapped=t,i}function ur(){}const dr=cr()({name:"employees",initialState:{employees:[],employee:{}},reducers:{setEmployees(t,e){t.employees=e.payload},setEmployee(t,e){const{id:n,...r}=e.payload;t.employee={...r,id:n||or()}},addEmployee(t,e){t.employees.push(e.payload)},updateEmployee(t,e){const{id:n,changes:r}=e.payload,i=t.employees.findIndex(t=>t.id===n);-1!==i&&(t.employees[i]={...t.employees[i],...r})},deleteEmployee(t,e){t.employees=t.employees.filter(t=>t.id!==e.payload)}}}),{setEmployees:hr,addEmployee:fr,updateEmployee:pr,deleteEmployee:mr,setEmployee:yr}=dr.actions;var br=dr.reducer;let wr=[{id:"a70e9bce-528f-404c-9b30-15eaf14e56a4",firstName:"Alice",lastName:"Johnson",dateOfEmployment:"2020-05-15",dateOfBirth:"1992-03-12",phone:"5399212334",email:"alice.johnson@company.com",department:"Analytics",position:"Medior"},{id:"ebb88c81-444f-46c0-82c0-761b814b7d9f",firstName:"Bob",lastName:"Smith",dateOfEmployment:"2019-11-23",dateOfBirth:"1987-07-08",phone:"5441234567",email:"bob.smith@company.com",department:"Tech",position:"Medior"},{id:"b207cf49-c79d-435d-84c2-791a877359fd",firstName:"Carol",lastName:"Nguyen",dateOfEmployment:"2021-04-01",dateOfBirth:"1995-09-30",phone:"5441234567",email:"carol.nguyen@company.com",department:"Analytics",position:"Junior"},{id:"ff5f6799-31ff-42c4-a27a-d508c5d6343e",firstName:"David",lastName:"Lee",dateOfEmployment:"2018-06-12",dateOfBirth:"1985-01-25",phone:"5441234567",email:"david.lee@company.com",department:"Tech",position:"Senior"},{id:"7fe2efe5-0829-4ad4-af7d-f1b37eac65e9",firstName:"Eva",lastName:"Martinez",dateOfEmployment:"2022-02-20",dateOfBirth:"1996-12-05",phone:"5441234567",email:"eva.martinez@company.com",department:"Analytics",position:"Junior"},{id:"a41da125-131a-4997-abde-5b8a142c0dcb",firstName:"Frank",lastName:"O’Connor",dateOfEmployment:"2020-10-10",dateOfBirth:"1990-10-10",phone:"5441234567",email:"frank.oconnor@company.com",department:"Tech",position:"Medior"},{id:"850215c5-6bbf-40b4-909e-023564c98bd1",firstName:"Grace",lastName:"Kim",dateOfEmployment:"2023-01-15",dateOfBirth:"1997-02-18",phone:"5441234567",email:"grace.kim@company.com",department:"Analytics",position:"Junior"},{id:"d3b2464b-8e11-4264-a826-5c7b7e078466",firstName:"Henry",lastName:"Turner",dateOfEmployment:"2017-03-09",dateOfBirth:"1984-08-14",phone:"+1 555-1555",email:"henry.turner@company.com",department:"Tech",position:"Senior"},{id:"2dc0beb4-7690-4f19-842d-ffdbbd9ad68e",firstName:"Isabel",lastName:"Davis",dateOfEmployment:"2021-09-28",dateOfBirth:"1991-04-03",phone:"5441234567",email:"isabel.davis@company.com",department:"Analytics",position:"Medior"},{id:"4292a388-1920-48b6-8b39-ee9545efb6d2",firstName:"Jack",lastName:"White",dateOfEmployment:"2016-12-01",dateOfBirth:"1983-06-21",phone:"5441234567",email:"jack.white@company.com",department:"Tech",position:"Senior"},{id:"8a1ae291-fc29-4e52-a7de-3cda39f26a1f",firstName:"Alice",lastName:"Johnson",dateOfEmployment:"2020-05-15",dateOfBirth:"1992-03-12",phone:"5441234567",email:"alice.johnson@company.com",department:"Analytics",position:"Medior"},{id:"4a31e92a-2280-45f9-866c-cf871ab0cb47",firstName:"Bob",lastName:"Smith",dateOfEmployment:"2019-11-23",dateOfBirth:"1987-07-08",phone:"5441234567",email:"bob.smith@company.com",department:"Tech",position:"Medior"},{id:"53fc55b4-fdb7-4347-b9be-bf80b764d669",firstName:"Carol",lastName:"Nguyen",dateOfEmployment:"2021-04-01",dateOfBirth:"1995-09-30",phone:"5441234567",email:"carol.nguyen@company.com",department:"Analytics",position:"Junior"},{id:"9fab2411-ba73-4000-86f6-e2f00cc19423",firstName:"David",lastName:"Lee",dateOfEmployment:"2018-06-12",dateOfBirth:"1985-01-25",phone:"5441234567",email:"david.lee@company.com",department:"Tech",position:"Senior"},{id:"86d6b1c0-dd5c-4de8-ac0d-58a8e14a3082",firstName:"Eva",lastName:"Martinez",dateOfEmployment:"2022-02-20",dateOfBirth:"1996-12-05",phone:"5441234567",email:"eva.martinez@company.com",department:"Analytics",position:"Junior"},{id:"361e1280-b597-4b77-b58f-22e8480cffea",firstName:"Frank",lastName:"O’Connor",dateOfEmployment:"2020-10-10",dateOfBirth:"1990-10-10",phone:"5441234567",email:"frank.oconnor@company.com",department:"Tech",position:"Medior"},{id:"f19a7a00-cb55-4163-8eb0-0bb39c68e85f",firstName:"Grace",lastName:"Kim",dateOfEmployment:"2023-01-15",dateOfBirth:"1997-02-18",phone:"5553332211",email:"grace.kim@company.com",department:"Analytics",position:"Junior"},{id:"a5965a42-9b7b-4b11-a401-a4330ce93cc7",firstName:"Henry",lastName:"Turner",dateOfEmployment:"2017-03-09",dateOfBirth:"1984-08-14",phone:"5553332211",email:"henry.turner@company.com",department:"Tech",position:"Senior"},{id:"922b5e2e-854d-4e7f-b45a-de370bf0f907",firstName:"Isabel",lastName:"Davis",dateOfEmployment:"2021-09-28",dateOfBirth:"1991-04-03",phone:"5553332211",email:"isabel.davis@company.com",department:"Analytics",position:"Medior"},{id:"3b777e56-2878-4840-b2ea-c35221184f00",firstName:"Jack",lastName:"White",dateOfEmployment:"2016-12-01",dateOfBirth:"1983-06-21",phone:"5553332211",email:"jack.white@company.com",department:"Tech",position:"Senior"},{id:"e031856a-eebf-4185-86fe-c8ff81c8707e",firstName:"Alice",lastName:"Johnson",dateOfEmployment:"2020-05-15",dateOfBirth:"1992-03-12",phone:"5553332211",email:"alice.johnson@company.com",department:"Analytics",position:"Medior"},{id:"1d123897-afa3-40c5-8467-2ccf33a58865",firstName:"Bob",lastName:"Smith",dateOfEmployment:"2019-11-23",dateOfBirth:"1987-07-08",phone:"5553332211",email:"bob.smith@company.com",department:"Tech",position:"Medior"},{id:"1604ddf8-e5d1-4bc8-9349-5df685b92d3b",firstName:"Carol",lastName:"Nguyen",dateOfEmployment:"2021-04-01",dateOfBirth:"1995-09-30",phone:"5553332211",email:"carol.nguyen@company.com",department:"Analytics",position:"Junior"},{id:"92ce8d97-269b-4218-84a5-fafd876d9257",firstName:"David",lastName:"Lee",dateOfEmployment:"2018-06-12",dateOfBirth:"1985-01-25",phone:"5553332211",email:"david.lee@company.com",department:"Tech",position:"Senior"},{id:"5297c1d5-448e-4333-9d5b-d0b2e872afa6",firstName:"Eva",lastName:"Martinez",dateOfEmployment:"2022-02-20",dateOfBirth:"1996-12-05",phone:"5553332211",email:"eva.martinez@company.com",department:"Analytics",position:"Junior"},{id:"a6aaa240-df75-48f4-b9f4-a71dc742ad1e",firstName:"Frank",lastName:"O’Connor",dateOfEmployment:"2020-10-10",dateOfBirth:"1990-10-10",phone:"5553332211",email:"frank.oconnor@company.com",department:"Tech",position:"Medior"},{id:"d87a559b-ee41-4c2f-8cc6-79fef96d5eb4",firstName:"Grace",lastName:"Kim",dateOfEmployment:"2023-01-15",dateOfBirth:"1997-02-18",phone:"5553332211",email:"grace.kim@company.com",department:"Analytics",position:"Junior"},{id:"ef48d0ab-ca2e-4d01-bbf0-8540ddcef148",firstName:"Henry",lastName:"Turner",dateOfEmployment:"2017-03-09",dateOfBirth:"1984-08-14",phone:"5553332211",email:"henry.turner@company.com",department:"Tech",position:"Senior"},{id:"076d96fe-a0b6-4a84-b6d6-c19f98a5a117",firstName:"Isabel",lastName:"Davis",dateOfEmployment:"2021-09-28",dateOfBirth:"1991-04-03",phone:"5553332211",email:"isabel.davis@company.com",department:"Analytics",position:"Medior"},{id:"35f8c578-0b17-47de-85c7-086de35a08ee",firstName:"Jack",lastName:"White",dateOfEmployment:"2016-12-01",dateOfBirth:"1983-06-21",phone:"5553332211",email:"jack.white@company.com",department:"Tech",position:"Senior"}];const gr=()=>async t=>{const e=await new Promise(t=>setTimeout(()=>t([...wr]),400));t(hr(e))},vr=t=>async e=>{const n=await(t=>new Promise(e=>{setTimeout(()=>{const n=wr.find(e=>e.id===t);e(n||null)},400)}))(t);n&&e(yr(n))},xr=t=>async e=>{const n=await(t=>new Promise(e=>{setTimeout(()=>{const n={id:crypto.randomUUID(),...t};wr.push(n),e(n)},400)}))(t);e(fr(n))},$r=(t,e)=>async n=>{await((t,e)=>new Promise(n=>{setTimeout(()=>{wr=wr.map(n=>n.id===t?{...n,...e}:n),n(wr.find(e=>e.id===t))},400)}))(t,e),n(pr({id:t,changes:e}))},Er=t=>async e=>{await(t=>new Promise(e=>{setTimeout(()=>{wr=wr.filter(e=>e.id!==t),e(t)},400)}))(t),e(mr(t))},kr="employeeAppState";const Or=function(){try{const t=localStorage.getItem(kr);return t?JSON.parse(t):void 0}catch(t){return void console.error("Failed to load state from localStorage:",t)}}(),Sr=function(t){const e=er(),{reducer:n,middleware:r,devTools:i=!0,duplicateMiddlewareCheck:o=!0,preloadedState:s,enhancers:a}=t||{};let c,l;if("function"==typeof n)c=n;else{if(!Se(n))throw new Error("`reducer` is a required argument, and must be a function or an object of functions that can be passed to combineReducers");c=Te(n)}if(r&&"function"!=typeof r)throw new Error("`middleware` field must be a callback");if("function"==typeof r){if(l=r(e),!Array.isArray(l))throw new Error("when using a middleware builder function, an array of middleware must be returned")}else l=e();if(l.some(t=>"function"!=typeof t))throw new Error("each middleware provided to configureStore must be a function");if(o){let t=new Set;l.forEach(e=>{if(t.has(e))throw new Error("Duplicate middleware references found when creating the store. Ensure that each middleware is only included once.");t.add(e)})}let u=Pe;i&&(u=Fn({trace:!0,..."object"==typeof i&&i}));const d=function(...t){return e=>(n,r)=>{const i=e(n,r);let o=()=>{throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.")};const s={getState:i.getState,dispatch:(t,...e)=>o(t,...e)},a=t.map(t=>t(s));return o=Pe(...a)(i.dispatch),{...i,dispatch:o}}}(...l),h=rr(d);if(a&&"function"!=typeof a)throw new Error("`enhancers` field must be a callback");let f="function"==typeof a?a(h):h();if(!Array.isArray(f))throw new Error("`enhancers` callback must return an array");if(f.some(t=>"function"!=typeof t))throw new Error("each enhancer provided to configureStore must be a function");return l.length&&!f.includes(d)&&console.error("middlewares were provided, but middleware enhancer was not included in final enhancers - make sure to call `getDefaultEnhancers`"),Ne(c,s,u(...f))}({reducer:{employees:br},preloadedState:Or});Sr.subscribe(()=>{!function(t){try{localStorage.setItem(kr,JSON.stringify(t))}catch(t){console.error("Failed to save state to localStorage:",t)}}(Sr.getState())});
/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const jr=t=>e=>class extends e{connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._storeUnsubscribe=t.subscribe(()=>this.stateChanged(t.getState())),this.stateChanged(t.getState())}disconnectedCallback(){this._storeUnsubscribe(),super.disconnectedCallback&&super.disconnectedCallback()}stateChanged(t){}},Cr=ut`
  main h2 {
    margin: 1rem 0 1rem 0;
    font-weight: 500;
    color: var(--color-primary);
  }

  .selections {
    display: flex;
    gap: 0.5rem;
  }

  .selections button {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    opacity: 0.5;
    transition: all 0.25s ease-in-out;
  }

  .selections button:hover {
    opacity: 1;
  }
`;function Nr(t){const e=[];return(t=(t||"").replace(/\D/g,"").slice(0,11)).length>0&&e.push(t.slice(0,3)),t.length>3&&e.push(t.slice(3,6)),t.length>6&&e.push(t.slice(6,8)),t.length>8&&e.push(t.slice(8,10)),e.join(" ")}class Ar extends(jr(Sr)(ue)){static properties={translation:{type:Object},common:{type:Object},t:{type:Function},employees:{type:Array},view:{type:String},selectedRows:{type:Array},currentPage:{type:Number},isModalOpen:{type:Boolean},activeRow:{type:Object},modalMessage:{type:String}};static styles=Cr;constructor(){super(),this.translation={},this.common={},this.t=tt,this.employees=[],this.selectedRows=[],this.activeRow=null,this.view="list",this.currentPage=1,this.isModalOpen=!1,this.modalMessage=""}connectedCallback(){super.connectedCallback(),this.loadTranslations(),Sr.dispatch(gr()),this.langObserver=new MutationObserver(()=>this.loadTranslations()),this.langObserver.observe(document.documentElement,{attributes:!0,attributeFilter:["lang"]})}stateChanged(t){this.employees=t.employees.employees}disconnectedCallback(){this.langObserver?.disconnect(),super.disconnectedCallback()}async loadTranslations(){this.translation=await this.t("employees-page"),this.common=await this.t("common")}handleSelectionChanged(t){this.selectedRows=t.detail.selectedRows}get rowsPerPage(){return"grid"===this.view?4:9}get paginatedEmployees(){const t=(this.currentPage-1)*this.rowsPerPage;return this.employees.slice(t,t+this.rowsPerPage)}handlePageChange(t){this.currentPage=t.detail.page}_onEdit(t){rt.constructor.go("/employees/"+t.id)}handleDelete(){Sr.dispatch(Er(this.activeRow.id)),this.isModalOpen=!1}async _onDelete(t){this.activeRow=t,this.modalMessage=await this.t("employees-page.modalDialog.confirmDeleteMessage",{name:t.firstName+" "+t.lastName}),this.isModalOpen=!0}renderViewToggles(){return Kt`
      <div class="selections">
        ${["list","grid"].map(t=>Kt`
            <button
              @click=${()=>{this.view=t,this.currentPage=1}}
              style="${this.view===t?"opacity: 1;":""}"
            >
              <img
                src="/public/icons/${t}.png"
                width="24"
                height="24"
                alt="${t} view"
              />
            </button>
          `)}
      </div>
    `}renderTableOrGrid(t){return"list"===this.view?Kt`
          <data-table
            .columns=${t}
            .rows=${this.paginatedEmployees}
            .selectedRows=${this.selectedRows}
            selectable
            multiSelect
            @selection-changed=${this.handleSelectionChanged}
          ></data-table>
        `:Kt`
          <data-grid
            .columns=${t}
            .rows=${this.paginatedEmployees}
            .selectedRows=${this.selectedRows}
            selectable
            multiSelect
            @selection-changed=${this.handleSelectionChanged}
          ></data-grid>
        `}render(){const t=this.translation||{},e=[{key:"firstName",label:t.headers.firstName},{key:"lastName",label:t.headers.lastName},{key:"dateOfEmployment",label:t.headers.dateOfEmployment,render:e=>new Date(e.dateOfEmployment).toLocaleDateString(t.locale,{year:"numeric",month:"2-digit",day:"2-digit"})},{key:"dateOfBirth",label:t.headers.dateOfBirth,render:e=>new Date(e.dateOfBirth).toLocaleDateString(t.locale,{year:"numeric",month:"2-digit",day:"2-digit"})},{key:"phone",label:t.headers.phone,render:t=>Nr(t.phone)},{key:"email",label:t.headers.email},{key:"department",label:t.headers.department},{key:"position",label:t.headers.position},{key:"actions",label:t.headers.actions,hideLabel:!0,render:t=>Kt` <div
          style="
          display: flex; 
          gap: 0.5rem; 
          
          ${"list"===this.view?"justify-content: center;":""}"
        >
          <button
            style="
            background: transparent;
            border: none; 
            cursor: pointer; 
            padding: 0.25rem;
            display: flex; 
            color: white;
            ${"grid"===this.view?"gap: 0.5rem;":""}
            ${"grid"===this.view?"background-color: var(--color-secondary) !important;":""}
            ${"grid"===this.view?"padding: 0.5rem;":""}
            border-radius: 6px;
            font-family: 'Poppins', sans-serif;   
            align-items: center;"
            @click=${e=>{e.stopPropagation(),this._onEdit(t)}}
          >
            <img
              src="/public/icons/edit.png"
              width="18"
              height="18"
              alt="Edit Employee"
              style="${"grid"===this.view?"filter: brightness(0) invert(1);":""}"
            />
            <span>${"grid"===this.view?this.common.edit:""}</span>
          </button>
          <button
            style="
            background: transparent; 
            border: none; 
            cursor: pointer; 
            padding: 0.25rem;
            display: flex; 
            color: white;
            ${"grid"===this.view?"gap: 0.5rem;":""}
            ${"grid"===this.view?"background-color: var(--color-primary) !important;":""}
            ${"grid"===this.view?"padding: 0.5rem;":""}
            border-radius: 6px;
            font-family: 'Poppins', sans-serif;
            align-items: center;"
            @click=${e=>{e.stopPropagation(),this._onDelete(t)}}
          >
            <img
              src="/public/icons/delete.png"
              width="18"
              height="18"
              alt="Delete Employee"
              style="${"grid"===this.view?"filter: brightness(0) invert(1);":""}"
            />
            <span>${"grid"===this.view?this.common.delete:""}</span>
          </button>
        </div>`}];return Kt`
      <main>
        <div
          style="display: flex; justify-content: space-between; align-items: center;"
        >
          <h2>${t.title}</h2>

          ${this.renderViewToggles()}
        </div>

        ${this.renderTableOrGrid(e)}
        <pagination-controls
          .totalItems=${this.employees.length}
          .itemsPerPage=${this.rowsPerPage}
          .currentPage=${this.currentPage}
          @page-changed=${this.handlePageChange}
        ></pagination-controls>
      </main>
      <modal-dialog
        id="delete-modal"
        title="${t.modalDialog.confirmDelete}"
        ?open=${this.isModalOpen}
        @modal-closed=${()=>this.isModalOpen=!1}
      >
        <p
          style="font-size: 1rem; font-weight: 300; color: var(--color-text-secondary); text-align: center"
        >
          ${this.modalMessage}
        </p>
        <button
          @click=${()=>this.handleDelete()}
          style="
            width: 100%; 
            padding: 0.5rem 0; 
            border: none; 
            background-color: var(--color-primary); 
            color: white; 
            border-radius: 6px; 
            cursor: pointer;
            font-family: 'Poppins', sans-serif; 
            font-weight: 500;"
        >
          ${this.common.proceed}
        </button>
        <button
          @click=${()=>this.isModalOpen=!1}
          style="
          width: 100%; 
          padding: 0.4375rem 0; 
          border: 1px solid var(--color-secondary);
          background-color: white; 
          color: var(--color-secondary); 
          border-radius: 6px; 
          cursor: pointer;
          margin-top: 0.5rem;
          font-family: 'Poppins', sans-serif; 
          font-weight: 500;"
        >
          ${this.common.cancel}
        </button>
      </modal-dialog>
    `}}customElements.define("employees-page",Ar);var Tr=Object.freeze({__proto__:null,EmployeesPage:Ar});const Pr=ut`
  .form {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    column-gap: 8rem;
    row-gap: 3rem;
  }

  label {
    display: flex;
    flex-direction: column;
    font-weight: 300;
    color: var(--color-text-secondary);
    font-size: 0.9rem;
  }

  .error {
    color: red;
    font-size: 0.8rem;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }

  input,
  select {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    font-weight: 300;
    color: var(--color-text-secondary);
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    background: transparent
      url("data:image/svg+xml;utf8,<svg fill='%23ccc' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")
      no-repeat;
    background-position-x: 97%;
    background-position-y: 7.25px;
  }

  input[type='date']::-webkit-calendar-picker-indicator {
    background: url('/public/icons/calendar.png') no-repeat center center;
    background-size: contain;
    color: transparent;
    opacity: 1;
    cursor: pointer;
  }

  input[type='date']:in-range::-webkit-datetime-edit-year-field,
  input[type='date']:in-range::-webkit-datetime-edit-month-field,
  input[type='date']:in-range::-webkit-datetime-edit-day-field,
  input[type='date']:in-range::-webkit-datetime-edit-text {
    color: transparent;
  }
`;customElements.define("employee-form",class extends ue{static get properties(){return{value:{type:Object},translation:{type:Object},common:{type:Object},t:{type:Function}}}static styles=Pr;constructor(){super(),this.value={},this._errors={},this._positions=["Junior","Medior","Senior"],this.translation={},this.common={},this.t=tt}connectedCallback(){super.connectedCallback(),this.loadTranslations(),this.langObserver=new MutationObserver(()=>this.loadTranslations()),this.langObserver.observe(document.documentElement,{attributes:!0,attributeFilter:["lang"]})}disconnectedCallback(){this.langObserver?.disconnect(),super.disconnectedCallback()}async loadTranslations(){this.translation=await this.t("employee-add-page"),this.common=await this.t("common")}validate(t){const e={};t.firstName?.trim()||(e.firstName=this.translation.inputs.firstName+this.translation.form.required),t.lastName?.trim()||(e.lastName=this.translation.inputs.lastName+this.translation.form.required),t.dateOfEmployment||(e.dateOfEmployment=this.translation.inputs.dateOfEmployment+this.translation.form.required),t.dateOfBirth||(e.dateOfBirth=this.translation.inputs.dateOfBirth+this.translation.form.required);const n=t.phone?.replace(/\s+/g,"")||"";return n?/^\+?\d{10,15}$/.test(n)||(e.phone=this.translation.form.invalidPhone):e.phone=this.translation.inputs.phone+this.translation.form.required,t.email?.trim()?/\S+@\S+\.\S+/.test(t.email)||(e.email=this.translation.form.invalidEmail):e.email=this.translation.inputs.email+this.translation.form.required,t.department?.trim()||(e.department=this.translation.inputs.department+this.translation.form.required),t.position||(e.position=this.translation.inputs.position+this.translation.form.required),this._errors=e,this.requestUpdate(),0===Object.keys(e).length}handlePhoneInput=t=>{t.target.value=Nr(t.target.value)};handleSubmit(t){t.preventDefault();const e=t.target,n=Object.fromEntries(new FormData(e).entries());this.validate(n)&&this.dispatchEvent(new CustomEvent("form-submit",{detail:n,bubbles:!0,composed:!0}))}render(){const t={...this.value};t.phone&&(t.phone=Nr(t.phone));const e=this.translation||{};return Kt`
      <div style="padding: 4rem; background-color: white;">
        <form @submit=${this.handleSubmit.bind(this)} novalidate>
          <div class="form">
            ${this.renderInput("firstName",e.inputs.firstName,t.firstName)}
            ${this.renderInput("lastName",e.inputs.lastName,t.lastName)}
            ${this.renderInput("dateOfEmployment",e.inputs.dateOfEmployment,t.dateOfEmployment,"date")}
            ${this.renderInput("dateOfBirth",e.inputs.dateOfBirth,t.dateOfBirth,"date")}
            ${this.renderInput("phone",e.inputs.phone,t.phone,"tel")}
            ${this.renderInput("email",e.inputs.email,t.email,"email")}
            ${this.renderInput("department",e.inputs.department,t.department)}

            <label>
              ${e.inputs.position}
              <select name="position" style="margin-top: 0.5rem;">
                <option value="">${e.form.pleaseSelect}</option>
                ${this._positions.map(e=>Kt`<option value=${e} ?selected=${t.position===e}>
                      ${e}
                    </option>`)}
              </select>
              ${this._errors.position?Kt`<span class="error">${this._errors.position}</span>`:""}
            </label>
          </div>

          <div
            style="margin-top: 4rem; display: flex; justify-content: center; align-items: center; gap: 2rem;"
          >
            <button
              type="submit"
              style="
                width: 360px; 
                padding: 0.5rem 0; 
                border: none; 
                background-color: var(--color-primary); 
                color: white; 
                border-radius: 6px; 
                cursor: pointer;
                font-family: 'Poppins', sans-serif; 
                font-weight: 500;"
            >
              ${this.common.submit}
            </button>

            <button
              @click=${()=>window.history.back()}
              style="
                width: 360px; 
                padding: 0.4375rem 0; 
                border: 1px solid var(--color-secondary);
                background-color: white; 
                color: var(--color-secondary); 
                border-radius: 6px; 
                cursor: pointer;
                font-family: 'Poppins', sans-serif; 
                font-weight: 500;"
            >
              ${this.common.cancel}
            </button>
          </div>
        </form>
      </div>
    `}renderInput(t,e,n="",r="text"){return Kt`
      <label>
        ${e}
        <input
          type=${r}
          name=${t}
          .value=${n??""}
          style="margin-top: 0.5rem;"
          maxlength="14"
          @input=${"phone"===t?this.handlePhoneInput:null}
        />
        ${this._errors[t]?Kt`<span class="error">${this._errors[t]}</span>`:""}
      </label>
    `}});const Rr=ut`
  main h2 {
    margin: 1rem 0 1rem 0;
    font-weight: 500;
    color: var(--color-primary);
  }
`;class Mr extends(jr(Sr)(ue)){static properties={employee:{type:Object},translation:{type:Object},common:{type:Object},t:{type:Function}};static styles=Rr;constructor(){super(),this.employee={},this.translation={},this.common={},this.t=tt}connectedCallback(){super.connectedCallback(),this.loadTranslations(),this.langObserver=new MutationObserver(()=>this.loadTranslations()),this.langObserver.observe(document.documentElement,{attributes:!0,attributeFilter:["lang"]})}disconnectedCallback(){this.langObserver?.disconnect(),super.disconnectedCallback()}async loadTranslations(){this.translation=await this.t("employee-add-page"),this.common=await this.t("common")}handleSubmit(t){Sr.dispatch(xr({...t.detail,phone:t.detail.phone.replace(/\s+/g,"")})),rt.constructor.go("/employees")}render(){const t=this.translation||{};return Kt`
      <main>
        <h2>${t.title}</h2>

        <employee-form
          .value=${this.employee}
          @form-submit=${this.handleSubmit}
        ></employee-form>
      </main>
    `}}customElements.define("employee-add-page",Mr);var _r=Object.freeze({__proto__:null,AddEmployeePage:Mr});const Ir=ut`
  main h2 {
    margin: 1rem 0 1rem 0;
    font-weight: 500;
    color: var(--color-primary);
  }
`;class zr extends(jr(Sr)(ue)){static properties={employee:{type:Object},translation:{type:Object},common:{type:Object},t:{type:Function},id:{type:String}};static styles=Ir;constructor(){super(),this.employee={},this.translation={},this.common={},this.t=tt,this.id=""}onBeforeEnter(t){this.id=t.params.id}connectedCallback(){super.connectedCallback(),this.loadTranslations(),Sr.dispatch(vr(this.id)),this.langObserver=new MutationObserver(()=>this.loadTranslations()),this.langObserver.observe(document.documentElement,{attributes:!0,attributeFilter:["lang"]})}stateChanged(t){this.employee=t.employees.employee}disconnectedCallback(){this.langObserver?.disconnect(),super.disconnectedCallback()}async loadTranslations(){this.translation=await this.t("employee-edit-page"),this.common=await this.t("common")}handleSubmit(t){Sr.dispatch($r(this.id,{...t.detail,phone:t.detail.phone.replace(/\s+/g,"")})),rt.constructor.go("/employees")}render(){const t=this.translation||{};return Kt`
      <main>
        <h2>${t.title}</h2>

        <employee-form
          .value=${this.employee}
          @form-submit=${this.handleSubmit}
        ></employee-form>
      </main>
    `}}customElements.define("employee-edit-page",zr);var Br=Object.freeze({__proto__:null,EditEmployeePage:zr});export{rt as router};
