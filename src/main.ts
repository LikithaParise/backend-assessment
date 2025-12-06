import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 API Documentation:`);
  console.log(`   - POST   /auth/register - Register new user`);
  console.log(`   - POST   /auth/login    - Login user`);
  console.log(`   - GET    /users         - Get all users (Protected)`);
  console.log(`   - GET    /users/:id     - Get user by ID (Protected)`);
  console.log(`   - PATCH  /users/:id     - Update user (Protected)`);
  console.log(`   - DELETE /users/:id     - Delete user (Protected)`);
  console.log(`   - GET    /tasks         - Get all tasks (Protected)`);
  console.log(`   - POST   /tasks         - Create task (Protected)`);
  console.log(`   - GET    /tasks/:id     - Get task by ID (Protected)`);
  console.log(`   - PATCH  /tasks/:id     - Update task (Protected)`);
  console.log(`   - DELETE /tasks/:id     - Delete task (Protected)`);
}
bootstrap();
