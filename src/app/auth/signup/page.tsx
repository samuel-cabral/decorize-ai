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
      description: "Experimente quantas ideias quiser para cada cômodo da sua casa.",
    },
    {
      title: "IA intuitiva",
      description: "Tecnologia que aprende seu estilo e sugere decorações personalizadas.",
    },
    {
      title: "Fácil de usar",
      description: "Interface simples para você visualizar e comparar diferentes estilos.",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-24 h-96 w-96 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-accent/30 blur-3xl" />
      </div>

      <div className="relative mx-auto grid min-h-screen w-full max-w-7xl items-center gap-16 px-6 py-12 lg:grid-cols-2 lg:px-16">
        <section className="relative hidden lg:flex lg:flex-col lg:gap-12">
          <div className="relative rounded-3xl bg-gradient-to-br from-accent/40 via-accent/20 to-transparent p-12 backdrop-blur-sm border border-primary/10 shadow-sm">
            <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
            <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <Rocket className="h-4 w-4" />
                Comece gratuitamente
              </div>
              <h2 className="mt-8 text-4xl font-semibold leading-tight text-foreground font-[family-name:var(--font-display)]">
                Construa o lar que você sempre imaginou.
              </h2>
              <p className="mt-6 text-base text-muted-foreground leading-relaxed max-w-lg">
                Junte-se a milhares de pessoas que estão transformando suas casas em espaços cheios de significado, conforto e beleza. Seu lar perfeito está a poucos cliques de distância.
              </p>
            </div>
          </div>

          <ul className="relative space-y-5">
            {benefits.map((item) => (
              <li key={item.title} className="flex gap-4 rounded-2xl bg-card p-6 shadow-sm border border-border/50">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Check className="h-5 w-5 text-primary" />
                </span>
                <div>
                  <h3 className="font-medium text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="relative flex flex-col gap-4 rounded-2xl bg-primary/5 p-8 border border-primary/10">
            <div>
              <p className="text-xs uppercase tracking-wider text-primary font-semibold">
                Gratuito para começar
              </p>
              <p className="mt-2 text-foreground/90 leading-relaxed">
                Comece hoje, sem compromisso.
              </p>
            </div>
            <Button asChild className="group w-full bg-primary hover:bg-primary/90 text-white shadow-md">
              <Link href="/auth/login">
                Já tenho conta
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="relative mx-auto flex w-full max-w-md flex-col gap-12">
          <div className="flex flex-col gap-4 text-center lg:text-left">
            <Link href="/" className="inline-flex items-center justify-center gap-2.5 text-primary lg:justify-start">
              <Sparkles className="h-7 w-7" />
              <span className="text-lg font-semibold tracking-tight">Decorize AI</span>
            </Link>
            <h1 className="text-4xl font-semibold text-foreground font-[family-name:var(--font-display)] leading-tight">
              Crie sua conta
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Comece a decorar sua casa do jeito que você sempre sonhou.
            </p>
          </div>

          <Card className="border border-border/50 bg-card shadow-lg">
            <CardHeader className="space-y-2 text-center lg:text-left pb-6">
              <CardTitle className="text-2xl font-semibold font-[family-name:var(--font-display)]">Cadastro gratuito</CardTitle>
              <p className="text-sm text-muted-foreground leading-relaxed">
                É rápido, gratuito e você pode começar agora mesmo.
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              {errorMessage ? (
                <div className="mb-6 rounded-xl border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {decodeURIComponent(errorMessage)}
                </div>
              ) : null}
              <form action={signup} className="space-y-6">
                <div className="space-y-2.5">
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
                    className="flex h-12 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary transition-colors"
                    placeholder="João Silva"
                  />
                </div>

                <div className="space-y-2.5">
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
                    className="flex h-12 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>

                <div className="space-y-2.5">
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
                    className="flex h-12 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary transition-colors"
                    placeholder="••••••••"
                  />
                  <p className="text-xs text-muted-foreground">
                    Mínimo de 6 caracteres
                  </p>
                </div>

                <div className="flex items-start gap-2.5 text-sm">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-0.5 h-4 w-4 rounded border border-input bg-background text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-colors cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-muted-foreground leading-relaxed cursor-pointer">
                    Aceito os{" "}
                    <Link href="/terms" className="font-medium text-primary hover:text-primary/80 transition-colors">
                      termos de uso
                    </Link>{" "}
                    e{" "}
                    <Link href="/privacy" className="font-medium text-primary hover:text-primary/80 transition-colors">
                      política de privacidade
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all"
                >
                  Criar Conta
                </Button>
              </form>

              <div className="mt-8 space-y-5">
                <div className="h-px w-full bg-border" />
                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Já tem uma conta? </span>
                  <Link href="/auth/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
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
