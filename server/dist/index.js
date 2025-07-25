'use strict';

var express = require('express');
var ansiColors = require('ansi-colors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

function connectDB() {
    return mongoose.connect("mongodb://47.121.133.92:27017/mySelf", {
        authSource: "admin",
        user: "cai",
        pass: "201031",
    });
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
});
var Tag = mongoose.model("Tag", TagSchema);

const artController = express.Router();
artController.post("/tag", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name = "" } = req.body;
    if (!name || !name.trim().length) {
        return res.status(400).json({
            code: 0,
            message: "请填写标签名称",
        });
    }
    try {
        yield Tag.create({ name, createDate: Date.now() });
        return res.status(200).json({
            code: 1,
            message: "标签创建成功",
        });
    }
    catch (error) {
        return res.status(500).json({
            code: 0,
            message: "标签创建失败",
            error: error instanceof Error ? error.message : String(error),
        });
    }
}));
artController.delete("/tag", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        if (!id) {
            throw new Error("标签ID不能为空");
        }
        const result = yield Tag.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            res.status(400).send({
                message: "标签未找到",
                code: 0,
            });
        }
        else {
            res.status(200).send({
                message: "标签删除成功",
                code: 1,
            });
        }
    }
    catch (err) {
        return res.status(400).send({
            message: "删除标签失败",
            code: 0,
        });
    }
}));
artController.get("/tag", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = {};
        if (req.query.name && req.query.name.trim()) {
            filter.name = req.query.name.trim();
        }
        const tagsDbList = yield Tag.find(filter);
        res.status(200).json({
            code: 1,
            message: "获取标签成功",
            data: tagsDbList.map((tag) => {
                var _a, _b, _c;
                return ({
                    name: tag.name,
                    createDate: tag.createDate,
                    id: (_c = (_b = (_a = tag._id) === null || _a === void 0 ? void 0 : _a.toString) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : "",
                });
            }),
        });
    }
    catch (error) {
        return res.status(500).json({
            code: 0,
            message: "获取标签失败",
            error: error instanceof Error ? error.message : String(error),
        });
    }
}));
artController.put("/tag", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = req.body;
    if (!id)
        return res.status(400).send({ code: 0, message: "标签ID不能为空" });
    if (!name || !name.trim().length) {
        return res.status(400).json({
            code: 0,
            message: "请填写标签名称",
        });
    }
    const updateDbResponse = yield Tag.findOneAndUpdate({ _id: id }, { name });
    if (!updateDbResponse) {
        res.status(400).send({
            code: 0,
            message: "标签未找到",
        });
    }
    else {
        res.status(200).send({
            code: 1,
            message: "标签更新成功",
        });
    }
}));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
    next();
});
app.use("/art", artController);
connectDB()
    .then(() => {
    console.log(ansiColors.green("Database connected successfully✅"));
    app.listen(3000, () => {
        console.log(ansiColors.green("Server is running on port 3000✅"));
    });
})
    .catch((err) => {
    console.log(ansiColors.red("Database connection failed❌"), err);
});
//# sourceMappingURL=index.js.map
