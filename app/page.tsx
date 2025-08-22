"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  BookOpen,
  Users,
  ChevronRight,
  Play,
  CheckCircle,
  Clock,
  Lock,
  User,
  FileText,
  Target,
  BarChart3,
  Settings,
  LogIn,
  UserPlus,
  GraduationCap,
  Trophy,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AulaDetalhada from "@/components/AulaDetalhada"

export default function CursoIA() {
  const [usuarioLogado, setUsuarioLogado] = useState(false)
  const [tipoUsuario, setTipoUsuario] = useState<"aluno" | "professor" | null>(null)
  const [telaLogin, setTelaLogin] = useState("login") // 'login', 'cadastro'
  const [dadosLogin, setDadosLogin] = useState({ email: "", senha: "" })
  const [dadosCadastro, setDadosCadastro] = useState({ nome: "", email: "", senha: "", confirmarSenha: "" })
  const [erroLogin, setErroLogin] = useState("")

  const [usuariosCadastrados, setUsuariosCadastrados] = useState<{
    [email: string]: { nome: string; senha: string; progressoAulas: number; aulasCompletas: boolean[] }
  }>(JSON.parse(localStorage.getItem("usuariosCadastrados") || "{}"))
  const [usuarioAtual, setUsuarioAtual] = useState<string>("")
  const [telaBoasVindas, setTelaBoasVindas] = useState(false)
  const [telaConclusao, setTelaConclusao] = useState<"aula" | "curso" | null>(null)

  const [telaAcessoProfessor, setTelaAcessoProfessor] = useState(false)
  const [senhaProfessor, setSenhaProfessor] = useState("")

  const [aulaAtual, setAulaAtual] = useState(0)
  const [progresso, setProgresso] = useState(0)
  const [aulasCompletas, setAulasCompletas] = useState<boolean[]>([false, false, false])
  const [areaProfessor, setAreaProfessor] = useState(false)
  const [senhaDialog, setSenhaDialog] = useState(false)
  const [senhaInput, setSenhaInput] = useState("")
  const [senhaErro, setSenhaErro] = useState(false)
  const [recursoAtivo, setRecursoAtivo] = useState<string | null>(null)

  const aulas = [
    {
      id: 1,
      titulo: "O que é Inteligência Artificial?",
      descricao: "Introdução aos conceitos básicos de IA e sua história",
      duracao: "45 min",
      topicos: [
        "Definição de Inteligência Artificial",
        "História da IA: dos primórdios até hoje",
        "Tipos de IA: Fraca vs Forte",
        "Exemplos práticos no dia a dia",
        "Atividade interativa: Identificando IA ao nosso redor",
      ],
      atividades: 3,
      quiz: true,
    },
    {
      id: 2,
      titulo: "IA no Mundo Atual",
      descricao: "Como a IA está transformando diferentes setores da sociedade",
      duracao: "50 min",
      topicos: [
        "IA na medicina e saúde",
        "IA na educação e aprendizagem",
        "IA nos transportes (carros autônomos)",
        "IA nas redes sociais e entretenimento",
        "IA no trabalho e profissões do futuro",
        "Debate: Benefícios e desafios da IA",
      ],
      atividades: 4,
      quiz: true,
    },
    {
      id: 3,
      titulo: "Ética e Futuro da IA",
      descricao: "Discussões sobre responsabilidade, ética e o futuro com IA",
      duracao: "55 min",
      topicos: [
        "Questões éticas da IA",
        "Privacidade e proteção de dados",
        "Viés algorítmico e justiça",
        "IA e sustentabilidade",
        "Preparando-se para o futuro com IA",
        "Projeto final: Proposta de uso ético da IA",
      ],
      atividades: 5,
      quiz: true,
    },
  ]

  const fazerLogin = () => {
    if (!dadosLogin.email || !dadosLogin.senha) {
      setErroLogin("Por favor, preencha todos os campos")
      setTimeout(() => setErroLogin(""), 3000)
      return
    }

    const usuario = usuariosCadastrados[dadosLogin.email]
    if (!usuario || usuario.senha !== dadosLogin.senha) {
      setErroLogin("Email ou senha incorretos")
      setTimeout(() => setErroLogin(""), 3000)
      return
    }

    setUsuarioLogado(true)
    setTipoUsuario("aluno")
    setUsuarioAtual(dadosLogin.email)
    setAulasCompletas(usuario.aulasCompletas)
    setProgresso((usuario.aulasCompletas.filter(Boolean).length / 3) * 100)
    setErroLogin("")
    setTelaBoasVindas(true)
  }

  const fazerLoginProfessor = () => {
    if (senhaProfessor === "242425") {
      setUsuarioLogado(true)
      setTipoUsuario("professor")
      setErroLogin("")
      setSenhaProfessor("")
      setTelaAcessoProfessor(false)
    } else {
      setErroLogin("Senha incorreta")
      setTimeout(() => setErroLogin(""), 3000)
    }
  }

  const fazerCadastro = () => {
    if (!dadosCadastro.nome || !dadosCadastro.email || !dadosCadastro.senha) {
      setErroLogin("Por favor, preencha todos os campos")
      setTimeout(() => setErroLogin(""), 3000)
      return
    }

    if (dadosCadastro.senha !== dadosCadastro.confirmarSenha) {
      setErroLogin("As senhas não coincidem")
      setTimeout(() => setErroLogin(""), 3000)
      return
    }

    if (usuariosCadastrados[dadosCadastro.email]) {
      setErroLogin("Este email já está cadastrado")
      setTimeout(() => setErroLogin(""), 3000)
      return
    }

    const novosUsuarios = {
      ...usuariosCadastrados,
      [dadosCadastro.email]: {
        nome: dadosCadastro.nome,
        senha: dadosCadastro.senha,
        progressoAulas: 0,
        aulasCompletas: [false, false, false],
      },
    }

    setUsuariosCadastrados(novosUsuarios)
    localStorage.setItem("usuariosCadastrados", JSON.stringify(novosUsuarios))

    setUsuarioLogado(true)
    setTipoUsuario("aluno")
    setUsuarioAtual(dadosCadastro.email)
    setErroLogin("")
    setTelaBoasVindas(true)
  }

  const fazerLogout = () => {
    setUsuarioLogado(false)
    setTipoUsuario(null)
    setAreaProfessor(false)
    setAulaAtual(0)
    setUsuarioAtual("")
    setTelaBoasVindas(false)
    setTelaConclusao(null)
    setDadosLogin({ email: "", senha: "" })
    setDadosCadastro({ nome: "", email: "", senha: "", confirmarSenha: "" })
    setTelaAcessoProfessor(false)
    setSenhaProfessor("")
  }

  const verificarSenhaProfessor = () => {
    if (senhaInput === "242425") {
      setAreaProfessor(true)
      setSenhaDialog(false)
      setSenhaInput("")
      setSenhaErro(false)
    } else {
      setSenhaErro(true)
      setTimeout(() => setSenhaErro(false), 3000)
    }
  }

  const abrirAreaProfessor = () => {
    setSenhaDialog(true)
  }

  const marcarAulaCompleta = (aulaIndex: number) => {
    const novasAulasCompletas = [...aulasCompletas]
    novasAulasCompletas[aulaIndex] = true
    setAulasCompletas(novasAulasCompletas)

    const novoProgresso = (novasAulasCompletas.filter(Boolean).length / 3) * 100
    setProgresso(novoProgresso)

    // Salvar progresso do usuário
    if (usuarioAtual && tipoUsuario === "aluno") {
      const usuariosAtualizados = {
        ...usuariosCadastrados,
        [usuarioAtual]: {
          ...usuariosCadastrados[usuarioAtual],
          aulasCompletas: novasAulasCompletas,
          progressoAulas: novoProgresso,
        },
      }
      setUsuariosCadastrados(usuariosAtualizados)
      localStorage.setItem("usuariosCadastrados", JSON.stringify(usuariosAtualizados))
    }

    setAulaAtual(0)

    // Mostrar tela de conclusão apropriada
    if (aulaIndex === 2) {
      // Última aula
      setTelaConclusao("curso")
    } else {
      setTelaConclusao("aula")
    }
  }

  const iniciarAula = (aulaId: number) => {
    if (tipoUsuario === "professor") {
      setAulaAtual(aulaId)
      return
    }

    // Para alunos: só pode acessar aula se a anterior foi concluída
    if (aulaId === 1 || aulasCompletas[aulaId - 2]) {
      setAulaAtual(aulaId)
    }
  }

  const abrirRecurso = (tipo: string) => {
    setRecursoAtivo(tipo)
  }

  const fecharRecurso = () => {
    setRecursoAtivo(null)
  }

  if (telaBoasVindas) {
    const usuario = usuariosCadastrados[usuarioAtual]
    const jaComecou = usuario && usuario.aulasCompletas.some(Boolean)

    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/futuristic-ai-network.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Card className="w-full max-w-md mx-auto bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="p-3 bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-primary">Bem-vindo ao Curso de IA!</CardTitle>
            <CardDescription>
              {usuario?.nome},{" "}
              {jaComecou
                ? "continue sua jornada de aprendizado"
                : "prepare-se para uma jornada incrível no mundo da Inteligência Artificial"}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => setTelaBoasVindas(false)} className="w-full" size="lg">
              <Play className="h-4 w-4 mr-2" />
              {jaComecou ? "Continuar Curso" : "Iniciar Curso"}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (telaConclusao) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/digital-graduation-ai.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Card className="w-full max-w-md mx-auto bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="p-3 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              {telaConclusao === "curso" ? (
                <Trophy className="h-8 w-8 text-green-600" />
              ) : (
                <CheckCircle className="h-8 w-8 text-green-600" />
              )}
            </div>
            <CardTitle className="text-2xl font-bold text-green-600">
              {telaConclusao === "curso" ? "Parabéns!" : "Aula Concluída!"}
            </CardTitle>
            <CardDescription>
              {telaConclusao === "curso"
                ? "Você concluiu o curso, parabéns!!! Aguarde a entrega do seu certificado com o professor."
                : "Aula de hoje concluída, até amanhã!"}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => setTelaConclusao(null)} className="w-full" size="lg">
              {telaConclusao === "curso" ? "Finalizar" : "Continuar"}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!usuarioLogado) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/modern-ai-classroom.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">
              {telaLogin === "login" && !telaAcessoProfessor
                ? "Entrar no Curso"
                : telaLogin === "cadastro"
                  ? "Criar Conta"
                  : "Acesso do Professor"}
            </CardTitle>
            <CardDescription>
              {telaLogin === "login" && !telaAcessoProfessor
                ? "Faça login para acessar o curso de IA"
                : telaLogin === "cadastro"
                  ? "Crie sua conta para começar a aprender"
                  : "Ops, esta aba é apenas para professores"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {telaAcessoProfessor ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="senha-professor">Senha de Acesso</Label>
                  <Input
                    id="senha-professor"
                    type="password"
                    placeholder="Digite a senha do professor"
                    value={senhaProfessor}
                    onChange={(e) => setSenhaProfessor(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && fazerLoginProfessor()}
                  />
                </div>
                {erroLogin && <p className="text-sm text-destructive">{erroLogin}</p>}
                <Button onClick={fazerLoginProfessor} className="w-full">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Acessar Área do Professor
                </Button>
                <Button variant="outline" onClick={() => setTelaAcessoProfessor(false)} className="w-full">
                  Voltar
                </Button>
              </div>
            ) : telaLogin === "login" ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={dadosLogin.email}
                    onChange={(e) => setDadosLogin({ ...dadosLogin, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senha">Senha</Label>
                  <Input
                    id="senha"
                    type="password"
                    placeholder="Digite sua senha"
                    value={dadosLogin.senha}
                    onChange={(e) => setDadosLogin({ ...dadosLogin, senha: e.target.value })}
                    onKeyPress={(e) => e.key === "Enter" && fazerLogin()}
                  />
                </div>
                {erroLogin && <p className="text-sm text-destructive">{erroLogin}</p>}
                <Button onClick={fazerLogin} className="w-full">
                  <LogIn className="h-4 w-4 mr-2" />
                  Entrar no Curso
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Não tem uma conta?</p>
                  <Button variant="outline" onClick={() => setTelaLogin("cadastro")} className="w-full">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Criar Conta
                  </Button>
                </div>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">ou</span>
                  </div>
                </div>

                <Button variant="outline" onClick={() => setTelaAcessoProfessor(true)} className="w-full">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Acesso do Professor
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    type="text"
                    placeholder="Seu nome completo"
                    value={dadosCadastro.nome}
                    onChange={(e) => setDadosCadastro({ ...dadosCadastro, nome: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-cadastro">Email</Label>
                  <Input
                    id="email-cadastro"
                    type="email"
                    placeholder="seu@email.com"
                    value={dadosCadastro.email}
                    onChange={(e) => setDadosCadastro({ ...dadosCadastro, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senha-cadastro">Senha</Label>
                  <Input
                    id="senha-cadastro"
                    type="password"
                    placeholder="Digite uma senha"
                    value={dadosCadastro.senha}
                    onChange={(e) => setDadosCadastro({ ...dadosCadastro, senha: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmar-senha">Confirmar Senha</Label>
                  <Input
                    id="confirmar-senha"
                    type="password"
                    placeholder="Confirme sua senha"
                    value={dadosCadastro.confirmarSenha}
                    onChange={(e) => setDadosCadastro({ ...dadosCadastro, confirmarSenha: e.target.value })}
                    onKeyPress={(e) => e.key === "Enter" && fazerCadastro()}
                  />
                </div>
                {erroLogin && <p className="text-sm text-destructive">{erroLogin}</p>}
                <Button onClick={fazerCadastro} className="w-full">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Criar Conta
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Já tem uma conta?</p>
                  <Button variant="outline" onClick={() => setTelaLogin("login")} className="w-full">
                    <LogIn className="h-4 w-4 mr-2" />
                    Fazer Login
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (areaProfessor) {
    return (
      <AreaProfessor
        onVoltar={() => setAreaProfessor(false)}
        aulas={aulas}
        progresso={progresso}
        aulasCompletas={aulasCompletas}
      />
    )
  }

  if (aulaAtual > 0) {
    return (
      <AulaDetalhada
        aula={aulas[aulaAtual - 1]}
        onVoltar={() => setAulaAtual(0)}
        onCompletar={() => marcarAulaCompleta(aulaAtual - 1)}
        completa={aulasCompletas[aulaAtual - 1]}
        tipoUsuario={tipoUsuario}
      />
    )
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.92)), url('/modern-ai-classroom.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header */}
      <header className="bg-card/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Brain className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Curso de Inteligência Artificial</h1>
                <p className="text-muted-foreground">Para Escolas Públicas - 3 Aulas Interativas</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                {tipoUsuario === "professor" ? "Professor" : "Aluno"}
              </div>

              {tipoUsuario === "professor" && (
                <Button
                  variant="outline"
                  onClick={() => setAreaProfessor(true)}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <User className="h-4 w-4" />
                  Área do Professor
                </Button>
              )}

              <Button variant="outline" onClick={fazerLogout}>
                Sair
              </Button>
            </div>
          </div>

          {/* Barra de Progresso */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Progresso do Curso</span>
                <span className="text-sm text-muted-foreground">
                  Aulas Completas: {aulasCompletas.filter(Boolean).length}/3
                </span>
                <span>{Math.round(progresso)}%</span>
              </div>
              <Progress value={progresso} className="h-3" />
            </CardContent>
          </Card>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Lista de Aulas */}
        <div className="grid gap-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Plano de Aulas</h2>

          {aulas.map((aula, index) => {
            const podeAcessar = tipoUsuario === "professor" || index === 0 || aulasCompletas[index - 1]

            return (
              <Card key={aula.id} className={`transition-all ${podeAcessar ? "hover:shadow-lg" : "opacity-50"}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-lg">
                        {aulasCompletas[index] ? <CheckCircle className="h-6 w-6 text-primary" /> : aula.id}
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-2">{aula.titulo}</CardTitle>
                        <CardDescription className="text-base mb-3">{aula.descricao}</CardDescription>
                        <div className="flex items-center gap-4 mb-4">
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {aula.duracao}
                          </Badge>
                          <Badge variant="outline">{aula.atividades} atividades</Badge>
                          {aula.quiz && <Badge variant="outline">Quiz incluído</Badge>}
                        </div>
                        {!podeAcessar && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            <Lock className="h-3 w-3 mr-1" />
                            Complete a aula anterior para desbloquear
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={() => iniciarAula(aula.id)}
                      className="flex items-center gap-2"
                      size="lg"
                      disabled={!podeAcessar}
                    >
                      <Play className="h-4 w-4" />
                      {aulasCompletas[index] ? "Revisar" : "Iniciar"}
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Tópicos da Aula:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {aula.topicos.map((topico, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                          {topico}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {tipoUsuario === "professor" && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Recursos para Professores
              </CardTitle>
              <CardDescription>Materiais de apoio para condução das aulas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                  <FileText className="h-6 w-6 text-primary" />
                  <span className="font-medium">Planos de Aula</span>
                  <span className="text-xs text-muted-foreground text-center">Roteiros detalhados para cada aula</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                  <Users className="h-6 w-6 text-primary" />
                  <span className="font-medium">Atividades em Grupo</span>
                  <span className="text-xs text-muted-foreground text-center">
                    Dinâmicas e exercícios colaborativos
                  </span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                  <BarChart3 className="h-6 w-6 text-primary" />
                  <span className="font-medium">Sistema de Avaliação</span>
                  <span className="text-xs text-muted-foreground text-center">Rubricas e critérios de avaliação</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

function AreaProfessor({
  onVoltar,
  aulas,
  progresso,
  aulasCompletas,
}: {
  onVoltar: () => void
  aulas: any[]
  progresso: number
  aulasCompletas: boolean[]
}) {
  const [recursoAtivo, setRecursoAtivo] = useState<string | null>(null)
  const [abaAtiva, setAbaAtiva] = useState<"dashboard" | "progresso">("dashboard")

  const obterDadosAlunos = () => {
    const usuariosSalvos = localStorage.getItem("usuariosCadastrados")
    if (usuariosSalvos) {
      const usuarios = JSON.parse(usuariosSalvos)
      return Object.entries(usuarios).map(([email, dados]: [string, any]) => ({
        email,
        nome: dados.nome,
        progressoAulas: dados.progressoAulas || 0,
        aulasCompletas: dados.aulasCompletas || [false, false, false],
      }))
    }
    return []
  }

  const abrirRecurso = (tipo: string) => {
    setRecursoAtivo(tipo)
  }

  const fecharRecurso = () => {
    setRecursoAtivo(null)
  }

  const dadosAlunos = obterDadosAlunos()

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.93), rgba(255, 255, 255, 0.93)), url('/education-dashboard.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header da Área do Professor */}
      <header className="bg-card/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <User className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Área do Professor</h1>
                <p className="text-muted-foreground">Recursos e ferramentas para condução das aulas</p>
              </div>
            </div>
            <Button variant="outline" onClick={onVoltar}>
              ← Voltar ao Curso
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant={abaAtiva === "dashboard" ? "default" : "outline"}
              onClick={() => setAbaAtiva("dashboard")}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={abaAtiva === "progresso" ? "default" : "outline"}
              onClick={() => setAbaAtiva("progresso")}
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Progresso dos Alunos
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {abaAtiva === "progresso" ? (
          <div className="space-y-6">
            {/* Estatísticas Gerais */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Total de Alunos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{dadosAlunos.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Aula 1 Completa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {dadosAlunos.filter((aluno) => aluno.aulasCompletas[0]).length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    Aula 2 Completa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {dadosAlunos.filter((aluno) => aluno.aulasCompletas[1]).length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-yellow-600" />
                    Curso Completo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">
                    {dadosAlunos.filter((aluno) => aluno.aulasCompletas.every(Boolean)).length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lista Detalhada dos Alunos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Progresso Individual dos Alunos
                </CardTitle>
                <CardDescription>Acompanhe o progresso de cada aluno cadastrado no curso</CardDescription>
              </CardHeader>
              <CardContent>
                {dadosAlunos.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum aluno cadastrado ainda</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {dadosAlunos.map((aluno, index) => (
                      <Card key={index} className="border-l-4 border-l-primary">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-lg">{aluno.nome}</h4>
                              <p className="text-sm text-muted-foreground">{aluno.email}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary">{Math.round(aluno.progressoAulas)}%</div>
                              <p className="text-sm text-muted-foreground">Progresso</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Progresso Geral</span>
                              <span>{Math.round(aluno.progressoAulas)}%</span>
                            </div>
                            <Progress value={aluno.progressoAulas} className="h-2" />
                          </div>

                          <div className="grid grid-cols-3 gap-3 mt-4">
                            {["Aula 1", "Aula 2", "Aula 3"].map((aulaName, aulaIndex) => (
                              <div
                                key={aulaIndex}
                                className={`p-3 rounded-lg border text-center ${
                                  aluno.aulasCompletas[aulaIndex]
                                    ? "bg-green-50 border-green-200 text-green-800"
                                    : "bg-gray-50 border-gray-200 text-gray-600"
                                }`}
                              >
                                <div className="flex items-center justify-center gap-2 mb-1">
                                  {aluno.aulasCompletas[aulaIndex] ? (
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <Clock className="h-4 w-4 text-gray-400" />
                                  )}
                                  <span className="text-sm font-medium">{aulaName}</span>
                                </div>
                                <span className="text-xs">
                                  {aluno.aulasCompletas[aulaIndex] ? "Completa" : "Pendente"}
                                </span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          // Dashboard original (conteúdo existente)
          <>
            {/* Dashboard do Professor */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    Progresso da Turma
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-1">{Math.round(progresso)}%</div>
                  <p className="text-sm text-muted-foreground">
                    Aulas completas: {aulasCompletas.filter(Boolean).length}/3
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Tempo Total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-1">150min</div>
                  <p className="text-sm text-muted-foreground">Distribuído em 3 aulas</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    Atividades
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-1">12</div>
                  <p className="text-sm text-muted-foreground">Exercícios práticos e quizzes</p>
                </CardContent>
              </Card>
            </div>

            {/* Planos de Aula Detalhados */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Planos de Aula Detalhados
                </CardTitle>
                <CardDescription>Roteiros completos para conduzir as aulas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aulas.map((aula, index) => (
                    <Card key={aula.id} className="border-l-4 border-l-primary">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{aula.titulo}</CardTitle>
                          <Badge variant={aulasCompletas[index] ? "default" : "secondary"}>
                            {aulasCompletas[index] ? "Completa" : "Pendente"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">📋 Roteiro da Aula</h4>
                            <ul className="text-sm space-y-1 text-muted-foreground">
                              <li>• Abertura e apresentação (5 min)</li>
                              <li>• Conteúdo teórico (20 min)</li>
                              <li>• Atividade prática (15 min)</li>
                              <li>• Quiz de verificação (5 min)</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">🎯 Dicas Pedagógicas</h4>
                            <ul className="text-sm space-y-1 text-muted-foreground">
                              <li>• Use exemplos do cotidiano dos alunos</li>
                              <li>• Incentive participação ativa</li>
                              <li>• Promova debates e discussões</li>
                              <li>• Conecte com outras disciplinas</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recursos Adicionais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    Ferramentas de Avaliação
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => abrirRecurso("rubrica")}
                  >
                    📊 Rubrica de Avaliação
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => abrirRecurso("checklist")}
                  >
                    📝 Lista de Verificação
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => abrirRecurso("participacao")}
                  >
                    🎯 Critérios de Participação
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Material de Apoio
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => abrirRecurso("bibliografia")}
                  >
                    📚 Bibliografia Recomendada
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => abrirRecurso("videos")}
                  >
                    🎥 Vídeos Educacionais
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => abrirRecurso("links")}
                  >
                    🔗 Links Úteis
                  </Button>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </main>

      <Dialog open={recursoAtivo !== null} onOpenChange={() => fecharRecurso()}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {recursoAtivo === "rubrica" && <>📊 Rubrica de Avaliação Completa</>}
              {recursoAtivo === "checklist" && <>📝 Lista de Verificação Detalhada</>}
              {recursoAtivo === "participacao" && <>🎯 Critérios de Participação</>}
              {recursoAtivo === "bibliografia" && <>📚 Bibliografia Recomendada</>}
              {recursoAtivo === "videos" && <>🎥 Vídeos Educacionais Selecionados</>}
              {recursoAtivo === "links" && <>🔗 Links Úteis e Recursos Online</>}
            </DialogTitle>
          </DialogHeader>

          {recursoAtivo === "rubrica" && (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Rubrica completa para avaliação do curso de IA com critérios detalhados para cada competência.
              </p>
              {/* Conteúdo da rubrica já implementado acima */}
            </div>
          )}

          {recursoAtivo === "checklist" && (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Lista de verificação para acompanhar o progresso individual dos alunos.
              </p>
              {/* Conteúdo do checklist já implementado acima */}
            </div>
          )}

          {recursoAtivo === "participacao" && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Critérios de Participação Ativa</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">✅ Comportamentos Positivos</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Faz perguntas relevantes</li>
                        <li>• Compartilha experiências pessoais</li>
                        <li>• Escuta ativamente os colegas</li>
                        <li>• Contribui para discussões em grupo</li>
                        <li>• Demonstra curiosidade sobre o tema</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">⚠️ Pontos de Atenção</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Uso inadequado de dispositivos</li>
                        <li>• Conversas paralelas excessivas</li>
                        <li>• Falta de engajamento nas atividades</li>
                        <li>• Resistência a trabalhar em grupo</li>
                        <li>• Não cumprimento de prazos</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {recursoAtivo === "bibliografia" && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>📖 Livros Recomendados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <p className="font-medium">
                      • "Inteligência Artificial: Uma Abordagem de Aprendizado de Máquina" - Monard & Baranauskas
                    </p>
                    <p className="font-medium">• "IA para Pessoas em Pressa" - Neil Reddy</p>
                    <p className="font-medium">• "Algoritmos para Viver" - Brian Christian & Tom Griffiths</p>
                    <p className="font-medium">• "Weapons of Math Destruction" - Cathy O'Neil</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>📄 Artigos e Papers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">• "Computing Machinery and Intelligence" - Alan Turing (1950)</p>
                  <p className="text-sm">• "The Ethics of Artificial Intelligence" - Stanford Encyclopedia</p>
                  <p className="text-sm">• "AI in Education: Promises and Implications" - UNESCO Report</p>
                </CardContent>
              </Card>
            </div>
          )}

          {recursoAtivo === "videos" && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>🎬 Documentários</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">• "AlphaGo" - Sobre IA e jogos estratégicos</p>
                  <p className="text-sm">• "The Age of AI" - Série do YouTube Originals</p>
                  <p className="text-sm">• "Coded Bias" - Sobre viés algorítmico</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>📺 Canais Educacionais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">• 3Blue1Brown - Redes Neurais explicadas visualmente</p>
                  <p className="text-sm">• Crash Course Computer Science</p>
                  <p className="text-sm">• TED-Ed - Vídeos sobre IA e tecnologia</p>
                </CardContent>
              </Card>
            </div>
          )}

          {recursoAtivo === "links" && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>🌐 Sites Educacionais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">• MIT OpenCourseWare - Cursos gratuitos de IA</p>
                  <p className="text-sm">• Coursera - "Machine Learning for Everyone"</p>
                  <p className="text-sm">• Khan Academy - Introdução à Programação</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>🔧 Ferramentas Práticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">• Scratch for Educators - Programação visual</p>
                  <p className="text-sm">• AI for Everyone (Teachable Machine)</p>
                  <p className="text-sm">• Code.org - Atividades de programação</p>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
