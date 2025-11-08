import { Calendar, Mail, User } from "lucide-react";
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
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent opacity-50" />

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-8 animate-in">
          <h1 className="text-4xl font-bold mb-2">Meu Perfil</h1>
          <p className="text-muted-foreground">
            Gerencie suas informações pessoais
          </p>
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Informações da Conta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold">
                {user.user_metadata.full_name?.[0]?.toUpperCase() || "U"}
              </div>
              <div>
                <h2 className="text-2xl font-semibold">
                  {user.user_metadata.full_name || "Usuário"}
                </h2>
                <p className="text-muted-foreground">Membro do Decorize AI</p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Email
                  </p>
                  <p className="text-base">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    ID do Usuário
                  </p>
                  <p className="text-base font-mono text-xs">{user.id}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Membro desde
                  </p>
                  <p className="text-base">
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
        <Card className="mt-6 border-2 border-dashed">
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">
              Mais funcionalidades de perfil em breve...
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Edição de perfil, preferências e muito mais!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
