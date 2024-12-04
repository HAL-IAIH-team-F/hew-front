#!/bin/bash

npx openapi-zod-client http://localhost:8000/openapi.json -o src/components/api/client.ts

npx openapi-zod-client https://hew-dev-api.kigawa.net/openapi.json -o src/components/api/client.ts

npx openapi-zod-client http://localhost:8001/openapi.json -o src/components/api/imgClient.ts
