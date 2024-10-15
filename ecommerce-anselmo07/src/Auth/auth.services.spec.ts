import { Test } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { JwtService } from "@nestjs/jwt"
import { UsersService } from "../Users/users.service"
import { CreateUserDto } from "../DTO/CreateUserDto"
import { Users } from "../Users/users.entity"
import { UsersRepository } from "../Users/users.repository"
import { Role } from "./roles.enum"

describe('authService', () => {
    let authService : AuthService;
    let mockUsersService: Partial<UsersService>;
    let mockUsersRepository :Partial<UsersRepository>;
    const mockUser: CreateUserDto = {
        name:'Juan',
        email:'Juanceto@gmail.com',
        password: 'Aa12345*',
        phone: '12345',
        address: '2 de abril',
        country:'Brasil',
        city:'Sao Pablo',

    };
    beforeEach(async () => {
        mockUsersRepository = {
            findByEmail: () => Promise.resolve(undefined),
            createUsers:(user):Promise<Users> => Promise.resolve({
                ...user,
                isAdmin: Role.User,
                id: '1234fs-234sd-25csfd-34sdfg',
                password: 'hashedPassword',
            }),
        };
    
        const module = await Test.createTestingModule({
            providers:[AuthService, JwtService,
            {
                provide: UsersRepository, // Aquí proporcionas el mock de UsersRepository
                useValue: mockUsersRepository,
            },
            {
                provide: UsersService, // Proveemos el mock de UsersService
                useValue: mockUsersService,
            }
        ],
        }).compile();
        authService = module.get<AuthService>(AuthService);
    })
    
    it('Create an instance of AuthService', async () => {
        expect(authService).toBeDefined();
    })

    it('signUp() create a new user', async() => {
        const user = await authService.signUp(mockUser);
        expect(user).toBeDefined();
        expect(user.password).not.toEqual(mockUser.password);
        expect(user.email).toEqual(mockUser.email);
    });

    it('singUp() ya existe este usuario', async() => {
        mockUsersRepository.findByEmail = (email:string) => Promise.resolve(mockUser as Users);
        try{
            await authService.signUp(mockUser as Users);
        }catch(error){
            expect(error.message).toEqual('Email already exist');
        }
    });

    it('singIn() password invalid', async() => {
        mockUsersRepository.findByEmail = (email: string) => Promise.resolve(mockUser as Users);
        try{
            await authService.singIn(mockUser.email, 'Email already no exist');
        }catch(error){
            expect(error.message).toEqual('Invalid password');
        }
    });

    it('signIn() DEVUELVE un error si no se encuentran los usuarios', async() => {
        try{
            await authService.singIn(mockUser.email, mockUser.password);
        }catch(error){
            expect(error.message).toEqual('Email already no exist');
        }    
    });
});
