# epicloot
Projeto de um site de games


src/
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
│   │   ├── ProductRepository.ts
│   │   ├── OrderRepository.ts
│   │   ├── CartRepository.ts
│   │   ├── CartItemRepository.ts
│   │   ├── PaymentRepository.ts
│   │   ├── CategoryRepository.ts
│   │   └── ReviewRepository.ts
│   └── services/
│       ├── UserService.ts
│       ├── ProductService.ts
│       ├── OrderService.ts
│       ├── CartService.ts
│       ├── PaymentService.ts
│       ├── CategoryService.ts
│       └── ReviewService.ts
├── infrastructure/
│   ├── database/
│   │   ├── data-source.ts
│   │   └── migrations/
│   ├── orm/
│   │   ├── UserORM.ts
│   │   ├── ProductORM.ts
│   │   ├── OrderORM.ts
│   │   ├── CartORM.ts
│   │   ├── CartItemORM.ts
│   │   ├── PaymentORM.ts
│   │   ├── CategoryORM.ts
│   │   └── ReviewORM.ts
│   └── repositories/
│       ├── TypeORMUserRepository.ts
│       ├── TypeORMProductRepository.ts
│       ├── TypeORMOrderRepository.ts
│       ├── TypeORMCartRepository.ts
│       ├── TypeORMCartItemRepository.ts
│       ├── TypeORMPaymentRepository.ts
│       ├── TypeORMCategoryRepository.ts
│       └── TypeORMReviewRepository.ts
├── application/
│   ├── dtos/
│   ├── use-cases/
│   │   ├── CreateUser.ts
│   │   ├── CreateProduct.ts
│   │   ├── CreateOrder.ts
│   │   ├── AddToCart.ts
│   │   ├── ProcessPayment.ts
│   │   └── CreateReview.ts
│   └── controllers/
│       ├── UserController.ts
│       ├── ProductController.ts
│       ├── OrderController.ts
│       ├── CartController.ts
│       ├── PaymentController.ts
│       └── ReviewController.ts
├── interfaces/
│   ├── http/
│   │   ├── routes/
│   │   │   ├── userRoutes.ts
│   │   ├── middleware/
│   │   │   └── errors.ts
│   │   └── server.ts
└── main.ts
