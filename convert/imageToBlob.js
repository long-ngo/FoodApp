function loadXHR(url) {
  return new Promise((resolve, reject) => {
    try {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.open('GET', url, true);
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(xhr.statusText);
      };
      xhr.send(null);
    } catch (error) {
      reject(error);
    }
  });
}

export { loadXHR };
