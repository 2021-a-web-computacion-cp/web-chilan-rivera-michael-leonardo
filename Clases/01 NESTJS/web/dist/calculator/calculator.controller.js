"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatorController = void 0;
const common_1 = require("@nestjs/common");
const calculator_service_1 = require("../calculator/calculator.service");
let CalculatorController = class CalculatorController {
    constructor(calculatorService) {
        this.calculatorService = calculatorService;
    }
};
CalculatorController = __decorate([
    (0, common_1.Controller)('calculator'),
    __metadata("design:paramtypes", [typeof (_a = typeof calculator_service_1.CalculatorService !== "undefined" && calculator_service_1.CalculatorService) === "function" ? _a : Object])
], CalculatorController);
exports.CalculatorController = CalculatorController;
//# sourceMappingURL=calculator.controller.js.map