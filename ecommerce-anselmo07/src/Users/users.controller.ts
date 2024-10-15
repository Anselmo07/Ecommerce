import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, Query, HttpStatus, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UsePipes, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "src/Auth/auth.guard";
import { Users } from "./users.entity";
import { CreateUserDto } from "src/DTO/CreateUserDto";
import { UUIDValidationPipe } from "src/validator/uuid-validation.pipe";
import { CloudinaryService } from "src/Cloudinary/cloudinary.service";
import { MaxSizeValidatorPipe } from "src/validator/max-size-validator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/Auth/roles.enum";
import { RolesGuard } from "src/Auth/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags('Users')
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService, private readonly cloudinaryService: CloudinaryService ){}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    getUsers(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 5
    ): Promise<Users[]> {
        return this.usersService.getUsers();
    }

    @ApiBearerAuth()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    getUsersById(@Param('id', UUIDValidationPipe)id: string ,@Req() request:Request & {user:any}){
        return this.usersService.getUsersById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createUsers(@Body() user: CreateUserDto ): Promise<Users>{
        return this.usersService.createUsers(user);
    }

    @ApiBearerAuth()
    @Put(':id')
    @UseGuards(AuthGuard)
    updateUsers(@Param('id', UUIDValidationPipe)id: string , @Body() user: Partial<CreateUserDto>):Promise<Users>{
        return this.usersService.updateUsers(String(id), user);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteUsers(@Param('id', UUIDValidationPipe) id: string){
        return this.usersService.deleteUsersById(id);
    }

    
}