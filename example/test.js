var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
/**
 * Created by hey on 1/26/17.
 */
/// <reference path="../easy-indexeddb.d.ts" />
const dbRequest = indexedDB.open("lists", 1);
dbRequest.onupgradeneeded = function () {
    const db = this.result;
    const favStore = db.createObjectStore("favlist");
    favStore.createIndex('title', 'title', { unique: true });
    favStore.createIndex('tag', 'tags', { multiEntry: true });
};
dbRequest.then((db) => __awaiter(this, void 0, void 0, function* () {
    const store = db.store('favlist', 'readwrite');
    yield store.add({ title: 'i like', tags: ['a', 'b', 'c'] }, 1);
    yield store.add({ title: 'i want', tags: ['a1', 'b', 'c1'] }, 2);
    yield store.add({ title: 'i want x', tags: ['d', 'b11', 'c'] }, 3);
    yield store.add({ title: 'i like f', tags: ['a', 'b', 'c'] }, 4);
    yield store.add({ title: 'i want r', tags: ['a11', 'bs', 'c1'] }, 5);
    yield store.add({ title: 'i want t', tags: ['d', 'bs1', 'cx'] }, 6);
    yield store.put({ title: 'i want r modify', tags: ['fffffff'] }, 5);
    console.log(yield store.count());
    function getfn(tip) {
        return function walkfn({ key, value }) { console.log(`tip:{${tip} =>`, { key, value }); return true; };
    }
    store.walkKeyCursor(getfn('walk favlist key'));
    store.index('title').walkCursor(getfn('walk title index'));
    store.index('tag').walkCursor(getfn('walk tag index'));
    // await store.clear();
    return true;
}), console.error);
