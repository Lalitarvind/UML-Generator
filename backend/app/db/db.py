
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os
# Load environment variables from .env file
load_dotenv()

db_username = os.getenv('MONGODB_USERNAME')
db_password = os.getenv('MONGODB_PASSWORD')
db_collection_str = os.getenv('MONGODB_COLLECTION_STRING')

if not db_username or not db_password or not db_collection_str:
    raise ValueError("Missing required environment variables for MongoDB connection.")

uri = f"mongodb+srv://{db_username}:{db_password}@{db_collection_str}/?retryWrites=true&w=majority&appName=AutoUML"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)