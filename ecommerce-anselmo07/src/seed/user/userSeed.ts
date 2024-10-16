import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/Users/users.entity';
import { Role } from 'src/Auth/roles.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersSeed {
    constructor(private dataSource: DataSource) {}

    async seed() {
        const userRepository = this.dataSource.getRepository(Users);

        const existingAdmin = await userRepository.findOneBy({ email: 'anselmo@gmail.com' });
        if (existingAdmin) {
        console.log('El usuario admin ya existe.');
        return;
        }

        const hashedPassword = await bcrypt.hash('Anselmo123*', 10);

        const adminUser = userRepository.create({
            name:"Admin",
            email:"anselmo@gmail.com",
            password: hashedPassword,
            phone: "12345",
            address: "5 de abril",
            country:"Brasil",
            city:"Sao Pablo",
            isAdmin: Role.Admin,
        });

        await userRepository.save(adminUser);
        console.log('Usuario admin creado exitosamente.');
    }
}
