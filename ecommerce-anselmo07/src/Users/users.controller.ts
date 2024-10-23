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
import { ApiBearerAuth, ApiBody, ApiTags, PartialType } from "@nestjs/swagger";
import { UserUpdateDto } from "src/DTO/UserUpdateDto";

@ApiTags('Users')
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService, private readonly cloudinaryService: CloudinaryService ){}
    
    @ApiBearerAuth()
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

    @ApiBearerAuth()
    @Put(':id')
    @UseGuards(AuthGuard)
    updateUsers(@Param('id', UUIDValidationPipe)id: string , @Body() user: UserUpdateDto):Promise<Users>{
        return this.usersService.updateUsers(String(id), user);
    }

    @ApiBearerAuth()
    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteUsers(@Param('id', UUIDValidationPipe) id: string){
        return this.usersService.deleteUsersById(id);
    }

}