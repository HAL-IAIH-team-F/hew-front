#!/bin/bash
mkdir -p src/app/_api/
npx openapi-zod-client http://localhost:8000/openapi.json -o src/app/_api/client.ts
npx openapi-zod-client http://localhost:8001/openapi.json -o src/app/_api/imgClient.ts
