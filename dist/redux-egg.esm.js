import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

function storeEgg(_ref) {
  var tool = _ref.tool,
      breed = _ref.breed;
  var middleware = [];

  var newReducer = function () {
    return function () {
      return null;
    };
  };

  var composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  tool('replaceNewReducer', function (nextNewReducer) {
    newReducer = nextNewReducer;
  });
  tool('replaceComposeEnhancers', function (nextComposeEnhancers) {
    composeEnhancers = nextComposeEnhancers;
  });
  tool('addMiddleware', function (oneMiddleware) {
    middleware.push(oneMiddleware);
  });
  breed('store', function (breeds) {
    return createStore(newReducer(breeds), composeEnhancers(applyMiddleware.apply(void 0, middleware)));
  });
}

function storeEgg$1(tools) {
  var reducers = Object.create(null);
  tools.tool('combineReducer', function (name, reducer) {
    if (tools.isHatched) throw new Error("illegal state exception, combineReducer cannot be used once is hatched");
    reducers[name] = reducer;
  });
  tools.replaceNewReducer(function () {
    return combineReducers(reducers);
  });
}

var EMPTY = [];

function newMultiInterceptors(tools, processAll, name) {
  var multiInterceptors = Object.create(null);
  tools.tool(name, function (type, interceptor) {
    if (tools.isHatched) throw new Error("illegal state exception, " + name + " cannot be used once is hatched");
    if (!multiInterceptors[type]) multiInterceptors[type] = [];
    multiInterceptors[type].push(interceptor);
  });
  return function (action) {
    var interceptors = multiInterceptors[action.type] || EMPTY;
    var breeds = tools.breeds;
    return processAll(interceptors, breeds, action);
  };
}

function runAll(interceptors, breeds, action) {
  for (var i = 0; i < interceptors.length; i += 1) {
    interceptors[i](breeds, action);
  }
}

function filterAll(interceptors, breeds, action) {
  var succeed = true;

  for (var i = 0; i < interceptors.length && succeed; i += 1) {
    succeed = interceptors[i](breeds, action);
  }

  return succeed;
}

function interceptorsEgg(tools) {
  var addMiddleware = tools.addMiddleware;
  var filterAction = newMultiInterceptors(tools, filterAll, 'filterAction');
  var decorateAction = newMultiInterceptors(tools, runAll, 'decorateAction');
  var afterAction = newMultiInterceptors(tools, runAll, 'afterAction');
  addMiddleware(function () {
    return function (next) {
      return function (action) {
        var succeed = filterAction(action);
        if (!succeed) return;
        decorateAction(action);
        next(action);
        afterAction(action);
      };
    };
  });
}

function reduxEgg(incubators) {
  storeEgg(incubators);
  storeEgg$1(incubators);
  interceptorsEgg(incubators);
}

export default reduxEgg;
