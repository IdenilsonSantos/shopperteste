#!/bin/bash

# Usando as variáveis de ambiente
echo "Conectando ao banco de dados tripdb como user..."
psql -U user -d tripdb -f /docker-entrypoint-initdb.d/init.sql