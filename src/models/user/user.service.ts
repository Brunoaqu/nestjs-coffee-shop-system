import { User, UserDocument } from './../../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashService } from 'src/common/services/hash/hash.service';


@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private hashService: HashService) {}

    async getUserByUsername(username: string) {
      return  this.userModel.findOne({ username }).exec();
    }

    async registerUser(createUserDto: CreateUserDto) {
        // validate DTO

        const createUser = new this.userModel(createUserDto);
        // check if user exists
        const user = await this.getUserByUsername(createUser.username);
        if(user) {
            throw new BadRequestException();
        }
        // Hash Password
        createUser.password = await this.hashService.hashPassword(createUser.password); 

        return createUser.save();
    }
}
