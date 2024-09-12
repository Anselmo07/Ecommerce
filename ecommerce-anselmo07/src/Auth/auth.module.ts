import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "src/Users/users.module";
import { AuthGuard } from "./auth.guard";

@Module({
    imports: [forwardRef(() =>UsersModule)],
    providers: [AuthService, AuthGuard],
    controllers: [AuthController],
    exports:[AuthService],
})
export class AuthModule{}