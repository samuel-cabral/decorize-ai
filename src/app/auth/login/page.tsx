import { Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { login } from "@/app/auth/actions";

export default function LoginPage() {
	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-4">
			{/* Gradiente de fundo */}
			<div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent opacity-50" />

			<div className="w-full max-w-md">
				{/* Logo/Header */}
				<div className="mb-8 text-center">
					<Link
						href="/"
						className="inline-flex items-center justify-center gap-2 mb-4"
					>
						<Sparkles className="h-8 w-8 text-primary" />
						<h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
							Decorize AI
						</h1>
					</Link>
					<p className="text-muted-foreground">
						Entre para começar a decorar seus ambientes
					</p>
				</div>

				<Card className="border-2 shadow-xl">
					<CardHeader>
						<CardTitle className="text-2xl">Login</CardTitle>
					</CardHeader>
					<CardContent>
						<form action={login} className="space-y-4">
							<div className="space-y-2">
								<label
									htmlFor="email"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Email
								</label>
								<input
									id="email"
									name="email"
									type="email"
									required
									className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
									placeholder="seu@email.com"
								/>
							</div>

							<div className="space-y-2">
								<label
									htmlFor="password"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Senha
								</label>
								<input
									id="password"
									name="password"
									type="password"
									required
									className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
									placeholder="••••••••"
								/>
							</div>

							<Button
								type="submit"
								className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
								size="lg"
							>
								Entrar
							</Button>
						</form>

						<div className="mt-6 text-center text-sm">
							<span className="text-muted-foreground">
								Não tem uma conta?{" "}
							</span>
							<Link
								href="/auth/signup"
								className="text-primary hover:underline font-medium"
							>
								Cadastre-se
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}


