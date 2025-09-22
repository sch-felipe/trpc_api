import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './src/routers';

// Cliente tRPC tipado
const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});

async function testUserOperations() {
  try {
    console.log('🚀 Testando operações de usuário...\n');

    // 1. Criar usuário
    console.log('1. Criando usuário...');
    const newUser = await client.users.create.mutate({
      name: 'Maria Santos',
      email: 'maria@email.com'
    });
    console.log('✅ Usuário criado:', newUser);

    // 2. Listar todos
    console.log('\n2. Listando todos os usuários...');
    const allUsers = await client.users.getAll.query();
    console.log('📋 Usuários:', allUsers);

    // 3. Buscar por ID
    console.log('\n3. Buscando usuário por ID...');
    const userById = await client.users.getById.query({ id: newUser.id });
    console.log('🔍 Usuário encontrado:', userById);

    // 4. Atualizar usuário
    console.log('\n4. Atualizando usuário...');
    const updatedUser = await client.users.update.mutate({
      id: newUser.id,
      name: 'Maria Santos Silva'
    });
    console.log('🔄 Usuário atualizado:', updatedUser);

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

testUserOperations();