import bcrypt

def hash_pass(password: str) -> str:
    """
    Hash a password using bcrypt.
    
    :param password: The password to hash.
    :return: The hashed password as a string.
    """
    # Generate a salt and hash the password
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode()

def check_pass(plaintext: str, hashed: str) -> bool:
    """
    Check if a plaintext password matches a hashed password.
    
    :param plaintext: The plaintext password to check.
    :param hashed: The hashed password to compare against.
    :return: True if the passwords match, False otherwise.
    """
    # Check the plaintext against the hashed password
    return bcrypt.checkpw(plaintext.encode('utf-8'), hashed.encode('utf-8'))

