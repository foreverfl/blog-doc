---
sidebar_position: 3
---

# Examples

A kitchen-sink page exercising every common Markdown and MDX element, so we can
see what renders correctly and what breaks.

## Text formatting

Regular text with **bold**, *italic*, ***bold italic***, ~~strikethrough~~,
`inline code`, and an [internal anchor link](#code). Here is an external
[link to Docusaurus](https://docusaurus.io). Superscript and subscript:
H<sub>2</sub>O and E = mc<sup>2</sup>.

## Headings

### Level 3 heading

#### Level 4 heading

##### Level 5 heading

###### Level 6 heading

## Lists

### Unordered

- First item
- Second item
  - Nested item
  - Another nested item
    - Deeply nested item
- Third item

### Ordered

1. Step one
2. Step two
   1. Sub-step a
   2. Sub-step b
3. Step three

### Task list

- [x] Completed task
- [ ] Pending task
- [ ] Another pending task

## Blockquote

> This is a blockquote.
>
> > And a nested blockquote inside it.

## Code

Inline `const x = 1` and a fenced block with a title:

```js title="example.js"
function greet(name) {
  // greet the caller
  return `Hello, ${name}!`;
}

greet('mogumogu');
```

```bash
docker compose up -d --build
```

## Syntax highlighting

One block per language to check Prism highlighting across the stack.

```rust
fn main() {
    println!("Hello, mogumogu!");
}
```

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello, mogumogu!")
}
```

```haskell
main :: IO ()
main = putStrLn "Hello, mogumogu!"
```

```swift
let name = "mogumogu"
print("Hello, \(name)!")
```

```php
<?php
echo "Hello, mogumogu!";
```

```python
def greet(name: str) -> str:
    return f"Hello, {name}!"
```

```java
class Main {
    public static void main(String[] args) {
        System.out.println("Hello, mogumogu!");
    }
}
```

```kotlin
fun main() {
    println("Hello, mogumogu!")
}
```

```sql
SELECT id, variety FROM apple WHERE color = 'red' ORDER BY id;
```

```yaml
service: rust-api
port: 8080
replicas: 2
```

```toml
[server]
host = "0.0.0.0"
port = 8080
```

```graphql
query Apples {
  apples(limit: 10) {
    id
    variety
  }
}
```

## Table

| Method | Path | Description |
| --- | --- | :---: |
| `GET` | `/api/apple` | List apples |
| `POST` | `/api/apple` | Create an apple |
| `DELETE` | `/api/apple/{id}` | Delete an apple |

## Admonitions

:::note
A note admonition for incidental information.
:::

:::tip
A tip admonition for helpful advice.
:::

:::info
An info admonition for neutral context.
:::

:::warning
A warning admonition for things to be careful about.
:::

:::danger
A danger admonition for critical warnings.
:::

## Media

![mogumogu logo](/img/logo.png)

## Collapsible details

<details>
  <summary>Click to expand</summary>

  Hidden content revealed on toggle, including a code block:

  ```json
  { "id": "apl_01", "variety": "Fuji" }
  ```

</details>

## Horizontal rule

---

That's everything.
