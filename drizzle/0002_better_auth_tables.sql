-- Create Better Auth required tables

-- Sessions table
CREATE TABLE IF NOT EXISTS "sessions" (
  "id" VARCHAR(255) PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "users"("id"),
  "expires_at" TIMESTAMP NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Accounts table
CREATE TABLE IF NOT EXISTS "accounts" (
  "id" VARCHAR(255) PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "users"("id"),
  "account_id" VARCHAR(255) NOT NULL,
  "provider_id" VARCHAR(255) NOT NULL,
  "access_token" TEXT,
  "refresh_token" TEXT,
  "access_token_expires_at" TIMESTAMP,
  "refresh_token_expires_at" TIMESTAMP,
  "scope" VARCHAR(255),
  "id_token" TEXT,
  "password" VARCHAR(255),
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Verifications table
CREATE TABLE IF NOT EXISTS "verifications" (
  "id" VARCHAR(255) PRIMARY KEY,
  "identifier" VARCHAR(255) NOT NULL,
  "value" VARCHAR(255) NOT NULL,
  "expires_at" TIMESTAMP NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "sessions_user_id_idx" ON "sessions"("user_id");
CREATE INDEX IF NOT EXISTS "accounts_user_id_idx" ON "accounts"("user_id");
CREATE INDEX IF NOT EXISTS "accounts_provider_id_account_id_idx" ON "accounts"("provider_id", "account_id");
CREATE INDEX IF NOT EXISTS "verifications_identifier_idx" ON "verifications"("identifier"); 