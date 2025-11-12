import { Calendar, Mail, Sparkles, User } from "lucide-react";
import { redirect } from "next/navigation";
import { getUser } from "@/app/auth/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Perfil - Decorize AI",
  description: "Gerencie seu perfil",
};

export default async function ProfilePage() {
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 -z-10">
        <div className="absolute -left-20 top-24 h-96 w-96 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-accent/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="mb-12 animate-in">
          <h1 className="text-4xl md:text-5xl font-semibold mb-3 font-[family-name:var(--font-display)]">
            Meu Perfil
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Gerencie suas informações pessoais
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-[family-name:var(--font-display)]">Informações da Conta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/30 flex items-center justify-center text-primary text-3xl font-semibold border-2 border-primary/20 font-[family-name:var(--font-display)]">
                  {user.user_metadata.full_name?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="absolute -inset-2 rounded-2xl bg-primary/5 blur-xl -z-10" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold font-[family-name:var(--font-display)] mb-1">
                  {user.user_metadata.full_name || "Usuário"}
                </h2>
                <p className="text-muted-foreground">Membro do Decorize AI</p>
              </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-border/50">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Email
                  </p>
                  <p className="text-base text-foreground">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 flex-shrink-0">
                  <User className="h-5 w-5 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    ID do Usuário
                  </p>
                  <p className="text-xs font-mono text-foreground/70 break-all">{user.id}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 flex-shrink-0">
                  <Calendar className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Membro desde
                  </p>
                  <p className="text-base text-foreground">
                    {new Date(user.created_at).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Placeholder para futuras funcionalidades */}
        <Card className="mt-8 border-2 border-dashed border-border/50">
          <CardContent className="py-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mx-auto mb-4">
              <Sparkles className="h-7 w-7 text-primary" />
            </div>
            <p className="text-foreground/80 font-medium mb-2">
              Mais funcionalidades de perfil em breve...
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
              Edição de perfil, preferências personalizadas e muito mais!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
