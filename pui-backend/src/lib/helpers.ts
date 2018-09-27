// This allows for async calls to  return an object with a potential error which can be checked,
// This avoids try catch blocks

export default function to(promise) {
    return promise
        .then(data => {
            return [null, data]
        })
        .catch(err => [err])
}
