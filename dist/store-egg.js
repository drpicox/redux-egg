"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = storeEgg;

var _redux = require("redux");

function storeEgg({
  tool,
  breed
}) {
  const middleware = [];

  let newReducer = () => () => null;

  let composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
  tool('replaceNewReducer', nextNewReducer => {
    newReducer = nextNewReducer;
  });
  tool('replaceComposeEnhancers', nextComposeEnhancers => {
    composeEnhancers = nextComposeEnhancers;
  });
  tool('addMiddleware', oneMiddleware => {
    middleware.push(oneMiddleware);
  });
  breed('store', breeds => (0, _redux.createStore)(newReducer(breeds), composeEnhancers((0, _redux.applyMiddleware)(...middleware))));
}