import { ArrowRight, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { login } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type LoginPageProps = {
  searchParams?: {
    error?: string;
  };
};

export default function LoginPage({ searchParams }: LoginPageProps) {
  const errorMessage = searchParams?.error;
  const highlights = [
    {
      title: "Layouts inteligentes",
      description: "Receba plantas otimizadas com combinações de móveis e materiais.",
    },
    {
      title: "Moodboards dinâmicos",
      description: "Misture referências visuais e cores com sugestões instantâneas da IA.",
    },
    {
      title: "Colaboração em tempo real",
      description: "Itere com clientes e fornecedores no mesmo espaço visual.",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background/95 to-secondary/30">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-secondary/25 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08)_0,transparent_60%)]" />
      </div>

      <div className="relative mx-auto grid min-h-screen w-full max-w-6xl items-center gap-12 px-6 py-10 lg:grid-cols-[1.1fr_1fr] lg:px-12">
        <section className="relative hidden overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary/20 via-background/70 to-background/90 p-12 shadow-2xl lg:flex lg:flex-col">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0,rgba(255,255,255,0)_55%)]" />
          <div className="absolute left-16 top-16 h-28 w-28 rounded-full border border-white/20" />
          <div className="absolute right-10 top-24 h-20 w-20 rounded-full bg-secondary/30 backdrop-blur-xl" />
          <div className="absolute -bottom-10 right-24 h-36 w-36 rotate-12 rounded-3xl border border-white/15" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
              <Sparkles className="h-4 w-4 text-white" />
              Decorize AI Studio
            </div>
            <h2 className="mt-8 text-4xl font-semibold leading-tight text-white">
              Transforme suas ideias em ambientes virtuais refinados em minutos.
            </h2>
            <p className="mt-4 max-w-md text-base text-white/70">
              Combine criatividade humana com inteligência artificial para projetar espaços irresistíveis, com orientação de materiais, iluminação e moodboards inteligentes.
            </p>
          </div>

          <ul className="relative mt-10 space-y-6">
            {highlights.map((item) => (
              <li key={item.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/25">
                  <Check className="h-5 w-5 text-white" />
                </span>
                <div>
                  <h3 className="text-white/90">{item.title}</h3>
                  <p className="text-sm text-white/65">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="relative mt-auto flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                Novidade
              </p>
              <p className="mt-1 text-white/90">
                Atualizações semanais com novos estilos e catálogos 3D.
              </p>
            </div>
            <Button asChild className="group bg-white text-background hover:bg-white/90">
              <Link href="/auth/signup">
                Começar agora
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="relative mx-auto flex w-full max-w-md flex-col gap-10">
          <div className="flex flex-col gap-3 text-center lg:text-left">
            <Link href="/" className="inline-flex items-center justify-center gap-2 text-primary lg:justify-start">
              <Sparkles className="h-7 w-7" />
              <span className="text-base font-semibold tracking-wide">Decorize AI</span>
            </Link>
            <h1 className="text-3xl font-semibold text-foreground">Bem-vindo de volta</h1>
            <p className="text-sm text-muted-foreground">
              Acesse sua conta para continuar os projetos e sincronizar com sua equipe.
            </p>
          </div>

          <Card className="border border-white/20 bg-background/90 shadow-2xl backdrop-blur-xl">
            <CardHeader className="space-y-1 text-center lg:text-left">
              <CardTitle className="text-2xl font-semibold">Entrar na plataforma</CardTitle>
              <p className="text-sm text-muted-foreground">
                Use suas credenciais corporativas ou pessoais.
              </p>
            </CardHeader>
            <CardContent>
              {errorMessage ? (
                <div className="mb-5 rounded-xl border border-destructive/40 bg-destructive/15 px-4 py-3 text-sm text-destructive">
                  {decodeURIComponent(errorMessage)}
                </div>
              ) : null}
              <form action={login} className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="flex h-11 w-full rounded-xl border border-white/20 bg-background/60 px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    placeholder="voce@decorize.ai"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-foreground"
                  >
                    Senha
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="flex h-11 w-full rounded-xl border border-white/20 bg-background/60 px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                  <label className="flex items-center gap-2 text-muted-foreground">
                    <input
                      type="checkbox"
                      name="remember"
                      className="h-4 w-4 rounded border border-white/20 bg-background/60 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    />
                    Lembrar acesso
                  </label>
                  <Link href="/auth/forgot-password" className="font-medium text-primary hover:opacity-80">
                    Esqueci a senha
                  </Link>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/30 hover:opacity-95"
                >
                  Entrar
                </Button>
              </form>

              <div className="mt-8 space-y-4">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Novo por aqui? </span>
                  <Link href="/auth/signup" className="font-medium text-primary hover:opacity-80">
                    Criar conta
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
