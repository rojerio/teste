import { randomUUID } from "crypto";
import { sql } from './db.js';

export class DatabasePostgres { 
  async listLivros() {
    const livros = await sql`select * from livros`;
    return livros;
  }

  async createLivro(livro) {
    const id = randomUUID();
    console.log('id', id);
    const nome = livro.nome;
    const autor = livro.autor;
    const ano = livro.ano;
    
    await sql`insert into livros (id, nome, autor, ano)
    values (${id}, ${nome}, ${autor}, ${ano})`
  }

  async updateLivro(id, livro) {
    const nome = livro.nome;
    const autor = livro.autor;
    const ano = livro.ano;

    await sql`update livros set 
        nome = ${nome},
        autor = ${autor},
        ano = ${ano}
        where id = ${id}
    `;
  }

  async deleteLivro(id) {
    await sql`delete from livros where id = ${id}`
  }

}