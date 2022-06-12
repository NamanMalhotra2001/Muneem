import extractor from "./extractor";

const syncExpenses = ( timestamp ) => new Promise((resolve, reject) => {
    if (timestamp < new Date().getTime()) {
        extractor(timestamp)
            .then((expenses) => {
                // console.log(expenses);
                resolve(expenses);
            })
            .catch((err) => {
                reject(err);
            })
    }
});

export default syncExpenses;