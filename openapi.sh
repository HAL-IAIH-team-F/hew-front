#!/bin/bash
mkdir -p src/app/_api/
npx openapi-zod-client https://hew-dev-api.kigawa.net/openapi.json -o src/app/_api/client.ts
