'use strict';

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
    //主鍵，SQL Server識別種子
    @PrimaryGeneratedColumn()
    ID: number;

    @Column({ length: 50 })
    Name: string;

    @Column('int')
    Age: number;
}
