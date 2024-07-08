# epicloot
Projeto de um site de games

src/
├── application/
│   ├── controllers/
│   │   ├── UserController.ts
│   │   └── ProductController.ts
│   ├── use-cases/
│   │   ├── user/
│   │   │   ├── CreateUserUseCase.ts
│   │   │   ├── GetUserByIdUseCase.ts
│   │   │   ├── UpdateUserUseCase.ts
│   │   │   ├── DeleteUserUseCase.ts
│   │   │   └── AuthenticateUserUseCase.ts
│   │   └── product/
│   │       ├── CreateProductUseCase.ts
│   │       ├── GetProductByIdUseCase.ts
│   │       ├── GetAllProductsUseCase.ts
│   │       ├── UpdateProductUseCase.ts
│   │       └── DeleteProductUseCase.ts
├── domain/
│   ├── entities/
│   │   ├── User.ts
│   │   ├── Product.ts
│   │   ├── Order.ts
│   │   ├── Cart.ts
│   │   ├── CartItem.ts
│   │   ├── Payment.ts
│   │   ├── Category.ts
│   │   └── Review.ts
│   ├── repositories/
│   │   ├── UserRepository.ts
│   │   └── ProductRepository.ts
├── infrastructure/
│   ├── database/
│   │   ├── data-source.ts
│   │   └── migrations/
│   └── repositories/
│       ├── TypeORMUserRepository.ts
│       └── TypeORMProductRepository.ts
├── interfaces/
│   ├── http/
│   │   ├── routes/
│   │   │   ├── userRoutes.ts
│   │   │   └── productRoutes.ts
│   │   ├── middleware/
│   │   │   ├── errors.ts
│   │   │   └── validateSchema.ts
│   │   └── schemas/
│   │       ├── userSchemas.ts
│   │       └── productSchemas.ts
└── main.ts

npm run typeorm migration:generate ./src/infrastructure/database/migrations/AddColumnIsAdminForUserEntity -- -d ./src/infrastructure/database/data-source.ts
npm run typeorm migration:run -- -d ./src/infrastructure/database/data-source.ts