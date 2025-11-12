import { LogOut, Sparkles, User } from "lucide-react";
import Link from "next/link";
import { getUser, logout } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

export async function Header() {
  const user = await getUser();

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Sparkles className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
            <span className="text-xl font-semibold tracking-tight text-primary font-[family-name:var(--font-display)]">
              Decorize AI
            </span>
          </Link>

          {/* Nav */}
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5"
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Perfil</span>
              </Link>
              <ThemeToggle />
              <form action={logout}>
                <Button
                  type="submit"
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Sair</span>
                </Button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <ThemeToggle />
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
