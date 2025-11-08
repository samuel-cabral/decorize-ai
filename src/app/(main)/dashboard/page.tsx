import { redirect } from "next/navigation";
import Link from "next/link";
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
			<div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent opacity-50" />

			<div className="container mx-auto px-4 py-12 max-w-7xl">
				{/* Header */}
				<div className="mb-8 animate-in">
					<div className="flex items-center justify-between mb-4">
						<div>
							<h1 className="text-4xl font-bold mb-2">
								Olá, {user.user_metadata.full_name || "Usuário"}! 👋
							</h1>
							<p className="text-muted-foreground">
								Gerencie seus projetos de decoração
							</p>
						</div>
						<Button size="lg" asChild>
							<Link href="/">
								<Sparkles className="mr-2 h-5 w-5" />
								Novo Projeto
							</Link>
						</Button>
					</div>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total de Projetos
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{projects.length}</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Concluídos</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{projects.filter((p) => p.status === "completed").length}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Favoritos</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{projects.filter((p) => p.is_favorite).length}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Projects Grid */}
				<div>
					<h2 className="text-2xl font-bold mb-6">Seus Projetos</h2>

					{projects.length === 0 ? (
						<Card className="border-2 border-dashed">
							<CardContent className="flex flex-col items-center justify-center py-12">
								<Sparkles className="h-12 w-12 text-muted-foreground mb-4" />
								<h3 className="text-lg font-semibold mb-2">
									Nenhum projeto ainda
								</h3>
								<p className="text-muted-foreground mb-6 text-center">
									Comece criando seu primeiro projeto de decoração com IA
								</p>
								<Button asChild>
									<Link href="/">Criar Primeiro Projeto</Link>
								</Button>
							</CardContent>
						</Card>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{projects.map((project) => (
								<Card
									key={project.id}
									className="overflow-hidden hover:shadow-lg transition-shadow"
								>
									<div className="aspect-video relative bg-muted">
										{project.result_image_url ? (
											<img
												src={project.result_image_url}
												alt={project.name}
												className="object-cover w-full h-full"
											/>
										) : (
											<div className="flex items-center justify-center h-full">
												<Sparkles className="h-12 w-12 text-muted-foreground" />
											</div>
										)}
										{project.status === "processing" && (
											<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
												<div className="text-white text-sm font-medium">
													Processando...
												</div>
											</div>
										)}
										{project.status === "failed" && (
											<div className="absolute inset-0 bg-destructive/50 flex items-center justify-center">
												<div className="text-white text-sm font-medium">
													Falhou
												</div>
											</div>
										)}
									</div>
									<CardHeader>
										<CardTitle className="line-clamp-1">
											{project.name}
										</CardTitle>
										{project.description && (
											<p className="text-sm text-muted-foreground line-clamp-2">
												{project.description}
											</p>
										)}
									</CardHeader>
									<CardContent>
										<div className="flex flex-col gap-2 text-sm text-muted-foreground">
											{project.location && (
												<div className="flex items-center gap-2">
													<MapPin className="h-4 w-4" />
													<span>{project.location}</span>
												</div>
											)}
											<div className="flex items-center gap-2">
												<Calendar className="h-4 w-4" />
												<span>
													{new Date(project.created_at).toLocaleDateString(
														"pt-BR",
													)}
												</span>
											</div>
											{project.selected_styles.length > 0 && (
												<div className="flex flex-wrap gap-1 mt-2">
													{project.selected_styles.slice(0, 3).map((style) => (
														<span
															key={style}
															className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
														>
															{style}
														</span>
													))}
													{project.selected_styles.length > 3 && (
														<span className="px-2 py-1 bg-muted text-xs rounded-full">
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


