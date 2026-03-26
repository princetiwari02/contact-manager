# 📇 Contact Manager API

A full-featured personal contact book API with groups, favorites, multi-field search, and tagging.

## ✨ Features
- Full CRUD for contacts
- Multiple emails and phone numbers per contact
- Address book with full address support
- Groups (Family, Work, Friends, etc.)
- Tags for flexible categorization
- Favorite contacts
- Full-text search (name, email, company)
- Pagination

## 🚀 Setup & Run
```bash
npm install && cp .env.example .env && npm run dev
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/contacts` | List contacts |
| GET | `/api/contacts/groups` | List all groups |
| GET | `/api/contacts/:id` | Get contact |
| POST | `/api/contacts` | Create contact |
| PUT | `/api/contacts/:id` | Update contact |
| DELETE | `/api/contacts/:id` | Delete contact |
| PATCH | `/api/contacts/:id/favorite` | Toggle favorite |

## 🔍 Query Parameters
```
?search=John         → Search by name/email/company
?group=Work          → Filter by group
?tag=vip             → Filter by tag
?favorite=true       → Only favorites
?page=1&limit=20     → Pagination
```

## 📋 Create Contact Example
```json
POST /api/contacts
Authorization: Bearer <token>
{
  "firstName": "John",
  "lastName": "Doe",
  "email": ["john@work.com", "john@personal.com"],
  "phone": [
    { "label": "mobile", "number": "+1-555-0100" },
    { "label": "work", "number": "+1-555-0101" }
  ],
  "company": "Acme Corp",
  "jobTitle": "Senior Engineer",
  "group": "Work",
  "tags": ["vip", "engineering"],
  "isFavorite": true
}
```
