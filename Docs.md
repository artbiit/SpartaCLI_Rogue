## Classes

<dl>
<dt><a href="#Achievements">Achievements</a></dt>
<dd><p>게임 내에서의 업적을 관리하는 클래스입니다.
싱글톤 패턴을 사용하여 하나의 인스턴스만 존재합니다.</p>
</dd>
<dt><a href="#Command">Command</a></dt>
<dd><p>명령어와 그에 따른 콜백을 관리하는 클래스입니다.</p>
</dd>
<dt><a href="#Input">Input</a></dt>
<dd><p>콘솔 입력을 관리하는 클래스입니다.
인스턴스를 생성할 수 없으며, 모든 메서드는 정적 메서드로 제공됩니다.</p>
</dd>
<dt><a href="#MyMath">MyMath</a></dt>
<dd><p>다양한 수학적 연산을 제공하는 유틸리티 클래스입니다.
인스턴스를 생성할 수 없으며, 모든 메서드는 정적 메서드로 제공됩니다.</p>
</dd>
<dt><a href="#Singleton">Singleton</a></dt>
<dd><p>싱글톤 패턴을 구현한 기본 클래스입니다.
이 클래스를 상속받으면 하나의 인스턴스만 생성됩니다.</p>
</dd>
<dt><a href="#TextTable">TextTable</a></dt>
<dd><p>텍스트 데이터를 관리하고, 콘솔에 출력하기 위한 유틸리티 클래스입니다.
싱글톤 패턴을 사용하여 하나의 인스턴스만 존재합니다.</p>
</dd>
<dt><a href="#Utils">Utils</a></dt>
<dd><p>다양한 유틸리티 함수를 제공하는 클래스입니다.</p>
</dd>
<dt><a href="#Action">Action</a></dt>
<dd><p>게임에서 모든 행동의 기본 클래스입니다.
각 행동은 이름, 설명, 성공 확률을 가집니다.</p>
</dd>
<dt><a href="#AttackAction">AttackAction</a></dt>
<dd><p>기본 공격 행동 클래스입니다.</p>
</dd>
<dt><a href="#DoubleAttackAction">DoubleAttackAction</a></dt>
<dd><p>이중 공격 행동 클래스입니다.</p>
</dd>
<dt><a href="#TryHealAction">TryHealAction</a></dt>
<dd><p>치유 시도 행동 클래스입니다.</p>
</dd>
<dt><a href="#GamblingAction">GamblingAction</a></dt>
<dd><p>도박 행동 클래스입니다.</p>
</dd>
<dt><a href="#Stats">Stats</a></dt>
<dd><p>유닛의 스탯을 관리하는 클래스입니다.</p>
</dd>
<dt><a href="#Unit">Unit</a></dt>
<dd><p>게임 내 유닛을 나타내는 클래스입니다.
각 유닛은 이름, 스탯, 그리고 행동 리스트를 가집니다.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#eventBus">eventBus</a></dt>
<dd><p>이벤트를 발행하고 구독하는 이벤트 버스입니다.
이를 통해 모듈 간에 이벤트를 전달할 수 있습니다.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#Save">Save()</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>설정을 저장하는 함수입니다.</p>
</dd>
<dt><a href="#displayStatus">displayStatus(stage, player, monster)</a></dt>
<dd><p>현재 스테이지, 플레이어, 몬스터의 상태를 출력합니다.</p>
</dd>
<dt><a href="#monsterAction">monsterAction(player, monster)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>몬스터가 행동을 수행합니다.</p>
</dd>
<dt><a href="#battle">battle(stage, player, monster)</a></dt>
<dd><p>전투를 수행하는 함수입니다.</p>
</dd>
<dt><a href="#elixirScenario">elixirScenario(player)</a></dt>
<dd><p>엘릭서 시나리오를 처리하는 함수입니다.</p>
</dd>
<dt><a href="#victoryScenario">victoryScenario(player, stage)</a></dt>
<dd><p>승리 시나리오를 처리하는 함수입니다.</p>
</dd>
<dt><a href="#CreatePlayerDefaultStats">CreatePlayerDefaultStats()</a> ⇒ <code><a href="#Stats">Stats</a></code></dt>
<dd><p>기본 플레이어 스탯을 생성하는 함수입니다.</p>
</dd>
<dt><a href="#CreateMonsterStats">CreateMonsterStats(stage)</a> ⇒ <code><a href="#Stats">Stats</a></code></dt>
<dd><p>몬스터의 스탯을 생성하는 함수입니다.</p>
</dd>
<dt><a href="#startGame">startGame()</a></dt>
<dd><p>게임을 시작하는 함수입니다.</p>
</dd>
<dt><a href="#setCommand">setCommand()</a></dt>
<dd><p>로비 명령어를 설정하는 함수입니다.</p>
</dd>
<dt><a href="#displayLobby">displayLobby()</a></dt>
<dd><p>로비 화면을 출력하는 함수입니다.</p>
</dd>
<dt><a href="#viewAchievements">viewAchievements()</a></dt>
<dd><p>업적을 조회하는 함수입니다.</p>
</dd>
<dt><a href="#handleUserInput">handleUserInput()</a></dt>
<dd><p>유저 입력을 받아 처리하는 함수입니다.</p>
</dd>
<dt><a href="#start">start()</a></dt>
<dd><p>게임을 시작하는 함수입니다.</p>
</dd>
<dt><a href="#displayOption">displayOption()</a></dt>
<dd><p>옵션 메뉴를 화면에 출력하는 함수입니다.</p>
</dd>
<dt><a href="#changePlayerName">changePlayerName()</a></dt>
<dd><p>플레이어 이름을 변경하는 함수입니다.</p>
</dd>
<dt><a href="#changeBossName">changeBossName()</a></dt>
<dd><p>보스 이름을 변경하는 함수입니다.</p>
</dd>
<dt><a href="#addMonster">addMonster()</a></dt>
<dd><p>새로운 몬스터를 추가하는 함수입니다.</p>
</dd>
<dt><a href="#removeMonster">removeMonster()</a></dt>
<dd><p>몬스터를 제거하는 함수입니다.</p>
</dd>
<dt><a href="#changeMonster">changeMonster()</a></dt>
<dd><p>몬스터의 이름을 변경하는 함수입니다.</p>
</dd>
<dt><a href="#changeMonsters">changeMonsters()</a></dt>
<dd><p>몬스터와 관련된 옵션을 변경하는 함수입니다.</p>
</dd>
<dt><a href="#setCommands">setCommands()</a></dt>
<dd><p>옵션 메뉴 명령어를 설정하는 함수입니다.</p>
</dd>
<dt><a href="#Start">Start()</a></dt>
<dd><p>옵션 메뉴를 시작하는 함수입니다.</p>
</dd>
<dt><a href="#CalcAtk">CalcAtk(unit)</a> ⇒ <code>number</code></dt>
<dd><p>공격 행동을 계산하는 함수입니다.</p>
</dd>
<dt><a href="#CalcDamage">CalcDamage(target_unit, atk)</a> ⇒ <code>number</code></dt>
<dd><p>피격 유닛의 방어력을 반영한 데미지를 계산합니다.</p>
</dd>
<dt><a href="#CalcProbability">CalcProbability(probability, unit)</a> ⇒ <code>boolean</code></dt>
<dd><p>행동이 성공했는지 확률을 계산합니다.</p>
</dd>
</dl>

<a name="Achievements"></a>

## Achievements
게임 내에서의 업적을 관리하는 클래스입니다.
싱글톤 패턴을 사용하여 하나의 인스턴스만 존재합니다.

**Kind**: global class  

* [Achievements](#Achievements)
    * [.achievements](#Achievements+achievements) ⇒ <code>Object</code>
    * [.Save()](#Achievements+Save) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="Achievements+achievements"></a>

### achievements.achievements ⇒ <code>Object</code>
**Kind**: instance property of [<code>Achievements</code>](#Achievements)  
**Returns**: <code>Object</code> - 현재 업적 정보  
<a name="Achievements+Save"></a>

### achievements.Save() ⇒ <code>Promise.&lt;void&gt;</code>
업적 정보를 저장합니다.

**Kind**: instance method of [<code>Achievements</code>](#Achievements)  
<a name="Command"></a>

## Command
명령어와 그에 따른 콜백을 관리하는 클래스입니다.

**Kind**: global class  

* [Command](#Command)
    * [.commands](#Command+commands) ⇒ <code>Map</code>
    * [.keys](#Command+keys) ⇒ <code>Iterator</code>
    * [.callbacks](#Command+callbacks) ⇒ <code>Iterator</code>
    * [.AddCommand(key, callback)](#Command+AddCommand) ⇒ <code>boolean</code>
    * [.RemoveCommand(key)](#Command+RemoveCommand) ⇒ <code>boolean</code>
    * [.InsertCommandAt(key, callback, index)](#Command+InsertCommandAt) ⇒ <code>boolean</code>
    * [.ExecuteCommand(key, ...args)](#Command+ExecuteCommand) ⇒ <code>Promise.&lt;\*&gt;</code>

<a name="Command+commands"></a>

### command.commands ⇒ <code>Map</code>
**Kind**: instance property of [<code>Command</code>](#Command)  
**Returns**: <code>Map</code> - 명령어와 콜백이 저장된 맵  
<a name="Command+keys"></a>

### command.keys ⇒ <code>Iterator</code>
**Kind**: instance property of [<code>Command</code>](#Command)  
**Returns**: <code>Iterator</code> - 명령어의 키들  
<a name="Command+callbacks"></a>

### command.callbacks ⇒ <code>Iterator</code>
**Kind**: instance property of [<code>Command</code>](#Command)  
**Returns**: <code>Iterator</code> - 콜백 함수들  
<a name="Command+AddCommand"></a>

### command.AddCommand(key, callback) ⇒ <code>boolean</code>
명령어를 추가합니다.

**Kind**: instance method of [<code>Command</code>](#Command)  
**Returns**: <code>boolean</code> - 추가 성공 여부  
**Throws**:

- <code>Error</code> 유효하지 않은 키나 콜백 함수일 경우 예외를 발생시킵니다.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | 명령어 키 |
| callback | <code>function</code> | 명령어 실행 시 호출될 콜백 함수 |

<a name="Command+RemoveCommand"></a>

### command.RemoveCommand(key) ⇒ <code>boolean</code>
명령어를 제거합니다.

**Kind**: instance method of [<code>Command</code>](#Command)  
**Returns**: <code>boolean</code> - 제거 성공 여부  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | 제거할 명령어 키 |

<a name="Command+InsertCommandAt"></a>

### command.InsertCommandAt(key, callback, index) ⇒ <code>boolean</code>
특정 인덱스에 명령어를 삽입합니다.

**Kind**: instance method of [<code>Command</code>](#Command)  
**Returns**: <code>boolean</code> - 삽입 성공 여부  
**Throws**:

- <code>Error</code> 유효하지 않은 키, 콜백 함수, 또는 인덱스일 경우 예외를 발생시킵니다.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | 명령어 키 |
| callback | <code>function</code> | 명령어 실행 시 호출될 콜백 함수 |
| index | <code>number</code> | 삽입할 인덱스 위치 |

<a name="Command+ExecuteCommand"></a>

### command.ExecuteCommand(key, ...args) ⇒ <code>Promise.&lt;\*&gt;</code>
주어진 키의 명령어를 실행합니다.

**Kind**: instance method of [<code>Command</code>](#Command)  
**Returns**: <code>Promise.&lt;\*&gt;</code> - 콜백 함수의 반환 값  
**Throws**:

- <code>Error</code> 명령어 실행 중 발생한 예외를 전달합니다.


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | 실행할 명령어 키 |
| ...args | <code>any</code> | 콜백 함수에 전달할 인수들 |

<a name="Input"></a>

## Input
콘솔 입력을 관리하는 클래스입니다.
인스턴스를 생성할 수 없으며, 모든 메서드는 정적 메서드로 제공됩니다.

**Kind**: global class  

* [Input](#Input)
    * [.question(query)](#Input.question) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.questionInt(query)](#Input.questionInt) ⇒ <code>Promise.&lt;number&gt;</code>
    * [.questionFloat(query)](#Input.questionFloat) ⇒ <code>Promise.&lt;number&gt;</code>
    * [.keyInYN(query)](#Input.keyInYN) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.keyInYNStrict(query)](#Input.keyInYNStrict) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [.keyInSelect(items, query)](#Input.keyInSelect) ⇒ <code>Promise.&lt;number&gt;</code>

<a name="Input.question"></a>

### Input.question(query) ⇒ <code>Promise.&lt;string&gt;</code>
사용자에게 질문하고 입력을 받습니다.

**Kind**: static method of [<code>Input</code>](#Input)  
**Returns**: <code>Promise.&lt;string&gt;</code> - 사용자의 입력 값  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | 질문 내용 |

<a name="Input.questionInt"></a>

### Input.questionInt(query) ⇒ <code>Promise.&lt;number&gt;</code>
사용자에게 질문하고 정수를 입력받습니다.

**Kind**: static method of [<code>Input</code>](#Input)  
**Returns**: <code>Promise.&lt;number&gt;</code> - 입력된 정수  
**Throws**:

- <code>Error</code> 입력 값이 유효한 정수가 아닐 경우 예외를 발생시킵니다.


| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | 질문 내용 |

<a name="Input.questionFloat"></a>

### Input.questionFloat(query) ⇒ <code>Promise.&lt;number&gt;</code>
사용자에게 질문하고 실수를 입력받습니다.

**Kind**: static method of [<code>Input</code>](#Input)  
**Returns**: <code>Promise.&lt;number&gt;</code> - 입력된 실수  
**Throws**:

- <code>Error</code> 입력 값이 유효한 실수가 아닐 경우 예외를 발생시킵니다.


| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | 질문 내용 |

<a name="Input.keyInYN"></a>

### Input.keyInYN(query) ⇒ <code>Promise.&lt;boolean&gt;</code>
사용자에게 예/아니오 질문을 하고 대답을 받습니다.

**Kind**: static method of [<code>Input</code>](#Input)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - 'Y' 또는 '네'의 경우 true, 그 외의 경우 false  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | 질문 내용 |

<a name="Input.keyInYNStrict"></a>

### Input.keyInYNStrict(query) ⇒ <code>Promise.&lt;boolean&gt;</code>
사용자에게 엄격한 예/아니오 질문을 하고 대답을 받습니다.

**Kind**: static method of [<code>Input</code>](#Input)  
**Returns**: <code>Promise.&lt;boolean&gt;</code> - 'Y' 또는 'N'으로 입력된 경우, 그에 맞는 boolean 값  
**Throws**:

- <code>Error</code> 입력 값이 'Y' 또는 'N'이 아닐 경우 예외를 발생시킵니다.


| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | 질문 내용 |

<a name="Input.keyInSelect"></a>

### Input.keyInSelect(items, query) ⇒ <code>Promise.&lt;number&gt;</code>
주어진 항목들 중에서 선택지를 받아옵니다.

**Kind**: static method of [<code>Input</code>](#Input)  
**Returns**: <code>Promise.&lt;number&gt;</code> - 선택된 항목의 인덱스 (0부터 시작), 유효하지 않은 경우 -1 반환  

| Param | Type | Description |
| --- | --- | --- |
| items | <code>Array.&lt;string&gt;</code> | 선택지 목록 |
| query | <code>string</code> | 질문 내용 |

<a name="MyMath"></a>

## MyMath
다양한 수학적 연산을 제공하는 유틸리티 클래스입니다.
인스턴스를 생성할 수 없으며, 모든 메서드는 정적 메서드로 제공됩니다.

**Kind**: global class  

* [MyMath](#MyMath)
    * [.Clamp(value, [min], [max])](#MyMath.Clamp) ⇒ <code>number</code>
    * [.Random01()](#MyMath.Random01) ⇒ <code>number</code>
    * [.RandomRange([min], [max])](#MyMath.RandomRange) ⇒ <code>number</code>
    * [.RandomRangeInt([min], [max])](#MyMath.RandomRangeInt) ⇒ <code>number</code>
    * [.CalcProbability(probability)](#MyMath.CalcProbability) ⇒ <code>boolean</code>
    * [.RandomPick(array)](#MyMath.RandomPick) ⇒ <code>\*</code>
    * [.RandomPickIndex(array)](#MyMath.RandomPickIndex) ⇒ <code>number</code>
    * [.Floor(num)](#MyMath.Floor) ⇒ <code>number</code>

<a name="MyMath.Clamp"></a>

### MyMath.Clamp(value, [min], [max]) ⇒ <code>number</code>
입력된 값을 최소값과 최대값 사이로 고정합니다.

**Kind**: static method of [<code>MyMath</code>](#MyMath)  
**Returns**: <code>number</code> - 고정된 값  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>number</code> |  | 고정할 값 |
| [min] | <code>number</code> | <code>Number.MIN_SAFE_INTEGER</code> | 최소값 |
| [max] | <code>number</code> | <code>Number.MAX_SAFE_INTEGER</code> | 최대값 |

<a name="MyMath.Random01"></a>

### MyMath.Random01() ⇒ <code>number</code>
0과 1 사이의 무작위 수를 반환합니다.

**Kind**: static method of [<code>MyMath</code>](#MyMath)  
**Returns**: <code>number</code> - 무작위 수  
<a name="MyMath.RandomRange"></a>

### MyMath.RandomRange([min], [max]) ⇒ <code>number</code>
주어진 범위 내에서 무작위 수를 반환합니다.

**Kind**: static method of [<code>MyMath</code>](#MyMath)  
**Returns**: <code>number</code> - 무작위 수  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [min] | <code>number</code> | <code>Number.MIN_VALUE</code> | 최소값 |
| [max] | <code>number</code> | <code>Number.MAX_VALUE</code> | 최대값 |

<a name="MyMath.RandomRangeInt"></a>

### MyMath.RandomRangeInt([min], [max]) ⇒ <code>number</code>
주어진 범위 내에서 무작위 정수를 반환합니다.

**Kind**: static method of [<code>MyMath</code>](#MyMath)  
**Returns**: <code>number</code> - 무작위 정수  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [min] | <code>number</code> | <code>Number.MIN_VALUE</code> | 최소값 |
| [max] | <code>number</code> | <code>Number.MAX_VALUE</code> | 최대값 |

<a name="MyMath.CalcProbability"></a>

### MyMath.CalcProbability(probability) ⇒ <code>boolean</code>
주어진 확률에 따라 성공 여부를 반환합니다.

**Kind**: static method of [<code>MyMath</code>](#MyMath)  
**Returns**: <code>boolean</code> - 성공 여부  

| Param | Type | Description |
| --- | --- | --- |
| probability | <code>number</code> | 확률 (0.0 ~ 1.0) |

<a name="MyMath.RandomPick"></a>

### MyMath.RandomPick(array) ⇒ <code>\*</code>
배열 중 하나의 요소를 무작위로 선택하여 반환합니다.

**Kind**: static method of [<code>MyMath</code>](#MyMath)  
**Returns**: <code>\*</code> - 선택된 요소  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | 선택할 배열 |

<a name="MyMath.RandomPickIndex"></a>

### MyMath.RandomPickIndex(array) ⇒ <code>number</code>
배열 중 하나의 인덱스를 무작위로 선택하여 반환합니다.

**Kind**: static method of [<code>MyMath</code>](#MyMath)  
**Returns**: <code>number</code> - 선택된 인덱스  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | 선택할 배열 |

<a name="MyMath.Floor"></a>

### MyMath.Floor(num) ⇒ <code>number</code>
주어진 수의 소수점을 제거하여 반환합니다.

**Kind**: static method of [<code>MyMath</code>](#MyMath)  
**Returns**: <code>number</code> - 소수점이 제거된 수  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | 처리할 수 |

<a name="Singleton"></a>

## Singleton
싱글톤 패턴을 구현한 기본 클래스입니다.
이 클래스를 상속받으면 하나의 인스턴스만 생성됩니다.

**Kind**: global class  
<a name="TextTable"></a>

## TextTable
텍스트 데이터를 관리하고, 콘솔에 출력하기 위한 유틸리티 클래스입니다.
싱글톤 패턴을 사용하여 하나의 인스턴스만 존재합니다.

**Kind**: global class  

* [TextTable](#TextTable)
    * [.Load(filePath)](#TextTable+Load) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.FormatText(id, variables)](#TextTable+FormatText) ⇒ <code>string</code>
    * [.Output(id, variables)](#TextTable+Output)
    * [.FormatTextForConsole(inputText, [spacing])](#TextTable+FormatTextForConsole) ⇒ <code>string</code>

<a name="TextTable+Load"></a>

### textTable.Load(filePath) ⇒ <code>Promise.&lt;void&gt;</code>
CSV 파일을 읽어 텍스트 테이블을 로드합니다.
이 메서드를 호출한 후에 다른 메서드를 사용해야 합니다.

**Kind**: instance method of [<code>TextTable</code>](#TextTable)  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | CSV 파일 경로 |

<a name="TextTable+FormatText"></a>

### textTable.FormatText(id, variables) ⇒ <code>string</code>
주어진 id에 해당하는 텍스트를 변수 치환을 포함하여 포맷팅합니다.

**Kind**: instance method of [<code>TextTable</code>](#TextTable)  
**Returns**: <code>string</code> - 포맷된 텍스트  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | 텍스트 id |
| variables | <code>Object</code> | 텍스트 내 치환할 변수들 |

<a name="TextTable+Output"></a>

### textTable.Output(id, variables)
주어진 id에 해당하는 텍스트를 포맷팅한 후 콘솔에 출력합니다.

**Kind**: instance method of [<code>TextTable</code>](#TextTable)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | 텍스트 id |
| variables | <code>Object</code> | 텍스트 내 치환할 변수들 |

<a name="TextTable+FormatTextForConsole"></a>

### textTable.FormatTextForConsole(inputText, [spacing]) ⇒ <code>string</code>
**Kind**: instance method of [<code>TextTable</code>](#TextTable)  
**Returns**: <code>string</code> - 정렬된 텍스트  
**@**: 문자를 기준으로 텍스트를 일정 간격으로 정렬합니다.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| inputText | <code>string</code> |  | 입력 텍스트 |
| [spacing] | <code>number</code> | <code>60</code> | 좌우 텍스트 간격 |

<a name="Utils"></a>

## Utils
다양한 유틸리티 함수를 제공하는 클래스입니다.

**Kind**: global class  
<a name="Utils.Delay"></a>

### Utils.Delay(ms) ⇒ <code>Promise.&lt;void&gt;</code>
주어진 밀리초(ms) 동안 지연시킵니다.

**Kind**: static method of [<code>Utils</code>](#Utils)  
**Returns**: <code>Promise.&lt;void&gt;</code> - 지연이 완료된 후 반환되는 Promise  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>number</code> | 지연시킬 시간 (밀리초) |

<a name="Action"></a>

## Action
게임에서 모든 행동의 기본 클래스입니다.
각 행동은 이름, 설명, 성공 확률을 가집니다.

**Kind**: global class  

* [Action](#Action)
    * [new Action(name, description, probability)](#new_Action_new)
    * [.name](#Action+name) ⇒ <code>string</code>
    * [.description](#Action+description) ⇒ <code>string</code>
    * [.probability](#Action+probability) ⇒ <code>number</code>
    * [.DoAction](#Action+DoAction)

<a name="new_Action_new"></a>

### new Action(name, description, probability)
Action 클래스의 생성자입니다.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | 행동의 이름 |
| description | <code>string</code> | 행동에 대한 설명 |
| probability | <code>number</code> | 행동의 성공 확률 |

<a name="Action+name"></a>

### action.name ⇒ <code>string</code>
**Kind**: instance property of [<code>Action</code>](#Action)  
**Returns**: <code>string</code> - 행동의 이름  
<a name="Action+description"></a>

### action.description ⇒ <code>string</code>
**Kind**: instance property of [<code>Action</code>](#Action)  
**Returns**: <code>string</code> - 행동의 설명  
<a name="Action+probability"></a>

### action.probability ⇒ <code>number</code>
**Kind**: instance property of [<code>Action</code>](#Action)  
**Returns**: <code>number</code> - 행동의 성공 확률  
<a name="Action+DoAction"></a>

### action.DoAction
이 메서드는 상속받는 클래스에서 구현되어야 하는 추상 메서드입니다.

**Kind**: instance property of [<code>Action</code>](#Action)  
**Throws**:

- <code>Error</code> 추상 메서드가 호출되었을 때 발생합니다.


| Param | Type | Description |
| --- | --- | --- |
| unit | [<code>Unit</code>](#Unit) | 행동을 수행하는 유닛 |
| target_unit | [<code>Unit</code>](#Unit) | 행동의 대상이 되는 유닛 |

<a name="AttackAction"></a>

## AttackAction
기본 공격 행동 클래스입니다.

**Kind**: global class  

* [AttackAction](#AttackAction)
    * [new AttackAction()](#new_AttackAction_new)
    * [.DoAction](#AttackAction+DoAction) ⇒ <code>Array.&lt;string&gt;</code>

<a name="new_AttackAction_new"></a>

### new AttackAction()
AttackAction 클래스의 생성자입니다.

<a name="AttackAction+DoAction"></a>

### attackAction.DoAction ⇒ <code>Array.&lt;string&gt;</code>
공격 행동을 수행합니다.

**Kind**: instance property of [<code>AttackAction</code>](#AttackAction)  
**Returns**: <code>Array.&lt;string&gt;</code> - 행동 결과 설명  

| Param | Type | Description |
| --- | --- | --- |
| unit | [<code>Unit</code>](#Unit) | 행동을 수행하는 유닛 |
| target_unit | [<code>Unit</code>](#Unit) | 행동의 대상이 되는 유닛 |

<a name="DoubleAttackAction"></a>

## DoubleAttackAction
이중 공격 행동 클래스입니다.

**Kind**: global class  

* [DoubleAttackAction](#DoubleAttackAction)
    * [new DoubleAttackAction()](#new_DoubleAttackAction_new)
    * [.DoAction](#DoubleAttackAction+DoAction) ⇒ <code>Array.&lt;string&gt;</code>

<a name="new_DoubleAttackAction_new"></a>

### new DoubleAttackAction()
DoubleAttackAction 클래스의 생성자입니다.

<a name="DoubleAttackAction+DoAction"></a>

### doubleAttackAction.DoAction ⇒ <code>Array.&lt;string&gt;</code>
이중 공격 행동을 수행합니다.

**Kind**: instance property of [<code>DoubleAttackAction</code>](#DoubleAttackAction)  
**Returns**: <code>Array.&lt;string&gt;</code> - 행동 결과 설명  

| Param | Type | Description |
| --- | --- | --- |
| unit | [<code>Unit</code>](#Unit) | 행동을 수행하는 유닛 |
| target_unit | [<code>Unit</code>](#Unit) | 행동의 대상이 되는 유닛 |

<a name="TryHealAction"></a>

## TryHealAction
치유 시도 행동 클래스입니다.

**Kind**: global class  

* [TryHealAction](#TryHealAction)
    * [new TryHealAction()](#new_TryHealAction_new)
    * [.DoAction](#TryHealAction+DoAction) ⇒ <code>Array.&lt;string&gt;</code>

<a name="new_TryHealAction_new"></a>

### new TryHealAction()
TryHealAction 클래스의 생성자입니다.

<a name="TryHealAction+DoAction"></a>

### tryHealAction.DoAction ⇒ <code>Array.&lt;string&gt;</code>
치유 시도 행동을 수행합니다.

**Kind**: instance property of [<code>TryHealAction</code>](#TryHealAction)  
**Returns**: <code>Array.&lt;string&gt;</code> - 행동 결과 설명  

| Param | Type | Description |
| --- | --- | --- |
| unit | [<code>Unit</code>](#Unit) | 행동을 수행하는 유닛 |
| target_unit | [<code>Unit</code>](#Unit) | 행동의 대상이 되는 유닛 |

<a name="GamblingAction"></a>

## GamblingAction
도박 행동 클래스입니다.

**Kind**: global class  

* [GamblingAction](#GamblingAction)
    * [new GamblingAction()](#new_GamblingAction_new)
    * [.DoAction](#GamblingAction+DoAction) ⇒ <code>Array.&lt;string&gt;</code>

<a name="new_GamblingAction_new"></a>

### new GamblingAction()
GamblingAction 클래스의 생성자입니다.

<a name="GamblingAction+DoAction"></a>

### gamblingAction.DoAction ⇒ <code>Array.&lt;string&gt;</code>
도박 행동을 수행합니다.

**Kind**: instance property of [<code>GamblingAction</code>](#GamblingAction)  
**Returns**: <code>Array.&lt;string&gt;</code> - 행동 결과 설명  

| Param | Type | Description |
| --- | --- | --- |
| unit | [<code>Unit</code>](#Unit) | 행동을 수행하는 유닛 |
| target_unit | [<code>Unit</code>](#Unit) | 행동의 대상이 되는 유닛 |

<a name="Stats"></a>

## Stats
유닛의 스탯을 관리하는 클래스입니다.

**Kind**: global class  

* [Stats](#Stats)
    * [new Stats(max_hp, default_atk, atk_rating, defense_rating, luck)](#new_Stats_new)
    * [.current_hp](#Stats+current_hp) ⇒ <code>number</code>
    * [.max_hp](#Stats+max_hp) ⇒ <code>number</code>
    * [.default_atk](#Stats+default_atk) ⇒ <code>number</code>
    * [.atk_rating](#Stats+atk_rating) ⇒ <code>number</code>
    * [.defense_rating](#Stats+defense_rating) ⇒ <code>number</code>
    * [.atk_range](#Stats+atk_range) ⇒ <code>Object</code>
    * [.luck](#Stats+luck) ⇒ <code>number</code>
    * [.modifyLuck(delta)](#Stats+modifyLuck)
    * [.modifyCurrentHP(delta)](#Stats+modifyCurrentHP)
    * [.modifyMaxHP(delta)](#Stats+modifyMaxHP)
    * [.modifyDefaultAtk(delta)](#Stats+modifyDefaultAtk)
    * [.modifyAtkRating(delta)](#Stats+modifyAtkRating)
    * [.modifyDefenseRating(delta)](#Stats+modifyDefenseRating)

<a name="new_Stats_new"></a>

### new Stats(max_hp, default_atk, atk_rating, defense_rating, luck)
Stats 클래스의 생성자입니다.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| max_hp | <code>number</code> | <code>100</code> | 최대 HP |
| default_atk | <code>number</code> | <code>10</code> | 기본 공격력 |
| atk_rating | <code>number</code> | <code>0.1</code> | 공격 배율 |
| defense_rating | <code>number</code> | <code>0</code> | 방어 배율 |
| luck | <code>number</code> | <code>0</code> | 행운 수치 |

<a name="Stats+current_hp"></a>

### stats.current\_hp ⇒ <code>number</code>
**Kind**: instance property of [<code>Stats</code>](#Stats)  
**Returns**: <code>number</code> - 현재 HP  
<a name="Stats+max_hp"></a>

### stats.max\_hp ⇒ <code>number</code>
**Kind**: instance property of [<code>Stats</code>](#Stats)  
**Returns**: <code>number</code> - 최대 HP  
<a name="Stats+default_atk"></a>

### stats.default\_atk ⇒ <code>number</code>
**Kind**: instance property of [<code>Stats</code>](#Stats)  
**Returns**: <code>number</code> - 기본 공격력  
<a name="Stats+atk_rating"></a>

### stats.atk\_rating ⇒ <code>number</code>
**Kind**: instance property of [<code>Stats</code>](#Stats)  
**Returns**: <code>number</code> - 공격 배율  
<a name="Stats+defense_rating"></a>

### stats.defense\_rating ⇒ <code>number</code>
**Kind**: instance property of [<code>Stats</code>](#Stats)  
**Returns**: <code>number</code> - 방어 배율  
<a name="Stats+atk_range"></a>

### stats.atk\_range ⇒ <code>Object</code>
**Kind**: instance property of [<code>Stats</code>](#Stats)  
**Returns**: <code>Object</code> - 공격 범위 {min_atk: number, max_atk: number}  
<a name="Stats+luck"></a>

### stats.luck ⇒ <code>number</code>
**Kind**: instance property of [<code>Stats</code>](#Stats)  
**Returns**: <code>number</code> - 행운 수치  
<a name="Stats+modifyLuck"></a>

### stats.modifyLuck(delta)
행운 수치를 변경합니다.

**Kind**: instance method of [<code>Stats</code>](#Stats)  

| Param | Type | Description |
| --- | --- | --- |
| delta | <code>number</code> | 행운 수치의 변화량 |

<a name="Stats+modifyCurrentHP"></a>

### stats.modifyCurrentHP(delta)
현재 HP를 변경합니다.

**Kind**: instance method of [<code>Stats</code>](#Stats)  

| Param | Type | Description |
| --- | --- | --- |
| delta | <code>number</code> | HP의 변화량 |

<a name="Stats+modifyMaxHP"></a>

### stats.modifyMaxHP(delta)
최대 HP를 변경합니다.

**Kind**: instance method of [<code>Stats</code>](#Stats)  

| Param | Type | Description |
| --- | --- | --- |
| delta | <code>number</code> | 최대 HP의 변화량 |

<a name="Stats+modifyDefaultAtk"></a>

### stats.modifyDefaultAtk(delta)
기본 공격력을 변경합니다.

**Kind**: instance method of [<code>Stats</code>](#Stats)  

| Param | Type | Description |
| --- | --- | --- |
| delta | <code>number</code> | 기본 공격력의 변화량 |

<a name="Stats+modifyAtkRating"></a>

### stats.modifyAtkRating(delta)
공격 배율을 변경합니다.

**Kind**: instance method of [<code>Stats</code>](#Stats)  

| Param | Type | Description |
| --- | --- | --- |
| delta | <code>number</code> | 공격 배율의 변화량 |

<a name="Stats+modifyDefenseRating"></a>

### stats.modifyDefenseRating(delta)
방어 배율을 변경합니다.

**Kind**: instance method of [<code>Stats</code>](#Stats)  

| Param | Type | Description |
| --- | --- | --- |
| delta | <code>number</code> | 방어 배율의 변화량 |

<a name="Unit"></a>

## Unit
게임 내 유닛을 나타내는 클래스입니다.
각 유닛은 이름, 스탯, 그리고 행동 리스트를 가집니다.

**Kind**: global class  

* [Unit](#Unit)
    * [new Unit(name, stats)](#new_Unit_new)
    * [.name](#Unit+name) ⇒ <code>string</code>
    * [.stats](#Unit+stats) ⇒ [<code>Stats</code>](#Stats)
    * [.actions](#Unit+actions) ⇒ [<code>Array.&lt;Action&gt;</code>](#Action)
    * [.InsertAction(action, index)](#Unit+InsertAction)

<a name="new_Unit_new"></a>

### new Unit(name, stats)
Unit 클래스의 생성자입니다.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> | <code>&quot;UNKNOWN&quot;</code> | 유닛의 이름 |
| stats | [<code>Stats</code>](#Stats) | <code></code> | 유닛의 스탯 |

<a name="Unit+name"></a>

### unit.name ⇒ <code>string</code>
**Kind**: instance property of [<code>Unit</code>](#Unit)  
**Returns**: <code>string</code> - 유닛의 이름  
<a name="Unit+stats"></a>

### unit.stats ⇒ [<code>Stats</code>](#Stats)
**Kind**: instance property of [<code>Unit</code>](#Unit)  
**Returns**: [<code>Stats</code>](#Stats) - 유닛의 스탯  
<a name="Unit+actions"></a>

### unit.actions ⇒ [<code>Array.&lt;Action&gt;</code>](#Action)
**Kind**: instance property of [<code>Unit</code>](#Unit)  
**Returns**: [<code>Array.&lt;Action&gt;</code>](#Action) - 유닛의 행동 리스트  
<a name="Unit+InsertAction"></a>

### unit.InsertAction(action, index)
유닛에 새로운 행동을 추가합니다.

**Kind**: instance method of [<code>Unit</code>](#Unit)  
**Throws**:

- <code>Error</code> 행동이 null이거나 유효하지 않은 경우, 혹은 같은 이름의 행동이 이미 존재할 경우 예외를 발생시킵니다.


| Param | Type | Description |
| --- | --- | --- |
| action | [<code>Action</code>](#Action) | 추가할 행동 |
| index | <code>number</code> | 행동을 추가할 위치 (-1일 경우 리스트 끝에 추가) |

<a name="eventBus"></a>

## eventBus
이벤트를 발행하고 구독하는 이벤트 버스입니다.
이를 통해 모듈 간에 이벤트를 전달할 수 있습니다.

**Kind**: global constant  
<a name="Save"></a>

## Save() ⇒ <code>Promise.&lt;void&gt;</code>
설정을 저장하는 함수입니다.

**Kind**: global function  
<a name="displayStatus"></a>

## displayStatus(stage, player, monster)
현재 스테이지, 플레이어, 몬스터의 상태를 출력합니다.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| stage | <code>number</code> | 현재 스테이지 번호 |
| player | [<code>Unit</code>](#Unit) | 플레이어 유닛 |
| monster | [<code>Unit</code>](#Unit) | 몬스터 유닛 |

<a name="monsterAction"></a>

## monsterAction(player, monster) ⇒ <code>Array.&lt;string&gt;</code>
몬스터가 행동을 수행합니다.

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - 몬스터 행동 결과  

| Param | Type | Description |
| --- | --- | --- |
| player | [<code>Unit</code>](#Unit) | 플레이어 유닛 |
| monster | [<code>Unit</code>](#Unit) | 몬스터 유닛 |

<a name="battle"></a>

## battle(stage, player, monster)
전투를 수행하는 함수입니다.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| stage | <code>number</code> | 현재 스테이지 번호 |
| player | [<code>Unit</code>](#Unit) | 플레이어 유닛 |
| monster | [<code>Unit</code>](#Unit) | 몬스터 유닛 |

<a name="elixirScenario"></a>

## elixirScenario(player)
엘릭서 시나리오를 처리하는 함수입니다.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| player | [<code>Unit</code>](#Unit) | 플레이어 유닛 |

<a name="victoryScenario"></a>

## victoryScenario(player, stage)
승리 시나리오를 처리하는 함수입니다.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| player | [<code>Unit</code>](#Unit) | 플레이어 유닛 |
| stage | <code>number</code> | 현재 스테이지 번호 |

<a name="CreatePlayerDefaultStats"></a>

## CreatePlayerDefaultStats() ⇒ [<code>Stats</code>](#Stats)
기본 플레이어 스탯을 생성하는 함수입니다.

**Kind**: global function  
**Returns**: [<code>Stats</code>](#Stats) - 생성된 플레이어 스탯  
<a name="CreateMonsterStats"></a>

## CreateMonsterStats(stage) ⇒ [<code>Stats</code>](#Stats)
몬스터의 스탯을 생성하는 함수입니다.

**Kind**: global function  
**Returns**: [<code>Stats</code>](#Stats) - 생성된 몬스터 스탯  

| Param | Type | Description |
| --- | --- | --- |
| stage | <code>number</code> | 현재 스테이지 번호 |

<a name="startGame"></a>

## startGame()
게임을 시작하는 함수입니다.

**Kind**: global function  
<a name="setCommand"></a>

## setCommand()
로비 명령어를 설정하는 함수입니다.

**Kind**: global function  
<a name="displayLobby"></a>

## displayLobby()
로비 화면을 출력하는 함수입니다.

**Kind**: global function  
<a name="viewAchievements"></a>

## viewAchievements()
업적을 조회하는 함수입니다.

**Kind**: global function  
<a name="handleUserInput"></a>

## handleUserInput()
유저 입력을 받아 처리하는 함수입니다.

**Kind**: global function  
<a name="start"></a>

## start()
게임을 시작하는 함수입니다.

**Kind**: global function  
<a name="displayOption"></a>

## displayOption()
옵션 메뉴를 화면에 출력하는 함수입니다.

**Kind**: global function  
<a name="changePlayerName"></a>

## changePlayerName()
플레이어 이름을 변경하는 함수입니다.

**Kind**: global function  
<a name="changeBossName"></a>

## changeBossName()
보스 이름을 변경하는 함수입니다.

**Kind**: global function  
<a name="addMonster"></a>

## addMonster()
새로운 몬스터를 추가하는 함수입니다.

**Kind**: global function  
<a name="removeMonster"></a>

## removeMonster()
몬스터를 제거하는 함수입니다.

**Kind**: global function  
<a name="changeMonster"></a>

## changeMonster()
몬스터의 이름을 변경하는 함수입니다.

**Kind**: global function  
<a name="changeMonsters"></a>

## changeMonsters()
몬스터와 관련된 옵션을 변경하는 함수입니다.

**Kind**: global function  
<a name="setCommands"></a>

## setCommands()
옵션 메뉴 명령어를 설정하는 함수입니다.

**Kind**: global function  
<a name="Start"></a>

## Start()
옵션 메뉴를 시작하는 함수입니다.

**Kind**: global function  
<a name="CalcAtk"></a>

## CalcAtk(unit) ⇒ <code>number</code>
공격 행동을 계산하는 함수입니다.

**Kind**: global function  
**Returns**: <code>number</code> - 계산된 공격력  

| Param | Type | Description |
| --- | --- | --- |
| unit | [<code>Unit</code>](#Unit) | 공격하는 유닛 |

<a name="CalcDamage"></a>

## CalcDamage(target_unit, atk) ⇒ <code>number</code>
피격 유닛의 방어력을 반영한 데미지를 계산합니다.

**Kind**: global function  
**Returns**: <code>number</code> - 계산된 데미지  

| Param | Type | Description |
| --- | --- | --- |
| target_unit | [<code>Unit</code>](#Unit) | 피격당하는 유닛 |
| atk | <code>number</code> | 공격력 |

<a name="CalcProbability"></a>

## CalcProbability(probability, unit) ⇒ <code>boolean</code>
행동이 성공했는지 확률을 계산합니다.

**Kind**: global function  
**Returns**: <code>boolean</code> - 성공 여부  

| Param | Type | Description |
| --- | --- | --- |
| probability | <code>number</code> | 행동의 기본 확률 |
| unit | [<code>Unit</code>](#Unit) | 행동을 수행하는 유닛 |

