---
sidebar_position: 3
---

# 例

よく使う Markdown・MDX 要素を 1 ページにまとめ、何が正しくレンダリングされ、
何が崩れるかを確認するためのページです。

## テキストの書式

通常のテキストに **太字**、*斜体*、***太字斜体***、~~取り消し線~~、
`インラインコード`、そして [内部アンカーリンク](#code) を入れた例です。外部
[Docusaurus へのリンク](https://docusaurus.io) もあります。上付きと下付き:
H<sub>2</sub>O と E = mc<sup>2</sup>。

## 見出し

### レベル 3 見出し

#### レベル 4 見出し

##### レベル 5 見出し

###### レベル 6 見出し

## リスト

### 順序なしリスト

- 1 つ目の項目
- 2 つ目の項目
  - ネストした項目
  - もう 1 つのネストした項目
    - さらに深くネストした項目
- 3 つ目の項目

### 順序付きリスト

1. ステップ 1
2. ステップ 2
   1. サブステップ a
   2. サブステップ b
3. ステップ 3

### タスクリスト

- [x] 完了したタスク
- [ ] 未完了のタスク
- [ ] もう 1 つの未完了タスク

## 引用

> これは引用です。
>
> > そしてその中にネストした引用です。

## コード {#code}

インライン `const x = 1` とタイトル付きのコードブロック:

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

## シンタックスハイライト

スタック全体の Prism ハイライトを確認するための言語別ブロックです。

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

## 表

| Method | Path | 説明 |
| --- | --- | :---: |
| `GET` | `/api/apple` | りんごの一覧取得 |
| `POST` | `/api/apple` | りんごの作成 |
| `DELETE` | `/api/apple/{id}` | りんごの削除 |

## アドモニション(Admonition)

:::note
補足的な情報のための note アドモニションです。
:::

:::tip
役立つアドバイスのための tip アドモニションです。
:::

:::info
中立的な文脈のための info アドモニションです。
:::

:::warning
注意が必要な内容のための warning アドモニションです。
:::

:::danger
重大な警告のための danger アドモニションです。
:::

## メディア

![mogumogu ロゴ](/img/logo.png)

## 折りたたみ詳細

<details>
  <summary>クリックして展開</summary>

  トグルで表示される隠しコンテンツで、コードブロックも含みます:

  ```json
  { "id": "apl_01", "variety": "Fuji" }
  ```

</details>

## 水平線

---

以上ですべてです。
