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
      title: "Ambientes que inspiram",
      description: "Layouts pensados para o seu dia a dia, combinando conforto e beleza.",
    },
    {
      title: "Paletas acolhedoras",
      description: "Cores e texturas que trazem calor e personalidade para cada espaço.",
    },
    {
      title: "Simples e prático",
      description: "Decore sua casa de forma fácil e intuitiva, do seu jeito.",
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
                <Sparkles className="h-4 w-4" />
                Decorize AI
              </div>
              <h2 className="mt-8 text-4xl font-semibold leading-tight text-foreground font-[family-name:var(--font-display)]">
                Transforme suas ideias em ambientes que contam sua história.
              </h2>
              <p className="mt-6 text-base text-muted-foreground leading-relaxed max-w-lg">
                Cada cômodo merece ser um reflexo dos seus sonhos. Nossa plataforma combina sensibilidade humana e tecnologia para criar espaços que aquecem o coração.
              </p>
            </div>
          </div>

          <ul className="relative space-y-5">
            {highlights.map((item) => (
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
                Novidade
              </p>
              <p className="mt-2 text-foreground/90 leading-relaxed">
                Novos estilos e inspirações toda semana.
              </p>
            </div>
            <Button asChild className="group w-full bg-primary hover:bg-primary/90 text-white shadow-md">
              <Link href="/auth/signup">
                Começar agora
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
              Bem-vindo de volta
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Continue construindo os ambientes que fazem seu coração se sentir em casa.
            </p>
          </div>

          <Card className="border border-border/50 bg-card shadow-lg">
            <CardHeader className="space-y-2 text-center lg:text-left pb-6">
              <CardTitle className="text-2xl font-semibold font-[family-name:var(--font-display)]">Entrar na sua conta</CardTitle>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Acesse seus projetos e continue criando.
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              {errorMessage ? (
                <div className="mb-6 rounded-xl border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {decodeURIComponent(errorMessage)}
                </div>
              ) : null}
              <form action={login} className="space-y-6">
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
                    placeholder="voce@decorize.ai"
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
                    className="flex h-12 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary transition-colors"
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                  <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      name="remember"
                      className="h-4 w-4 rounded border border-input bg-background text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-colors"
                    />
                    Lembrar acesso
                  </label>
                  <Link href="/auth/forgot-password" className="font-medium text-primary hover:text-primary/80 transition-colors">
                    Esqueci a senha
                  </Link>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all"
                >
                  Entrar
                </Button>
              </form>

              <div className="mt-8 space-y-5">
                <div className="h-px w-full bg-border" />
                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Novo por aqui? </span>
                  <Link href="/auth/signup" className="font-semibold text-primary hover:text-primary/80 transition-colors">
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
