"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = storeEgg;

var _redux = require("redux");

function storeEgg(tools) {
  const reducers = Object.create(null);
  tools.tool('combineReducer', (name, reducer) => {
    if (tools.isHatched) throw new Error(`illegal state exception, combineReducer cannot be used once is hatched`);
    reducers[name] = reducer;
  });
  tools.replaceNewReducer(() => (0, _redux.combineReducers)(reducers));
}