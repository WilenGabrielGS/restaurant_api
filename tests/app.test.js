// tests/app.test.js

const request = require('supertest');
const app = require('../src/app');

describe('Customer Routes', () => {
  it('should create a new customer', async () => {
    const response = await request(app).post('/customer').send({
      name: "John Doe",
      email: `john${Date.now()}@example.com`,
      phone: "123456789"
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.createdCustomer).toHaveProperty('id');
  });
});

describe('Menu Routes', () => {
  it('should create a new menu item', async () => {
    const response = await request(app).post('/menu').send({
      name: "Pasta",
      description: "Delicious pasta",
      price: 15.5,
      category: "main_course"
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should list menu items', async () => {
    const response = await request(app).get('/menu');
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toBeInstanceOf(Array);
  });
});

describe('Order Routes', () => {
  let customerId;
  let menuItemId;
  let orderId;

  beforeAll(async () => {
    // Create customer
    const customer = await request(app).post('/customer').send({
      name: "Test User",
      email: `test${Date.now()}@mail.com`,
      phone: "987654321"
    });
    customerId = customer.body.createdCustomer.id;

    // Create menu item
    const menuItem = await request(app).post('/menu').send({
      name: "Burger",
      description: "Tasty burger",
      price: 10.0,
      category: "main_course"
    });
    menuItemId = menuItem.body.id;
  });

  it('should place a new order', async () => {
    const response = await request(app).post('/order').send({
      customer_id: customerId,
      items: [{ item_id: menuItemId, quantity: 2 }]
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
    orderId = response.body.id;
  });

  it('should list customer orders with pagination', async () => {
    const response = await request(app).get(`/customer/orders/${customerId}?page=1&limit=10`);
    expect(response.statusCode).toBe(200);
    expect(response.body.orders).toBeInstanceOf(Array);
  });

  it('should update the status of an order', async () => {
    const response = await request(app).patch(`/order/${orderId}`).send({
      new_status: "preparing"
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.order.status).toBe("preparing");
  });

  it('should modify an order when it is pending or preparing', async () => {
    const response = await request(app).patch(`/order/modify/${orderId}`).send({
      items: [{ item_id: menuItemId, quantity: 3 }]
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.order.items[0].quantity).toBe(3);
  });
});
