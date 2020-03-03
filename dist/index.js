"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reduxEgg;

var _storeEgg = _interopRequireDefault(require("./store-egg"));

var _combineReducersEgg = _interopRequireDefault(require("./combine-reducers-egg"));

var _interceptorsEgg = _interopRequireDefault(require("./interceptors-egg"));

function reduxEgg(incubators) {
  (0, _storeEgg.default)(incubators);
  (0, _combineReducersEgg.default)(incubators);
  (0, _interceptorsEgg.default)(incubators);
}