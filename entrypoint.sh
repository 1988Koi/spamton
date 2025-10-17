#!/usr/bin/env bash
set -e

./wait-for-it.sh db 5432
npm run migration:run
exec npm run dev
