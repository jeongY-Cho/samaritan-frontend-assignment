/* eslint-disable no-console */
/* eslint-disable no-shadow */
const DB_NAME = "Pokemon";

// setup indexedDB
const req = window.indexedDB.open(DB_NAME);

req.onupgradeneeded = (event) => {
  const db = event.target.result;

  // objectStore stores pokemon details
  const objectStore = db.createObjectStore("details", { keyPath: "id" });
  // 'details' also is indexed by name
  objectStore.createIndex("name", "name", { unique: true });
};

// fetch cached pokemon details
export function fetchFromCache(key) {
  return new Promise((resolve) => {
    // open db
    const request = window.indexedDB.open(DB_NAME);

    // console.log errors and treat them as cache misses.
    // a production app should handle errors
    request.onerror = (ev) => {
      console.error(ev);
      return resolve(null);
    };

    request.onsuccess = (ev) => {
      const db = ev.target.result;

      // start transaction
      const transaction = db.transaction(["details"], "readonly");
      // get store
      const store = transaction.objectStore("details");
      // details var
      let getDetails;

      // if key is a string of numbers then get by id
      if (/^[0-9]*$/.test(key)) {
        getDetails = store.get(Number(key));
      } else {
        // if its not a string of numbers then assume its a name and retrieve by name
        const index = store.index("name");
        getDetails = index.get(key);
      }

      // treat errors as cache misses
      getDetails.onerror = (ev) => {
        console.error(ev);
        return resolve(null);
      };

      getDetails.onsuccess = (ev) => {
        resolve(ev.target.result);
      };
    };
  });
}

// write to cache
// set and forget, ignore errors,
// this cache doesn't need to guarantee data
export function writeToCache(details) {
  return new Promise((resolve, reject) => {
    const openDB = window.indexedDB.open(DB_NAME);

    openDB.onsuccess = (ev) => {
      const db = ev.target.result;
      const transaction = db.transaction(["details"], "readwrite");
      const store = transaction.objectStore("details");

      const update = store.put(details);

      update.onerror = (ev) => {
        console.error(ev);
        reject(ev);
      };

      update.onsuccess = () => {
        resolve();
      };
    };
  });
}

// clear cache
export function clearCache() {
  const DBOpenRequest = window.indexedDB.open(DB_NAME);

  DBOpenRequest.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction(["details"], "readwrite");

    transaction.objectStore("details").clear();
  };
}
