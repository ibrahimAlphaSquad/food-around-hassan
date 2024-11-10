import pymongo
import time
from ..utils.config import Config

class MongoDBUploader:
    def __init__(self):
        self.client = pymongo.MongoClient(Config.MONGODB_URI)
        self.db = self.client[Config.DB_NAME]
        
    def create_indexes(self):
        # Chefs indexes
        self.db.chefs.create_index([("address", "2dsphere")])
        self.db.chefs.create_index("email", unique=True)
        
        # Customers indexes
        self.db.customers.create_index([("address", "2dsphere")])
        self.db.customers.create_index("email", unique=True)
        
        # Foods indexes
        self.db.foods.create_index([("name", "text"), ("description", "text")])
        self.db.foods.create_index("chef")
        
        # Orders indexes
        self.db.orders.create_index("orderedBy")
        self.db.orders.create_index("createdBy")
        self.db.orders.create_index([("orderDate", -1)])
        
        # Reviews indexes
        self.db.reviews.create_index("foodRated")
        self.db.reviews.create_index([("createdAt", -1)])

    def upload_data(self, collection_name: str, data: list):
        collection = self.db[collection_name]
        collection.drop()
        
        batch_size = Config.BATCH_SIZE
        total_documents = len(data)
        
        for i in range(0, total_documents, batch_size):
            batch = data[i:i + batch_size]
            collection.insert_many(batch)
            print(f"Uploaded {min(i + batch_size, total_documents)}/{total_documents} documents to {collection_name}")
            time.sleep(1)