# Prisma + \$connect

## Setup:

- Prisma with PgBouncer (MAX_CLIENT_CONN=2) in front of a Postgres (max_connections=1)
- Workload, we attempt to make 2 connections and run a "sleep 20" query with each connection. The query is run async.

## To Reproduce:

- Run `docker-compose up -d`
- Run `node no-manual-connect.js` with Prisma version 2.10.0-dev.30 [which is a Prisma version that doesn't connect automatically]

Output:

```
1st connect
1st sleep 20 query sent async
2nd connect
2nd sleep 20 query sent async
1st query returned
2nd query returned
```

- Run `node no-manual-connect.js` with Prisma version 2.10.0-dev.31 [which is a Prisma version that connects automatically]

Output:

```
1st connect
1st sleep 20 query sent async
1st query returned
2nd connect
2nd sleep 20 query sent async
2nd query returned
```

The outputs are different
