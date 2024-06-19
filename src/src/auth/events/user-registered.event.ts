import { Injectable } from '@nestjs/common';
import {UserModel} from "../../users/user.entity";

@Injectable()
export class UserRegisteredEvent {
    constructor(public readonly user: UserModel) {}
}