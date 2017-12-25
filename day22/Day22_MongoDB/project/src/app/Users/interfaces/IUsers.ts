'use strict';
import { Document } from 'mongoose';

export interface IUsers extends Document {
    readonly _id: number;
    readonly Name: string;
    readonly Age: number;
}