import fs from 'node:fs';
import path from 'node:path';

const API_URL = 'https://data.cityofnewyork.us/api/id/d6zx-ckhd.json';
const OUTPUT_DIR = path.join('src', 'lib', 'data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'packages.json');
const PAGE_SIZE = 50000;

const FIELDS = [
  'boro_nm',
  'geo_cd_x',
  'geo_cd_y',
  'latitude',
  'longitude',
  'location',
  'create_date',
  'typ_desc',
];

const WHERE = [
  "incident_date >= '2024-01-01T00:00:00'",
  "incident_date < '2025-01-01T00:00:00'",
  "lower(typ_desc) like 'susp package:%'"
].join(' AND ');

async function fetchAllRows() {
  let offset = 0;
  const allRows = [];

  while (true) {
    const params = new URLSearchParams({
      $select: FIELDS.join(', '),
      $where: WHERE,
      $order: 'incident_date DESC',
      $limit: String(PAGE_SIZE),
      $offset: String(offset)
    });

    const url = `${API_URL}?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    const rows = await response.json();
    allRows.push(...rows);

    console.log(`Fetched ${rows.length} rows (total: ${allRows.length})`);

    if (rows.length < PAGE_SIZE) break;
    offset += PAGE_SIZE;
  }

  return allRows;
}

async function main() {
  console.log('Fetching NYC Open Data (2024, typ_desc starts with "susp package:")...');

  const rows = await fetchAllRows();

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(rows, null, 2));

  console.log(`Saved ${rows.length} rows to ${OUTPUT_FILE}`);
}

main().catch((error) => {
  console.error('Error fetching data:', error.message);
  process.exitCode = 1;
});
