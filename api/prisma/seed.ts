import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import * as argon2 from 'argon2';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...\n');

  // ─── Limpar dados existentes ─────────────────────────────────────────────
  await prisma.content.deleteMany();
  await prisma.course.deleteMany();
  await prisma.phone.deleteMany();
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.user.deleteMany();
  console.log('✅ Banco limpo\n');

  const password = await argon2.hash('senha@123');

  // ─── Admin ───────────────────────────────────────────────────────────────
  const admin = await prisma.user.create({
    data: {
      email: 'admin@di-edu.com',
      first_name: 'Douglas',
      last_name: 'Administrador',
      role: 'ADMIN',
      password,
      bio: 'Administrador da plataforma DI Educational.',
    },
  });
  console.log(`👤 Admin criado: ${admin.email}`);

  // ─── Professores ─────────────────────────────────────────────────────────
  const teacherUsers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'prof.ana@di-edu.com',
        first_name: 'Ana',
        last_name: 'Ferreira',
        role: 'TEACHER',
        password,
        bio: 'Professora especialista em Design UI/UX com 10 anos de experiência no mercado.',
      },
    }),
    prisma.user.create({
      data: {
        email: 'prof.carlos@di-edu.com',
        first_name: 'Carlos',
        last_name: 'Oliveira',
        role: 'TEACHER',
        password,
        bio: 'Engenheiro de Software com foco em back-end e arquitetura de sistemas.',
      },
    }),
    prisma.user.create({
      data: {
        email: 'prof.mariana@di-edu.com',
        first_name: 'Mariana',
        last_name: 'Costa',
        role: 'TEACHER',
        password,
        bio: 'Especialista em Marketing Digital e Growth Hacking.',
      },
    }),
    prisma.user.create({
      data: {
        email: 'prof.rafael@di-edu.com',
        first_name: 'Rafael',
        last_name: 'Santos',
        role: 'TEACHER',
        password,
        bio: 'Desenvolvedor Full Stack com experiência em React, Node e bancos de dados.',
      },
    }),
  ]);

  const teachers = await Promise.all(
    teacherUsers.map((u) =>
      prisma.teacher.create({ data: { id: u.id, salary: 5000 } }),
    ),
  );
  console.log(`👨‍🏫 ${teachers.length} professores criados`);

  // ─── Alunos ───────────────────────────────────────────────────────────────
  const studentUsers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'joao.silva@aluno.com',
        first_name: 'João',
        last_name: 'Silva',
        role: 'STUDENT',
        password,
      },
    }),
    prisma.user.create({
      data: {
        email: 'lucia.mendes@aluno.com',
        first_name: 'Lúcia',
        last_name: 'Mendes',
        role: 'STUDENT',
        password,
      },
    }),
    prisma.user.create({
      data: {
        email: 'pedro.rocha@aluno.com',
        first_name: 'Pedro',
        last_name: 'Rocha',
        role: 'STUDENT',
        password,
      },
    }),
    prisma.user.create({
      data: {
        email: 'julia.lima@aluno.com',
        first_name: 'Júlia',
        last_name: 'Lima',
        role: 'STUDENT',
        password,
      },
    }),
    prisma.user.create({
      data: {
        email: 'marcos.alves@aluno.com',
        first_name: 'Marcos',
        last_name: 'Alves',
        role: 'STUDENT',
        password,
      },
    }),
  ]);

  const students = await Promise.all(
    studentUsers.map((u, i) =>
      prisma.student.create({
        data: {
          id: u.id,
          enrollmentNumber: `2024${String(i + 1).padStart(4, '0')}`,
        },
      }),
    ),
  );
  console.log(`🎓 ${students.length} alunos criados`);

  // ─── Cursos ───────────────────────────────────────────────────────────────
  const now = new Date();
  const sixMonthsLater = new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000);

  const contentTypes = ['VIDEO', 'IMAGE', 'PDF'] as const;

  function buildContentUrl(type: (typeof contentTypes)[number], slug: string) {
    const base =
      type === 'IMAGE'
        ? 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80'
        : type === 'PDF'
          ? 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          : 'https://www.w3schools.com/html/mov_bbb.mp4';

    const separator = base.includes('?') ? '&' : '?';
    return `${base}${separator}slug=${slug}`;
  }

  const coursesData = [
    {
      name: 'Design UI/UX Avançado',
      description:
        'Domine os princípios e práticas avançadas de UI/UX para criar interfaces incríveis e centradas no usuário. Do wireframe ao protótipo de alta fidelidade.',
      imageUrl: null,
      adminUserId: teacherUsers[0].id,
      members: [studentUsers[0], studentUsers[1], studentUsers[2]],
      contents: [
        {
          name: 'Fundamentos de UI/UX',
          description:
            'Introdução aos princípios básicos de design de interfaces.',
        },
        {
          name: 'Pesquisa com Usuários',
          description:
            'Técnicas de pesquisa qualitativa e quantitativa com usuários.',
        },
        {
          name: 'Wireframes e Prototipagem',
          description: 'Criação de wireframes de baixa e alta fidelidade.',
        },
        {
          name: 'Design System',
          description: 'Como construir e manter um design system escalável.',
        },
        {
          name: 'Testes de Usabilidade',
          description: 'Planejamento e condução de testes com usuários reais.',
        },
      ],
    },
    {
      name: 'Desenvolvimento Web com React',
      description:
        'Aprenda React do zero ao avançado: hooks, context API, gerenciamento de estado com Zustand e integração com APIs GraphQL.',
      imageUrl: null,
      adminUserId: teacherUsers[3].id,
      members: [studentUsers[0], studentUsers[3], studentUsers[4]],
      contents: [
        {
          name: 'Introdução ao React',
          description: 'JSX, componentes funcionais e props.',
        },
        {
          name: 'Hooks Essenciais',
          description: 'useState, useEffect, useRef e hooks customizados.',
        },
        {
          name: 'Gerenciamento de Estado',
          description: 'Context API, Zustand e padrões avançados.',
        },
        {
          name: 'React + GraphQL',
          description: 'Consumindo APIs GraphQL com Apollo Client.',
        },
        {
          name: 'Deploy e Performance',
          description: 'Otimização de bundle e deploy na Vercel.',
        },
        {
          name: 'Testes com Vitest',
          description: 'Unit tests, integration tests e testing-library.',
        },
      ],
    },
    {
      name: 'Back-end com NestJS e Prisma',
      description:
        'Construa APIs robustas e escaláveis com NestJS, TypeScript e Prisma ORM. Aprenda autenticação JWT, GraphQL e boas práticas de arquitetura.',
      imageUrl: null,
      adminUserId: teacherUsers[1].id,
      members: [studentUsers[1], studentUsers[2], studentUsers[4]],
      contents: [
        {
          name: 'Introdução ao NestJS',
          description:
            'Módulos, controllers, services e injeção de dependência.',
        },
        {
          name: 'GraphQL com NestJS',
          description: 'Criando resolvers, mutations e queries.',
        },
        {
          name: 'Prisma ORM',
          description: 'Modelagem de dados, migrations e queries avançadas.',
        },
        {
          name: 'Autenticação com JWT',
          description: 'Implementando login, refresh token e guards.',
        },
        {
          name: 'Testes e Documentação',
          description: 'Testes unitários com Jest e documentação com Swagger.',
        },
      ],
    },
    {
      name: 'Marketing Digital e Growth',
      description:
        'Estratégias de growth hacking, SEO, tráfego pago e análise de métricas para fazer sua marca crescer no digital.',
      imageUrl: null,
      adminUserId: teacherUsers[2].id,
      members: [studentUsers[0], studentUsers[3]],
      contents: [
        {
          name: 'Fundamentos do Marketing Digital',
          description: 'O ecossistema digital e as principais estratégias.',
        },
        {
          name: 'SEO On-page e Off-page',
          description: 'Otimização para buscadores e link building.',
        },
        {
          name: 'Tráfego Pago (Google Ads)',
          description: 'Campanhas de busca, display e remarketing.',
        },
        {
          name: 'Redes Sociais e Conteúdo',
          description: 'Estratégias de conteúdo e gestão de comunidades.',
        },
        {
          name: 'Analytics e KPIs',
          description:
            'Métricas que importam e como tomar decisões baseadas em dados.',
        },
      ],
    },
    {
      name: 'Lógica de Programação e Algoritmos',
      description:
        'Fundamentos da computação: lógica de programação, estruturas de dados, algoritmos de busca e ordenação. A base para qualquer desenvolvedor.',
      imageUrl: null,
      adminUserId: teacherUsers[1].id,
      members: [studentUsers[2], studentUsers[4]],
      contents: [
        {
          name: 'Introdução à Lógica',
          description: 'Variáveis, tipos de dados e operadores.',
        },
        {
          name: 'Estruturas de Controle',
          description: 'Condicionais e laços de repetição.',
        },
        {
          name: 'Funções e Recursão',
          description: 'Modularização de código e recursividade.',
        },
        {
          name: 'Estruturas de Dados',
          description: 'Arrays, listas, pilhas, filas e árvores.',
        },
        {
          name: 'Algoritmos de Busca e Ordenação',
          description: 'BFS, DFS, QuickSort, MergeSort.',
        },
      ],
    },
    {
      name: 'Banco de Dados com PostgreSQL',
      description:
        'Do modelo relacional ao avançado: modelagem de dados, SQL completo, índices, transações e otimização de queries.',
      imageUrl: null,
      adminUserId: teacherUsers[1].id,
      members: [studentUsers[1], studentUsers[3], studentUsers[4]],
      contents: [
        {
          name: 'Modelagem Relacional',
          description: 'Entidades, relacionamentos e normalização.',
        },
        {
          name: 'SQL Básico',
          description: 'SELECT, INSERT, UPDATE, DELETE e JOINs.',
        },
        {
          name: 'SQL Avançado',
          description:
            'Subqueries, CTEs, window functions e stored procedures.',
        },
        {
          name: 'Índices e Performance',
          description: 'Como índices funcionam e como otimizar queries lentas.',
        },
        {
          name: 'Transações e Concorrência',
          description: 'ACID, isolamento e locks.',
        },
      ],
    },
  ];

  for (const courseData of coursesData) {
    const course = await prisma.course.create({
      data: {
        name: courseData.name,
        description: courseData.description,
        imageUrl: courseData.imageUrl,
        is_active: true,
        start_date: now,
        end_date: sixMonthsLater,
        userId: courseData.adminUserId,
        members: {
          connect: courseData.members.map((m) => ({ id: m.id })),
        },
        contents: {
          create: courseData.contents.map((c, index) => {
            const type = contentTypes[index % contentTypes.length];
            const slug = `${courseData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/${c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

            return {
              name: c.name,
              description: c.description,
              type,
              url: buildContentUrl(type, slug),
            };
          }),
        },
      },
    });
    console.log(
      `📚 Curso criado: "${course.name}" (${courseData.contents.length} conteúdos)`,
    );
  }

  console.log('\n🎉 Seed concluído com sucesso!');
  console.log('\n📋 Credenciais de acesso:');
  console.log('   Admin:      admin@di-edu.com   / senha@123');
  console.log('   Professor:  prof.ana@di-edu.com / senha@123');
  console.log('   Aluno:      joao.silva@aluno.com / senha@123');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
