export default function ComoFuncionaPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Como Funciona
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Um guia simples para começar a fazer a diferença
          </p>
        </div>

        <div className="mt-16">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-12">
              {/* Passo 1 */}
              <div className="relative">
                <div className="absolute -left-4 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white">
                  1
                </div>
                <div className="ml-8">
                  <h3 className="text-2xl font-bold text-gray-900">Crie sua conta</h3>
                  <p className="mt-4 text-lg text-gray-500">
                    Comece criando sua conta gratuita. Você pode se cadastrar como doador ou instituição.
                    O processo é rápido e seguro.
                  </p>
                </div>
              </div>

              {/* Passo 2 */}
              <div className="relative">
                <div className="absolute -left-4 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white">
                  2
                </div>
                <div className="ml-8">
                  <h3 className="text-2xl font-bold text-gray-900">Explore as necessidades</h3>
                  <p className="mt-4 text-lg text-gray-500">
                    Navegue pela plataforma e descubra as necessidades das instituições.
                    Você pode filtrar por tipo de doação, localização e muito mais.
                  </p>
                </div>
              </div>

              {/* Passo 3 */}
              <div className="relative">
                <div className="absolute -left-4 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white">
                  3
                </div>
                <div className="ml-8">
                  <h3 className="text-2xl font-bold text-gray-900">Faça sua doação</h3>
                  <p className="mt-4 text-lg text-gray-500">
                    Escolha o que deseja doar e agende a entrega. Você pode doar itens, tempo ou recursos financeiros.
                    Tudo é feito de forma transparente e segura.
                  </p>
                </div>
              </div>

              {/* Passo 4 */}
              <div className="relative">
                <div className="absolute -left-4 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white">
                  4
                </div>
                <div className="ml-8">
                  <h3 className="text-2xl font-bold text-gray-900">Acompanhe o impacto</h3>
                  <p className="mt-4 text-lg text-gray-500">
                    Receba atualizações sobre como sua doação está sendo utilizada.
                    Veja o impacto real que você está causando na vida das pessoas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Dicas */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Dicas para Doações</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-900">Itens em bom estado</h3>
              <p className="mt-2 text-gray-500">
                Doe apenas itens em condições de uso. Isso demonstra respeito e cuidado com quem receberá.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-gray-900">Respeite os horários</h3>
              <p className="mt-2 text-gray-500">
                Mantenha os compromissos de entrega. A pontualidade é importante para as instituições.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-900">Mantenha contato</h3>
              <p className="mt-2 text-gray-500">
                Estabeleça uma comunicação clara com a instituição. Tire suas dúvidas antes de doar.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Pronto para começar?</h2>
          <p className="mt-4 text-lg text-gray-500">
            Junte-se a nós e faça parte dessa rede de solidariedade.
          </p>
          <div className="mt-8">
            <a
              href="/cadastro"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700"
            >
              Criar minha conta
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 