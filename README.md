# epicloot
Projeto de um site de games

src/
│
├── application/
│   ├── controllers/
│   │   ├── CartController.ts
│   │   ├── PaymentController.ts
│   │   ├── ProductController.ts
│   │   ├── ReviewController.ts
│   │   ├── UserController.ts
│   │   └── index.ts
│   │
│   ├── use-cases/
│       ├── cart/
│       │   ├── CreateOrUpdateCartUseCase.ts
│       │   ├── GetCartByUserIdUseCase.ts
│       │   ├── RemoveItemFromCartUseCase.ts
│       │   └── index.ts
│       │
│       ├── payment/
│       │   ├── CreatePaymentUseCase.ts
│       │   ├── GetPaymentByIdUseCase.ts
│       │   ├── GetAllPaymentsUseCase.ts
│       │   ├── DeletePaymentUseCase.ts
│       │   └── index.ts
│       │
│       ├── product/
│       │   ├── CreateProductUseCase.ts
│       │   ├── GetProductByIdUseCase.ts
│       │   ├── GetAllProductsUseCase.ts
│       │   ├── UpdateProductUseCase.ts
│       │   ├── DeleteProductUseCase.ts
│       │   └── index.ts
│       │
│       ├── review/
│       │   ├── CreateReviewUseCase.ts
│       │   ├── GetReviewByIdUseCase.ts
│       │   ├── GetAllReviewsUseCase.ts
│       │   ├── UpdateReviewUseCase.ts
│       │   ├── DeleteReviewUseCase.ts
│       │   └── index.ts
│       │
│       ├── user/
│       │   ├── CreateUserUseCase.ts
│       │   ├── GetUserByIdUseCase.ts
│       │   ├── GetAllUsersUseCase.ts
│       │   ├── UpdateUserUseCase.ts
│       │   ├── DeleteUserUseCase.ts
│       │   └── index.ts
│
├── domain/
│   ├── entities/
│   │   ├── Cart.ts
│   │   ├── Payment.ts
│   │   ├── Product.ts
│   │   ├── Review.ts
│   │   ├── User.ts
│   │   └── index.ts
│   │
│   ├── repositories/
│       ├── CartRepository.ts
│       ├── PaymentRepository.ts
│       ├── ProductRepository.ts
│       ├── ReviewRepository.ts
│       ├── UserRepository.ts
│       └── index.ts
│
├── infrastructure/
│   ├── database/
│   │   ├── data-source.ts
│   │   └── migrations/
│   │       ├── ...
│   │
│   ├── repositories/
│       ├── TypeORMCartRepository.ts
│       ├── TypeORMPaymentRepository.ts
│       ├── TypeORMProductRepository.ts
│       ├── TypeORMReviewRepository.ts
│       ├── TypeORMUserRepository.ts
│       └── index.ts
│
├── interfaces/
│   ├── http/
│   │   ├── middleware/
│   │   │   ├── errors.ts
│   │   │   ├── validateSchema.ts
│   │   ├── routes/
│   │   │   ├── cartRoutes.ts
│   │   │   ├── paymentRoutes.ts
│   │   │   ├── productRoutes.ts
│   │   │   ├── reviewRoutes.ts
│   │   │   ├── userRoutes.ts
│   │   ├── schemas/
│   │   │   ├── cartSchemas.ts
│   │   │   ├── paymentSchemas.ts
│   │   │   ├── productSchemas.ts
│   │   │   ├── reviewSchemas.ts
│   │   │   ├── userSchemas.ts
│   │   ├── server.ts
│
├── main.ts

npm run typeorm migration:generate ./src/infrastructure/database/migrations/AddColumnIsAdminForUserEntity -- -d ./src/infrastructure/database/data-source.ts
npm run typeorm migration:run -- -d ./src/infrastructure/database/data-source.ts