# Documentação da API EpicLoot

## Endpoints

### Usuários

#### Criar Usuário

- **URL**: `/api/users`
- **Método**: `POST`
- **Descrição**: Cria um novo usuário.
- **Corpo da Requisição**:

  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "isAdmin": false
  }
  ```

- **Resposta de Sucesso**: `201 Created`

  ```json
  {
    "id": "uuid",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "isAdmin": false,
    "registeredAt": "2024-07-08T00:00:00.000Z",
    "carts": [],
    "payments": [],
    "meusItens": []
  }
  ```

#### Obter Usuário por ID

- **URL**: `/api/users/:id`
- **Método**: `GET`
- **Descrição**: Obtém um usuário pelo ID.
- **Resposta de Sucesso**: `200 OK`

  ```json
  {
    "id": "uuid",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "isAdmin": false,
    "registeredAt": "2024-07-08T00:00:00.000Z",
    "carts": [],
    "payments": [],
    "meusItens": []
  }
  ```

#### Obter Todos os Usuários

- **URL**: `/api/users`
- **Método**: `GET`
- **Descrição**: Obtém todos os usuários.
- **Resposta de Sucesso**: `200 OK`
  
  ```json
  [
    {
      "id": "uuid",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "isAdmin": false,
      "registeredAt": "2024-07-08T00:00:00.000Z",
      "carts": [],
      "payments": [],
      "meusItens": []
    }
  ]
  ```

#### Atualizar Usuário

- **URL**: `/api/users/:id`
- **Método**: `PATCH`
- **Descrição**: Atualiza parcialmente um usuário.
- **Corpo da Requisição**:
  
  ```json
  {
    "name": "John Doe Updated",
    "email": "john.updated@example.com"
  }
  ```
- **Resposta de Sucesso**: `200 OK`
  
  ```json
  {
    "id": "uuid",
    "name": "John Doe Updated",
    "email": "john.updated@example.com",
    "isAdmin": false,
    "registeredAt": "2024-07-08T00:00:00.000Z",
    "carts": [],
    "payments": [],
    "meusItens": []
  }
  ```

#### Deletar Usuário

- **URL**: `/api/users/:id`
- **Método**: `DELETE`
- **Descrição**: Deleta um usuário.
- **Resposta de Sucesso**: `204 No Content`

### Produtos

#### Criar Produto

- **URL**: `/api/products`
- **Método**: `POST`
- **Descrição**: Cria um novo produto.
- **Corpo da Requisição**:
  
  ```json
  {
    "name": "Epic Game",
    "description": "An epic game with amazing adventures",
    "price": 59.99,
    "categoryName": "Adventure"
  }
  ```
- **Resposta de Sucesso**: `201 Created`
  
  ```json
  {
    "id": "uuid",
    "name": "Epic Game",
    "description": "An epic game with amazing adventures",
    "price": 59.99,
    "category": {
      "id": "uuid",
      "name": "Adventure"
    }
  }
  ```

#### Obter Produto por ID

- **URL**: `/api/products/:id`
- **Método**: `GET`
- **Descrição**: Obtém um produto pelo ID.
- **Resposta de Sucesso**: `200 OK`
  
  ```json
  {
    "id": "uuid",
    "name": "Epic Game",
    "description": "An epic game with amazing adventures",
    "price": 59.99,
    "category": {
      "id": "uuid",
      "name": "Adventure"
    }
  }
  ```

#### Obter Todos os Produtos

- **URL**: `/api/products`
- **Método**: `GET`
- **Descrição**: Obtém todos os produtos.
- **Resposta de Sucesso**: `200 OK`
  
  ```json
  [
    {
      "id": "uuid",
      "name": "Epic Game",
      "description": "An epic game with amazing adventures",
      "price": 59.99,
      "category": {
        "id": "uuid",
        "name": "Adventure"
      }
    }
  ]
  ```

#### Atualizar Produto

- **URL**: `/api/products/:id`
- **Método**: `PATCH`
- **Descrição**: Atualiza parcialmente um produto.
- **Corpo da Requisição**:
  
  ```json
  {
    "name": "Epic Game Updated",
    "price": 49.99
  }
  ```
- **Resposta de Sucesso**: `200 OK`
  
  ```json
  {
    "id": "uuid",
    "name": "Epic Game Updated",
    "description": "An epic game with amazing adventures",
    "price": 49.99,
    "category": {
      "id": "uuid",
      "name": "Adventure"
    }
  }
  ```

#### Deletar Produto

- **URL**: `/api/products/:id`
- **Método**: `DELETE`
- **Descrição**: Deleta um produto.
- **Resposta de Sucesso**: `204 No Content`

### Avaliações

#### Criar Avaliação

- **URL**: `/api/reviews`
- **Método**: `POST`
- **Descrição**: Cria uma nova avaliação.
- **Corpo da Requisição**:
  
  ```json
  {
    "productId": "uuid-of-the-product",
    "userId": "uuid-of-the-user",
    "rating": 5,
    "comment": "Amazing game!"
  }
  ```
- **Resposta de Sucesso**: `201 Created`
  
  ```json
  {
    "id": "uuid",
    "productId": "uuid-of-the-product",
    "userId": "uuid-of-the-user",
    "rating": 5,
    "comment": "Amazing game!",
    "createdAt": "2024-07-08T00:00:00.000Z"
  }
  ```

#### Obter Avaliação por ID

- **URL**: `/api/reviews/:id`
- **Método**: `GET`
- **Descrição**: Obtém uma avaliação pelo ID.
- **Resposta de Sucesso**: `200 OK`
  
  ```json
  {
    "id": "uuid",
    "productId": "uuid-of-the-product",
    "userId": "uuid-of-the-user",
    "rating": 5,
    "comment": "Amazing game!",
    "createdAt": "2024-07-08T00:00:00.000Z"
  }
  ```

#### Obter Todas as Avaliações

- **URL**: `/api/reviews`
- **Método**: `GET`
- **Descrição**: Obtém todas as avaliações.
- **Resposta de Sucesso**: `200 OK`
  
  ```json
  [
    {
      "id": "uuid",
      "productId": "uuid-of-the-product",
      "userId": "uuid-of-the-user",
      "rating": 5,
      "comment": "Amazing game!",
      "createdAt": "2024-07-08T00:00:00.000Z"
    }
  ]
  ```

#### Atualizar Avaliação

- **URL**: `/api/reviews/:id`
- **Método**: `PATCH`
- **Descrição**: Atualiza parcialmente uma avaliação.
- **Corpo da Requisição**:
  
  ```json
  {
    "rating": 4,
    "comment": "Great game!"
  }
  ```
- **Resposta de Sucesso**: `200 OK`
  
  ```json
  {
    "id": "uuid",
    "productId": "uuid-of-the-product",
    "userId": "uuid-of-the-user",
    "rating": 4,
    "comment": "Great game!",
    "createdAt": "2024-07-08T00:00:00.000Z"
  }
  ```

#### Deletar Avaliação

- **URL**: `/api/reviews/:id`
- **Método**: `DELETE`
- **Descrição**: Deleta uma avaliação.
- **Resposta de Sucesso**: `204 No Content`

### Carrinhos

#### Criar ou Atualizar Carrinho

- **URL**: `/api/carts`
- **Método**: `POST`
- **Descrição**: Cria ou atualiza um carrinho.
- **Corpo da Requisição**:
  
  ```json
  {
    "userId": "uuid-of-the-user",
    "productIds": [
      "uuid-of-the-product-1",
      "uuid-of-the-product-2"
    ]
  }
  ```
- **Resposta de Sucesso**: `201 Created`
  
  ```json
  {
    "id": "uuid",
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "isAdmin": false,
      "registeredAt": "2024-07-08T00:00:00.000Z"
    },
    "items": [
      {
        "id": "uuid-of-the-product-1",
        "name": "Product 1",
        "description": "Description of product 1",
        "price": 10.00
      },
      {
        "id": "uuid-of-the-product-2",
        "name": "Product 2",
        "description": "Description of product 2",
        "price": 20.00
      }
    ],
    "createdAt": "2024-07-08T00:00:00.000Z"
  }
  ```

#### Obter Carrinho pelo ID do Usuário

- **URL**: `/api/carts/:userId`
- **Método**: `GET`
- **Descrição**: Obtém o carrinho pelo ID do usuário.
- **Resposta de Sucesso**: `200 OK`
  
  ```json
  {
    "id": "uuid",
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "isAdmin": false,
      "registeredAt": "2024-07-08T00:00:00.000Z"
    },
    "items": [
      {
        "id": "uuid-of-the-product-1",
        "name": "Product 1",
        "description": "Description of product 1",
        "price": 10.00
      },
      {
        "id": "uuid-of-the-product-2",
        "name": "Product 2",
        "description": "Description of product 2",
        "price": 20.00
      }
    ],
    "createdAt": "2024-07-08T00:00:00.000Z"
  }
  ```

#### Remover Item do Carrinho

- **URL**: `/api/carts/items`
- **Método**: `DELETE`
- **Descrição**: Remove um item do carrinho.
- **Corpo da Requisição**:
  
  ```json
  {
    "userId": "uuid-of-the-user",
    "productId": "uuid-of-the-product"
  }
  ```
- **Resposta de Sucesso**: `204 No Content`

### Pagamentos

#### Criar Pagamento

- **URL**: `/api/payments`
- **Método**: `POST`
- **Descrição**: Cria um novo pagamento.
- **Corpo da Requisição**:
  
  ```json
  {
    "userId": "uuid-of-the-user",
    "type": "Credit Card",
    "amount": 100.00
  }
  ```
- **Resposta de Sucesso**: `201 Created`
  
  ```json
  {
    "id": "uuid",
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "isAdmin": false,
      "registeredAt": "2024-07-08T00:00:00.000Z"
    },
    "items": [
      {
        "id": "uuid-of-the-product-1",
        "name": "Product 1",
        "description": "Description of product 1",
        "price": 10.00
      },
      {
        "id": "uuid-of-the-product-2",
        "name": "Product 2",
        "description": "Description of product 2",
        "price": 20.00
      }
    ],
    "type": "Credit Card",
    "date": "2024-07-08T00:00:00.000Z",
    "amount": 100.00
  }
  ```

#### Obter Pagamento por ID

- **URL**: `/api/payments/:id`
- **Método**: `GET`
- **Descrição**: Obtém um pagamento pelo ID.
- **Resposta de Sucesso**: `200 OK`
  
  ```json
  {
    "id": "uuid",
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "isAdmin": false,
      "registeredAt": "2024-07-08T00:00:00.000Z"
    },
    "items": [
      {
        "id": "uuid-of-the-product-1",
        "name": "Product 1",
        "description": "Description of product 1",
        "price": 10.00
      },
      {
        "id": "uuid-of-the-product-2",
        "name": "Product 2",
        "description": "Description of product 2",
        "price": 20.00
      }
    ],
    "type": "Credit Card",
    "date": "2024-07-08T00:00:00.000Z",
    "amount": 100.00
  }
  ```

#### Obter Todos os Pagamentos

- **URL**: `/api/payments`
- **Método**: `GET`
- **Descrição**: Obtém todos os pagamentos.
- **Resposta de Sucesso**: `200 OK`
  
  ```json
  [
    {
      "id": "uuid",
      "user": {
        "id": "uuid",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "isAdmin": false,
        "registeredAt": "2024-07-08T00:00:00.000Z"
      },
      "items": [
        {
          "id": "uuid-of-the-product-1",
          "name": "Product 1",
          "description": "Description of product 1",
          "price": 10.00
        },
        {
          "id": "uuid-of-the-product-2",
          "name": "Product 2",
          "description": "Description of product 2",
          "price": 20.00
        }
      ],
      "type": "Credit Card",
      "date": "2024-07-08T00:00:00.000Z",
      "amount": 100.00
    }
  ]
  ```

#### Deletar Pagamento

- **URL**: `/api/payments/:id`
- **Método**: `DELETE`
- **Descrição**: Deleta um pagamento.
- **Resposta de Sucesso**: `204 No Content`

---

## Estrutura do Projeto

A estrutura do projeto segue os princípios da Clean Architecture, mantendo a separação de responsabilidades e facilitando a manutenção e escalabilidade do código.

```
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
```