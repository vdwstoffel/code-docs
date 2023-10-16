---
sidebar_label: "Databases"
---

## PostgreSQL

```bash
pip install psycopg2
pip install python-dotenv
```

```python
import psycopg2                     # pip install psycopg2
from dotenv import load_dotenv      # pip install python-dotenv
import os

load_dotenv(dotenv_path='../../.env')


class Connector:

    def __init__(self) -> None:

        self.user = os.getenv("DB_USER")
        self.password = os.getenv("DB_PASSWORD")
        self.database = os.getenv("DATABASE")
        self.host = os.getenv("HOST")

    def connect_to_database(self):
        """
        Establishes and active connection to the database and returns to connection
        """
        conn = psycopg2.connect(
            database=self.database,
            host=self.host,
            user=self.user,
            password=self.password
        )

        if conn:
            return conn
        else:
            raise Exception("Database connection failed")


class Users(Connector):

    def get_all_users(self):
        conn = self.connect_to_database()
        curr = conn.cursor()

        try:
            curr.execute('SELECT * FROM users')
            query = curr.fetchall()
            conn.commit()
            conn.close()
            return (query)  # return a list of tuples
        except Exception as e:
            print(e)
            conn.rollback()
            conn.close()

    def get_user(self, username):
        conn = self.connect_to_database()
        curr = conn.cursor()

        try:
            curr.execute(f"""SELECT * FROM users
                         WHERE username = '{username}'""")
            query = curr.fetchone()
            conn.commit()
            conn.close()
            return (query)  # return a tuple
        except Exception as e:
            print(e)
            conn.rollback()
            conn.close()

    def insert_user_record(self, data: tuple):
        conn = self.connect_to_database()
        cur = conn.cursor()
        try:
            cur.execute("""
                INSERT INTO users (username, age)
                VALUES (%s, %s);
                        """, data)
        except Exception as e:
            print(e)
        finally:
            conn.commit()
            conn.close()


if __name__ == "__main__":
    db = Users()
    db.connect_to_database()
    db.insert_user_record(("Rits", 2))
    print(db.get_all_users())
    print(db.get_user('Stoffel'))
```

## SQLite3

```python
import sqlite3

class Connector:
    def connect_to_database(self):
        conn = sqlite3.connect("snippets.sqlite3")

        if conn:
            return conn
        else:
            print("Error connecting to database")


class Users(Connector):

    def create_table_users(self):
        conn = self.connect_to_database()
        curr = conn.cursor()

        curr.execute("""
                        CREATE TABLE users (
                            user_id integer PRIMARY KEY AUTOINCREMENT,
                            username text,
                            age integer
                        )
                    """)
        conn.commit()
        conn.close()

    def get_all_users(self):
        conn = self.connect_to_database()
        curr = conn.cursor()

        try:
            curr.execute('SELECT * FROM users')
            query = curr.fetchall()
            conn.commit()
            conn.close()
            return (query)  # return a list of tuples
        except Exception as e:
            print(e)
            conn.rollback()
            conn.close()

    def get_user(self, username):
        conn = self.connect_to_database()
        curr = conn.cursor()

        try:
            curr.execute(f"""
                        SELECT * FROM users
                        WHERE username = '{username}'
                         """)
            query = curr.fetchone()
            conn.commit()
            conn.close()
            return (query)  # return a tuple
        except Exception as e:
            print(e)
            conn.rollback()
            conn.close()

    def insert_user_record(self, data: tuple):
        conn = self.connect_to_database()
        cur = conn.cursor()
        try:
            cur.execute("""
                INSERT INTO users (username, age)
                VALUES (?, ?);
                        """, data)
        except Exception as e:
            print(e)
        finally:
            conn.commit()
            conn.close()
```
