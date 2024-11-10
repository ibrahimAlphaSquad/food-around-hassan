import logging
from bson import ObjectId
from faker import Faker
import random
from datetime import datetime, timedelta

fake = Faker()

class ReviewGenerator:
    def __init__(self, food_ids, customer_ids, chef_ids):
        self.food_ids = food_ids
        self.customer_ids = customer_ids
        self.chef_ids = chef_ids
        self.review_templates = [
            "The {food} was {adjective}! {comment}",
            "Really {adjective} experience. {comment}",
            "I {sentiment} this {food}. {comment}",
            "{comment} Will {return_statement}.",
        ]
        self.adjectives = ['amazing', 'delicious', 'fantastic', 'great', 'excellent', 'outstanding']
        self.sentiments = ['loved', 'enjoyed', 'liked']
        self.comments = [
            "Great portion size and value for money.",
            "The taste was authentic and flavorful.",
            "Delivery was quick and food was still hot.",
            "Fresh ingredients and well prepared.",
            "Perfect spice level and seasoning."
        ]
        self.return_statements = [
            "definitely order again",
            "recommend to others",
            "be back for more",
            "make this my regular choice"
        ]

    def generate_review_text(self):
        template = random.choice(self.review_templates)
        return template.format(
            food=fake.word().capitalize(),
            adjective=random.choice(self.adjectives),
            sentiment=random.choice(self.sentiments),
            comment=random.choice(self.comments),
            return_statement=random.choice(self.return_statements)
        )

    def generate(self, count: int = 400):
        reviews = []
        for _ in range(count):
            # Generate review date within last 3 months
            review_date = datetime.now() - timedelta(days=random.randint(0, 90))
            
            # Higher chance of positive reviews
            rating_weights = [0.05, 0.1, 0.15, 0.3, 0.4]  # Weights for ratings 1-5
            rating = random.choices(range(1, 6), weights=rating_weights)[0]
            
            review = {
                "_id": ObjectId(),
                "foodRated": random.choice(self.food_ids),
                "reviewer": random.choice(self.customer_ids),
                "reviewText": self.generate_review_text(),
                "reviewStars": rating,
                "likes": random.randint(0, 50) if rating > 3 else random.randint(0, 5),
                "images": [
                    f"https://picsum.photos/seed/{fake.uuid4()}/400/300"
                    for _ in range(random.randint(0, 3))
                ] if random.random() < 0.3 else [],  # 30% chance of having images
                "isVerifiedPurchase": random.random() < 0.8,  # 80% verified purchases
                "createdAt": review_date,
                "updatedAt": review_date + timedelta(minutes=random.randint(0, 60))
            }
            logging.info(f"Generated review for food {review['foodRated']}: Rating - {review['reviewStars']}, Reviewer - {review['reviewer']}")
            reviews.append(review)
        return reviews