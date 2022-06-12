import schemas from './schemas';
import categories from './categories';
import { NativeModules } from 'react-native';
const { SmsModule } = NativeModules;

const findCategory = (receiver) => {
    return categories.find((category) => category.keywords.find((keyword) => receiver.toLowerCase().includes(keyword.toLowerCase())))
}
const extractor = (timestamp) => new Promise((resolve, reject) => {
    var output = [];
    var scanned_schema = 0;
    var _schemas = schemas(timestamp);
    _schemas.map((schema, i_schema) => {
        SmsModule.list(
            JSON.stringify(schema.filter),
            (fail) => {
                console.log('failed in retreiving error : ', fail);
                reject(fail);
            },
            (count, smsList) => {
                scanned_schema++;
                var arr = JSON.parse(smsList);
                arr.map(function (object, i_arr) {
                    let body = object.body;
                    //console.log("Testing 321");
                    let receiver = body.match(schema.attributes.extractors.receiver.regex)[schema.attributes.extractors.receiver.index];
                    let category_obj = findCategory(receiver);
                    let category = category_obj ? category_obj.name : "others";
                    output.push({
                        bank_name: schema.attributes.name,
                        date: object.date,
                        amount: body.match(schema.attributes.extractors.amount.regex)[schema.attributes.extractors.amount.index],
                        receiver: receiver,
                        balance_after: schema.attributes.extractors.balance_after != null ? body.match(schema.attributes.extractors.balance_after.regex)[schema.attributes.extractors.balance_after.index] : null,
                        category: category,
                    })
                    if (i_arr === arr.length-1 && scanned_schema === _schemas.length) {
                        console.log('in');
                        resolve(output);
                    }
                });

            }
        )
    })
});

export default extractor;