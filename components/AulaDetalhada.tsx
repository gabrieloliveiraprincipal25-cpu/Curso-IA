"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, GraduationCap, Clock, Users, Target } from "lucide-react"

interface Aula {
  id: number
  titulo: string
  descricao: string
  duracao: string
  topicos: string[]
  atividades: number
  quiz: boolean
}

interface AulaDetalhadaProps {
  aula: Aula
  onVoltar: () => void
  onCompletar: () => void
  completa: boolean
  tipoUsuario?: "aluno" | "professor" | null
}

export default function AulaDetalhada({ aula, onVoltar, onCompletar, completa, tipoUsuario }: AulaDetalhadaProps) {
  const [secaoAtual, setSecaoAtual] = useState(0)
  const [respostasQuiz, setRespostasQuiz] = useState<{ [key: number]: string }>({})
  const [mostrarResultados, setMostrarResultados] = useState(false)

  const secoes = [
    {
      tipo: "introducao",
      titulo: "Introdução",
      conteudo: aula.topicos[0],
    },
    {
      tipo: "conteudo",
      titulo: "Conteúdo Principal",
      conteudo: aula.topicos.slice(1, -1),
    },
    {
      tipo: "atividade",
      titulo: "Atividade Prática",
      conteudo: aula.topicos[aula.topicos.length - 1],
    },
    {
      tipo: "quiz",
      titulo: "Quiz de Verificação",
      conteudo: "Teste seus conhecimentos",
    },
  ]

  const conteudoProfessor = {
    1: {
      introducao: {
        roteiro:
          "Comece a aula perguntando aos alunos: 'Quantos de vocês já conversaram com Siri ou Alexa hoje?' Use essa pergunta para introduzir o conceito de que IA já faz parte do cotidiano deles. Explique que vamos descobrir juntos o que realmente é essa tecnologia que parece mágica.",
        objetivos:
          "Ao final desta seção, os alunos devem conseguir definir IA com suas próprias palavras e citar pelo menos 3 exemplos do cotidiano.",
        tempo: "5 minutos de abertura + 15 minutos de apresentação",
        dicas:
          "Use analogias simples: 'IA é como ensinar uma criança muito inteligente a reconhecer padrões'. Evite termos técnicos complexos na primeira aula.",
      },
      conteudo: {
        roteiro:
          "Apresente a linha do tempo da IA usando exemplos que os alunos conhecem. Quando falar do Deep Blue vs Kasparov, pergunte: 'Quem aqui joga xadrez?' Conecte com jogos que eles conhecem. Para IA Fraca vs Forte, use o exemplo do GPS: ele é muito bom em uma coisa (navegação) mas não sabe cozinhar.",
        atividades:
          "Divida a turma em grupos. Cada grupo deve listar 10 tecnologias que usam diariamente e identificar quais usam IA. Circule pelos grupos fazendo perguntas provocativas: 'Por que vocês acham que o Instagram mostra certas fotos primeiro?'",
        tempo: "20 minutos de apresentação + 15 minutos de atividade em grupo",
        recursos:
          "Use vídeos curtos (2-3 min) mostrando IA em ação. Tenha exemplos visuais: mostre como o Google Tradutor funciona em tempo real.",
      },
      atividade: {
        instrucoes:
          "Atividade 'Caça à IA': Os alunos devem fotografar ou anotar 5 exemplos de IA que encontrarem na escola (câmeras de segurança, sistema de som automático, etc.). Depois, cada grupo apresenta suas descobertas explicando por que acham que é IA.",
        avaliacao:
          "Observe se os alunos conseguem justificar suas escolhas. Não há respostas certas ou erradas, o importante é o raciocínio.",
        tempo: "15 minutos para explorar + 10 minutos para apresentações",
      },
    },
    2: {
      introducao: {
        roteiro:
          "Inicie com uma notícia recente sobre IA (prepare 2-3 exemplos atuais). Pergunte: 'Vocês viram essa notícia? O que acham?' Use isso para mostrar que IA não é ficção científica, está acontecendo agora.",
        objetivos:
          "Os alunos devem compreender como IA impacta diferentes setores e conseguir debater benefícios e riscos de forma fundamentada.",
        tempo: "5 minutos de notícias + 20 minutos de apresentação setorial",
        dicas: "Para cada setor, sempre pergunte: 'Como isso afeta vocês diretamente?' Torne pessoal e relevante.",
      },
      conteudo: {
        roteiro:
          "Organize por setores. Para saúde: 'Alguém já fez exame de raio-X? Hoje, IA pode detectar fraturas mais rápido que médicos.' Para educação: 'Imaginem um professor que conhece exatamente como cada um aprende melhor.' Para transporte: 'Quem aqui quer tirar carteira? E se não precisassem mais dirigir?'",
        debates:
          "Após cada setor, faça mini-debates: 'Vocês confiariam em um diagnóstico feito por IA?' 'Prefeririam aulas personalizadas por IA ou professores humanos?' Anote pontos interessantes no quadro.",
        tempo: "5 minutos por setor + 5 minutos de debate por setor",
        recursos:
          "Tenha vídeos de carros autônomos, exemplos de arte criada por IA, casos reais de diagnósticos médicos.",
      },
      atividade: {
        instrucoes:
          "Debate estruturado: Divida a turma em 'defensores' e 'céticos' da IA. Cada grupo prepara argumentos para um setor específico. Depois trocam de lado e defendem a posição oposta.",
        moderacao:
          "Atue como moderador. Faça perguntas provocativas: 'E se a IA substituir o trabalho dos pais de vocês?' Mantenha o debate respeitoso mas intenso.",
        tempo: "10 minutos de preparação + 15 minutos de debate + 5 minutos de síntese",
      },
    },
    3: {
      introducao: {
        roteiro:
          "Comece com um dilema ético real: 'Um carro autônomo deve atropelar uma pessoa ou bater na parede, colocando o passageiro em risco?' Deixe eles debaterem 5 minutos antes de apresentar o conteúdo formal.",
        objetivos:
          "Os alunos devem desenvolver pensamento crítico sobre IA, compreender questões éticas complexas e propor soluções para uso responsável da tecnologia.",
        tempo: "10 minutos de dilema inicial + 25 minutos de conteúdo ético",
        dicas:
          "Esta é a aula mais complexa. Use exemplos concretos e pessoais. Evite respostas prontas - o objetivo é que eles pensem criticamente.",
      },
      conteudo: {
        roteiro:
          "Para cada tópico ético, use casos reais: viés algorítmico (mostre exemplos de sistemas de recrutamento discriminatórios), privacidade (como TikTok coleta dados), transparência (por que não sabemos como Netflix escolhe filmes). Sempre pergunte: 'O que vocês fariam se fossem os criadores dessa IA?'",
        discussoes:
          "Crie cenários hipotéticos: 'Vocês são CEOs de uma empresa de IA. Como garantiriam que seu produto não seja usado para prejudicar pessoas?' Anote as soluções propostas pelos alunos.",
        tempo: "8 minutos por tópico ético + discussão contínua",
        recursos:
          "Tenha exemplos visuais de viés (fotos de resultados de busca tendenciosos), dados sobre privacidade, casos de transparência.",
      },
      atividade: {
        instrucoes:
          "Projeto final: Cada grupo cria um 'Código de Ética para IA' com 5 regras fundamentais. Devem justificar cada regra com exemplos práticos e apresentar como se fossem consultores contratados pelo governo.",
        apresentacao:
          "Cada grupo tem 5 minutos para apresentar seu código. Os outros grupos podem fazer perguntas e sugerir melhorias. Vote no código mais completo.",
        tempo: "20 minutos para criar + 15 minutos de apresentações + 5 minutos de votação",
      },
    },
  }

  const perguntasQuiz = [
    {
      pergunta: "O que significa IA?",
      opcoes: ["Inteligência Artificial", "Internet Avançada", "Informação Automática", "Instrução Avançada"],
      correta: 0,
    },
    {
      pergunta: "Qual é um exemplo de IA no dia a dia?",
      opcoes: ["Calculadora simples", "Assistentes virtuais como Siri", "Televisão", "Rádio"],
      correta: 1,
    },
    {
      pergunta: "A IA pode substituir completamente os humanos?",
      opcoes: [
        "Sim, em todas as tarefas",
        "Não, ela complementa o trabalho humano",
        "Apenas em jogos",
        "Só no futuro distante",
      ],
      correta: 1,
    },
  ]

  const proximaSecao = () => {
    if (secaoAtual < secoes.length - 1) {
      setSecaoAtual(secaoAtual + 1)
    }
  }

  const secaoAnterior = () => {
    if (secaoAtual > 0) {
      setSecaoAtual(secaoAtual - 1)
    }
  }

  const responderQuiz = (perguntaIndex: number, resposta: string) => {
    setRespostasQuiz({
      ...respostasQuiz,
      [perguntaIndex]: resposta,
    })
  }

  const finalizarQuiz = () => {
    setMostrarResultados(true)
  }

  const calcularPontuacao = () => {
    let acertos = 0
    perguntasQuiz.forEach((pergunta, index) => {
      if (respostasQuiz[index] === pergunta.opcoes[pergunta.correta]) {
        acertos++
      }
    })
    return acertos
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header da Aula */}
      <header className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={onVoltar}>
                ← Voltar ao Curso
              </Button>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-foreground">{aula.titulo}</h1>
                  {tipoUsuario === "professor" && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" />
                      Modo Professor
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">{aula.descricao}</p>
              </div>
            </div>
            {completa && (
              <Badge className="bg-primary text-primary-foreground">
                <CheckCircle className="h-4 w-4 mr-1" />
                Completa
              </Badge>
            )}
          </div>

          {/* Progresso da Aula */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>
                Seção {secaoAtual + 1} de {secoes.length}
              </span>
              <span>{Math.round(((secaoAtual + 1) / secoes.length) * 100)}%</span>
            </div>
            <Progress value={((secaoAtual + 1) / secoes.length) * 100} className="h-2" />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {tipoUsuario === "professor" && conteudoProfessor[aula.id as keyof typeof conteudoProfessor] && (
          <Card className="mb-6 border-l-4 border-l-primary bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <GraduationCap className="h-5 w-5" />
                Guia do Professor - {secoes[secaoAtual].titulo}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {secoes[secaoAtual].tipo === "introducao" &&
                conteudoProfessor[aula.id as keyof typeof conteudoProfessor].introducao && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                          <Target className="h-4 w-4 text-primary" />
                          Roteiro de Abertura
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {conteudoProfessor[aula.id as keyof typeof conteudoProfessor].introducao.roteiro}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-primary" />
                          Tempo Sugerido
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {conteudoProfessor[aula.id as keyof typeof conteudoProfessor].introducao.tempo}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                          <Target className="h-4 w-4 text-primary" />
                          Objetivos Específicos
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {conteudoProfessor[aula.id as keyof typeof conteudoProfessor].introducao.objetivos}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold flex items-center gap-2 mb-2">💡 Dicas Pedagógicas</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {conteudoProfessor[aula.id as keyof typeof conteudoProfessor].introducao.dicas}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              {secoes[secaoAtual].tipo === "conteudo" &&
                conteudoProfessor[aula.id as keyof typeof conteudoProfessor].conteudo && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold flex items-center gap-2 mb-2">📋 Roteiro Detalhado</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {conteudoProfessor[aula.id as keyof typeof conteudoProfessor].conteudo.roteiro}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-primary" />
                          Distribuição do Tempo
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {conteudoProfessor[aula.id as keyof typeof conteudoProfessor].conteudo.tempo}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-primary" />
                          Estratégias de Engajamento
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {conteudoProfessor[aula.id as keyof typeof conteudoProfessor].conteudo.atividades ||
                            conteudoProfessor[aula.id as keyof typeof conteudoProfessor].conteudo.debates}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold flex items-center gap-2 mb-2">🎥 Recursos Recomendados</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {conteudoProfessor[aula.id as keyof typeof conteudoProfessor].conteudo.recursos}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              {secoes[secaoAtual].tipo === "atividade" &&
                conteudoProfessor[aula.id as keyof typeof conteudoProfessor].atividade && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold flex items-center gap-2 mb-2">🎯 Instruções Detalhadas</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {conteudoProfessor[aula.id as keyof typeof conteudoProfessor].atividade.instrucoes}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-primary" />
                          Cronometragem
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {conteudoProfessor[aula.id as keyof typeof conteudoProfessor].atividade.tempo}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold flex items-center gap-2 mb-2">📊 Critérios de Avaliação</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {conteudoProfessor[aula.id as keyof typeof conteudoProfessor].atividade.avaliacao ||
                            conteudoProfessor[aula.id as keyof typeof conteudoProfessor].atividade.moderacao}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
            </CardContent>
          </Card>
        )}

        <Card className="min-h-[500px]">
          <CardHeader>
            <CardTitle className="text-xl">{secoes[secaoAtual].titulo}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {secoes[secaoAtual].tipo === "introducao" && (
              <div className="space-y-4">
                <div className="bg-primary/10 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-primary">{secoes[secaoAtual].conteudo}</h3>
                  <p className="text-muted-foreground">
                    Nesta aula, vamos explorar os conceitos fundamentais da Inteligência Artificial e entender como ela
                    está presente em nossas vidas diárias.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-border rounded-lg">
                      <h4 className="font-semibold mb-2">🎯 Objetivos</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Compreender o que é IA</li>
                        <li>• Identificar exemplos práticos</li>
                        <li>• Discutir impactos sociais</li>
                      </ul>
                    </div>
                    <div className="p-4 border border-border rounded-lg">
                      <h4 className="font-semibold mb-2">⏱️ Duração</h4>
                      <p className="text-sm text-muted-foreground">{aula.duracao}</p>
                      <h4 className="font-semibold mb-2 mt-3">📚 Atividades</h4>
                      <p className="text-sm text-muted-foreground">{aula.atividades} atividades práticas</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {secoes[secaoAtual].tipo === "conteudo" && (
              <div className="space-y-6">
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold mb-4">Conteúdo da Aula</h3>
                  {Array.isArray(secoes[secaoAtual].conteudo) ? (
                    <div className="space-y-4">
                      {(secoes[secaoAtual].conteudo as string[]).map((topico, index) => (
                        <div key={index} className="p-4 bg-muted rounded-lg">
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">
                              {index + 1}
                            </span>
                            {topico}
                          </h4>
                          <div className="text-sm text-muted-foreground ml-8 space-y-2">
                            {aula.id === 1 && index === 0 && (
                              <div>
                                <p>
                                  <strong>História da IA:</strong> A IA começou na década de 1950 com Alan Turing e o
                                  "Teste de Turing". Passou por períodos de grande entusiasmo e "invernos da IA" até
                                  chegar aos avanços atuais com machine learning e deep learning.
                                </p>
                                <p>
                                  <strong>Marcos importantes:</strong> 1997 - Deep Blue vence Kasparov no xadrez; 2011 -
                                  Watson vence no Jeopardy; 2016 - AlphaGo vence no Go.
                                </p>
                              </div>
                            )}
                            {aula.id === 1 && index === 1 && (
                              <div>
                                <p>
                                  <strong>IA Fraca (Narrow AI):</strong> Sistemas especializados em tarefas específicas,
                                  como reconhecimento de voz ou recomendações de filmes.
                                </p>
                                <p>
                                  <strong>IA Forte (General AI):</strong> Hipotética IA com capacidades cognitivas
                                  equivalentes aos humanos em todas as áreas.
                                </p>
                              </div>
                            )}
                            {aula.id === 1 && index === 2 && (
                              <div>
                                <p>
                                  <strong>Exemplos cotidianos:</strong> Assistentes virtuais (Siri, Alexa), sistemas de
                                  recomendação (Netflix, Spotify), navegação GPS, filtros de spam, tradutores
                                  automáticos.
                                </p>
                                <p>
                                  <strong>Como identificar:</strong> Sistemas que aprendem, se adaptam e tomam decisões
                                  baseadas em dados.
                                </p>
                              </div>
                            )}
                            {aula.id === 2 && index === 0 && (
                              <div>
                                <p>
                                  <strong>Diagnósticos médicos:</strong> IA analisa exames de imagem para detectar
                                  câncer, doenças cardíacas e outras condições com precisão superior aos médicos em
                                  alguns casos.
                                </p>
                                <p>
                                  <strong>Descoberta de medicamentos:</strong> Acelera o processo de desenvolvimento de
                                  novos medicamentos de anos para meses.
                                </p>
                              </div>
                            )}
                            {aula.id === 2 && index === 1 && (
                              <div>
                                <p>
                                  <strong>Personalização do ensino:</strong> Sistemas adaptativos que ajustam o conteúdo
                                  ao ritmo de cada aluno.
                                </p>
                                <p>
                                  <strong>Correção automática:</strong> Avaliação instantânea de exercícios e feedback
                                  personalizado.
                                </p>
                              </div>
                            )}
                            {aula.id === 2 && index === 2 && (
                              <div>
                                <p>
                                  <strong>Veículos autônomos:</strong> Carros que dirigem sozinhos usando sensores,
                                  câmeras e algoritmos de IA.
                                </p>
                                <p>
                                  <strong>Otimização de tráfego:</strong> Sistemas inteligentes que controlam semáforos
                                  e rotas para reduzir congestionamentos.
                                </p>
                              </div>
                            )}
                            {aula.id === 2 && index === 3 && (
                              <div>
                                <p>
                                  <strong>Algoritmos de recomendação:</strong> Como o YouTube, Instagram e TikTok
                                  decidem o que mostrar para você.
                                </p>
                                <p>
                                  <strong>Criação de conteúdo:</strong> IA que gera música, arte, textos e até roteiros
                                  de filmes.
                                </p>
                              </div>
                            )}
                            {aula.id === 3 && index === 0 && (
                              <div>
                                <p>
                                  <strong>Transparência:</strong> Como garantir que as decisões da IA sejam explicáveis
                                  e compreensíveis.
                                </p>
                                <p>
                                  <strong>Responsabilidade:</strong> Quem é responsável quando uma IA comete um erro ou
                                  causa danos.
                                </p>
                              </div>
                            )}
                            {aula.id === 3 && index === 1 && (
                              <div>
                                <p>
                                  <strong>Coleta de dados:</strong> Como nossas informações pessoais são usadas para
                                  treinar sistemas de IA.
                                </p>
                                <p>
                                  <strong>LGPD e IA:</strong> Como a Lei Geral de Proteção de Dados se aplica aos
                                  sistemas inteligentes.
                                </p>
                              </div>
                            )}
                            {aula.id === 3 && index === 2 && (
                              <div>
                                <p>
                                  <strong>Preconceitos nos dados:</strong> Como dados históricos podem perpetuar
                                  discriminação racial, de gênero ou social.
                                </p>
                                <p>
                                  <strong>Exemplos reais:</strong> Sistemas de recrutamento que discriminavam mulheres,
                                  algoritmos de justiça criminal com viés racial.
                                </p>
                              </div>
                            )}
                            {/* Conteúdos reflexivos específicos por aula e tópico */}
                            {aula.id === 1 && index === 0 && topico.includes("História") && (
                              <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                                <h5 className="font-semibold text-blue-800 mb-2">💭 Para Reflexão:</h5>
                                <p className="text-blue-700 text-sm leading-relaxed">
                                  "Se Alan Turing estivesse vivo hoje, o que ele pensaria sobre assistentes virtuais
                                  como Alexa e Siri? Será que eles passariam no famoso 'Teste de Turing'? Reflita sobre
                                  como nossa definição de 'inteligência' evoluiu desde os anos 1950. O que consideramos
                                  'inteligente' em uma máquina hoje pode ser diferente do que nossos avós consideravam.
                                  Como você definiria inteligência artificial para alguém que nunca ouviu falar disso?"
                                </p>
                              </div>
                            )}

                            {aula.id === 1 && index === 1 && topico.includes("Tipos") && (
                              <div className="mt-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                                <h5 className="font-semibold text-green-800 mb-2">🤔 Questão para Debate:</h5>
                                <p className="text-green-700 text-sm leading-relaxed">
                                  "Imagine que você tem um assistente pessoal que conhece todos os seus gostos, agenda
                                  suas reuniões, escolhe suas roupas e até sugere o que comer. Isso seria IA Fraca ou
                                  Forte? Por quê? Agora pense: se essa mesma IA começasse a questionar suas decisões,
                                  sugerir mudanças em sua personalidade e demonstrar criatividade própria, isso mudaria
                                  sua classificação? Discuta em grupo: onde está a linha entre uma ferramenta muito
                                  avançada e uma verdadeira inteligência?"
                                </p>
                              </div>
                            )}

                            {aula.id === 1 && index === 2 && topico.includes("Exemplos") && (
                              <div className="mt-4 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                                <h5 className="font-semibold text-purple-800 mb-2">🔍 Investigação Pessoal:</h5>
                                <p className="text-purple-700 text-sm leading-relaxed">
                                  "Faça um experimento: durante um dia inteiro, anote todas as vezes que você interage
                                  com IA sem perceber. Desde o momento que acorda (despertador inteligente?) até dormir
                                  (Netflix sugerindo filmes). Você ficará surpreso! Agora reflita: como seria sua vida
                                  sem essas tecnologias? Você se sentiria mais livre ou mais limitado? Essas IAs estão
                                  te ajudando a tomar melhores decisões ou estão decidindo por você?"
                                </p>
                              </div>
                            )}

                            {aula.id === 2 && index === 0 && topico.includes("Saúde") && (
                              <div className="mt-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                                <h5 className="font-semibold text-red-800 mb-2">⚕️ Dilema Ético:</h5>
                                <p className="text-red-700 text-sm leading-relaxed">
                                  "Uma IA detecta um câncer que três médicos especialistas não conseguiram identificar,
                                  salvando uma vida. Mas na semana seguinte, a mesma IA comete um erro e sugere um
                                  tratamento errado. Questão: você confiaria mais na IA ou nos médicos? Como paciente,
                                  você gostaria de saber se seu diagnóstico foi feito por uma máquina? E se você fosse
                                  médico, como se sentiria sendo 'corrigido' por um algoritmo? Reflita sobre o
                                  equilíbrio entre tecnologia e toque humano na medicina."
                                </p>
                              </div>
                            )}

                            {aula.id === 2 && index === 1 && topico.includes("Educação") && (
                              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                                <h5 className="font-semibold text-yellow-800 mb-2">📚 Reflexão Educacional:</h5>
                                <p className="text-yellow-700 text-sm leading-relaxed">
                                  "Imagine uma escola onde cada aluno tem um tutor de IA personalizado que conhece
                                  exatamente como você aprende melhor, seus pontos fortes e fracos, e adapta cada lição
                                  para você. Parece perfeito, não é? Mas pense: o que perdemos quando não enfrentamos
                                  dificuldades? Quando não precisamos nos esforçar para entender algo difícil? A
                                  frustração e o erro fazem parte do aprendizado? Como você se sentiria sabendo que sua
                                  educação foi 'programada' por algoritmos?"
                                </p>
                              </div>
                            )}

                            {aula.id === 2 && index === 2 && topico.includes("Transporte") && (
                              <div className="mt-4 p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-400">
                                <h5 className="font-semibold text-indigo-800 mb-2">🚗 Cenário Futuro:</h5>
                                <p className="text-indigo-700 text-sm leading-relaxed">
                                  "É 2035. Carros autônomos são obrigatórios e acidentes de trânsito praticamente não
                                  existem mais. Mas você sente saudade de dirigir, da liberdade de escolher seu próprio
                                  caminho, mesmo que fosse menos eficiente. Questão: vale a pena trocar nossa autonomia
                                  pessoal por segurança coletiva? Se um carro autônomo tiver que escolher entre
                                  atropelar uma pessoa ou bater numa parede (colocando o passageiro em risco), como ele
                                  deve decidir? Quem programa essas decisões morais nas máquinas?"
                                </p>
                              </div>
                            )}

                            {aula.id === 2 && index === 3 && topico.includes("Entretenimento") && (
                              <div className="mt-4 p-4 bg-pink-50 rounded-lg border-l-4 border-pink-400">
                                <h5 className="font-semibold text-pink-800 mb-2">🎭 Reflexão Cultural:</h5>
                                <p className="text-pink-700 text-sm leading-relaxed">
                                  "O algoritmo do TikTok conhece seus gostos melhor que seus próprios amigos. Ele sabe
                                  que tipo de música te emociona, que piadas te fazem rir, que conteúdo te prende por
                                  horas. Mas será que ele está te mostrando quem você realmente é, ou está te moldando
                                  para ser alguém? Quando uma IA cria uma música que te arrepia ou uma arte que te
                                  inspira, quem é o verdadeiro artista? Reflita: estamos descobrindo nossos gostos ou
                                  sendo programados para ter certos gostos?"
                                </p>
                              </div>
                            )}

                            {aula.id === 3 && index === 0 && topico.includes("Transparência") && (
                              <div className="mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400">
                                <h5 className="font-semibold text-gray-800 mb-2">🔍 Caixa Preta:</h5>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                  "Você é rejeitado para um emprego e descobre que foi uma IA que analisou seu
                                  currículo. Quando pergunta o motivo, a empresa diz: 'O algoritmo decidiu, mas não
                                  sabemos exatamente por quê'. Isso é justo? Temos o direito de entender como as
                                  máquinas tomam decisões sobre nossas vidas? Mas e se explicar o algoritmo permitisse
                                  que pessoas mal-intencionadas o enganassem? Existe um equilíbrio entre transparência e
                                  segurança? Como você se sentiria vivendo em um mundo onde máquinas tomam decisões
                                  importantes sobre você, mas ninguém consegue explicar como?"
                                </p>
                              </div>
                            )}

                            {aula.id === 3 && index === 1 && topico.includes("Privacidade") && (
                              <div className="mt-4 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                                <h5 className="font-semibold text-orange-800 mb-2">🔒 Seu Eu Digital:</h5>
                                <p className="text-orange-700 text-sm leading-relaxed">
                                  "Uma empresa de IA afirma conhecer sua personalidade melhor que você mesmo, baseada em
                                  seus cliques, curtidas e tempo gasto em cada conteúdo. Ela pode prever suas decisões
                                  com 85% de precisão. Isso te assusta ou te fascina? Pense: se alguém pode prever seu
                                  comportamento, você ainda tem livre arbítrio? Seus dados pessoais são realmente 'seus'
                                  se você não controla como são usados? Reflita sobre o preço da conveniência: vale a
                                  pena trocar privacidade por serviços personalizados?"
                                </p>
                              </div>
                            )}

                            {aula.id === 3 && index === 2 && topico.includes("Viés") && (
                              <div className="mt-4 p-4 bg-teal-50 rounded-lg border-l-4 border-teal-400">
                                <h5 className="font-semibold text-teal-800 mb-2">⚖️ Espelho da Sociedade:</h5>
                                <p className="text-teal-700 text-sm leading-relaxed">
                                  "Se uma IA aprende com dados históricos onde mulheres ganhavam menos que homens, ela
                                  pode perpetuar essa desigualdade em decisões futuras de contratação. A IA não é
                                  preconceituosa por maldade, mas por reflexo da sociedade que a treinou. Questão
                                  profunda: como criar uma IA mais justa que a própria humanidade? É possível uma
                                  máquina ser mais ética que seus criadores? Quem deve decidir o que é 'justo' para uma
                                  IA? Reflita: nossos preconceitos inconscientes estão sendo amplificados pela
                                  tecnologia?"
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>{secoes[secaoAtual].conteudo}</p>
                  )}
                </div>
              </div>
            )}

            {secoes[secaoAtual].tipo === "atividade" && (
              <div className="space-y-6">
                <div className="bg-accent/10 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-accent-foreground">
                    🎯 Atividade Prática: {secoes[secaoAtual].conteudo}
                  </h3>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Vamos colocar em prática o que aprendemos! Esta atividade pode ser realizada individualmente ou em
                      grupos.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Instruções</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                          <p>1. Forme grupos de 3-4 alunos</p>
                          <p>2. Identifique 5 exemplos de IA no cotidiano</p>
                          <p>3. Discuta os benefícios e riscos</p>
                          <p>4. Apresente para a turma</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Tempo</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                          <p>⏱️ 15 minutos para discussão</p>
                          <p>🎤 5 minutos por apresentação</p>
                          <p>💬 5 minutos para perguntas</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {secoes[secaoAtual].tipo === "quiz" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Quiz de Verificação</h3>

                {!mostrarResultados ? (
                  <div className="space-y-6">
                    {perguntasQuiz.map((pergunta, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="text-base">
                            Pergunta {index + 1}: {pergunta.pergunta}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {pergunta.opcoes.map((opcao, opcaoIndex) => (
                              <Button
                                key={opcaoIndex}
                                variant={respostasQuiz[index] === opcao ? "default" : "outline"}
                                className="w-full justify-start"
                                onClick={() => responderQuiz(index, opcao)}
                              >
                                {String.fromCharCode(65 + opcaoIndex)}) {opcao}
                              </Button>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {Object.keys(respostasQuiz).length === perguntasQuiz.length && (
                      <Button onClick={finalizarQuiz} className="w-full" size="lg">
                        Finalizar Quiz
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Card className="bg-primary/10">
                      <CardHeader>
                        <CardTitle className="text-center">🎉 Quiz Concluído!</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-2xl font-bold text-primary mb-2">
                          {calcularPontuacao()}/{perguntasQuiz.length}
                        </p>
                        <p className="text-muted-foreground">
                          Você acertou {calcularPontuacao()} de {perguntasQuiz.length} perguntas
                        </p>
                      </CardContent>
                    </Card>

                    <div className="text-center">
                      <Button onClick={onCompletar} size="lg" className="bg-green-600 hover:bg-green-700">
                        ✅ Finalizar Aula
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navegação */}
        {!mostrarResultados && (
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={secaoAnterior} disabled={secaoAtual === 0}>
              ← Anterior
            </Button>

            <Button onClick={proximaSecao} disabled={secaoAtual === secoes.length - 1}>
              Próximo →
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
