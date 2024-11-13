const { handler } = require('./index'); // Make sure the path is correct

test('Multiplication operation', async () => {
    const event = {
        operation: 'multiply',  // Change the operation to 'multiply'
        num1: 5,
        num2: 7,
    };
    const result = await handler(event);
    // The result of 5 * 3 should be 15
    expect(JSON.parse(result.body).result).toBe(35);
});

test('Division by zero', async () => {
    const event = {
        operation: 'divide',
        num1: 5,
        num2: 0,
    };
    const result = await handler(event);
    // The result for division by zero should be "Cannot divide by zero"
    expect(JSON.parse(result.body).result).toBe("Cannot divide by zero");
});

test('Invalid operation', async () => {
    const event = {
        operation: 'unknown',  // This will trigger an error as the operation is unknown
        num1: 5,
        num2: 0,
    };
    const result = await handler(event);
    // Check that the status code is 500 for invalid operation
    expect(result.statusCode).toBe(500);
    // Expect the error message to be "Invalid operation"
    expect(JSON.parse(result.body).message).toBe("Invalid operation");
});
