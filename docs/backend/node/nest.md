# NestJS 框架

## 基础使用

### 安装与配置

```bash
# 安装 NestJS CLI
npm i -g @nestjs/cli

# 创建新项目
nest new project-name

# 启动开发服务器
npm run start:dev
```

### 项目结构

```
src/
├── app.controller.ts    # 基础控制器
├── app.module.ts        # 根模块
├── app.service.ts       # 基础服务
└── main.ts             # 应用入口
```

## 模块

### 创建模块

```typescript
// cats/cats.module.ts
import { Module } from "@nestjs/common";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
```

### 模块依赖

```typescript
// app.module.ts
import { Module } from "@nestjs/common";
import { CatsModule } from "./cats/cats.module";

@Module({
  imports: [CatsModule],
})
export class AppModule {}
```

## 控制器

### 基本控制器

```typescript
// cats/cats.controller.ts
import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";

@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.catsService.findOne(id);
  }
}
```

### 请求处理

```typescript
@Controller("cats")
export class CatsController {
  // 查询参数
  @Get()
  findAll(@Query() query: any) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  // 请求体
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  // 路由参数
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.catsService.findOne(id);
  }

  // 响应状态码
  @Post()
  @HttpCode(204)
  create() {
    return "This action adds a new cat";
  }
}
```

## 服务

### 创建服务

```typescript
// cats/cats.service.ts
import { Injectable } from "@nestjs/common";
import { CreateCatDto } from "./dto/create-cat.dto";

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: CreateCatDto) {
    this.cats.push(cat);
    return cat;
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: string): Cat {
    return this.cats.find((cat) => cat.id === id);
  }
}
```

### 依赖注入

```typescript
@Injectable()
export class CatsService {
  constructor(
    @Inject("CONNECTION") private connection: Connection,
    private readonly configService: ConfigService
  ) {}
}
```

## 中间件

### 创建中间件

```typescript
// logger.middleware.ts
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Request...");
    next();
  }
}
```

### 使用中间件

```typescript
// app.module.ts
import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { LoggerMiddleware } from "./common/middleware/logger.middleware";

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("cats");
  }
}
```

## 异常处理

### 创建异常过滤器

```typescript
// http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```

### 使用异常过滤器

```typescript
@Post()
@UseFilters(HttpExceptionFilter)
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}
```

## 管道

### 创建管道

```typescript
// validation.pipe.ts
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException("Value is required");
    }
    return value;
  }
}
```

### 使用管道

```typescript
@Post()
@UsePipes(ValidationPipe)
async create(@Body() createCatDto: CreateCatDto) {
  return this.catsService.create(createCatDto);
}
```

## 守卫

### 创建守卫

```typescript
// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
```

### 使用守卫

```typescript
@UseGuards(RolesGuard)
@Controller("cats")
export class CatsController {}
```

## 拦截器

### 创建拦截器

```typescript
// logging.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log("Before...");

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
```

### 使用拦截器

```typescript
@UseInterceptors(LoggingInterceptor)
@Controller("cats")
export class CatsController {}
```

## 数据库集成

### TypeORM 配置

```typescript
// app.module.ts
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "test",
      entities: [Cat],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
```

### 实体定义

```typescript
// cat.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;
}
```

## 最佳实践

1. 项目结构

   ```
   src/
   ├── config/          # 配置文件
   ├── controllers/     # 控制器
   ├── services/        # 服务
   ├── entities/        # 实体
   ├── dto/            # 数据传输对象
   ├── interfaces/      # 接口
   ├── middleware/      # 中间件
   ├── filters/         # 异常过滤器
   ├── pipes/           # 管道
   ├── guards/          # 守卫
   ├── interceptors/    # 拦截器
   └── utils/           # 工具函数
   ```

2. 错误处理

   - 使用全局异常过滤器
   - 实现自定义异常
   - 记录错误日志

3. 性能优化

   - 使用缓存
   - 优化数据库查询
   - 实现请求限流

4. 安全措施
   - 实现认证和授权
   - 使用 HTTPS
   - 防止 XSS 和 CSRF 攻击
   - 输入验证和清理
