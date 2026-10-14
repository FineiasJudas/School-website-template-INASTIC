import { Zap, Award, GraduationCap, Briefcase, Network, Cloud, ShieldCheck, BarChart3, Server, Coffee, KeyRound, Compass } from 'lucide-react';
export const nav = [['Sobre nós','#sobre'],['Cursos','#cursos'],['Carreira','#carreira'],['Quadros','#quadros'],['Escolas','#escolas']];
export const stats = [['+12 mil','Alunos formados'],['92%','Empregados em 12 meses'],['+40','Cursos e certificações']];
export const formats = [
  ['Cursos curtos','4 a 8 semanas','Aprenda uma competência concreta, ao seu ritmo.',Zap],
  ['Certificações','3 a 6 meses','Programas com certificado reconhecido pela indústria.',Award],
  ['Licenciaturas','4 anos','Engenharia Informática, Ciência de Dados e Redes.',GraduationCap],
  ['Formação executiva','Presencial','Para gestores e quadros do sector público e privado.',Briefcase]];
const L = '/boy-studying-peacefully-library.jpg', W = '/young-woman-studying-library.jpg', O = '/74336.jpg', C = '/modern-business-center.jpg', H = '/hero2.jpg';
export const courses = [
  ['Programação com Python','Curso','8 semanas','Iniciante',L],['Análise de Dados','Certificação','12 semanas','Intermédio',W],
  ['Cibersegurança Aplicada','Certificação','16 semanas','Intermédio',O],['Redes e Cloud','Curso','10 semanas','Iniciante',C],
  ['Inteligência Artificial','Licenciatura','4 anos','Avançado',H],['Gestão de Projectos TI','Executiva','6 semanas','Avançado',O],
  ['Desenvolvimento Web','Curso','10 semanas','Iniciante',W],['Base de Dados e SQL','Curso','6 semanas','Iniciante',L]];
export const certs = [['Cisco CCNA','Redes',Network],['Microsoft Azure','Cloud',Cloud],['CompTIA Security+','Cibersegurança',ShieldCheck],['Google Data Analytics','Dados',BarChart3],
  ['AWS Cloud Practitioner','Cloud',Server],['Oracle Java','Programação',Coffee],['Cisco CyberOps','Segurança',KeyRound],['Scrum Master','Gestão',Compass]] as const;
export const alumni = [
  ['Ana Paula Gomes','Engenheira de Dados','“Saí do INASTIC com um projecto real e uma vaga numa empresa de Luanda.”','/102075.jpg'],
  ['Joaquim Mendes','Analista de Segurança','“Os laboratórios e a certificação abriram-me portas em três meses.”','/1111.jpg'],
  ['Teresa Domingos','Programadora Full Stack','“Os docentes trabalham na indústria. Aprendi o que o mercado pede.”','/56665.jpg'],
  ['Manuel Katende','Administrador de Redes','“Estudei à noite, trabalhando. O horário flexível fez a diferença.”','/8721.jpg']];
export const schoolOffers = [
  ['Currículo de TI para o ensino médio','Disciplinas de programação e literacia digital alinhadas ao currículo nacional.'],
  ['Formação de professores','Capacitação certificada para docentes de informática e ciências.'],
  ['Parcerias com o superior','Acesso a laboratórios, estágios e programas conjuntos de investigação.']];
export const staff = [['Dr. Domingos Silva','Director-Geral','/2004.jpg'],['Dra. Luzia Fernandes','Directora Académica','/4126.jpg'],['Eng. Paulo Neto','Chefe de Cibersegurança','/31194.jpg'],['Dra. Marta Cardoso','Chefe de Dados e IA','/148048.jpg']];
// Parceiros: para usar o logótipo, ponha o ficheiro em /public/partners e preencha 'logo' (ex.: '/partners/cisco.svg').
// Também aceita URLs externas dos domínios permitidos em next.config.mjs. Sem 'logo', aparece o nome em texto.
export const partners: { name: string; logo?: string }[] = [
  { name: 'Cisco Academy' }, { name: 'Microsoft' }, { name: 'Google Cloud' }, { name: 'AWS' }, { name: 'CompTIA' }, { name: 'Universidade Agostinho Neto' }];
