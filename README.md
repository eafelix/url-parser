#Little URL Parser

You can transform a dynamic URL to JSON object. This supports the transformation numbers, query strings and arrays.

Enjoy!!!

####Install

```
npm install
```


####Usage

```
node index.js "profile/:user/info/:section" "profile/felix/info/history?from=1990&till=2015&param=1&&param=2&param=3"
```


####Result:

```
{ user: 'felix',
  from: 1990,
  till: 2015,
  params: [ 1, 2, 3 ],
  section: 'history' }

```

--------------------------------------------------------------------------------


###URL Parser Exercise

We need some logic that extracts the variable parts of a url into a hash. The keys of the extract hash will be the "names" of the variable parts of a url, and the values of the hash will be the values. We will be supplied with:

1. A url format string, which describes the format of a url. A url format string can contain constant parts and variable parts, in any order, where "parts" of a url are separated with "/". All variable parts begin with a colon. Here is an example of such a url format string:

`/:version/api/:collecton/:id`

2. A particular url instance that is guaranteed to have the format given by the url format string. It may also contain url parameters. For example, given the example url format string above, the url instance might be:

`/6/api/listings/3?sort=desc&limit=10`

Given this example url format string and url instance, the hash we want that maps all the variable parts of the url instance to their values would look like this:


```
{
version: 6,
collection: "listings", id: 3,
sort: "desc",
limit: 10
}
```


Please implement a solution to this problem in JavaScript with attention to code structure and readability. Feel free to use low-level libraries like underscore.
