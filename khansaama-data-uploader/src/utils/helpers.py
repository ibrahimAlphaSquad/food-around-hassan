import random
import bcrypt
from datetime import datetime, timedelta

def generate_pk_phone():
    return f"+92{random.choice(['30', '31', '32', '33'])}{random.randint(1000000, 9999999)}"

def hash_password(password: str) -> str:
    # return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return "$2a$10$fQp4O.Gl19faznA6kBhAh.Iflv/vyEh/lTClpX6IhKqVSP98P8/Mi"

def random_date_this_year():
    start_date = datetime(2024, 1, 1)
    days_between = (datetime.now() - start_date).days
    random_days = random.randint(0, days_between)
    return start_date + timedelta(days=random_days)