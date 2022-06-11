import { React } from 'react';

const schemas = [
    {
        attributes: {
            name: "paytm_wallet",
            extractors: {
                amount: {
                    regex: /(.*)Paid Rs.(.*) to(.*)/,
                    index: 2,
                },
                receiver: {
                    regex: /(.*) to (.*) from(.*)/,
                    index: 2,
                },
                balance_after: null
            }
        },
        filter: {
            box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

            /**
             *  the next 3 filters can work together, they are AND-ed
             *  
             *  minDate, maxDate filters work like this:
             *    - If and only if you set a maxDate, it's like executing this SQL query:
             *    "SELECT * from messages WHERE (other filters) AND date <= maxDate"
             *    - Same for minDate but with "date >= minDate"
             */
            // timestamp (in milliseconds since UNIX epoch)
            bodyRegex: '(.*)Paid Rs(.*)to(.*)Paytm Balance.(.*)', // content regex to match,
            /** the next 5 filters should NOT be used together, they are OR-ed so pick one **/
            // 0 for unread SMS, 1 for SMS already read
            // specify the msg id
            // specify the conversation thread_id
            // sender's phone number
            // content to match
            /** the next 2 filters can be used for pagination **/
            indexFrom: 0, // start from index 0
            maxCount: 10, // count of SMS to return each time
        }
    },
    {
        attributes: {
            name: "paytm_payments_bank",
            extractors: {
                amount: {
                    regex: /(.*)Paid Rs.(.*) via(.*)/,
                    index: 2,
                },
                receiver: {
                    regex: /(.*) to (.*) on(.*)/,
                    index: 2,
                },
                balance_after: null
            }
        },
        filter: {
            box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

            /**
             *  the next 3 filters can work together, they are AND-ed
             *  
             *  minDate, maxDate filters work like this:
             *    - If and only if you set a maxDate, it's like executing this SQL query:
             *    "SELECT * from messages WHERE (other filters) AND date <= maxDate"
             *    - Same for minDate but with "date >= minDate"
             */
            // timestamp (in milliseconds since UNIX epoch)
            bodyRegex: '(.*)Paid Rs(.*) via a/c(.*):PPBL(.*)', // content regex to match
            address: 'AX-PAYTMB',
            /** the next 5 filters should NOT be used together, they are OR-ed so pick one **/
            // 0 for unread SMS, 1 for SMS already read
            // specify the msg id
            // specify the conversation thread_id
            // sender's phone number
            // content to match
            /** the next 2 filters can be used for pagination **/
            indexFrom: 0, // start from index 0
            maxCount: 10, // count of SMS to return each time
        }
    },
    {
        attributes: {
            name: "kotak_bank",
            extractors: {
                amount: {
                    regex: /(.*)Rs.(.*) is(.*)/,
                    index: 2,
                },
                receiver: {
                    regex: /(.*)to (.*) on(.*)/,
                    index: 2,
                },
                balance_after: {
                    regex: /New balance: Rs. (.*)/,
                    index: 1
                }
            }
        },
        filter: {
            box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

            /**
             *  the next 3 filters can work together, they are AND-ed
             *  
             *  minDate, maxDate filters work like this:
             *    - If and only if you set a maxDate, it's like executing this SQL query:
             *    "SELECT * from messages WHERE (other filters) AND date <= maxDate"
             *    - Same for minDate but with "date >= minDate"
             */
            // timestamp (in milliseconds since UNIX epoch)
            bodyRegex: '(.*)debited(.*)from(.*)Kotak Bank(.*)', // content regex to match
            address: 'AD-KOTAKB',
            /** the next 5 filters should NOT be used together, they are OR-ed so pick one **/
            // 0 for unread SMS, 1 for SMS already read
            // specify the msg id
            // specify the conversation thread_id
            // sender's phone number
            // content to match
            /** the next 2 filters can be used for pagination **/
            indexFrom: 0, // start from index 0
            maxCount: 10, // count of SMS to return each time
        }
    },
] 

export default schemas;