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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! exports provided: App */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var fortjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fortjs */ "fortjs");
/* harmony import */ var fortjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fortjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routes */ "./src/routes.ts");
/* harmony import */ var eshtml__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! eshtml */ "eshtml");
/* harmony import */ var eshtml__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(eshtml__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super.call(this) || this;
        _this.routes = _routes__WEBPACK_IMPORTED_MODULE_1__["routes"];
        _this.viewEngine = eshtml__WEBPACK_IMPORTED_MODULE_2__["FortViewEngine"];
        return _this;
    }
    return App;
}(fortjs__WEBPACK_IMPORTED_MODULE_0__["Fort"]));

new App().create({
    defaultPath: "default",
    folders: [{
            alias: "/",
            path: path__WEBPACK_IMPORTED_MODULE_3__["join"](__dirname, "../static")
        }]
}).then(function () {
    console.log("Your fort is located at address - localhost:4000");
});


/***/ }),

/***/ "./src/controllers/default_controller.ts":
/*!***********************************************!*\
  !*** ./src/controllers/default_controller.ts ***!
  \***********************************************/
/*! exports provided: DefaultController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultController", function() { return DefaultController; });
/* harmony import */ var fortjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fortjs */ "fortjs");
/* harmony import */ var fortjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fortjs__WEBPACK_IMPORTED_MODULE_0__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var DefaultController = /** @class */ (function (_super) {
    __extends(DefaultController, _super);
    function DefaultController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultController.prototype.default = function () {
        return __awaiter(this, void 0, void 0, function () {
            var model, result, ex_1, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        model = {
                            title: 'FortJs'
                        };
                        return [4 /*yield*/, Object(fortjs__WEBPACK_IMPORTED_MODULE_0__["viewResult"])('controller:default,action:default', model)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        ex_1 = _a.sent();
                        console.log(ex_1);
                        return [4 /*yield*/, Object(fortjs__WEBPACK_IMPORTED_MODULE_0__["textResult"])("Our server is busy right now. Please try later.")];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Object(fortjs__WEBPACK_IMPORTED_MODULE_0__["DefaultWorker"])()
    ], DefaultController.prototype, "default", null);
    return DefaultController;
}(fortjs__WEBPACK_IMPORTED_MODULE_0__["Controller"]));



/***/ }),

/***/ "./src/controllers/quote_controller.ts":
/*!*********************************************!*\
  !*** ./src/controllers/quote_controller.ts ***!
  \*********************************************/
/*! exports provided: QuoteController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuoteController", function() { return QuoteController; });
/* harmony import */ var fortjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fortjs */ "fortjs");
/* harmony import */ var fortjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fortjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_quote_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/quote_service */ "./src/services/quote_service.ts");
/* harmony import */ var _guards_dataValidatorGuard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../guards/dataValidatorGuard */ "./src/guards/dataValidatorGuard.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var QuoteController = /** @class */ (function (_super) {
    __extends(QuoteController, _super);
    function QuoteController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.service = new _services_quote_service__WEBPACK_IMPORTED_MODULE_1__["QuoteService"](); // CRUD operasyonlarını üstlenen servis nesnemizi örnekledik
        return _this;
        //TODO: Belli bir yazara göre özlü sözleri listeleyen metod denenebilir
    }
    /*
    @DefaultWorker()
    async default() {
        var result = {
            "quotes":
                [
                    { "quote": { "id": 1, "text": "Kontrolsüz güç güç değildir" } },
                    { "quote": { "id": 2, "text": "Ali veli 49 50" } },
                    { "quote": { "id": 3, "text": "Ak akçe karagün içindir" } },
                ]
        };
        return jsonResult(result, HTTP_STATUS_CODE.Ok);
    }
    */
    // HTTP Post'a hizmet edecen Worker metodumuz
    QuoteController.prototype.createQuote = function () {
        return __awaiter(this, void 0, void 0, function () {
            var payload, newQuote;
            return __generator(this, function (_a) {
                payload = {
                    id: this.body.id,
                    text: this.body.text,
                    available: this.body.available,
                    owner: this.body.owner
                };
                newQuote = this.service.createQuote(payload);
                // geriye oluşturulan quote içeriğini(id'de barındırır) ve HTTP 201 kodunu gönderdik
                return [2 /*return*/, Object(fortjs__WEBPACK_IMPORTED_MODULE_0__["jsonResult"])(newQuote, fortjs__WEBPACK_IMPORTED_MODULE_0__["HTTP_STATUS_CODE"].Created)];
            });
        });
    };
    // Silme operasyonumuz HTTP Delete metoduna cevap verecek
    QuoteController.prototype.deleteQuote = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id, q;
            return __generator(this, function (_a) {
                id = Number(this.param.id);
                q = this.service.getQuoteById(id);
                if (q != null) {
                    this.service.deleteQuote(id);
                    return [2 /*return*/, Object(fortjs__WEBPACK_IMPORTED_MODULE_0__["jsonResult"])("Silindi", fortjs__WEBPACK_IMPORTED_MODULE_0__["HTTP_STATUS_CODE"].Ok)];
                }
                else {
                    return [2 /*return*/, Object(fortjs__WEBPACK_IMPORTED_MODULE_0__["jsonResult"])("Bulunamadığı için silinemedi", fortjs__WEBPACK_IMPORTED_MODULE_0__["HTTP_STATUS_CODE"].NotFound)];
                }
                return [2 /*return*/];
            });
        });
    };
    // Bir özlü sözü güncellemek için kullanılır
    // HTTP Put taleplerine karşılık verir
    QuoteController.prototype.updateQuote = function () {
        return __awaiter(this, void 0, void 0, function () {
            var payload, updatedValue;
            return __generator(this, function (_a) {
                console.log(this.body);
                payload = {
                    id: this.body.id,
                    text: this.body.text,
                    available: this.body.available,
                    owner: this.body.owner
                };
                updatedValue = this.service.updateQuote(payload);
                return [2 /*return*/, updatedValue];
            });
        });
    };
    // varsayılan worker'ımız HTTP Get talepleri sonrası çalışır
    QuoteController.prototype.getQuoteList = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Object(fortjs__WEBPACK_IMPORTED_MODULE_0__["jsonResult"])(this.service.getAllQuotes())]; // Sonuçları json formatında gönderdik
            });
        });
    };
    // HTTP Get ve querystring'teki id değerine göre quote döner
    QuoteController.prototype.getQuoteById = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id, q;
            return __generator(this, function (_a) {
                id = Number(this.param.id);
                q = this.service.getQuoteById(id);
                if (q == null) {
                    return [2 /*return*/, Object(fortjs__WEBPACK_IMPORTED_MODULE_0__["jsonResult"])("Bulamadım :(", fortjs__WEBPACK_IMPORTED_MODULE_0__["HTTP_STATUS_CODE"].NotFound)];
                }
                return [2 /*return*/, Object(fortjs__WEBPACK_IMPORTED_MODULE_0__["jsonResult"])(q, fortjs__WEBPACK_IMPORTED_MODULE_0__["HTTP_STATUS_CODE"].Ok)];
            });
        });
    };
    __decorate([
        Object(fortjs__WEBPACK_IMPORTED_MODULE_0__["Worker"])([fortjs__WEBPACK_IMPORTED_MODULE_0__["HTTP_METHOD"].Post]),
        Object(fortjs__WEBPACK_IMPORTED_MODULE_0__["Route"])("/") // adres bildirimi. Yani http://localhost:4000/quote 
        ,
        Object(fortjs__WEBPACK_IMPORTED_MODULE_0__["Guards"])([_guards_dataValidatorGuard__WEBPACK_IMPORTED_MODULE_2__["DataValidatorGuard"]]) // body ile gelen verinin kontrolünü devrettiğimiz Guard nesne bildirimi
    ], QuoteController.prototype, "createQuote", null);
    __decorate([
        Object(fortjs__WEBPACK_IMPORTED_MODULE_0__["Worker"])([fortjs__WEBPACK_IMPORTED_MODULE_0__["HTTP_METHOD"].Delete]),
        Object(fortjs__WEBPACK_IMPORTED_MODULE_0__["Route"])("/{id}") // QueryString parametresi olarak gelen id değeri
    ], QuoteController.prototype, "deleteQuote", null);
    __decorate([
        Object(fortjs__WEBPACK_IMPORTED_MODULE_0__["Worker"])([fortjs__WEBPACK_IMPORTED_MODULE_0__["HTTP_METHOD"].Put]),
        Object(fortjs__WEBPACK_IMPORTED_MODULE_0__["Route"])("/") // yönlendirme adresi yine http://localhost:4000/quote şeklinde
    ], QuoteController.prototype, "updateQuote", null);
    __decorate([
        Object(fortjs__WEBPACK_IMPORTED_MODULE_0__["DefaultWorker"])()
    ], QuoteController.prototype, "getQuoteList", null);
    __decorate([
        Object(fortjs__WEBPACK_IMPORTED_MODULE_0__["Worker"])([fortjs__WEBPACK_IMPORTED_MODULE_0__["HTTP_METHOD"].Get]),
        Object(fortjs__WEBPACK_IMPORTED_MODULE_0__["Route"])("/{id}")
    ], QuoteController.prototype, "getQuoteById", null);
    return QuoteController;
}(fortjs__WEBPACK_IMPORTED_MODULE_0__["Controller"]));



/***/ }),

/***/ "./src/guards/dataValidatorGuard.ts":
/*!******************************************!*\
  !*** ./src/guards/dataValidatorGuard.ts ***!
  \******************************************/
/*! exports provided: DataValidatorGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataValidatorGuard", function() { return DataValidatorGuard; });
/* harmony import */ var fortjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fortjs */ "fortjs");
/* harmony import */ var fortjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fortjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_quote__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/quote */ "./src/models/quote.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


// Guard türevli kendi dekoratör sınıfımız
// Görevi Quote verilerinin içeriklerini kontrol etmek
var DataValidatorGuard = /** @class */ (function (_super) {
    __extends(DataValidatorGuard, _super);
    function DataValidatorGuard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // check, Guard sınıfından gelen ve ezilmek zorunda olan metodumuz. Kontrol işlemini üstlenecek
    DataValidatorGuard.prototype.check = function () {
        return __awaiter(this, void 0, void 0, function () {
            var quote;
            return __generator(this, function (_a) {
                quote = new _models_quote__WEBPACK_IMPORTED_MODULE_1__["Quote"](this.body);
                // Test amaçlı olarak null dönüyoruz ancak burada veri kontrolü yapılabilir.
                // Örneğin gelen verinin formatı uygun mu?
                // Uygunsa veri içeriğine ait özlü söz kütüphanemizde var mı?
                // Ya da sadece id'nin repository'de olup olmaması gibi basit bir kontrol konulabilir
                // Guard nesneleri attribute şeklinde kullanıldıklarından çeşitlendirilebilirler
                return [2 /*return*/, null];
            });
        });
    };
    return DataValidatorGuard;
}(fortjs__WEBPACK_IMPORTED_MODULE_0__["Guard"]));



/***/ }),

/***/ "./src/models/quote.ts":
/*!*****************************!*\
  !*** ./src/models/quote.ts ***!
  \*****************************/
/*! exports provided: Quote */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Quote", function() { return Quote; });
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! class-validator */ "class-validator");
/* harmony import */ var class_validator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(class_validator__WEBPACK_IMPORTED_MODULE_0__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Quote = /** @class */ (function () {
    function Quote(quote) {
        this.id = Number(quote.id);
        this.text = quote.name;
        this.available = quote.gender;
        this.owner = quote.owner;
    }
    __decorate([
        Object(class_validator__WEBPACK_IMPORTED_MODULE_0__["Length"])(100)
    ], Quote.prototype, "text", void 0);
    __decorate([
        Object(class_validator__WEBPACK_IMPORTED_MODULE_0__["Length"])(100)
    ], Quote.prototype, "owner", void 0);
    __decorate([
        Object(class_validator__WEBPACK_IMPORTED_MODULE_0__["IsIn"])(["yes", "no"]) //seçenekleri evet veya hayır olabilen string bir değişken
    ], Quote.prototype, "available", void 0);
    return Quote;
}());



/***/ }),

/***/ "./src/routes.ts":
/*!***********************!*\
  !*** ./src/routes.ts ***!
  \***********************/
/*! exports provided: routes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony import */ var _controllers_default_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/default_controller */ "./src/controllers/default_controller.ts");
/* harmony import */ var _controllers_quote_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controllers/quote_controller */ "./src/controllers/quote_controller.ts");


var routes = [{
        path: "/default",
        controller: _controllers_default_controller__WEBPACK_IMPORTED_MODULE_0__["DefaultController"]
    }, {
        path: "/quote",
        controller: _controllers_quote_controller__WEBPACK_IMPORTED_MODULE_1__["QuoteController"]
    }];


/***/ }),

/***/ "./src/services/quote_service.ts":
/*!***************************************!*\
  !*** ./src/services/quote_service.ts ***!
  \***************************************/
/*! exports provided: QuoteService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuoteService", function() { return QuoteService; });
var library = {
    quotes: []
};
// Servis sınıfımız temel CRUD operasyonlarını içermekte
var QuoteService = /** @class */ (function () {
    function QuoteService() {
    }
    // yeni bir quote nesnesi ekler
    QuoteService.prototype.createQuote = function (quote) {
        library.quotes.push(quote);
        return quote;
    };
    // gelen quote bilgisine bakarak güncelleme yapar
    QuoteService.prototype.updateQuote = function (quote) {
        // gelen quote nesnesindeki id değerini kullanarak kaydı bul
        var current = library.quotes.find(function (q) { return q.id === quote.id; });
        if (current != null) { //kayıt varsa alanlarını güncelle
            current.id = quote.id;
            current.text = quote.text;
            current.owner = quote.owner;
            current.available = quote.available;
            return current;
        }
        else
            return quote;
    };
    // id değerine göre silme işlemini yapar
    QuoteService.prototype.deleteQuote = function (id) {
        var currentID = library.quotes.findIndex(function (q) { return q.id === id; }); // id üzerinden kaydın indeksini bul
        library.quotes.splice(currentID, 1); // index'in bulunduğu yerden itibaren 1 kayıt sil
    };
    // id değerine göre quote'ı bulur
    QuoteService.prototype.getQuoteById = function (id) {
        var current = library.quotes.find(function (q) { return q.id === id; });
        return current;
    };
    // tüm özlü sözleri döndürür
    QuoteService.prototype.getAllQuotes = function () {
        return library.quotes;
    };
    return QuoteService;
}());



/***/ }),

/***/ "./src/views/default/default.ts":
/*!**************************************!*\
  !*** ./src/views/default/default.ts ***!
  \**************************************/
/*! exports provided: DefaultView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultView", function() { return DefaultView; });
/* harmony import */ var eshtml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eshtml */ "eshtml");
/* harmony import */ var eshtml__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(eshtml__WEBPACK_IMPORTED_MODULE_0__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

// you can give any name but make sure its unique among all other views.
var DefaultView = /** @class */ (function (_super) {
    __extends(DefaultView, _super);
    function DefaultView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultView.prototype.render = function (model) {
        return "<!doctype html>\n        <html>\n        <head>\n        <title>" + model.title + "</title>\n        </head>\n        <body>\n        <div class=\"text-center\" style=\"margin-top:50px;\">\n        <img src=\"/fort_js_logo_200_137.png\"/>\n        <span class=\"app-name\">FortJs</span>\n        </div>\n        <div class=\"text-center\">\n        Congrats ! You Own A Fort Now.\n        </div>\n        <div class=\"text-center\" style=\"margin-top:50px;font-size:40px;\">\n        Fill up your fort with <a target=\"_blank\" href=\"http://fortjs.info/tutorial/guard/\">guards</a>, \n        <a target=\"_blank\" href=\"http://fortjs.info/tutorial/shield/\">shields</a> and \n        <a href=\"http://fortjs.info/tutorial/wall/\" target=\"_blank\">walls</a>.\n        </div>\n        <div>\n        <ul>\n        <li><i class=\"fas fa-globe\"></i> Docs - http://fortjs.info/ </li>\n        <li><i class=\"fab fa-medium-m\"></i> Medium - https://medium.com/fortjs</li>\n        </ul>\n        </div>\n        <style>\n        body{\n            background-color:#000000;\n            color:white;\n        }\n        .text-center{\n            text-align:center;\n        }\n        .app-name{\n            font-size:200px;\n        }\n        a{\n            color:#8fff35;\n        }\n        ul{\n            margin-top:100px;\n            font-size:30px;\n            text-align:center;\n            padding-left:30%;\n        }\n        ul li {\n            text-align:left;\n            padding-top:20px;   \n        }\n        </style>\n        <link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.6.1/css/all.css\" integrity=\"sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP\" crossorigin=\"anonymous\">\n        </body>\n        </html>\n        ";
    };
    DefaultView = __decorate([
        Object(eshtml__WEBPACK_IMPORTED_MODULE_0__["declareView"])('controller:default,action:default')
    ], DefaultView);
    return DefaultView;
}(eshtml__WEBPACK_IMPORTED_MODULE_0__["View"]));



/***/ }),

/***/ "./src/views/default/index.ts":
/*!************************************!*\
  !*** ./src/views/default/index.ts ***!
  \************************************/
/*! exports provided: DefaultView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _default__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./default */ "./src/views/default/default.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DefaultView", function() { return _default__WEBPACK_IMPORTED_MODULE_0__["DefaultView"]; });




/***/ }),

/***/ "./src/views/index.ts":
/*!****************************!*\
  !*** ./src/views/index.ts ***!
  \****************************/
/*! exports provided: DefaultView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _default_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./default/index */ "./src/views/default/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DefaultView", function() { return _default_index__WEBPACK_IMPORTED_MODULE_0__["DefaultView"]; });




/***/ }),

/***/ 0:
/*!***********************************************!*\
  !*** multi ./src/app.ts ./src/views/index.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/burakselyum/Development/saturday-night-works/No 14 - REST with Typescript/starter-project/src/app.ts */"./src/app.ts");
module.exports = __webpack_require__(/*! /home/burakselyum/Development/saturday-night-works/No 14 - REST with Typescript/starter-project/src/views/index.ts */"./src/views/index.ts");


/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("class-validator");

/***/ }),

/***/ "eshtml":
/*!*************************!*\
  !*** external "eshtml" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("eshtml");

/***/ }),

/***/ "fortjs":
/*!*************************!*\
  !*** external "fortjs" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fortjs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })

/******/ });
//# sourceMappingURL=app.js.map