import schemas from '../Components/ExpensesOutput/schemas';
import categories from '../Components/ExpensesOutput/categories';
import { NativeModules } from 'react-native';
const { SmsModule } = NativeModules;
const extractor = () => new Promise((resolve, reject) => {
    var output = [];
    var itemProcessed = 0;
    schemas.forEach((schema) => {

        SmsModule.list(
            JSON.stringify(schema.filter),
            (fail) => {
                console.log('Failed with this error: ' + fail);
                reject(fail);
            },
            (count, smsList) => {
                // console.log('Count: ', count);
                // console.log('List: ', smsList);
                var arr = JSON.parse(smsList);
                var temp = [];
                var messageProcessed = 0;
                arr.forEach(function (object) {
                    // console.log('Object: ' + object);
                    // console.log('Object: ' + JSON.stringify(object));
                    // console.log('-->' + object.date);
                    // console.log('-->' + object.body);
                    let body = object.body;
                    //console.log("Testing 321");
                    temp.push({
                        id: schema.attributes.name,
                        date: object.date,
                        amount: body.match(schema.attributes.extractors.amount.regex)[schema.attributes.extractors.amount.index],
                        receiver: body.match(schema.attributes.extractors.receiver.regex)[schema.attributes.extractors.receiver.index],
                        balance_after: schema.attributes.extractors.balance_after != null ? body.match(schema.attributes.extractors.amount.regex)[schema.attributes.extractors.amount.index] : null,
                    })
                    if (messageProcessed >= arr.length - 1) {
                        output.push({
                            id: schema.attributes.name,
                            data: temp,
                        });
                    }

                    messageProcessed++;
                });
                if (itemProcessed >= schemas.length) {
                    //console.log(itemProcessed, schemas.length);
                    resolve(output);
                    // output.forEach((op) => {
                    //     //console.log(op);
                    //     op.data.forEach((data) => {
                    //         setToast((old) => [...old, {
                    //             date: data.date,
                    //             amount: data.amount,
                    //             receiver: data.receiver,
                    //             balance_after: data.balance_after,
                    //         }]);
                    //     })

                    // })

                }
            },
        );
        itemProcessed++;
    })
});

export default extractor;