import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersService } from 'src/Users/users.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Obtener el token de autenticación después de inicializar la aplicación
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'anselmo@gmail.com', password: 'Anselmo123*' });

    authToken = loginResponse.body['token']; // Asignar el token a la variable de clase
  });

  afterAll(async () => {
    await app.close(); // Cerrar la aplicación después de todas las pruebas
  });

  it('get /users', async () => {
    const req = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(req.status).toBe(HttpStatus.OK);
    expect(req.body).toBeInstanceOf(Array);
    console.log('token', authToken);
  });

  it('Get /users/:id', async () => {
    const userId = 'b8c12127-ad49-4504-adbc-366c06a89b20'; // Asegúrate de que este ID sea válido

    const req = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(req.status).toBe(HttpStatus.OK);
    expect(req.body).toBeInstanceOf(Object);
  });
});

