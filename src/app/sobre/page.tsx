export default function SobrePage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Sobre o DoAção
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Conectando doadores e instituições para fazer a diferença
          </p>
        </div>

        <div className="mt-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900">Nossa Missão</h2>
            <p className="mt-4 text-lg text-gray-500">
              O DoAção nasceu da necessidade de criar uma ponte entre pessoas que desejam ajudar e instituições que precisam de apoio. 
              Nossa plataforma facilita o processo de doação, tornando-o mais transparente, seguro e eficiente.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Acreditamos que cada doação, por menor que seja, tem o poder de transformar vidas. 
              Por isso, trabalhamos diariamente para conectar doadores e instituições, 
              criando um impacto positivo em nossa sociedade.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Nossos Valores</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-gray-900">Transparência</h3>
              <p className="mt-2 text-gray-500">
                Acreditamos que a transparência é fundamental para construir confiança entre doadores e instituições.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-semibold text-gray-900">Inovação</h3>
              <p className="mt-2 text-gray-500">
                Buscamos constantemente novas formas de melhorar a experiência de doação e aumentar o impacto social.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold text-gray-900">Compromisso</h3>
              <p className="mt-2 text-gray-500">
                Estamos comprometidos em fazer a diferença na vida das pessoas através da tecnologia e da solidariedade.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Nossa História</h2>
          <div className="mt-8 space-y-8">
            <div className="relative pl-8 border-l-2 border-indigo-600">
              <div className="absolute -left-2.5 top-0 h-5 w-5 rounded-full bg-indigo-600"></div>
              <h3 className="text-xl font-semibold text-gray-900">2023</h3>
              <p className="mt-2 text-gray-500">
                Lançamento da plataforma DoAção com foco em conectar doadores e instituições de forma eficiente.
              </p>
            </div>
            <div className="relative pl-8 border-l-2 border-indigo-600">
              <div className="absolute -left-2.5 top-0 h-5 w-5 rounded-full bg-indigo-600"></div>
              <h3 className="text-xl font-semibold text-gray-900">2024</h3>
              <p className="mt-2 text-gray-500">
                Expansão para novas regiões e implementação de recursos avançados de rastreamento de doações.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 