#!/bin/bash
mkdir -p app/_api/
npx openapi-zod-client https://hew-dev-api.kigawa.net/openapi.json -o app/_api/client.ts
