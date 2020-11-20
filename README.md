# WhatPulse.js

### Installation
```
npm i whatpulse.js
yarn add whatpulse.js
```

### Usage
* [`new Client([hostname], [port], [protocol])`](#new_client)
	* `.fetchAccountTotals()`
	* `.fetchUnpulsedStats()`
	* `.pulse()`

<a name="new_client"></a>

### `new Client([hostname], [port], [protocol])`

| Param | Type | Default |
| --- | --- | --- |
| [hostname] | `string` | `localhost` |
| [port] | `number` | `3490` |
| [protocol] | `string` | `http:`

### `client.fetchAccountTotals()`
**Returns:** `Promise<AccountTotals>`

### `client.fetchUnpulsedStats()`
**Returns:** `Promise<UnpulsedStats>`

### `client.pulse()`
**Returns:** `Promise<void>`

### Contributions
Contributions are greatly accepted.
1. Fork the repo
2. Make your changes and commit
3. Open a PR

### Licensed under MIT (see LICENSE)