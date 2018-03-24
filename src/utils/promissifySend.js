export const promissifySend = requester => request => new Promise((resolve, reject) => {
    requester.send(request, (res, err) => {
        if (err) return reject(err)
        return resolve(res)
    });
})