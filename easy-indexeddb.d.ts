interface IDBDatabase {
    store(name:string,mode?:string):IDBObjectStore;
}
interface IDBRequest extends PromiseLike<any>{}
interface IDBOpenDBRequest extends PromiseLike<any>{}
interface IDBWalkable {
    walkCursor(walkFn:Function,range?: IDBKeyRange | IDBValidKey, direction?: string): IDBRequest;
    walkKeyCursor(walkFn:Function,range?: IDBKeyRange | IDBValidKey, direction?: string): IDBRequest;
}
interface IDBObjectStore extends IDBWalkable{}
interface IDBIndex extends IDBWalkable{}