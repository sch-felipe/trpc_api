// Teste simples para criar usuário
const fetch = require('node-fetch');

async function testCreateUser() {
  try {
    const response = await fetch('http://localhost:3000/trpc/users.create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'João Silva',
        email: 'joao@email.com'
      })
    });

    const result = await response.json();
    console.log('✅ Usuário criado:', result);

    // Testar buscar todos os usuários
    const getAllResponse = await fetch('http://localhost:3000/trpc/users.getAll', {
      method: 'GET',
    });
    
    const allUsers = await getAllResponse.json();
    console.log('📋 Todos os usuários:', allUsers);

  } catch (error) {
    console.error('❌ Erro:', error);
  }
}

testCreateUser();