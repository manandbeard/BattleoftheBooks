import { defineConfig } from '@prisma/config'

// Prisma migrations require a Session connection (port 5432 on the pooler).
// This rewrites the transaction pooler URL (6543) to the session pooler URL (5432).
const getMigrationUrl = () => {
  let url = process.env.DATABASE_URL || '';
  if (url.includes(':6543')) {
    url = url.replace(':6543', ':5432');
    url = url.split('?')[0]; // Remove ?pgbouncer=true
  }
  return url;
};

export default defineConfig({
  datasource: {
    url: getMigrationUrl(), // Use the session pooler for migrations
  }
})
