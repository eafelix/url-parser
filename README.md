# Little URL Parser

You can transform a dynamic URL to JSON object. This supports the transformation numbers, query strings and arrays.

Enjoy!!!

## Install

```bash
npm install
```

### Usage

```bash
node index.js "profile/:user/info/:section" "profile/felix/info/history?from=1990&till=2015&param=1&&param=2&param=3"
```

## Result:

```bash
{ user: 'felix',
  from: 1990,
  till: 2015,
  params: [ 1, 2, 3 ],
  section: 'history' }

```
