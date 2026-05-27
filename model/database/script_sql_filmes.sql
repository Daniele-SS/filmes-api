create database db_filmes_2026; #Cria o database do projeto de filmes

use db_filmes_2026; #Ativa o uso do database de filmes

#Cria a tabela de filmes
create table tbl_filme (
	id 				int not null primary key auto_increment,
    nome 			varchar(80) not null,
    data_lancamento date not null,
    duracao 		time not null,
    sinopse 		text not null,
    avaliacao 		decimal(3,2) default null,
    valor 			decimal(5,2) not null default 0,
    capa 			varchar(255)
);

create table tbl_classificacao (
	id 				int not null primary key auto_increment,
    sigla 			varchar(3) not null,
    caracteristicas varchar(250) not null
);

create table tbl_genero (
	id 		int not null primary key auto_increment,
    nome 	varchar(205) not null
);

show tables;
desc tbl_filme;
desc tbl_classificacao;
desc tbl_genero;
desc tbl_sexo;
desc tbl_nacionalidade;


create table tbl_sexo (
	id 		int not null primary key auto_increment,
    sigla 	varchar(3) not null
);

insert into tbl_sexo (
						sigla
						)
						values (
						'F'
						);

create table tbl_nacionalidade (
	id 		int not null primary key auto_increment,
    nome 	varchar(100) not null
);

#Inserir dados
insert into tbl_filme (
						nome, 
                        data_lancamento, 
                        duracao, 
                        sinopse, 
                        avaliacao, 
                        valor, 
                        capa,
                        id_classificacao
                        ) 
				values (
						'Super Mario Galaxy: O Filme', 
						'2026-04-02', 
						'01:39:00', 
						'Uma nova aventura leva Mario a enfrentar um inédito e ameaçador super vilão. 
						Em Super Mario Galaxy: O Filme, o bigodudo encanador italiano e seus aliados embarcam numa 
						aventura galáctica repleta de ação e momentos emocionantes depois de salvar o Reino dos Cogumelos.',
						'3',
						'50.70',
						'https://shoppingcidadedasflores.com.br/wp-content/uploads/2026/04/Super-Mario-Galaxy-O-Filme2.jpg',
                        1
						);
        
select * from tbl_filme;
select * from tbl_classificacao;
select * from tbl_sexo;
select * from tbl_filme order by id desc; #Ordena os filmes pelo id e por ordem decrescente

delete from tbl_filme where id = 21;

update tbl_filme set
	nome 			= 'filme 02'
    where id = 21;


alter table tbl_classificacao
	add column nome varchar(50) not null;

create table tbl_genero (
	id 		int not null primary key auto_increment,
    nome 	varchar(30) not null
);

desc tbl_classificacao;
desc tbl_filme;
desc tbl_genero;
desc tbl_filme_genero;

create table tbl_filme_genero (
	id 			int not null primary key auto_increment,
    id_filme 	int not null,
    id_genero 	int not null,
    
    constraint FK_FILME_FILMEGENERO
    foreign key (id_filme)
    references tbl_filme(id),
    
    constraint FK_GENERO_FILMEGENERO
    foreign key (id_genero)
    references tbl_genero(id)
);

show tables;

#Adiciona a coluna FK e cria a relação com a tabela de classificação 
alter table tbl_filme
	add column  id_classificacao int not null, 
    add constraint FK_CLASSIFICACAO_FILME
		foreign key (id_classificacao)
        references tbl_classificacao(id);

select * from tbl_filme;
select * from tbl_classificacao;
delete from tbl_classificacao where id = '2';

insert into tbl_classificacao (sigla, caracteristicas, nome)
		values ('L', 
				'Filme de classificação livre. Conteúdo sensível para menores de 10 anos.',
                'Livre'
                ),
                (
                '18',
                'Filme de classificação adulta. Conteúdo sensível para menores de 18 anos',
                '18+'
				);

select 	tbl_filme.nome as nome_filme, tbl_filme.sinopse, tbl_filme.data_lancamento, tbl_filme.capa,
		tbl_classificacao.sigla, tbl_classificacao.nome as nome_classificacao
from tbl_filme
	inner join tbl_classificacao
		on tbl_classificacao.id = tbl_filme.id_classificacao;

select tbl_filme.nome, tbl_filme.data_lancamento, tbl_filme.sinopse, 
	tbl_classificacao.sigla
from tbl_filme
		left join tbl_classificacao
        on tbl_classificacao.id = tbl_filme.id_classificacao;
        

#Retorna os dados relacionados entre duas tableas e os dados existentes na tablea da direita 
#que não está relacionado com a tabela da esquerda.
select tbl_filme.nome, tbl_filme.data_lancamento, tbl_filme.sinopse, 
	tbl_classificacao.sigla
from tbl_classificacao
		right join tbl_filme
        on tbl_classificacao.id = tbl_filme.id_classificacao;








