import logging
from bson import ObjectId
from faker import Faker
import random
from datetime import datetime, timedelta
from ..utils.config import Config

fake = Faker()

class FoodGenerator:
    def __init__(self, chef_ids):
        self.chef_ids = chef_ids
        self.food_data = Config.load_static_data('food_items.json')
        self.food_ids = []  # Store generated food IDs

    def generate(self, count: int = 200):
        foods = []
        for _ in range(count):
            food_id = ObjectId()
            self.food_ids.append(food_id)
            
            # Randomly select food category and item
            category = random.choice(list(self.food_data['pakistani_foods'].keys()))
            base_name = random.choice(self.food_data['pakistani_foods'][category])
            price_range = self.food_data['price_ranges'][category]
            
            chef_id = random.choice(self.chef_ids)
            
            food = {
                "_id": food_id,
                "name": f"{random.choice(['Special', 'Classic', 'Premium', 'Deluxe'])} {base_name}",
                "description": fake.paragraph(),
                "price": round(random.uniform(price_range['min'], price_range['max']), -1),  # Round to nearest 10
                "chef": chef_id,
                "chefName": fake.name(),
                "category": category,
                "featured": random.random() < 0.1,
                "image": f"https://picsum.photos/seed/{fake.uuid4()}/400/300",
                "rating": round(random.uniform(3.5, 5.0), 1),
                "totalOrders": random.randint(0, 1000),
                "isAvailable": random.random() < 0.9,  # 90% chance of being available
                "preparationTime": random.randint(15, 45),  # minutes
                "createdAt": fake.date_time_this_year(),
                "updatedAt": fake.date_time_this_month()
            }
            logging.info(f"Generated food item: {food['name']} by Chef {food['chef']}, Id: {food['_id']}")
            foods.append(food)
        return foods