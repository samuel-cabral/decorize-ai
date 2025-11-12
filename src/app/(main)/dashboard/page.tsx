import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/app/auth/actions";
import type { Project } from "@/types/database";

export const metadata = {
	title: "Dashboard - Decorize AI",
	description: "Veja seu histórico de decorações e projetos",
};

async function getProjects(): Promise<Project[]> {
	const supabase = await createClient();
	const user = await getUser();

	if (!user) {
		return [];
	}

	const { data, error } = await supabase
		.from("projects")
		.select("*")
		.eq("user_id", user.id)
		.order("created_at", { ascending: false });

	if (error) {
		console.error("Error fetching projects:", error);
		return [];
	}

	return data as Project[];
}

export default async function DashboardPage() {
	const user = await getUser();

	if (!user) {
		redirect("/auth/login");
	}

	const projects = await getProjects();

	return (
		<div className="min-h-screen bg-background">
			<div className="fixed inset-0 -z-10">
				<div className="absolute -left-20 top-24 h-96 w-96 rounded-full bg-primary/8 blur-3xl" />
				<div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-accent/30 blur-3xl" />
			</div>

			<div className="container mx-auto px-6 py-12 max-w-7xl">
				{/* Header */}
				<div className="mb-12 animate-in">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
						<div>
							<h1 className="text-4xl md:text-5xl font-semibold mb-3 font-[family-name:var(--font-display)]">
								Olá, {user.user_metadata.full_name || "Usuário"}! 👋
							</h1>
							<p className="text-lg text-muted-foreground leading-relaxed">
								Gerencie seus projetos de decoração
							</p>
						</div>
						<Button size="lg" asChild className="self-start sm:self-auto">
							<Link href="/">
								<Sparkles className="mr-2 h-5 w-5" />
								Novo Projeto
							</Link>
						</Button>
					</div>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
					<Card className="bg-gradient-to-br from-card to-accent/10">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
							<CardTitle className="text-sm font-medium text-muted-foreground">
								Total de Projetos
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-semibold font-[family-name:var(--font-display)]">{projects.length}</div>
							<p className="text-xs text-muted-foreground mt-2">Todos os seus projetos</p>
						</CardContent>
					</Card>

					<Card className="bg-gradient-to-br from-card to-primary/10">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
							<CardTitle className="text-sm font-medium text-muted-foreground">Concluídos</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-semibold font-[family-name:var(--font-display)]">
								{projects.filter((p) => p.status === "completed").length}
							</div>
							<p className="text-xs text-muted-foreground mt-2">Prontos para inspirar</p>
						</CardContent>
					</Card>

					<Card className="bg-gradient-to-br from-card to-secondary/20">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
							<CardTitle className="text-sm font-medium text-muted-foreground">Favoritos</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-semibold font-[family-name:var(--font-display)]">
								{projects.filter((p) => p.is_favorite).length}
							</div>
							<p className="text-xs text-muted-foreground mt-2">Seus preferidos</p>
						</CardContent>
					</Card>
				</div>

				{/* Projects Grid */}
				<div>
					<h2 className="text-3xl font-semibold mb-8 font-[family-name:var(--font-display)]">Seus Projetos</h2>

					{projects.length === 0 ? (
						<Card className="border-2 border-dashed border-border/50">
							<CardContent className="flex flex-col items-center justify-center py-16 px-6">
								<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-6">
									<Sparkles className="h-8 w-8 text-primary" />
								</div>
								<h3 className="text-xl font-semibold mb-3 font-[family-name:var(--font-display)]">
									Nenhum projeto ainda
								</h3>
								<p className="text-muted-foreground mb-8 text-center max-w-md leading-relaxed">
									Comece criando seu primeiro projeto de decoração com IA e dê vida aos seus sonhos
								</p>
								<Button size="lg" asChild>
									<Link href="/">Criar Primeiro Projeto</Link>
								</Button>
							</CardContent>
						</Card>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{projects.map((project) => (
								<Card
									key={project.id}
									className="overflow-hidden hover:shadow-xl transition-all group cursor-pointer"
								>
								<div className="aspect-video relative bg-accent/20 overflow-hidden">
									{project.result_image_url ? (
										<Image
											src={project.result_image_url}
											alt={project.name}
											fill
											className="object-cover group-hover:scale-105 transition-transform duration-300"
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										/>
									) : (
										<div className="flex items-center justify-center h-full">
											<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
												<Sparkles className="h-7 w-7 text-primary" />
											</div>
										</div>
									)}
										{project.status === "processing" && (
											<div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
												<div className="text-white text-sm font-medium px-4 py-2 rounded-full bg-white/10">
													Processando...
												</div>
											</div>
										)}
										{project.status === "failed" && (
											<div className="absolute inset-0 bg-destructive/60 backdrop-blur-sm flex items-center justify-center">
												<div className="text-white text-sm font-medium px-4 py-2 rounded-full bg-white/10">
													Falhou
												</div>
											</div>
										)}
									</div>
									<CardHeader className="pb-4">
										<CardTitle className="line-clamp-1 text-lg">
											{project.name}
										</CardTitle>
										{project.description && (
											<p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
												{project.description}
											</p>
										)}
									</CardHeader>
									<CardContent>
										<div className="flex flex-col gap-3 text-sm text-muted-foreground">
											{project.location && (
												<div className="flex items-center gap-2.5">
													<MapPin className="h-4 w-4 flex-shrink-0" />
													<span className="line-clamp-1">{project.location}</span>
												</div>
											)}
											<div className="flex items-center gap-2.5">
												<Calendar className="h-4 w-4 flex-shrink-0" />
												<span>
													{new Date(project.created_at).toLocaleDateString(
														"pt-BR",
														{ year: "numeric", month: "short", day: "numeric" }
													)}
												</span>
											</div>
											{project.selected_styles.length > 0 && (
												<div className="flex flex-wrap gap-2 mt-2">
													{project.selected_styles.slice(0, 3).map((style) => (
														<span
															key={style}
															className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full"
														>
															{style}
														</span>
													))}
													{project.selected_styles.length > 3 && (
														<span className="px-3 py-1.5 bg-muted text-muted-foreground text-xs font-medium rounded-full">
															+{project.selected_styles.length - 3}
														</span>
													)}
												</div>
											)}
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}


