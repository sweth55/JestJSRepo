const { handler } = require('./index'); // Ensure the path to your handler file

let stopTests = false; // Flag to control test execution

describe('Handler Tests', () => {
    beforeEach(() => {
        if (stopTests) {
            throw new Error("Tests skipped because a previous test failed.");
        }
    });

    // Addition test case
    test('Addition operation', async () => {
        const event = { operation: 'add', num1: 10, num2: 5 };
        const result = await handler(event);
        const body = JSON.parse(result.body);

        expect(result.statusCode).toBe(200);
        expect(body.result).toBe(15); // Correct result
    });

    // Subtraction test case (intentionally incorrect to trigger failure)
    test('Subtraction operation (failure case)', async () => {
        const event = { operation: 'subtract', num1: 10, num2: 5 };
        const result = await handler(event);
        const body = JSON.parse(result.body);

        expect(result.statusCode).toBe(200);
        expect(body.result).toBe(4); // Intentionally incorrect to cause failure

        // Mark tests to stop if this test fails
        if (result.statusCode !== 200 || body.result !== 5) {
            stopTests = true;  // Set the flag to stop further tests
            throw new Error("Subtraction test failed, stopping further tests.");
        }
    });

    // Multiplication test case
    test('Multiplication operation', async () => {
        const event = { operation: 'multiply', num1: 10, num2: 5 };
        const result = await handler(event);
        const body = JSON.parse(result.body);

        expect(result.statusCode).toBe(200);
        expect(body.result).toBe(50); // Correct result
    });

    // Division test case with valid numbers
    test('Division operation (valid)', async () => {
        const event = { operation: 'divide', num1: 10, num2: 2 };
        const result = await handler(event);
        const body = JSON.parse(result.body);

        expect(result.statusCode).toBe(200);
        expect(body.result).toBe(5); // Correct result
    });

    // Division test case with zero division
    test('Division operation (division by zero)', async () => {
        const event = { operation: 'divide', num1: 10, num2: 0 };
        const result = await handler(event);
        const body = JSON.parse(result.body);

        expect(result.statusCode).toBe(200);
        expect(body.result).toBe("Cannot divide by zero"); // Handling division by zero
    });

    // Invalid input test case
    test('Invalid input (missing operation)', async () => {
        const event = { num1: 10, num2: 5 }; // Missing operation
        const result = await handler(event);
        const body = JSON.parse(result.body);

        expect(result.statusCode).toBe(500);
        expect(body.message).toBe("Invalid input: Ensure operation, num1, and num2 are provided and valid.");
    });

    // Invalid input test case
    test('Invalid input (non-numeric num1)', async () => {
        const event = { operation: 'add', num1: "string", num2: 5 }; // Invalid num1 type
        const result = await handler(event);
        const body = JSON.parse(result.body);

        expect(result.statusCode).toBe(500);
        expect(body.message).toBe("Invalid input: Ensure operation, num1, and num2 are provided and valid.");
    });

    // Invalid operation test case
    test('Invalid operation type', async () => {
        const event = { operation: 'invalid', num1: 10, num2: 5 }; // Invalid operation
        const result = await handler(event);
        const body = JSON.parse(result.body);

        expect(result.statusCode).toBe(500);
        expect(body.message).toBe("Invalid operation");
    });
});
