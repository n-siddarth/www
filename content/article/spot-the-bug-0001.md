---
title: "Spot the Bug 0001"
description: An interesting JavaScript regular expression bug and some debugging.
published: 03/17/2026
author: ["Siddarth Narayanan"]
finalized: true
---

As I was building [Tondova](https://tondova.com), I stumbled upon a regex bug that caught me by surprise. Consider the following regular expression, which is designed to match phone numbers of the form `XXX-XXX-XXXX`:

```typescript
const regex = /^\d{3}-\d{3}-\d{4}$/g;
function validateNumber(phone: string) {
  return regex.test(phone);
}
```

_Can you spot the bug?_

Well, the issue isn't in the regular expression itself, but in the modifiers applied to it. In JavaScript, we can add modifiers to regular expressions by placing characters after the expression definition `/.../`. Common modifiers include:

- `g`: Matches all occurrences in a string
- `i`: Enables case-insensitive matching
- `m`: Enables multi-line matching
- `s`: Allows `.` to match newline characters

So, the problem stems from our usage of the global `g` modifier in the expression.

# The Global Modifier

Have you ever wondered: _how do regular expressions actually match all occurrences of a pattern in a string?_ No? Well, after encountering this bug, I wanted to understand why. It turns out that when we add the `g` modifier to a regular expression, we are implicitly turning it into a stateful object. If we take a look at NodeJS' `RegExp` interface:

```typescript
interface RegExp {
  /**
  _ Executes a search on a string using a regular expression pattern, and returns an array containing the results of that search.
  _ @param string The String object or string literal on which to perform the search.
  */
  exec(string: string): RegExpExecArray | null;

  /**
   * Returns a Boolean value that indicates whether or not a pattern exists in a searched string.
   * @param string String on which to perform the search.
   */
  test(string: string): boolean;

  /** Returns a copy of the text of the regular expression pattern. Read-only. The regExp argument is a Regular expression object. It can be a variable name or a literal. */
  readonly source: string;

  /** Returns a Boolean value indicating the state of the global flag (g) used with a regular expression. Default is false. Read-only. */
  readonly global: boolean;

  /** Returns a Boolean value indicating the state of the ignoreCase flag (i) used with a regular expression. Default is false. Read-only. */
  readonly ignoreCase: boolean;

  /** Returns a Boolean value indicating the state of the multiline flag (m) used with a regular expression. Default is false. Read-only. */
  readonly multiline: boolean;

  // [!code highlight:1]
  lastIndex: number;

  // Non-standard extensions
  /** @deprecated A legacy feature for browser compatibility */
  compile(pattern: string, flags?: string): this;
}
```

We can see that the object maintains a `lastIndex` property. This property indicates the index where the previous match ended, which determines where the next search begins. To find multiple matches, the engine repeatedly searches the string starting from `lastIndex` until no more matches are found.

Now we can finally understand why our expression to match phone numbers above was failing. The issue arises because we added the `g` modifier, which makes the regex stateful. Since the regex is defined in the global scope (i.e., outside the `validateNumber` function), its `lastIndex` property is shared across function calls. As a result, each call mutates external state, making the function [impure and non-deterministic](https://www.geeksforgeeks.org/javascript/understanding-the-difference-between-pure-and-impure-functions-in-javascript/).

Specifically, we would observe the following behavior:

```typescript
// First call
validateNumber("424-245-5832"); // true
// Second call
validateNumber("424-245-5832"); // false
// Third call
validateNumber("424-245-5832"); // true
```

1. After the first call, `lastIndex` is set to 12 (the length of the input).
2. The second call fails because no match exists starting at index 12. When no match is found, `lastIndex` resets to 0.
3. The third call succeeds again because `lastIndex` was reset.

# Fix

The simplest fix is to remove the `g` modifier. Notice how we are already anchoring our regular expression to the start and end of the string using `^` and `$`. This means that the global modifier serves no purpose. Since we only care whether the entire string matches the pattern, we only expect a single match.

We can also inline the regular expression within the function itself.

```typescript
function validateNumber(phone: string) {
  return /^\d{3}-\d{3}-\d{4}$/.test(phone);
}
```

This ensures that any internal regular expression state is rebuilt on every function call, maintaining the [purity](https://www.geeksforgeeks.org/javascript/understanding-the-difference-between-pure-and-impure-functions-in-javascript/) of the function.

---

I hope you found this debugging process interesting! I definitely learned a little more about how regular expressions in JavaScript work.
