---
sidebar_position: 3
---

# 예시

자주 쓰는 Markdown·MDX 요소를 한 페이지에 모아, 무엇이 제대로 렌더되고 무엇이
깨지는지 확인하기 위한 페이지입니다.

## 텍스트 서식

일반 텍스트에 **굵게**, *기울임*, ***굵은 기울임***, ~~취소선~~,
`인라인 코드`, 그리고 [내부 앵커 링크](#code)를 넣은 예시입니다. 외부
[Docusaurus 링크](https://docusaurus.io)도 있습니다. 위 첨자와 아래 첨자:
H<sub>2</sub>O 와 E = mc<sup>2</sup>.

## 헤딩

### 레벨 3 헤딩

#### 레벨 4 헤딩

##### 레벨 5 헤딩

###### 레벨 6 헤딩

## 리스트

### 순서 없는 리스트

- 첫 번째 항목
- 두 번째 항목
  - 중첩 항목
  - 또 다른 중첩 항목
    - 더 깊은 중첩 항목
- 세 번째 항목

### 순서 있는 리스트

1. 첫 번째 단계
2. 두 번째 단계
   1. 하위 단계 a
   2. 하위 단계 b
3. 세 번째 단계

### 작업 목록

- [x] 완료된 작업
- [ ] 대기 중인 작업
- [ ] 또 다른 대기 작업

## 인용문

> 이것은 인용문입니다.
>
> > 그리고 그 안에 중첩된 인용문입니다.

## 코드 {#code}

인라인 `const x = 1` 과 제목이 붙은 코드 블록:

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

## 구문 강조

스택 전반의 Prism 구문 강조를 확인하기 위한 언어별 블록입니다.

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

## 표

| Method | Path | 설명 |
| --- | --- | :---: |
| `GET` | `/api/apple` | 사과 목록 조회 |
| `POST` | `/api/apple` | 사과 생성 |
| `DELETE` | `/api/apple/{id}` | 사과 삭제 |

## 알림(Admonition)

:::note
부수적인 정보를 위한 note 알림입니다.
:::

:::tip
도움이 되는 조언을 위한 tip 알림입니다.
:::

:::info
중립적인 맥락을 위한 info 알림입니다.
:::

:::warning
주의가 필요한 내용을 위한 warning 알림입니다.
:::

:::danger
치명적인 경고를 위한 danger 알림입니다.
:::

## 미디어

![mogumogu 로고](/img/logo.png)

## 접을 수 있는 상세

<details>
  <summary>클릭하여 펼치기</summary>

  토글하면 드러나는 숨겨진 내용으로, 코드 블록도 포함합니다:

  ```json
  { "id": "apl_01", "variety": "Fuji" }
  ```

</details>

## 수평선

---

여기까지가 전부입니다.
