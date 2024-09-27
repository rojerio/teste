import { sql } from './db.js'

sql`
  CREATE TABLE livros (
      id text PRIMARY KEY,
      nome character varying(255),
      autor character varying(255),
      ano character varying(255)
  );
`.then(() => {
  console.log('tabela criada');
})