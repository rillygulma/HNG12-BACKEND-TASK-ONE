"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Enable CORS
app.use((0, cors_1.default)());
// Function to check if a number is prime
const isPrime = (num) => {
    if (num < 2)
        return false;
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0)
            return false;
    }
    return true;
};
// Function to check if a number is perfect
const isPerfect = (num) => {
    let sum = 1;
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) {
            sum += i;
            if (i !== num / i)
                sum += num / i;
        }
    }
    return num !== 1 && sum === num;
};
// Function to check if a number is an Armstrong number
const isArmstrong = (num) => {
    const digits = num.toString().split('').map(Number);
    const power = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
    return sum === num;
};
// Function to get a fun fact from the Numbers API
const getFunFact = (num) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`http://numbersapi.com/${num}/math?json`);
        return response.data.text;
    }
    catch (error) {
        return "No fun fact available.";
    }
});
// API Endpoint
app.get("/api/classify-number", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { number } = req.query;
        const num = Number(number);
        if (isNaN(num)) {
            res.status(400).json({
                number,
                error: true
            });
            return;
        }
        const prime = isPrime(num);
        const perfect = isPerfect(num);
        const armstrong = isArmstrong(num);
        const digitSum = num.toString().split('').reduce((sum, digit) => sum + Number(digit), 0);
        const properties = [];
        if (armstrong)
            properties.push("armstrong");
        properties.push(num % 2 === 0 ? "even" : "odd");
        const funFact = yield getFunFact(num);
        res.json({
            number: num,
            is_prime: prime,
            is_perfect: perfect,
            properties,
            digit_sum: digitSum,
            fun_fact: funFact
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
