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

show tables;

#Inserir dados
insert into tbl_filme (
						nome, 
                        data_lancamento, 
                        duracao, 
                        sinopse, 
                        avaliacao, 
                        valor, 
                        capa
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
						'https://shoppingcidadedasflores.com.br/wp-content/uploads/2026/04/Super-Mario-Galaxy-O-Filme2.jpg'
						);
        
select * from tbl_filme;
select * from tbl_filme order by id desc; #Ordena os filmes pelo id e por ordem decrescente

delete from tbl_filme where id > 0;


