/* eslint-disable no-console */
/* eslint-disable no-shadow */
const DB_NAME = "Pokemon";

const req = window.indexedDB.open(DB_NAME);

req.onupgradeneeded = (event) => {
  const db = event.target.result;

  // objectStore stores pokemon details
  const objectStore = db.createObjectStore("details", { keyPath: "id" });
  // 'details' also is indexed by name
  objectStore.createIndex("name", "name", { unique: true });
};

export function fetchFromCache(key) {
  return new Promise((resolve) => {
    const request = window.indexedDB.open(DB_NAME);

    // console.log errors and treat them as cache misses.
    // a production app should handle errors
    request.onerror = (ev) => {
      console.error(ev);
      return resolve(null);
    };

    request.onsuccess = (ev) => {
      const db = ev.target.result;

      const transaction = db.transaction(["details"], "readonly");
      const store = transaction.objectStore("details");
      let getDetails;
      if (/^[0-9]*$/.test(key)) {
        getDetails = store.get(Number(key));
      } else {
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

export function clearCache() {
  const DBOpenRequest = window.indexedDB.open(DB_NAME);

  DBOpenRequest.onsuccess = (e) => {
    const db = e.target.result;
    const transaction = db.transaction(["details"], "readwrite");

    transaction.objectStore("details").clear();
  };
}
