import logging
from bson import ObjectId
from faker import Faker
import random
from ..utils.helpers import generate_pk_phone, hash_password, random_date_this_year
from ..utils.config import Config
from datetime import datetime, timedelta

fake = Faker()

class ChefGenerator:
    def __init__(self):
        self.cities_data = Config.load_static_data('cities.json')['cities']
        self.cuisines = [
            "Pakistani", "Indian", "Chinese", "Fast Food", "BBQ", 
            "Italian", "Mediterranean", "Thai", "Japanese", "Continental"
        ]
        
    def generate(self, count: int = 50):
        chefs = []
        for _ in range(count):
            city = random.choice(self.cities_data)
            base_lat, base_lng = city["coords"]
            
            lat = base_lat + random.uniform(-city["radius"], city["radius"])
            lng = base_lng + random.uniform(-city["radius"], city["radius"])
            
            chef_id = ObjectId()
            
            chef = {
                "_id": chef_id,
                "name": fake.name(),
                "kitchenName": f"{fake.company()} Kitchen",
                "email": fake.email(),
                "password": hash_password("password123"),
                "address": {
                    "type": "Point",
                    "coordinates": [lng, lat],
                    "city": city["name"]
                },
                "phone": generate_pk_phone(),
                "description": fake.paragraph(),
                "image": f"https://picsum.photos/seed/{fake.uuid4()}/300/300",
                "featured": random.random() < 0.2,
                "role": "chef",
                "specialities": ", ".join(random.sample(self.cuisines, k=random.randint(2, 4))),
                "minOrder": random.randint(300, 1000),
                "deliveryTime": round(random.uniform(30, 90), 0),
                "rating": round(random.uniform(3.5, 5.0), 1),
                "createdAt": random_date_this_year(),
                "updatedAt": datetime.now()
            }
            # Log email and password
            logging.info(f"Generated chef: Email - {chef['email']}, Password - password123")
            chefs.append(chef)
        return chefs