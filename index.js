(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.easyIndexedDB = factory());
}(this, (function () { 'use strict';


    window.IDBRequest.prototype.then = function(onFulfilled, onRejected) {
        return new Promise((resolve, reject) => {
                if (this.readyState == 'done') {
            if (this.result) return resolve(this.result);
            if (this.error) return reject(this.error);
        }
        this.onsuccess = () => resolve(this.result);
        this.onerror = () => reject(this.error);
        }).then(onFulfilled, onRejected);
    };

    window.IDBDatabase.prototype.store = function(storeName, mode) {
        const requestStore = () => this.transaction([storeName], mode).objectStore(storeName);

        return new Proxy(IDBObjectStore, {
            get: (target, name) => {
                const store = requestStore();
                if (store[name]) {
                    return function () {
                        return store[name].apply(store, arguments);
                    }
                } else return undefined;
            }
        });
    };

    function _walkCursor(c, walkFn) {
        c.onerror = () => {
            walkFn({
                error: c.error
            });
        };
        c.onsuccess = function(ev) {
            const cursor = ev.target.result;
            if (cursor) {
                const isContinue = walkFn({
                    key: cursor.key,
                    value: cursor.value || null
                });
                if (isContinue) {
                    cursor.continue();
                } else {
                    walkFn({
                        complete: true
                    });
                }
            } else {
                walkFn({
                    complete: true
                });
            }
        };
    }

    function _walkCursorNoValue(walkFn, optionalKeyRange, optionalDirection) {
        _walkCursor(this.openKeyCursor(optionalKeyRange, optionalDirection), walkFn);
    }

    function _walkCursorWithValue(walkFn, optionalKeyRange, optionalDirection) {
        _walkCursor(this.openCursor(optionalKeyRange, optionalDirection), walkFn);
    }
    window.IDBObjectStore.prototype.walkCursor = _walkCursorWithValue;
    window.IDBObjectStore.prototype.walkKeyCursor = _walkCursorNoValue;
    window.IDBIndex.prototype.walkCursor = _walkCursorWithValue;
    window.IDBIndex.prototype.walkKeyCursor = _walkCursorNoValue;
    return 2;
})));
