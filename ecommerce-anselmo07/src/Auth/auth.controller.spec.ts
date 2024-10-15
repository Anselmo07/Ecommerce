import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../DTO/CreateUserDto";
import { UsersRepository } from "../Users/users.repository";
import { hash } from "bcrypt";
import { Users } from "../Users/users.entity";
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "../DTO/LoginUserDto";
import { Role } from "./roles.enum";
describe ('AuthController', () => {
    let controller: AuthController;
    let authService:Partial<AuthService>;

    const mockSingUp: CreateUserDto = {
        name:'Juan',
        email:'Juanceto@gmail.com',
        password: 'Aa12345*',
        phone: '12345',
        address: '2 de abril',
        country:'Brasil',
        city:'Sao Pablo', 
    };

    const mockSingIn: LoginUserDto = {
        email:'Juanceto@gmail.com',
        password: 'Aa12345*',
        isAdmin: 'user',
    };

    beforeEach(async () => {
        authService = {
            signUp: jest.fn().mockResolvedValue(new CreateUserDto ()),  // Aquí mockeas el método signUp
            singIn: jest.fn().mockResolvedValue({
                email: mockSingIn.email,
                password: mockSingIn.password,
                token: 'mockJwtToken',
            }),
        };
        const hashedPassword = await hash('123456', 10);
        const mockUsersRepository : Partial<UsersRepository> = {
            findByEmail:( email : string)=> {
                if (email === 'Juanceto@gmail.com'){
                    return Promise.resolve({
                    email: 'Juanceto@gmail.com',
                    password: 'Aa12345*',
                    isAdmin: 'admin',
                    }as Users)
                }else{
                    return Promise.resolve(undefined);
                }
        },
            createUsers:(user):Promise<Users> => Promise.resolve({
                ...user,
                isAdmin: Role.User,
                id: '1234fs-234sd-25csfd-34sdfg',
                password: 'hashedPassword',
            }),
        }
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers:[
                { provide: AuthService, useValue: authService},
                {provide: JwtService, useValue: {signAsync: () => Promise.resolve('mockJwtToken')}},
                {provide: UsersRepository, useValue: mockUsersRepository},
            ]
        }).compile();
        controller = module.get<AuthController>(AuthController);
    });

    it('Create an instance of AuthService', async () =>{
        expect(controller).toBeDefined();
    });

    it("SingUp() should return a new UserResponseDto and create User", async () => {
        const user = await controller.signUp(mockSingUp)
        expect(user).toBeDefined();
        expect(user).toBeInstanceOf(CreateUserDto);
    });

    it("SingIn() return que el user este logiado", async () => {
        const user = await controller.singIn(mockSingIn);
        expect(user).toBeDefined();
        expect(user).toHaveProperty('token')
    });
});