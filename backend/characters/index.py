import json
import os
import psycopg2
from typing import Dict, Any

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: CRUD operations for characters - create, read, update, delete
    Args: event - dict with httpMethod, body, queryStringParameters
          context - object with request_id attribute
    Returns: HTTP response with character data
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        if method == 'GET':
            cur.execute("""
                SELECT id, name, avatar, age, gender, appearance, personality, 
                       background, communication_style, interests, nsfw_preferences, created_at
                FROM characters 
                ORDER BY created_at DESC
            """)
            rows = cur.fetchall()
            characters = []
            for row in rows:
                characters.append({
                    'id': row[0],
                    'name': row[1],
                    'avatar': row[2],
                    'age': row[3],
                    'gender': row[4],
                    'appearance': row[5],
                    'personality': row[6],
                    'background': row[7],
                    'communicationStyle': row[8],
                    'interests': row[9],
                    'nsfwPreferences': row[10],
                    'createdAt': row[11].isoformat() if row[11] else None
                })
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(characters, ensure_ascii=False),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            cur.execute("""
                INSERT INTO characters 
                (id, name, avatar, age, gender, appearance, personality, background, 
                 communication_style, interests, nsfw_preferences)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id, name, avatar, age, gender, appearance, personality, 
                          background, communication_style, interests, nsfw_preferences, created_at
            """, (
                body_data['id'],
                body_data['name'],
                body_data['avatar'],
                body_data['age'],
                body_data['gender'],
                body_data.get('appearance', ''),
                body_data['personality'],
                body_data.get('background', ''),
                body_data.get('communicationStyle', ''),
                body_data.get('interests', ''),
                body_data.get('nsfwPreferences', '')
            ))
            
            row = cur.fetchone()
            conn.commit()
            
            character = {
                'id': row[0],
                'name': row[1],
                'avatar': row[2],
                'age': row[3],
                'gender': row[4],
                'appearance': row[5],
                'personality': row[6],
                'background': row[7],
                'communicationStyle': row[8],
                'interests': row[9],
                'nsfwPreferences': row[10],
                'createdAt': row[11].isoformat() if row[11] else None
            }
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(character, ensure_ascii=False),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Method not allowed'}),
                'isBase64Encoded': False
            }
    
    finally:
        cur.close()
        conn.close()
