-- Script para RESET TOTAL do histórico de migrations
-- Use isso se o Sequelize continuar reclamando de arquivos faltando

USE mvc;

-- 1. Apaga a tabela que guarda o histórico de arquivos (SequelizeMeta)
-- Isso fará o Sequelize esquecer todos os arquivos que ele acha que "deveria" ter
DROP TABLE IF EXISTS SequelizeMeta;

-- 2. (Opcional) Apaga as tabelas atuais para garantir que o 'db:migrate' crie tudo do zero e correto
-- CUIDADO: Isso apagará os dados que você já inseriu!
DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;
