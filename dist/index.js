'use strict';
// tsc.setSize(40, 30).setGap(2).setCls().setText(50, 50, "4", 0, 1, 1, "465846158").setPrint(1);
// console.log(tsc.getDataBuffer());
Object.defineProperty(exports, '__esModule', { value: true });
exports.EscCommand = exports.TscCommand = void 0;
var tsc_1 = require('./tsc');
Object.defineProperty(exports, 'TscCommand', {
    enumerable: true,
    get: function () {
        return tsc_1.TscCommand;
    },
});
var esc_1 = require('./esc');
Object.defineProperty(exports, 'EscCommand', {
    enumerable: true,
    get: function () {
        return esc_1.EscCommand;
    },
});
//# sourceMappingURL=index.js.map
