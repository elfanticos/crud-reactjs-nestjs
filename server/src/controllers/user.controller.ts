import { Controller, Post, Req, Res, Body, HttpStatus, Get, Param, Put, Delete } from "@nestjs/common";
import { Response, Request } from "express";
import { UserService } from "src/services/user.service";
import { CreateUserDto } from "src/dto/create-user.dto";
import { LoginUserDto } from "src/dto/login-user.dto";
import { User } from "src/interfaces/user.interface";
import { EditUserDto } from "src/dto/edit-user.dto";

@Controller('user')
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        try {
            const user = await this._userService.create(createUserDto);
            res.status(HttpStatus.CREATED).send({...user, mesagge: 'Se Registro'});
        } catch (error) {
            console.log(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    }

    @Get('userList')
    async userList(@Res() res: Response) {
        try {
            const users: any = await this._userService.findAll();
            res.status(HttpStatus.OK).send(users);
        } catch (error) {
            console.log(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    }

    @Post('login')
    async login(@Body() dataLogin: LoginUserDto, @Res() res: Response) {
        try {
            if (!dataLogin.email || !dataLogin.password) {
                res.status(HttpStatus.BAD_REQUEST).send({msj: 'Hubo un error'});
                return;
            }
            const user: User = await this._userService.find(dataLogin);
            if (user === null) {
                res.status(HttpStatus.BAD_REQUEST).send({msj: 'Correo y/o contaseña incorrecta'});
                return;
            }
            res.status(HttpStatus.OK).send(user);
        } catch (error) {
            console.log(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    }

    @Get('searchUserId/:id')
    async searchUserId(@Param() param,  @Res() res: Response) {
        try {
            const user: User = await this._userService.findId(param.id);
            res.status(HttpStatus.OK).send(user);
        } catch (error) {
            console.log(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    }

    @Put('edit')
    async edit(@Body() editUser: EditUserDto, @Res() res: Response) {
        try {
            await this._userService.updateUser(editUser);
            res.status(HttpStatus.CREATED).send({mesagge: 'Se Actualizo'});
        } catch (error) {
            console.log(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    }

    @Delete('removeUser/:id')
    async removeUser(@Param() param,  @Res() res: Response) {
        try {
            const user: User = await this._userService.removeUser(param.id);
            res.status(HttpStatus.OK).send(user);
        } catch (error) {
            console.log(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    }
    

}