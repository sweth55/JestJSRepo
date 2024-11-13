const handler = async (event) => {
    try {
        console.log("Event received:", JSON.stringify(event));

        const { operation, num1, num2 } = event;

        let result;
        switch (operation) {
            case "add":
                result = num1 + num2;
                break;
            case "subtract":
                result = num1 - num2;
                break;
            case "multiply":
                result = num1 * num2;
                break;
            case "divide":
                result = num2 !== 0 ? num1 / num2 : "Cannot divide by zero";
                break;
            default:
                throw new Error("Invalid operation");
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify({
                operation,
                num1,
                num2,
                result,
            }),
        };

        console.log("Response:", response);

        return response;
    } catch (error) {
        console.error("Error occurred:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};

module.exports = { handler };
