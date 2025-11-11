import { ArrowRight, Check, Rocket, Sparkles } from "lucide-react";
import Link from "next/link";
import { signup } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SignupPageProps = {
  searchParams?: {
    error?: string;
  };
};

export default function SignupPage({ searchParams }: SignupPageProps) {
  const errorMessage = searchParams?.error;
  const benefits = [
    {
      title: "Projetos ilimitados",
      description: "Crie quantos projetos quiser e organize suas ideias em um só lugar.",
    },
    {
      title: "IA de última geração",
      description: "Tecnologia avançada que aprende com suas preferências e estilo.",
    },
    {
      title: "Suporte premium",
      description: "Equipe dedicada para ajudar você a tirar o máximo da plataforma.",
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
        <section className="relative hidden overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-secondary/20 via-background/70 to-background/90 p-12 shadow-2xl lg:flex lg:flex-col">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0,rgba(255,255,255,0)_55%)]" />
          <div className="absolute left-16 top-16 h-28 w-28 rounded-full border border-white/20" />
          <div className="absolute right-10 top-24 h-20 w-20 rounded-full bg-primary/30 backdrop-blur-xl" />
          <div className="absolute -bottom-10 right-24 h-36 w-36 rotate-12 rounded-3xl border border-white/15" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
              <Rocket className="h-4 w-4 text-white" />
              Comece gratuitamente
            </div>
            <h2 className="mt-8 text-4xl font-semibold leading-tight text-white">
              Dê vida aos seus projetos de decoração com inteligência artificial.
            </h2>
            <p className="mt-4 max-w-md text-base text-white/70">
              Junte-se a centenas de designers e arquitetos que já estão usando a plataforma para criar ambientes incríveis de forma mais rápida e eficiente.
            </p>
          </div>

          <ul className="relative mt-10 space-y-6">
            {benefits.map((item) => (
              <li key={item.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/25">
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
                Gratuito para começar
              </p>
              <p className="mt-1 text-white/90">
                Sem cartão de crédito. Cancele quando quiser.
              </p>
            </div>
            <Button asChild className="group bg-white text-background hover:bg-white/90">
              <Link href="/auth/login">
                Já tenho conta
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
            <h1 className="text-3xl font-semibold text-foreground">Crie sua conta</h1>
            <p className="text-sm text-muted-foreground">
              Comece a transformar seus ambientes com o poder da inteligência artificial.
            </p>
          </div>

          <Card className="border border-white/20 bg-background/90 shadow-2xl backdrop-blur-xl">
            <CardHeader className="space-y-1 text-center lg:text-left">
              <CardTitle className="text-2xl font-semibold">Cadastro gratuito</CardTitle>
              <p className="text-sm text-muted-foreground">
                Preencha os dados abaixo para começar.
              </p>
            </CardHeader>
            <CardContent>
              {errorMessage ? (
                <div className="mb-5 rounded-xl border border-destructive/40 bg-destructive/15 px-4 py-3 text-sm text-destructive">
                  {decodeURIComponent(errorMessage)}
                </div>
              ) : null}
              <form action={signup} className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="full_name"
                    className="text-sm font-medium text-foreground"
                  >
                    Nome Completo
                  </label>
                  <input
                    id="full_name"
                    name="full_name"
                    type="text"
                    required
                    className="flex h-11 w-full rounded-xl border border-white/20 bg-background/60 px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    placeholder="João Silva"
                  />
                </div>

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
                    minLength={6}
                    className="flex h-11 w-full rounded-xl border border-white/20 bg-background/60 px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    placeholder="••••••••"
                  />
                  <p className="text-xs text-muted-foreground">
                    Mínimo de 6 caracteres
                  </p>
                </div>

                <div className="flex items-start gap-2 text-sm">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-0.5 h-4 w-4 rounded border border-white/20 bg-background/60 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  />
                  <label htmlFor="terms" className="text-muted-foreground">
                    Aceito os{" "}
                    <Link href="/terms" className="font-medium text-primary hover:opacity-80">
                      termos de uso
                    </Link>{" "}
                    e{" "}
                    <Link href="/privacy" className="font-medium text-primary hover:opacity-80">
                      política de privacidade
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/30 hover:opacity-95"
                >
                  Criar Conta
                </Button>
              </form>

              <div className="mt-8 space-y-4">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Já tem uma conta? </span>
                  <Link href="/auth/login" className="font-medium text-primary hover:opacity-80">
                    Fazer login
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
