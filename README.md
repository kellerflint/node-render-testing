# pizza-node
"Node-ifying" the pizza app

## Database Setup

This application uses PostgreSQL and is configured for deployment on Render.

### Environment Variables

When deploying to Render, set these environment variables:
- `DB_HOST` - Your PostgreSQL host (provided by Render)
- `DB_USER` - Your PostgreSQL username (provided by Render)
- `DB_PASSWORD` - Your PostgreSQL password (provided by Render)
- `DB_NAME` - Your PostgreSQL database name (provided by Render)
- `DB_PORT` - PostgreSQL port (usually 5432)

### Local Development

For local development, you can use the default values or set environment variables:
```bash
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=pizza
DB_PORT=5432
```

### Database Schema

Run the SQL commands in `pizza-script.sql` to set up your database tables.
