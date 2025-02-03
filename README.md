# Number Classification API

This is a simple Express.js API that classifies numbers based on different properties. It determines if a number is prime, perfect, or an Armstrong number, and also provides a fun fact about the number using the Numbers API.

## Features
- Check if a number is **prime**.
- Check if a number is **perfect**.
- Check if a number is an **Armstrong number**.
- Identify if the number is **even** or **odd**.
- Calculate the **digit sum** of the number.
- Fetch a **fun fact** about the number from the Numbers API.

## Technologies Used
- **Node.js**
- **Express.js**
- **TypeScript**
- **Axios** (for fetching data from the Numbers API)
- **CORS** (for cross-origin requests)
- **Vercel** (for serverless deployment)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/number-classification-api.git
   ```
2. Navigate to the project directory:
   ```sh
   cd number-classification-api
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Running the Server

To start the server locally, run:
```sh
npm run dev
```

The API will be available at `https://hng-12-backend-task-one.vercel.app` .

## API Endpoint

### `GET /api/classify-number`

#### Query Parameters:
- `number` (required): The number to classify.

#### Example Request:
```sh
GET /api/classify-number?number=28
```

#### Example Response:
```json
{
  "number": 28,
  "is_prime": false,
  "is_perfect": true,
  "properties": ["even"],
  "digit_sum": 10,
  "fun_fact": "28 is a perfect number, equal to the sum of its proper divisors."
}
```
