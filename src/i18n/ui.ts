export const languages = {
  es: 'Español',
  en: 'English',
};

export const defaultLang = 'es';

export const ui = {
  es: {
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.projects': 'Proyectos',
    'nav.contact': 'Contacto',
    'hero.title': 'Hacemos que la tecnología trabaje para vos.',
    'hero.subtitle': 'Creamos sistemas, plataformas y herramientas digitales que ayudan a empresas, comercios, profesionales e instituciones a ahorrar tiempo, organizar procesos y crecer de forma más eficiente. Desde pequeños negocios hasta municipios, desarrollamos soluciones adaptadas a cada necesidad, sin funciones innecesarias ni complicaciones.',
  },
  en: {
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact Us',
    'hero.title': 'We make technology work for you.',
    'hero.subtitle': 'We create systems, platforms, and digital tools that help businesses, professionals, and institutions save time, organize processes, and grow more efficiently. From small businesses to municipalities, we develop custom solutions with no unnecessary features or complications.',
  },
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}
