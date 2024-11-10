import logging
from bson import ObjectId
from faker import Faker
import random
from ..utils.helpers import generate_pk_phone, hash_password, random_date_this_year
from ..utils.config import Config
from datetime import datetime, timedelta

fake = Faker()

class CustomerGenerator:
    def __init__(self, food_ids=None, chef_ids=None):
        self.cities_data = Config.load_static_data('cities.json')['cities']
        self.food_ids = food_ids or []
        self.chef_ids = chef_ids or []
        self.customer_ids = []

    def generate(self, count: int = 100):
        customers = []
        for _ in range(count):
            customer_id = ObjectId()
            self.customer_ids.append(customer_id)
            
            city = random.choice(self.cities_data)
            base_lat, base_lng = city["coords"]
            
            # Add small random variation to coordinates
            lat = base_lat + random.uniform(-city["radius"], city["radius"])
            lng = base_lng + random.uniform(-city["radius"], city["radius"])
            
            customer = {
                "_id": customer_id,
                "name": fake.name(),
                "email": fake.email(),
                "password": hash_password("password123"),
                "address": {
                    "type": "Point",
                    "coordinates": [lng, lat],
                    "city": city["name"],
                    "street": fake.street_address(),
                    "details": fake.sentence(nb_words=6)
                },
                "phone": generate_pk_phone(),
                "image": f"https://picsum.photos/seed/{fake.uuid4()}/300/300",
                "favoriteFood": random.sample(self.food_ids, min(random.randint(0, 5), len(self.food_ids))),
                "favoriteChef": random.sample(self.chef_ids, min(random.randint(0, 3), len(self.chef_ids))),
                "role": "customer",
                "orderCount": random.randint(0, 20),
                "totalSpent": round(random.uniform(1000, 50000), -1),  # Round to nearest 10
                "createdAt": random_date_this_year(),
                "updatedAt": datetime.now()
            }
            # Log email and password
            logging.info(f"Generated customer: Email - {customer['email']}, Password - password123, ID - {customer_id}")
            customers.append(customer)
        return customers