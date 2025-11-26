CREATE TABLE IF NOT EXISTS characters (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    avatar TEXT NOT NULL,
    age TEXT NOT NULL,
    gender TEXT NOT NULL,
    appearance TEXT,
    personality TEXT NOT NULL,
    background TEXT,
    communication_style TEXT,
    interests TEXT,
    nsfw_preferences TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    character_id TEXT NOT NULL,
    text TEXT NOT NULL,
    is_user BOOLEAN NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_messages_character ON messages(character_id);
CREATE INDEX idx_messages_timestamp ON messages(timestamp);