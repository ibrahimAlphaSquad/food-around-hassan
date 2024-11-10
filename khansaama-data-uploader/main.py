import logging
import os
from src.generators.chef_generator import ChefGenerator
from src.generators.food_generator import FoodGenerator
from src.generators.customer_generator import CustomerGenerator
from src.generators.order_generator import OrderGenerator
from src.generators.review_generator import ReviewGenerator
from src.uploader.mongodb_uploader import MongoDBUploader

# Ensure the logs directory exists
os.makedirs('logs', exist_ok=True)

# Centralized logging configuration
logging.basicConfig(
    filename='logs/data_generation.log',  # Central log file for main process and generators
    level=logging.INFO,                    # Log level
    format='%(asctime)s - %(levelname)s - %(message)s', # Log format
    filemode='w'                           # Overwrite the file each run
)
console_handler = logging.StreamHandler()  # Console output
console_handler.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
console_handler.setFormatter(formatter)
logging.getLogger().addHandler(console_handler)

def main():
    try:
        logging.info("Starting data generation and upload process...")
        
        # Initialize uploader and create indexes
        uploader = MongoDBUploader()
        logging.info("Creating indexes...")
        uploader.create_indexes()
        
        # Generate and upload chefs
        logging.info("Generating and uploading chefs...")
        chef_generator = ChefGenerator()
        chefs = chef_generator.generate(50)
        chef_ids = [chef['_id'] for chef in chefs]
        uploader.upload_data('chefs', chefs)
        
        # Generate and upload foods
        logging.info("Generating and uploading foods...")
        food_generator = FoodGenerator(chef_ids)
        foods = food_generator.generate(200)
        food_ids = [food['_id'] for food in foods]
        uploader.upload_data('foods', foods)
        
        # Generate and upload customers
        logging.info("Generating and uploading customers...")
        customer_generator = CustomerGenerator(food_ids, chef_ids)
        customers = customer_generator.generate(100)
        customer_ids = [customer['_id'] for customer in customers]
        uploader.upload_data('customers', customers)
        
        # Generate and upload orders
        logging.info("Generating and uploading orders...")
        order_generator = OrderGenerator(customer_ids, food_ids, chef_ids)
        orders = order_generator.generate(300)
        uploader.upload_data('orders', orders)
        
        # Generate and upload reviews
        logging.info("Generating and uploading reviews...")
        review_generator = ReviewGenerator(food_ids, customer_ids, chef_ids)
        reviews = review_generator.generate(400)
        uploader.upload_data('reviews', reviews)
        
        logging.info("Data generation and upload completed successfully!")
        
    except Exception as e:
        logging.error(f"An error occurred: {e}")
    finally:
        uploader.client.close()
        logging.info("MongoDB connection closed.")

if __name__ == "__main__":
    main()
