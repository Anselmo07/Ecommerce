import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, Query, HttpStatus } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "src/Auth/auth.guard";
import { Users } from "./users.entity";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    getUsers(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 5
    ): Promise<Users[]> {
        return this.usersService.getUsers(page, limit);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    getUsersById(@Param('id') id: string){
        return this.usersService.getUsersById(String(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createUsers(@Body() user: Users): Promise<Users>{
        return this.usersService.createUsers(user);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    updateUsers(@Param('id')id: string , @Body() user: Users){
        return this.usersService.updateUsers(Number(id), user);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteUsers(@Param('id') id: string){
        return this.usersService.deleteUsersById(Number(id));
    }
}