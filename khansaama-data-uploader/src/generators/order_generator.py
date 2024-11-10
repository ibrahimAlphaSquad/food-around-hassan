import logging
from bson import ObjectId
from faker import Faker
import random
from datetime import datetime, timedelta
from ..utils.config import Config

fake = Faker()

class OrderGenerator:
    def __init__(self, customer_ids, food_ids, chef_ids):
        self.customer_ids = customer_ids
        self.food_ids = food_ids
        self.chef_ids = chef_ids
        self.statuses = ["PLACED", "ONGOING", "SHIPPED", "COMPLETE", "CANCELLED"]
        self.payment_types = ["CARD", "COD"]
        self.card_brands = ["Visa", "Mastercard", "American Express"]

    def generate_order_items(self, count: int = None):
        if count is None:
            count = random.randint(1, 4)
            
        items = []
        chef_id = random.choice(self.chef_ids)
        total_amount = 0
        
        for _ in range(count):
            quantity = random.randint(1, 3)
            price = round(random.uniform(200, 1500), -1)  # Round to nearest 10
            total = quantity * price
            total_amount += total
            
            items.append({
                "itemId": random.choice(self.food_ids),
                "itemName": fake.word().capitalize() + " Special",
                "itemQuantity": quantity,
                "itemSeller": chef_id,
                "itemSellerName": fake.name(),
                "itemUnitPrice": price,
                "itemTotalPrice": total
            })
            
        return items, chef_id, total_amount

    def generate_payment_info(self, amount, payment_type):
        payment_info = {
            "amount": amount,
            "paymentType": payment_type,
            "paymentStatus": "COMPLETE" if payment_type == "CARD" else "PENDING"
        }
        
        if payment_type == "CARD":
            card_brand = random.choice(self.card_brands)
            payment_info.update({
                "paymentReceipt": fake.uuid4(),
                "stripePaymentId": f"pi_{fake.uuid4()}",
                "paymentCard": {
                    "brand": card_brand,
                    "last4": ''.join(random.choices('0123456789', k=4)),
                    "exp_year": random.randint(2024, 2030),
                    "exp_month": random.randint(1, 12)
                }
            })
            
        return payment_info

    def generate(self, count: int = 300):
        orders = []
        for _ in range(count):
            # Generate random date within last 6 months
            order_date = datetime.now() - timedelta(days=random.randint(0, 180))
            
            # Generate order items and calculate total
            items, chef_id, total_amount = self.generate_order_items()
            
            # Determine order status based on date
            if (datetime.now() - order_date).days < 2:
                status = random.choice(["PLACED", "ONGOING", "SHIPPED"])
            else:
                status = random.choice(["COMPLETE", "CANCELLED"])
            
            payment_type = random.choice(self.payment_types)
            
            order = {
                "_id": ObjectId(),
                "itemsOrdered": items,
                "orderedBy": random.choice(self.customer_ids),
                "customerName": fake.name(),
                "createdBy": [chef_id],
                "chefNames": [fake.name()],
                "orderDate": order_date,
                "status": status,
                "paymentInfo": self.generate_payment_info(total_amount, payment_type),
                "deliveryAddress": {
                    "street": fake.street_address(),
                    "city": random.choice(Config.load_static_data('cities.json')['cities'])['name'],
                    "details": fake.sentence()
                },
                "deliveryTime": None if status in ["PLACED", "ONGOING"] else order_date + timedelta(hours=random.randint(1, 3)),
                "specialInstructions": fake.sentence() if random.random() < 0.3 else None,
                "createdAt": order_date,
                "updatedAt": order_date + timedelta(minutes=random.randint(1, 180))
            }
            logging.info(f"Generated order: ID - {order['_id']}, Status - {status}, Payment Type - {payment_type}")
            orders.append(order)
            
        return orders