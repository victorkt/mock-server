'use strict';

var _ = require('lodash');

var logs = {
    data: [
        {
            mock: '558f3871e5079a4aeb463b18',
            path: 'test',
            date: '2015-06-28T00:00:39.461Z',
            request: {
                method: 'GET',
                url: '/m/test',
                headers: {
                    host: 'localhost:3000',
                    connection: 'keep-alive',
                    'cache-control': 'max-age=0',
                    'accept-language': 'en-US,en;q=0.8,de;q=0.6,pt;q=0.4,en-GB;q=0.2'
                },
                body: {}
            },
            response: {
                time: 7,
                status: 200,
                headers: {
                    'x-powered-by': 'Express',
                    'content-type': 'application/json; charset=utf-8',
                    'content-length': '387'
                }
            }
        },
        {
            mock: '558f3871e5079a4aeb463b18',
            path: 'test',
            date: '2015-06-28T00:02:43.881Z',
            request: {
                method: 'GET',
                url: '/m/test',
                headers: {
                    host: 'localhost:3000',
                    connection: 'keep-alive'
                },
                body: {}
            },
            response: {
                time: 1,
                status: 200,
                headers: {
                    'content-type': 'application/json; charset=utf-8',
                    'content-length': '63'
                }
            }
        },
        {
            mock: '558f3871e5079a4aeb463b18',
            path: 'test',
            date: '2015-06-28T00:02:55.213Z',
            request: {
                method: 'GET',
                url: '/m/test?skuId=123,4',
                headers: {
                    host: 'localhost:3000',
                    connection: 'keep-alive',
                    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
                },
                body: {}
            },
            response: {
                time: 1,
                status: 200,
                headers: {
                    'x-powered-by': 'Express',
                    'content-type': 'application/json; charset=utf-8',
                    'content-length': '228'
                }
            }
        }
    ]
};

module.exports = {
    get data() {
        return _.cloneDeep(logs.data);
    }
};