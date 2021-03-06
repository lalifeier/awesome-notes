---
sidebar: auto
---

# 正则表达式

正则，就是正则表达式，英文是 Regular Expression，简称 RE。顾名思义，正则其实就是一种描述文本内容组成规律的表示方式。

## 元字符

所谓元字符就是指那些在正则表达式中具有特殊意义的专用字符，元字符是构成正则表达式的基本元件。

### 特殊单字符

表示特殊单个字符的元字符

| 元字符 |         含义         |
| :----: | :------------------: |
|   .    |  任意字符(换行除外)  |
|   \d   |       任意数字       |
|   \D   |      任意非数字      |
|   \w   |  任意字母数字下划线  |
|   \W   | 任意非字母数字下划线 |
|   \s   |      任意空白符      |
|   \S   |     任意非空白符     |

### 空白符

空格、换行等空白符

| 元字符 |    含义    |
| :----: | :--------: |
|   \r   |   回车符   |
|   \n   |   换行符   |
|   \f   |   换页符   |
|   \t   |   制表符   |
|   \v   | 垂直制表符 |
|   \s   | 任意空白符 |

换行有专门的表示方式，在正则中，空格就是用普通的字符英文的空格来表示。

### 量词

表示量词的元字符

| 元字符 |     含义      |
| :----: | :-----------: |
|   \*   |   0 到多次    |
|   +    |   1 到多次    |
|   ?    |   0 到 1 次   |
|  {m}   |   出现 m 次   |
|  {m,}  | 出现至少 m 次 |
| {m,n}  |   m 到 n 次   |

### 范围

在一个特殊的范围里找符合要求的内容

| 元字符 |                        含义                         |
| :----: | :-------------------------------------------------: |
|   \|   |                         或                          |
| [...]  |             多选一，括号中任意单个元素              |
| [a-z]  | 匹配 a 到 z 之间任意单个元素(按 ASCII 表，包含 a,z) |
| [^...] |          取反，不能是括号中的任意单个元素           |

## 贪婪、非贪婪与独占模式

### 贪婪匹配

表示次数的量词，默认是贪婪的，满足要求的情况下，尽可能按最长去匹配

回溯：后面匹配不上，会吐出已匹配的再尝试

### 非贪婪匹配

"数量"元字符后加?(英文问号)，满足要求的情况下，尽可能按最短去匹配

回溯：后面匹配不上，会按照更长再接着尝试

### 独占模式

"量词"元字符后加+(英文问号)，满足要求的情况下，尽可能按最长去匹配

不会发生回溯，匹配不上即失败

## 分组

将某部分(子表达式)看成一个整体，在后续查找或替换中引用分组

### 分组编号

第几个括号就是第几个分组

不保存分组(?:正则)

括号嵌套只需要看左括号的序号

命名分组(?P<名称>正则)

### 分组引用

查找：查找重复出现的部分

替换：对原有内容格式进行改写

|  编程语言  | 查找时引用方式 | 替换时引用方式 |
| :--------: | :------------: | -------------- |
|   Python   |  \number 如\1  | \number 如\1   |
|     Go     |  官方包不支持  | 官方包不支持   |
|    Java    |  \number 如\1  | $number 如$1   |
| JavaScript |  $number 如$1  | $number 如$1   |
|    PHP     |  \number 如\1  | \number 如\1   |
|    Ruby    |  \number 如\1  | \number 如\1   |

## 匹配模式

匹配模式，指的是正则中一些改变元字符匹配行为的方式，比如匹配时不区分英文字母大小写。

### 不区分大小写模式

作用：正则不区分英文字母的大小写

修饰符：(?i)

### 点号通配模式

作用：英文的点号可以匹配任何字符，包括换行

修饰符：(?s)

很多地方称为"单行匹配模式"，其实和多行匹配没有联系

Ruby 中 Multiline 其实就是单行匹配模式

等价于[\s\S]或[\d\D]或[\w\W]，但更简洁

### 多行匹配模式

作用：^或\$默认是整个字符串的开头或结尾，多行模式使他们能匹配每行的开头和结尾

修饰符：(?m)

^匹配行的开始，多行模式时，可以匹配任意行开头

\$匹配行的结束，多行模式时，可以匹配任意行结尾

### 注释模式

作用：正则可能很复杂，编写和阅读维护困难，添加注释方便理解

修饰符：(?#comment)

## 断言

### 单词的边界

\b 匹配单词边界

### 行的开始或结束

^匹配行的开始 多行匹配时，可以匹配任意行开头

^匹配行的结束 多行匹配时，可以匹配任意行结束

\A 仅匹配整个字符串的开始，不支持多行匹配

\Z 仅匹配整个字符串的结束，不支持多行匹配

### 环视

(?<=Y)X 匹配前面是 Y 的 X

(?<!Y)X 匹配前面不是 Y 的 X

X(?=Y) 匹配后面是 Y 的 X

X(?!Y) 匹配后面是 Y 的 X

## 转义

### 转义字符

含义：对它后续的几个字符进行替代并解释

功能：编码无法用字母表直接表示的特殊数据，表示无法直接键盘录入的字符(如回车符)

### 字符串转义和正则转义

字符串转义：输入字符串到字符串文本的过程

正则转义：正则文字到正则表达式的过程

匹配反斜杠需要用四个\

简化方式：使用原生字符串

### 元字符的转义

量词\*或+或?或-或^或\$或|等，直接在前面加反斜杠

括号[]{}只需要转义开括号，但()两个都要转义，即\\(\\)

使用编程语言中的函数消除元字符特殊含义

| 编程语言 |          函数          |
| :------: | :--------------------: |
|  Python  |    re.escape(text)     |
|    Go    | regexp.QuoteMeta(text) |
|   Java   |  Pattern_quote(text)   |
|   PHP    |    preg_quote(text)    |

### 字符组的转义

^在中括号中，且在第一个位置

-在中括号中，且不在首尾位置

)在中括号中，且不在首位

其他单个长度的元字符一般不需要转义

## 正则流派

### POSIX 流派

1. POSIX 字符组

2. BRE

工具：grep 、vi/vim 、 sed 等

特点：花括号，圆括号要转义，不支持问号，管道符和加号

字符组：不能使用\d 等字符组，需要使用 PXSIX 字符组

GNU BRE :

工具：GNU grep 、GNU sed 等

特点：在 BRE 基础上，支持问号 、加号和管道符

3. ERE

工具：egrep awk 等

特点：花括号，圆括号不用转义，支持问号，管道符和加号

字符组：不能使用\d 等字符组，需要使用 PXSIX 字符组

GNU ERE :

工具：GNU grep -E 、GNU sed -E 等

特点：在 ERE 基础上，支持反向引用\1\2 等

4. man 命令

查看使用说明

查看工具使用的正则流派

### PCRE 流派

工具：grep -P 、 sed -P 目前主流的编程语言

特点：\d \w \s 是它的显著标识

常见编程语言都是基于 PCRE 流派的

## 编程语言使用正则

### 校验文本内容

数据验证：通过在网页上输入手机号，邮箱，日期等，都需要校验

校验特点：整个文本的内容都要符合正则

#### Python

Python 文本校验，在正则中加上\A 和\Z

```py
reg = re.compile(r`/\A\d{4}-\d{2}-\d{2}\Z`)
matched = reg.search('2020-06-01') is not None
```

#### Go

Go 文本校验，在正则中加上\A 和\z

```go
re := regexp.MustCompile(`\A\d{4}-\d{2}-\d{2}\z`)
matched := re.MatchString("2020-06-01")
```

#### Javascript

Javascript 文本校验，在正则中加上^ 和\$
不能是多行模式，不能使用 g 模式

```js
;/^\d{4}-\d{2}-\d$/.test('2020-06-01')
```

#### Java

Java 中没有原生字符串，转义稍微麻烦些

```java
Pattern pattern = Pattern.compile("\\A\\d{4}-\\d{2}-\\d{2}\\z");
pattern.matcher("2020-06-01").find();
```

#### Ruby

```ruby
puts ("2020-06-01"=~/\A\d{4}-\d{2}-\d{2}\z/) != nil
```

#### PHP

```php
$regex = "/\A\d{4}-\d{2}-\d{2}\z/";
preg_match($regex, "2020-06-01");
```

### 提取文本内容

从文本中抽取内容，常见比如网络爬虫

特点：文本中部分内容符合正则，从里面查找

#### Python

Python 抽取文本内容，使用 re.findall 或 re.finditer

```py
reg = re.compile(r`/\d{4}-\d{2}`)
reg.findall('2020-05 2020-06')
```

#### Go

Go 提取文本，使用 FindAllString，捕获子组用 FindAllStringSubmatch

```go
re := regexp.MustCompile(`\d{4}-\d{2}`)
re.FindAllString("2020-05 2020-06", -1)
```

#### Javascript

Javascript 提取文本要使用 g 模式

如果要查找中文等 Unicode 字符，可以使用 u 匹配模式

```js
'2020-05 2020-06'.match(/\d{4}-\d{2}/g)
```

#### java

Java 查找文本，使用 match 的 find 方法

```java
Pattern pattern = Pattern.compile("\\d{4}-\\d{2}");
Matcher match = pattern.matcher("2020-05 2020-06");
while(match.find()) {
  System.out.print(match.group);
}
```

#### Ruby

```ruby
regex = /\d{4}-\d{2}/
puts "2020-05 2020-06".scan(regex)
```

#### PHP

```php
$regex = '/\d{4}-\d{2}/';
$string = "2020-05 2020-06";
$matches = array();
preg_match_all($regex, $string, $matches);
```

### 替换文本内容

替换通常用于对原来的文本内容进行一些调整

#### Python

Python 替换可以使用 re.sub 和 subn，后者会返回替换个数

```py
reg = re.compile(r`(\d{2})-(\d{2})-(\d{4})`)
reg.sub(r'\3年\1月\2日', '02-20-2020 05-21-2020')
```

#### Go

Go 替换，子组是使用${num}表示，尽量不要用$num

```go
re := regexp.MustCompile(`(\d{2})-(\d{2})-(\d{4})`)
re.ReplaceAllString("02-20-2020 05-21-2020", "${3}年${1}月${2}日")
```

#### Javascript

Javascript 替换，需要指定 g 模式，否则只会替换第一个

```js
'02-20-2020 05-21-2020'.replace(/(\d{2})-(\d{2})-(\d{4})/g, '$3年$1月$2日')
```

#### Java

Java 替换，使用 replaceAll 替换所有

```java
Pattern pattern = Pattern.compile("(\\d{2})-(\\d{2})-(\\d{4})");
Matcher match = pattern.matcher("02-20-2020 05-21-2020");
match.replaceAll("$3年$1月$2日");
```

#### Ruby

```ruby
puts "02-20-2020 05-21-2020".gsub(/(\d{2})-(\d{2})-(\d{4})/, '\3年\1月\2日')
```

#### PHP

```php
preg_replace('/(\d{2})-(\d{2})-(\d{4})/', "\3年\1月\2日", "02-20-2020 05-21-2020");
```

### 切割文本内容

切割可以用于处理某类分割符，比如连续变长的空白符号，标点等

#### Python

Python 切割，使用 re.split 方法，第二个参数是切几刀，和 Java 和 Go 有区别

```py
reg = re.compile(r`\W+`)
reg.split('apple, pear! orange; tea')
```

#### Go

Go 切割，不限制次数时，传入-1，第二个参数代表切割成几部分，不是切几刀

```go
re := regexp.MustCompile(`\W+`)
words := re.Split("apple, pear! orange; tea", -1)
```

#### Javascript

Javascript 切割，第二个参数是获取切割后数组的前面几个

```js
'apple, pear! orange; tea'.spilt(/\W+/)
```

#### Java

Java 切割和 Go 很相似，正则需要转义

```java
"apple, pear! orange; tea".spilt("/\\W+"/)
```

#### Ruby

```ruby
"apple, pear! orange; tea".spilt(/\W+/)
```

#### PHP

```php
preg_split('/\W+/', "apple, pear! orange; tea");
```

## 正则匹配原理

### 有穷自动机

正则引擎的具体实现：有穷状态自动机

有穷：一个系统具有有穷个状态，不同的状态代表不同的意义

自动机：指系统可以根据相应的条件在不同的状态下进行转移

分类：

DFA：确定性有穷自动机

NFA：非确定性有穷自动机

### DFA

先看文本，再看正则，以文本为主导

整个匹配过程字符串只看一遍，不回溯，相同字符不会测试两次

没有反向引用功能，也不支持捕获子组

代表有 MySQL Golang 等

### NFA

先看正则，再看文本，以正则为主导

会发现回溯，字符串中同一部分可能会对比很多次

支持子组和反向引用

代表有 Java Python Ruby Perl 等

POSIX NFA 尝试所有可能的匹配，返回最长最左的匹配

### 优化

测试正则性能，使用 ipython 或 regex101 等

提前编译好正则

尽量准确表示匹配范围

提取出公共部分

出现可能性大的放左边

警惕嵌套子组重复

避免不同分支重复匹配

## 正则问题

### 处理思路

复杂问题拆解，变成多个小问题

字符组：某个位置上可能是多个单字符就用

多选结构：某个位置上可能是多个字符串

量词：某部分出现次数不确定

断言：对出现的位置有要求

多选结构中，长度不确定，短的放后面

### 常见问题

1. 数字

数字在正则中可以使用 `\d` 或 `[0-9]` 来表示

如果是连续的多个数字，可以使用 `\d+` 或 `[0-9]+`

如果 n 位数据，可以使用 `\d{n}`。如果是至少 n 位数据，可以使用 `\d{n,}`

如果是 m-n 位数字，可以使用 `\d{m,n}`

2. 正数，负数和小数

如果希望正则能匹配到比如 3，3.14，-3.3，+2.7 等数字，需要注意的是，开头的正负符号可能有，也可能没有，所以可以使用 [-+]? 来表示，小数点和后面的内容也不一定会有，所以可以使用 (?:\.\d+)? 来表示，因此匹配正数、负数和小数的正则可以写成 [-+]?\d+(?:\.\d+)?。

非负整数，包含 0 和 正整数，可以表示成`[1-9]\d\*|0`

非正整数，包含 0 和 负整数，可以表示成`-[1-9]\d\*|0`

3. 浮点数

负数浮点数表示：`-\d+(?:\.\d+)?`

正数浮点数表示：`\+?(?:\d+(?:\.\d+)?|\.\d+)`

4. 十六进制数

十六进制的数字除了有 0-9 之外，还会有 a-f（或 A-F） 代表 10 到 15 这 6 个数字，所以正则可以写成 `[0-9A-Fa-f]+`

5. 手机号码

我们可以简单地使用字符组和多选分支，来准确地匹配手机号段。如果只限制前 2 位，可以表示成 `1[3-9]\d{9}`，如果想再精确些，限制到前三位，比如使用 `1(?:3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[1389])\d{8}`来表示。如果想精确到 4 位，甚至 5 位，可以根据公开的号段信息自己来写一下，但要注意的是，越是精确，只要有新的号段，你就得改这个正则，维护起来会比较麻烦。另外，在实际运用的时候，你可能还要考虑一下有一些号码了 +86 或 0086 之类的前缀的情况。

6. 身份证号码

我国的身份证号码是分两代的，第一代是 15 位，第二代是 18 位。如果是 18 位，最后一位可以是 X（或 x），两代开头都不能是 0，根据规则，你应该能很容易写出相应的正则，第一代可以用 `[1-9]\d{14}` 来表示，第二代比第一代多 3 位数据，可以使用量词 0 到 1 次，即写成`[1-9]\d{14}(\d\d[0-9Xx])?`。

7. 邮政编码

邮编一般为 6 位数字，首位不是 0，比较简单，可以写成 `[1-9]\d{5}`，之前我们也提到过，6 位数字在其它情况下出现可能性也非常大，比如手机号的一部分，身份证号的一部分，所以如果是数据提取，一般需要添加断言，即写成 `(?<!\d)[1-9]\d{5}(?!\d)`。

8. QQ 号码

目前 QQ 号不能以 0 开头，最长的有 10 位，最短的从 10000（5 位）开始。从规则上我们可以得知，首位是 1-9，后面跟着是 4 到 9 位的数字，即可以使用 `[1-9][0-9]{4,9}` 来表示。

9. 中文字符

中文属于多字节 Unicode 字符，之前我们讲过比如通过 Unicode 属性，但有一些语言是不支持这种属性的，可以通过另外一个办法，就是码值的范围，中文的范围是 4E00 - 9FFF 之间，这样可以覆盖日常使用大多数情况。

不同的语言是表示方式有一些差异，比如在 Python，Java，JavaScript 中，Unicode 可以写成 \u 码值 来表示，即匹配中文的正则可以写成`[\u4E00-\u9FFF]`，如果在 PHP 中使用，Unicode 就需要写成 \u{码值} 的样式

10. IPv4 地址

IPv4 地址通常表示成 27.86.1.226 的样式，4 个数字用点隔开，每一位范围是 0-255，比如从日志中提取出 IP，如果不要求那么精确，一般使用 `\d{1,3}(\.\d{1,3}){3}`

如果我们想更精确地匹配，可以针对一到三位数分别考虑，一位数时可以表示成 `0{0,2}\d`，两位数时可以表示成 `0?[1-9]\d`，三位数时可以表示成 `1\d\d|2[0-4]\d|25[0-5]`，使用多选分支结构把他们写到一起，就是 `0{0,2}\d|0?[1-9]\d|1\d\d|2[0-4]\d|25[0-5]`这样。

这是表示出了 IPv4 地址中的一位（正则假设是 X），我们可以把 IPv4 表示成 X.X.X.X，可以使用量词，写成 (?:X.){3}X 或 X(?:.X){3}，由于 X 本身比较复杂，里面有多选分支结构，所以需要把它加上括号，所以 IPv4 的正则应该可以写成`(?:1\d\d|2[0-4]\d|25[0-5]|0?[1-9]\d|0{0,2}\d)(?:\.(?:1\d\d|2[0-4]\d|25[0-5]|0?[1-9]\d|0{0,2}\d)){3}`。

11. 日期和时间

假设日期格式是 yyyy-mm-dd，如果不那么严格，我们可以直接使用 `\d{4}-\d{2}-\d{2}`。如果再精确一些，比如月份是 1-12，当为一位的时候，前面可能不带 0，可以写成 01 或 1，月份使用正则，可以表示成 `1[0-2]|0?[1-9]`，日可能是 1-31，可以表示成`[12]\d|3[01]|0?[1-9]`，这里需要注意的是 `0?[1-9]` 应该放在多选分支的最后面，因为放最前面，匹配上一位数字的时候就停止了，正确的正应该是`\d{4}-(?:1[0-2]|0?[1-9])-(?:[12]\d|3[01]|0?[1-9])`。

时间格式比如是 23:34，如果是 24 小时制，小时是 0-23，分钟是 0-59，所以可以写成`(?:2[0-3]|1\d|0?\d):(?:[1-5]\d|0?\d)`。

12. 邮箱

邮箱的组成是比较复杂的，格式是 用户名 @主机名，用户名部分通常可以有英文字母，数字，下划线，点等组成，但其中点不能在开头，也不能重复出现。不过我们可以实现一些简体的版本，比如：`[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+`

13. 网页标签

配对出现的标签，比如 title，一般网页标签不区分大小写，我们可以使用 `(?i)<title>.\*?</title>`来进行匹配。在提取引号里面的内容时，可以使用 `[^"]+`，方括号里面的内容时，可以使用 `[^>]+` 等方式。

### 其他说明

内容提取时还需要添加合适的断言

内容匹配时还需要添加\A \z \Z 或^\$等

复杂正则很难一次写好，需要测试不断完善

很多时候得在精确性和可维护性之间权衡
