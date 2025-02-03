import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Function to check if a number is prime
const isPrime = (num: number): boolean => {
    if (num < 2) return false;
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) return false;
    }
    return true;
};

// Function to check if a number is perfect
const isPerfect = (num: number): boolean => {
    let sum = 1;
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) {
            sum += i;
            if (i !== num / i) sum += num / i;
        }
    }
    return num !== 1 && sum === num;
};

// Function to check if a number is an Armstrong number
const isArmstrong = (num: number): boolean => {
    const digits = num.toString().split('').map(Number);
    const power = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
    return sum === num;
};

// Function to get a fun fact from the Numbers API
const getFunFact = async (num: number): Promise<string> => {
    try {
        const response = await axios.get(`http://numbersapi.com/${num}/math?json`);
        return response.data.text;
    } catch (error) {
        return "No fun fact available.";
    }
};

// API Endpoint
app.get("/api/classify-number", async (req: Request, res: Response): Promise<void> => {
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

        const properties: string[] = [];
        if (armstrong) properties.push("armstrong");
        properties.push(num % 2 === 0 ? "even" : "odd");

        const funFact = await getFunFact(num);

        res.json({
            number: num,
            is_prime: prime,
            is_perfect: perfect,
            properties,
            digit_sum: digitSum,
            fun_fact: funFact
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
