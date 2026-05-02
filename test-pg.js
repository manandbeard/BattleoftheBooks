const { Client } = require('pg');

async function testConnection(url, name) {
  const client = new Client({
    connectionString: url,
    connectionTimeoutMillis: 5000,
  });

  try {
    console.log(`\nTesting ${name}:`, url.replace(/:[^:@]+@/, ':***@'));
    await client.connect();
    console.log(`✅ ${name} connected successfully!`);
    const res = await client.query('SELECT NOW()');
    console.log(`✅ Query result:`, res.rows[0]);
  } catch (err) {
    console.error(`❌ ${name} connection error:`, err.message);
  } finally {
    await client.end();
  }
}

async function run() {
  const base = process.env.DATABASE_URL;
  if (!base) {
    console.log('No DATABASE_URL found.');
    return;
  }
  
  // Test 1: The exact URL provided
  await testConnection(base, 'Current DATABASE_URL');

  // Test 2: Try port 5432 on the pooler host (Session mode)
  const sessionUrl = base.replace(':6543', ':5432').replace('?pgbouncer=true&connection_limit=1', '').replace('?pgbouncer=true', '');
  await testConnection(sessionUrl, 'Session Pooler (Port 5432)');
}

run();
