easy indexedDB
=================
Easy-indexedDB provides some useful helper functions by monkey patching.


Promise-like IDBRequest
-----------------------
For example , open a db:
```js
const dbRequest = <IDBOpenDBRequest>indexedDB.open("lists",1);
dbRequest.then((db:IDBDatabase) =>{
//do something with db...
},console.error);

```
And add some records
```js
async function XXX (){
//...config your transaction
await store.add({title:'i like f',tags:['a','b','c']},4);
//...
}
```

Access objectStore just from IDBDatabase
----------------------------------------
It's amazing...
Because IDBRequest is promise-like,if we hide some terrible codes,things will be easy.
```js
//......
dbRequest.then(async (db:IDBDatabase):Promise<boolean> =>{
    const store = db.store('favlist','readwrite');
    await store.add({title:'i like',tags:['a','b','c']},1);
    //....
}
```

go through Cursor
-------------------
```js
    store.walkKeyCursor(console.log);
    // {key:xxxx,value:null}
    store.index('title').walkCursor(console.log);
    // {key:xxxx,value:xxxx}

```

And More
==========
If you want its APIs,you can see `easy-indexeddb.d.ts`.It can be understand easily and quickly.

**If you like it,please give a star.Thanks**
