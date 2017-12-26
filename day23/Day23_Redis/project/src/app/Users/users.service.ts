'use strict';

import { Component, Inject } from '@nestjs/common';
import { createClient } from 'redis';
@Component()
export class UsersServices {
    //第一個參數給定port，第二個參數給定host
    private readonly client = createClient(6379, "127.0.0.1");

    constructor() { }

    //查詢單筆
    public async findById(ID): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.hgetall(ID, function (error, res) {
                if (error) {
                    reject(error);
                } else {
                    resolve(res);
                }
            });
        })
    }
    //新增
    public async create(users: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.hmset(`${users.ID}`, users, function (error, res) {
                if (error) {
                    reject(error);
                } else {
                    resolve(res);
                }
            });
        })
    }
    //更新
    public async update(ID: number, newValue: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.hmset(`${ID}`, newValue, function (error, res) {
                if (error) {
                    reject(error);
                } else {
                    resolve(res);
                }
            });
        })
    }
    //刪除
    public async delete(ID: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.del(`${ID}`, function (error, res) {
                if (error) {
                    reject(error);
                } else {
                    resolve(res);
                }
            });
        })
    }
}