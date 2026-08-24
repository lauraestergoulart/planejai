Planej.ai — Educador Financeiro com React e IA Generativa
Este projeto foi desenvolvido a partir do desafio da DIO, como parte da trilha de aprendizado de Front-End com React e IA.
O que o projeto faz
O Planej.ai é uma aplicação web de planejamento financeiro pessoal. O usuário preenche um formulário em etapas com informações sobre sua renda, gastos fixos, dívidas e uma meta financeira (como uma viagem ou a compra de um bem). Com base nesses dados, a aplicação usa a API do Google Gemini para gerar um diagnóstico personalizado, com sugestões práticas, ideias de renda extra, indicações de investimento e uma mensagem motivacional.
Tudo funciona direto no navegador: não há backend nem banco de dados remoto. Os dados ficam salvos no localStorage do próprio navegador, e as análises são geradas em tempo real pela IA.
Como executar a aplicação
Clone este repositório e entre na pasta do projeto:
bash
git clone https://github.com/lauraestergoulart/planejai.git
cd planejai
Instale as dependências (o projeto usa pnpm):
bash
pnpm install
Crie uma chave de API gratuita no Google AI Studio e crie o arquivo .env.local na raiz do projeto com o conteúdo:
VITE_GEMINI_API_KEY=sua_chave_aqui
Rode o projeto em modo de desenvolvimento:
bash
pnpm dev
Acesse http://localhost:5173 no navegador.
Tecnologias usadas
React 19 — biblioteca principal de interface
TypeScript — tipagem estática
Vite — build tool e servidor de desenvolvimento
React Router DOM — navegação entre páginas (SPA)
Tailwind CSS v4 — estilização utilitária
Google Gemini API — geração dos insights financeiros com IA
localStorage — persistência dos dados no navegador
react-loading-skeleton — estados de carregamento
lucide-react — ícones
Melhoria implementada
Implementei o Desafio 1 proposto no repositório original: a página de Histórico de Simulações.
O que ela faz:
Lista todas as simulações já realizadas, com nome da meta, valor, prazo e data, ordenadas da mais recente para a mais antiga.
Exibe uma mensagem de estado vazio quando ainda não há nenhuma simulação salva.
Permite excluir uma simulação, com uma confirmação antes de remover (para evitar exclusão acidental).
Ao clicar em "Ver detalhes", leva até a página de resultado da simulação escolhida. Como o insight gerado pela IA já fica salvo junto com os dados da simulação, a página não chama a IA novamente — o diagnóstico aparece na hora.
Para isso, criei um id único e um campo createdAt para cada simulação salva, e adicionei as funções getAllSimulations e deleteSimulation ao hook useSimulationStorage.
Como testar o fluxo principal
Na tela inicial, preencha o formulário de simulação até o fim (renda, custos fixos, dívidas, nome da meta, valor da meta e prazo em meses).
Ao concluir, você será redirecionado para a página de resultado, onde a IA gera o diagnóstico financeiro (com um carregamento tipo skeleton enquanto isso acontece).
Repita o processo mais de uma vez, com dados diferentes, para gerar várias simulações.
Clique em "Histórico" no cabeçalho para ver todas as simulações salvas.
Clique em "Ver detalhes" em uma simulação já processada e confirme que o diagnóstico aparece instantaneamente (sem nova chamada à IA).
Clique no botão de excluir em um dos cards, confirme a exclusão e veja que a simulação some da lista.
O que eu aprendi durante o desafio
Como estruturar uma aplicação React com TypeScript usando Vite, sem depender de um backend.
Como montar um prompt estruturado para uma IA generativa, definindo papel, formato de saída, schema e regras de restrição para obter respostas consistentes.
Como usar o localStorage de forma organizada, isolando toda a lógica de persistência dentro de um hook customizado (useSimulationStorage).
Como evitar chamadas duplicadas a uma API externa em componentes React, especialmente considerando o comportamento do Strict Mode em desenvolvimento.
A importância de tratar estados de carregamento e erro nas telas, para melhorar a experiência de quem está usando a aplicação.
Como debugar erros de import no Vite/TypeScript e resolver conflitos de merge no Git ao trabalhar com um fork.
