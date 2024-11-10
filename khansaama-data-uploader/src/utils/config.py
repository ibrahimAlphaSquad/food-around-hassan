import os
from dotenv import load_dotenv
import json

load_dotenv()

class Config:
    MONGODB_URI = os.getenv('MONGODB_URI')
    DB_NAME = os.getenv('DB_NAME')
    BATCH_SIZE = int(os.getenv('BATCH_SIZE', 100))

    @staticmethod
    def load_static_data(filename):
        with open(f'data/static/{filename}', 'r') as f:
            return json.load(f)