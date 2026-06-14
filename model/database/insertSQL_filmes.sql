use db_filmes_20261_a;

select * from tbl_genero;
select * from tbl_classificacao_indicativa;
select * from tbl_idioma;
select * from tbl_sexo;
select * from tbl_nacionalidade;
select * from tbl_tipo_telefone;
select * from tbl_produtora;
select * from tbl_pessoa;
select * from tbl_filme_genero;
select * from tbl_filme_idioma;
select * from tbl_filme_pessoa;
select * from tbl_telefone;

-- --------------------------------
-- 			TABELA GÊNERO
-- --------------------------------

insert into tbl_genero (tipo,
						descricao
                        )
				values(
						'Comédia',
						'Desenvolvido para provocar humor e riso.'
						),
						(
						'Drama',
						'Foca no desenvolvimento realista de conflitos emocionais e personagens.'
						),
						(
						'Terror/Horror',
						'Projetado para causar medo, tensão e suspense.'
						),
						(
						'Ficção Científica',
						'Explora conceitos imaginativos, tecnologia ou futuro.'
						),
						(
						'Romance',
						'Foca no desenvolvimento de um relacionamento amoroso.'
						),
						(
						'Suspense/Thriller',
						'Mantém o público tenso e ansioso com tramas de mistério.'
						),
						(
						'Animação',
						'Filmes feitos com desenhos, modelos ou computação gráfica.'
						),
						(
						'Aventura',
						'Narrativas de jornadas e exploração.'
						),
						(
						'Faroeste',
						'Ambientado no oeste americano, foca em conflitos da fronteira.'
						);
                        
-- --------------------------------
-- TABELA CLASSIFICAÇÃO INDICATIVA
-- --------------------------------

insert into tbl_classificacao_indicativa(nome,
										descricao,
                                        sigla,
                                        idade_minima
										)value(
											'Livre',
											'Não expõe crianças a conteúdos potencialmente prejudiciais.',
											'L',
											0
											),
											(
											'Não recomendado para menores de 10 anos',
											'Conteúdo violento ou linguagem inapropriada para crianças, ainda que em menor intensidade.',
											'10',
											10
											),
											(
											'Não recomendado para menores de 12 anos',
											'As cenas podem conter agressão física, consumo de drogas e insinuação sexual.',
											'12',
											12
											),
											(
											'Não recomendado para menores de 14 anos',
											'Conteúdos mais violentos e/ou de linguagem sexual mais acentuada.',
											'14',
											14
											),
											(
											'Não recomendado para menores de 16 anos',
											'Conteúdos mais violentos ou com conteúdo sexual mais intenso, com cenas de tortura, suicídio, estupro e nudez total.',
											'16',
											16
											),
											(
											'Não recomendado para menores de 18 anos',
											'Conteúdos violentos e sexuais extremos. Cenas de sexo, incesto ou atos repetidos de tortura, mutilação e abuso sexual.',
											'18',
											18
											);

-- -------------------------------------------------
-- 				TABELA SEXO
-- -------------------------------------------------
insert into tbl_sexo(
					nome,
                    sigla)
					values(
					'Masculino',
					'M'
					),
					(
					'Feminino',
					'F'
					),
					(
					'Não Binário',
					'NB'
					),
					(
					'Outro',
					'OUT'
					),
					(
					'Prefere Não Informar',
					'PNI'
					);
                        
-- -------------------------------------------------
-- 				TABELA NACIONALIDADE
-- -------------------------------------------------
insert into tbl_nacionalidade (
								nome_pais
                                )
								values(
								'Brasil'
								),
								(
								'Estados Unidos'
								),
								(
								'Canadá'
								),
								(
								'Reino Unido'
								),
								(
								'França'
								);
                                
-- -------------------------------------------------
-- 				TABELA TIPO DE TELEFONE
-- -------------------------------------------------

insert into tbl_tipo_telefone ( 
						tipo
						)
                        values(
						'Comercial'
						),
						(
						'Celular'
						),
						(
						'WhatsApp'
						),
						(
						'SAC'
						),
						(
						'Suporte Técnico'
						);
                        
-- -------------------------------------------------
-- 				TABELA PRODUTORA
-- -------------------------------------------------

insert into tbl_produtora(
						nome_fantasia,
                        cnpj,
                        razao_social,
                        website,
                        data_inicio,
                        status_produtora,
                        email
						)
						values(
						'Galaxy Pictures',
						'12.345.678/0001-90',
						'Galaxy Pictures Producoes Cinematograficas LTDA',
						'https://www.galaxypictures.com',
						'2015-03-12',
						'Ativa',
						'contato@galaxypictures.com'
						),
						(
						'Vision Studios',
						'23.456.789/0001-81',
						'Vision Studios Entretenimento LTDA',
						'https://www.visionstudios.com',
						'2012-08-25',
						'Ativa',
						'contato@visionstudios.com'
						),
						(
						'Dragon Films',
						'34.567.890/0001-72',
						'Dragon Films Producoes Audiovisuais LTDA',
						'https://www.dragonfilms.com',
						'2018-06-14',
						'Ativa',
						'contato@dragonfilms.com'
						),
						(
						'Nebula Entertainment',
						'45.678.901/0001-63',
						'Nebula Entertainment Brasil LTDA',
						'https://www.nebulaentertainment.com',
						'2020-11-03',
						'Ativa',
						'contato@nebulaentertainment.com'
						),
						(
						'Sunrise Motion Pictures',
						'56.789.012/0001-54',
						'Sunrise Motion Pictures LTDA',
						'https://www.sunrisemotion.com',
						'2010-01-20',
						'Ativa',
						'contato@sunrisemotion.com'
						);

-- -------------------------------------------------
-- 				TABELA FILMES
-- -------------------------------------------------                        
insert into tbl_filmes
(
	nome,
	data_lancamento,
	duracao,
	sinopse,
	avaliacao,
	valor,
	capa,
	trailer_url,
	status_filme,
	id_classificacao_indicativa,
	id_produtora
)
values(
		'A Última Cidade de Marte',
		'2028-07-14',
		'02:18:00',
		'Após a Terra se tornar inabitável, uma equipe de cientistas luta para salvar a última colônia humana em Marte enquanto enfrenta uma inteligência artificial fora de controle.',
		'4.80',
		'69.90',
		'https://exemplo.com/capas/marte.jpg',
		'https://youtube.com/watch?v=marte001',
		'Ativo',
		5,
		1
		),
		(
		'O Mistério do Farol Negro',
		'2022-10-31',
		'01:47:00',
		'Uma jornalista investiga desaparecimentos em uma ilha isolada e descobre segredos que desafiam a lógica e a própria realidade.',
		'4.30',
		'39.90',
		'https://exemplo.com/capas/farol.jpg',
		'https://youtube.com/watch?v=farol002',
		'Ativo',
		4,
		2
		),
		(
		'Operação Tempestade de Aço',
		'2025-03-20',
		'02:05:00',
		'Um grupo de soldados de elite recebe uma missão impossível para impedir um ataque global que ameaça milhões de vidas.',
		'4.60',
		'54.90',
		'https://exemplo.com/capas/tempestade.jpg',
		'https://youtube.com/watch?v=temp003',
		'Ativo',
		3,
		3
		),
		(
		'A Floresta das Mil Vozes',
		'2023-08-11',
		'01:56:00',
		'Uma jovem encontra uma floresta encantada onde árvores guardam memórias de pessoas desaparecidas há séculos.',
		'4.50',
		'44.90',
		'https://exemplo.com/capas/floresta.jpg',
		'https://youtube.com/watch?v=flor004',
		'Ativo',
		2,
		4
		),
		(
		'Corrida Mortal: Toquio 2099',
		'2029-11-05',
		'02:12:00',
		'Pilotos participam de uma competição ilegal em uma megacidade futurista onde perder significa muito mais do que ficar em segundo lugar.',
		'4.90',
		'79.90',
		'https://exemplo.com/capas/tokyo2099.jpg',
		'https://youtube.com/watch?v=tokyo005',
		'Em Producao',
		5,
		5
		);

-- -------------------------------------------------
-- 				TABELA PESSOA
-- -------------------------------------------------

insert into tbl_pessoa
(
	nome,
	data_nascimento,
	foto,
	id_nacionalidade,
	id_sexo
)
values(
		'Robert Downey Jr.',
		'1965-04-04',
		'https://exemplo.com/fotos/robert_downey_jr.jpg',
		2,
		1
		),
		(
		'Scarlett Johansson',
		'1984-11-22',
		'https://exemplo.com/fotos/scarlett_johansson.jpg',
		2,
		2
		),
		(
		'Keanu Reeves',
		'1964-09-02',
		'https://exemplo.com/fotos/keanu_reeves.jpg',
		3,
		1
		),
		(
		'Emma Watson',
		'1990-04-15',
		'https://exemplo.com/fotos/emma_watson.jpg',
		4,
		2
		),
		(
		'Tom Holland',
		'1996-06-01',
		'https://exemplo.com/fotos/tom_holland.jpg',
		4,
		1
		);

-- -------------------------------------------------
-- 			TABELA INTERMEDIARIA FILME_GENERO
-- -------------------------------------------------

insert into tbl_filme_genero
(
	id_filme,
	id_genero
)
values(
		1,
		1
		),
		(
		1,
		5
		),
		(
		2,
		4
		),
		(
		2,
		5
		),
		(
		3,
		2
		),
		(
		3,
		1
		),
		(
		4,
		3
		),
		(
		4,
		5
		),
		(
		5,
		1
		),
		(
		5,
		2
		);

-- -------------------------------------------------
-- 			TABELA INTERMEDIARIA FILME_IDIOMA
-- -------------------------------------------------

insert into tbl_filme_idioma
(
	tipo,
	id_idioma,
	id_filme
)
values(
		'Original',
		2,
		1
		),
		(
		'Dublado',
		1,
		1
		),
		(
		'Original',
		1,
		2
		),
		(
		'Legendado',
		3,
		2
		),
		(
		'Original',
		1,
		3
		),
		(
		'Dublado',
		2,
		3
		),
		(
		'Original',
		4,
		4
		),
		(
		'Dublado',
		1,
		4
		),
		(
		'Original',
		2,
		5
		),
		(
		'Legendado',
		1,
		5
		);

-- -------------------------------------------------
-- 			TABELA INTERMEDIARIA FILME_PESSOA
-- -------------------------------------------------

insert into tbl_filme_pessoa
(
	funcao,
	id_filme,
	id_pessoa
)
values(
		'Ator',
		1,
		1
		),
		(
		'Diretor',
		1,
		2
		),
		(
		'Roteirista',
		1,
		3
		),
		(
		'Ator',
		2,
		4
		),
		(
		'Diretor',
		2,
		5
		),
		(
		'Ator',
		3,
		2
		),
		(
		'Dublador',
		3,
		1
		),
		(
		'Diretor',
		4,
		3
		),
		(
		'Ator',
		5,
		5
		),
		(
		'Roteirista',
		5,
		4
		);

-- -------------------------------------------------
-- 				TABELA TELEFONE
-- -------------------------------------------------
        
insert into tbl_telefone
(
	numero,
	id_tipo_telefone,
	id_produtora
)
values(
		'(11) 4002-8922',
		1,
		1
		),
		(
		'(11) 99876-1234',
		3,
		1
		),
		(
		'(21) 3333-4444',
		1,
		2
		),
		(
		'(21) 98765-4321',
		3,
		2
		),
		(
		'(31) 3555-6677',
		2,
		3
		),
		(
		'(31) 99999-8888',
		3,
		3
		),
		(
		'(41) 3222-1111',
		4,
		4
		),
		(
		'(41) 98888-7777',
		3,
		4
		),
		(
		'(51) 3444-5555',
		1,
		5
		),
		(
		'(51) 97777-6666',
		3,
		5
		);