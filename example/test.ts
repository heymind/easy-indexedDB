/**
 * Created by hey on 1/26/17.
 */
/// <reference path="../easy-indexeddb.d.ts" />
const dbRequest = <IDBOpenDBRequest>indexedDB.open("lists",1);
dbRequest.onupgradeneeded = function () {
    const db = <IDBDatabase>this.result;
    const favStore = db.createObjectStore("favlist");
    favStore.createIndex('title','title',{unique:true});
    favStore.createIndex('tag','tags',{multiEntry:true});
};
dbRequest.then(async (db:IDBDatabase):Promise<boolean> =>{
    const store = db.store('favlist','readwrite');
    await store.add({title:'i like',tags:['a','b','c']},1);
    await store.add({title:'i want',tags:['a1','b','c1']},2);
    await store.add({title:'i want x',tags:['d','b11','c']},3);
    await store.add({title:'i like f',tags:['a','b','c']},4);
    await store.add({title:'i want r',tags:['a11','bs','c1']},5);
    await store.add({title:'i want t',tags:['d','bs1','cx']},6);
    await store.put({title:'i want r modify',tags:['fffffff']},5);
    console.log(await store.count());
    function getfn(tip){
        return   function walkfn ({key,value}){console.log(`tip:{${tip} =>`,{key,value});return true;}
    }

    store.walkKeyCursor(getfn('walk favlist key'));
    store.index('title').walkCursor(getfn('walk title index'));
    store.index('tag').walkCursor(getfn('walk tag index'));

    // await store.clear();
    return true;

},console.error);

