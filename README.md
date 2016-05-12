# Cachejs
Cachejs is a javascript library that uses LocalStorage and SessionStorage for cache datas on your application.

## Requirements
Web browser with LocalStorage and SessionStorage :
- Chrome 5+
- Firefox 3.5+
- IE 8+
- Safari 4+
- Opera 10.50+
- Safari Mobile iOS 3.2
- Android 2.1+

## Installation

### With npm
```bash
npm install ozee-cachejs
```

### With bower
```bash
bower install ozee-cachejs
```

### Other method
Download this repository and copy files on your project **(not recommended)**

## Quick Start

Load the lib :
```html
<html>
	<head>
        <!-- npm -->
        <script src="node_modules/ozee-cachejs/dist/cache.min.js"></script>

        <!-- bower -->
        <script src="bower_components//ozee-cachejs/dist/cache.min.js"></script>

        <!-- other method -->
		<script src="lib-path/cachejs/dist/cache.min.js"></script>
	</head>
</html>
```

Store data in local storage
```JS
Cachejs.Local.set('key', 'local');
```

Store data in session storage
```JS
Cachejs.Session.set('key', 'session');
```

Get data in local storage
```JS
Cachejs.Session.get('key'); // return 'local'
```

Get data in session storage
```JS
Cachejs.Session.get('key'); // return 'session'
```

## Classes

### Cachejs.Local (use localStorage)
The localStorage property allows you to access a local Storage object. localStorage is similar to sessionStorage. The only difference is that, while data stored in localStorage has no expiration time, data stored in sessionStorage gets cleared when the browsing session ends—that is, when the browser is closed.

### Cachejs.Session (use sessionStorage)
The sessionStorage property allows you to access a session Storage object. sessionStorage is similar to Window.localStorage, the only difference is while data stored in localStorage has no expiration set, data stored in sessionStorage gets cleared when the page session ends. A page session lasts for as long as the browser is open and survives over page reloads and restores. Opening a page in a new tab or window will cause a new session to be initiated, which differs from how session cookies work.

## Methods
`Cachejs.Local` and `Cachejs.Session` have access to the same functions.

### Set
Add the key to the storage, or update that key's value if it already exists
`set(key, value, expiration = null, readOnly = false)`

#### Parameters
- {string} **key**      : name of the key you want to create/updat
- {mixed} **value**     : value you want to give the key you are creating/updating (string, int, array, object...)
- {mixed} **expire**    : (int) the data expires in x seconds || (falsy) no expiration
- {mixed} **readOnly**  : (true) prohibit modification || (falsy)

#### Return
**Boolean** : (true) success || (false) fail

#### Exemples
- String, int...
```JS
// String
Cachejs.Local.set('key', 'value');

// Array
Cachejs.Local.set('key', [1,2,3]);

// Object
Cachejs.Local.set('key', {fistname: 'James', lastname: 'Bond'});

// With expiration
Cachejs.Local.set('key', 'value', 3600); // data expires in 1 hour

// ReadOnly
Cachejs.Local.set('key', 'value', null, true); // return true
Cachejs.Local.set('key', 'change'); // return false
Cachejs.Local.get('key'); // return 'value'
```

### Get
Get only value, remove if expired
`get(key)`

#### Parameters
- {string} **key**

#### Return
**Mixed** : the value OR null if the data has expired or not exist

#### Exemples
```JS
Cachejs.Local.set('key', 'value');

Cachejs.Local.get('key'); // 'value'
Cachejs.Session.get('key'); // null

Cachejs.Local.set('key', 'value', 1);
// sleep 2 secondes or more
Cachejs.Local.get('key'); // null
```

### Remove
Remove data if don't readonly
`remove(key)`

#### Parameters
- {string} **key**

#### Return
**Boolean** :  (true) success || (false) fail

#### Exemples
```JS
Cachejs.Local.set('key', 'value');
Cachejs.Local.get('key'); // 'value'
Cachejs.Local.remove('key'); // true
Cachejs.Local.get('key'); // null

// ReadOnly
Cachejs.Local.set('key', 'value', null, true);
Cachejs.Local.get('key'); // 'value'
Cachejs.Local.remove('key'); // false
Cachejs.Local.get('key'); // 'value'
```

### Clear
Remove all datas
`clear()`

#### Return
true

#### Exemples
```JS
Cachejs.Local.set('key', 'value');
Cachejs.Local.set('key2', 'value', null, true);

Cachejs.Local.clear(); // true

Cachejs.Local.get('key'); // null
Cachejs.Local.get('key2'); // null
```

### isExpired
Indicates whether the value has expired
`isExpired(key)`

#### Parameters
- {string} **key**

#### Return
**Boolean** :  (true) is expired || (false) is not expired

#### Exemples
```JS
// No expiration
Cachejs.Local.set('key', 'value');
Cachejs.Local.isExpired('key'); // false

// No expired
Cachejs.Local.set('key', 'value', 999999);
Cachejs.Local.isExpired('key'); // false

// Expired
Cachejs.Local.set('key', 'value', 1);
// sleep 1 second or more
Cachejs.Local.isExpired('key'); // true
```


### isReadonly
Indicates whether the value is readonly
`isReadonly(key)`

#### Parameters
- {string} **key**

#### Return
**Boolean** :  (true) is read only || (false) is not read only

#### Exemples
```JS
// No readonly
Cachejs.Local.set('key', 'value');
Cachejs.Local.isReadonly('key'); // false

// is readonly
Cachejs.Local.set('key', 'value', null, true);
Cachejs.Local.isReadonly('key'); // true
```
