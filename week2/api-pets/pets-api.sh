set -euo pipefail

BASE_URL="http://127.0.0.1:4000"

echo "== GET /pets (initial) =="
curl -sS "$BASE_URL/pets"
echo -e "\n"

echo "== POST /pets (create) =="
CREATE_RES="$(curl -sS -X POST "$BASE_URL/pets" \
  -H "Content-Type: application/json" \
  -d '{"name":"Buddy","species":"Dog","age":1,"color":"Brown","weight":2}')"
echo "$CREATE_RES"
echo -e "\n"

# Extract petId from the response (tries common keys: id, petId)
PET_ID="$(printf '%s' "$CREATE_RES" | node -e '
const fs=require("fs");
const s=fs.readFileSync(0,"utf8").trim();
let o={};
try { o=JSON.parse(s); } catch(e) { process.exit(1); }
const id = o.petId ?? o.id;
if (!id) process.exit(2);
process.stdout.write(String(id));
')"

echo "Created petId: $PET_ID"
echo

echo "== GET /pets/$PET_ID =="
curl -sS "$BASE_URL/pets/$PET_ID"
echo -e "\n"

echo "== PUT /pets/$PET_ID (update weight -> 14) =="
curl -sS -X PUT "$BASE_URL/pets/$PET_ID" \
  -H "Content-Type: application/json" \
  -d '{"weight":14}'
echo -e "\n"

echo "== DELETE /pets/$PET_ID =="
curl -sS -X DELETE "$BASE_URL/pets/$PET_ID"
echo -e "\n"

echo "== GET /pets (final) =="
curl -sS "$BASE_URL/pets"
echo -e "\n"
