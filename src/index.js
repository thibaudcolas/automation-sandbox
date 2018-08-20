const greet = (name = "World") => `Hello, ${name}!`;
const greetMultiple = (names) => `Hello, ${names.join(", ")}!`;

export { greet, greetMultiple };
