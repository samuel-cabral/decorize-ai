import { LogOut, Sparkles, User } from "lucide-react";
import Link from "next/link";
import { getUser, logout } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";

export async function Header() {
  const user = await getUser();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Decorize AI
            </span>
          </Link>

          {/* Nav */}
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Perfil</span>
              </Link>
              <form action={logout}>
                <Button
                  type="submit"
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Sair</span>
                </Button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">Entrar</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/signup">Cadastrar</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
