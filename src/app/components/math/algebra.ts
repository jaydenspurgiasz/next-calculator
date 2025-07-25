/*
c*(a + b) => ab+c*

    c     (
    ca    (+
    cab+  (

    Track lastOp bool
    Whenever '(' we check lastOp. If lastOp false, then add *
*/

const ops: Map<string, number> = new Map([
	["+", 1],
	["-", 1],
	["*", 2],
	["/", 2],
	["^", 3],
]);

function tokenize(input: string): string[] {
	input = input.replace(/\s+/g, ""); // Whitespace
	let tokens: string[] = [];

	const reg: RegExp = /([A-Za-z][A-Za-z0-9]*|\d+(?:\.\d+)?|[+\-*/^()])/g; // Totaly gpted. Identifies multi character tokens
	let t: RegExpExecArray | null;

	while ((t = reg.exec(input)) !== null) {
		tokens.push(t[1]);
	}

	return tokens;
}

function infixToPostfix(input: string): string {
	let postfix: string = "";
	let opStack: string[] = [];

	for (let ch of input) {
		if (ops.has(ch)) {
			while (
				(ops.get(opStack[opStack.length - 1]) ?? 0) > (ops.get(ch) ?? 0) ||
				((ops.get(opStack[opStack.length - 1]) ?? 0) === (ops.get(ch) ?? 0) &&
					opStack[opStack.length - 1] !== "^" &&
					opStack[opStack.length - 1] !== "(")
			) {
				postfix += opStack.pop();
			}
			opStack.push(ch);
		} else if (ch === "(") {
			opStack.push("(");
		} else if (ch === ")") {
			while (opStack[opStack.length - 1] !== "(") {
				postfix += opStack.pop();
			}
			opStack.pop();
		} else {
			postfix += ch;
		}
	}

	while (opStack.length > 0) {
		postfix += opStack.pop();
	}

	return postfix;
}

/*
console.log(infixToPostfix("c*(a + b)"));
console.log(infixToPostfix("a + b * c"));
console.log(infixToPostfix("a + b * c - d"));
console.log(infixToPostfix("e^(4*t/5)"));
*/

console.log(tokenize("x1 / x2 * x3"));
