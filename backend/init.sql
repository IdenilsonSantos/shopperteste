-- Criando o banco de dados
CREATE DATABASE tripdb;

-- Conectando-se ao banco de dados recém-criado
\ c tripdb;

-- Criação da tabela drivers
CREATE TABLE IF NOT EXISTS drivers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    vehicle TEXT NOT NULL,
    evaluation TEXT NOT NULL,
    comments TEXT NOT NULL,
    cost_per_km NUMERIC(10, 2) NOT NULL,
    min_distance INTEGER NOT NULL
);

-- Inserção dos dados
INSERT INTO
    drivers (
        name,
        description,
        vehicle,
        evaluation,
        comments,
        cost_per_km,
        min_distance
    )
VALUES
    (
        'Homer Simpson',
        'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
        'Plymouth Valiant 1973 rosa e enferrujado',
        '2/5',
        'Motorista simpático, mas errou o caminho 3 vezes. O veículo cheira a donuts.',
        2.5,
        1
    ),
    (
        'Dominic Toretto',
        'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
        'Dodge Charger R/T 1970 modificado',
        '4/5',
        'Que viagem incrível! O veículo é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
        5,
        5
    ),
    (
        'James Bond',
        'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
        'Aston Martin DB5 clássico',
        '5/5',
        'Serviço impecável! O motorista é a própria definição de classe e o veículo é simplesmente magnífico. Uma experiência digna de um agente secreto.',
        10,
        100
    ),
    (
        'Mario Mario',
        'Ciao! Sou o Mario, seu motorista aventureiro. Prometo uma viagem cheia de emoção (e talvez alguns cascos de tartaruga no caminho).',
        'Kart Super Mario',
        '3/5',
        'Motorista divertido, mas a viagem foi um pouco turbulenta. O kart é bem pequeno.',
        3.5,
        2
    ),
    (
        'Optimus Prime',
        'Sou Optimus Prime, e estou aqui para levá-lo ao seu destino de forma segura. Confie no líder dos Autobots.',
        'Caminhão Peterbilt 379 vermelho e azul',
        '5/5',
        'Uma viagem épica! Senti que estava sendo escoltado por um verdadeiro herói.',
        15,
        50
    ),
    (
        'Tony Stark',
        'Sou o Homem de Ferro, mas hoje seu motorista. Prepare-se para uma viagem tecnológica e de altíssima classe.',
        'Audi R8 com personalização Stark Industries',
        '5/5',
        'Motorista super profissional e educado. O carro é o ápice da tecnologia.',
        12,
        80
    ),
    (
        'Rick Sanchez',
        'Wubba lubba dub dub! Sou o Rick, e minha nave é mais rápida que qualquer veículo terrestre. Aperte os cintos!',
        'Nave espacial interdimensional',
        '3/5',
        'Uma viagem muito rápida, mas confusa. A nave é incrível, mas o motorista estava bebendo.',
        20,
        30
    ),
    (
        'Sarah Connor',
        'Sou Sarah Connor, motorista experiente e protetora. Você está em boas mãos.',
        'Motocicleta Harley-Davidson personalizada',
        '4/5',
        'Viagem tranquila e segura. Motorista séria e focada.',
        6,
        10
    ),
    (
        'Bruce Wayne',
        'Sou Bruce Wayne, motorista noturno especializado. Discrição e segurança acima de tudo.',
        'Batmóvel versão Tumbler',
        '5/5',
        'Viagem extremamente confortável e rápida. O motorista é um cavalheiro.',
        25,
        60
    ),
    (
        'Scooby-Doo',
        'Ruh-roh! Scooby-Doo aqui. O Mystery Machine está pronto para te levar a qualquer lugar, mas cuidado com fantasmas!',
        'Mystery Machine',
        '4/5',
        'Muito divertido! Mas o veículo estava cheio de biscoitos Scooby.',
        4,
        3
    ),
    (
        'Doc Brown',
        'Great Scott! Sou o Dr. Brown. Vamos viajar pelo tempo e espaço, mas espero que você só precise de uma viagem convencional.',
        'DeLorean DMC-12 modificado com flux capacitor',
        '5/5',
        'Viagem única e inesquecível! Um pouco instável no início, mas o motorista é genial.',
        18,
        40
    ),
    (
        'Lara Croft',
        'Sou Lara Croft, pronta para qualquer terreno. Um passeio seguro e cheio de aventuras.',
        'Land Rover Defender personalizado',
        '4/5',
        'Viagem tranquila e segura. Motorista muito experiente e simpática.',
        7,
        15
    ),
    (
        'Ellen Ripley',
        'Sou Ellen Ripley, sua motorista interestelar. Segurança é minha prioridade, mesmo contra Aliens.',
        'Caminhão espacial Nostromo',
        '4/5',
        'Uma viagem segura, mas o veículo é um pouco intimidador.',
        30,
        70
    ),
    (
        'Duke Nukem',
        'Hail to the king, baby! Sou o Duke, pronto para levá-lo ao destino com estilo.',
        'Moto customizada com chamas',
        '3/5',
        'Estilo único, mas a música alta incomodou.',
        5,
        8
    ),
    (
        'Wonder Woman',
        'Olá, sou Diana Prince. Meu objetivo é levar você ao destino com segurança e agilidade.',
        'Invisible Jet',
        '5/5',
        'Incrível! Motorista gentil e o veículo é uma experiência única.',
        50,
        100
    );

-- Criação da tabela TripConfirm
CREATE TABLE IF NOT EXISTS TripConfirm (
    id SERIAL PRIMARY KEY,
    origin VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    distance FLOAT NOT NULL,
    duration VARCHAR(15) NOT NULL,
    customer VARCHAR(255) NOT NULL,
    driver JSONB NOT NULL,
    date TIMESTAMP NOT NULL,
    totalcost DECIMAL(10, 2) NOT NULL
);