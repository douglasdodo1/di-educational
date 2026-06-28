export const heroContent = {
  painel: {
    eyebrow: "Bem-vindo de volta, Pedro",
    title: "Sua jornada acadêmica",
    subtitle:
      "Acompanhe seu progresso, retome trilhas em andamento e abra um curso para ver frequência, atividades e cronograma.",
  },
  atividades: {
    eyebrow: "Suas tarefas",
    title: "Atividades pendentes",
    subtitle: "Acompanhe as atividades atribuídas pelos seus professores e mantenha as entregas em dia.",
  },
  mensagens: {
    eyebrow: "Central de comunicação",
    title: "Mensagens",
    subtitle: "Converse com professores e colegas e acompanhe os avisos das suas turmas.",
  },
};

export function getHeroContent(pathname: string) {
  if (pathname.includes("pending-activities")) {
    return heroContent.atividades;
  }
  if (pathname.includes("messages")) {
    return heroContent.mensagens;
  }
  return heroContent.painel;
}
