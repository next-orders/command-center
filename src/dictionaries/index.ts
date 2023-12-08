import { PageKey, PAGES } from "@/lib/pages";
import { BreadcrumbLink } from "@/components/Breadcrumbs";

export type Locale = "EN" | "ES" | "RU";

export type Translation = typeof Translations;
export type TranslationKey = keyof Translation;

type Dictionary = Record<TranslationKey, string>;

const Translations = {
  RETURN_BUTTON: { EN: "Return", ES: "Devolver", RU: "Вернуться" },
  CHOOSE_BUTTON: { EN: "Choose", ES: "Elegir", RU: "Выбрать" },
  SIGN_IN_BUTTON: { EN: "Sign In", ES: "Iniciar sesión", RU: "Войти" },
  DEMO_EMPLOYEE_BUTTON: {
    EN: "Demo Employee",
    ES: "Empleado de demostración",
    RU: "Демо-сотрудник",
  },
  COMMAND_CENTER_LABEL: {
    EN: "Command Center",
    ES: "Centro de comando",
    RU: "Командный центр",
  },
  DASHBOARD_LABEL: {
    EN: "Dashboard",
    ES: "Tablero de mandos",
    RU: "Панель управления",
  },
  CLIENT_BASE_LABEL: {
    EN: "Client Base",
    ES: "Base del cliente",
    RU: "База клиентов",
  },
  CLIENT_PAGE_LABEL: {
    EN: "Client Page",
    ES: "Página del cliente",
    RU: "Страница клиента",
  },
  CLIENTS_LABEL: { EN: "Clients", ES: "Clientes", RU: "Клиенты" },
  EMPLOYEE_BASE_LABEL: {
    EN: "Employee Base",
    ES: "Base de empleados",
    RU: "База сотрудников",
  },
  EMPLOYEES_LABEL: {
    EN: "Employees",
    ES: "Empleados",
    RU: "Сотрудники",
  },
  CHANNELS_LABEL: { EN: "Channels", ES: "Canales", RU: "Каналы" },
  CHANNEL_PAGE_LABEL: {
    EN: "Channel Page",
    ES: "Página del canal",
    RU: "Страница канала",
  },
  DOMAINS_LABEL: { EN: "Domains", ES: "Dominios", RU: "Домены" },
  MEDIA_LABEL: { EN: "Media", ES: "Medios", RU: "Медиа" },
  MENUS_LABEL: { EN: "Menus", ES: "Menús", RU: "Меню" },
  MENU_PAGE_LABEL: {
    EN: "Menu Page",
    ES: "Página de menú",
    RU: "Страница меню",
  },
  PRODUCTS_LABEL: { EN: "Products", ES: "Productos", RU: "Продукты" },
  PRODUCT_PAGE_LABEL: {
    EN: "Product page",
    ES: "Página del producto",
    RU: "Страница продукта",
  },
  INGREDIENTS_PAGE_LABEL: {
    EN: "Ingredients page",
    ES: "Página de ingredientes",
    RU: "Страница ингредиентов",
  },
  PRODUCTION_PAGE_LABEL: {
    EN: "Production page",
    ES: "Página de producción",
    RU: "Страница производства",
  },
  READY_PAGE_LABEL: {
    EN: "Ready page",
    ES: "Página lista",
    RU: "Страница готовых товаров",
  },
  PRODUCT_VARIANT_PAGE_LABEL: {
    EN: "Product Variant Page",
    ES: "Página de variantes del producto",
    RU: "Страница варианта товара",
  },
  IT_IS_LABEL: {
    EN: "It's",
    ES: "Es",
    RU: "Это",
  },
  LOADING_LABEL: { EN: "Loading", ES: "Sobreprima", RU: "Загружаем" },
  YOU_HAVE_SOME_LABEL: {
    EN: "You have some",
    ES: "Tienes un poco",
    RU: "У вас есть несколько",
  },
  YOU_HAVE_NONE_LABEL: {
    EN: "You have none",
    ES: "No tienes ninguno",
    RU: "У вас еще нет",
  },
  MAYBE_ITS_TIME_LABEL: {
    EN: "Maybe it's time?",
    ES: "¿Quizás es hora?",
    RU: "Может быть, пришло время?",
  },
  CREATE_CHANNEL_LABEL: {
    EN: "Create Channel",
    ES: "Crear canal",
    RU: "Создать канал",
  },
  CREATE_MENU_CATEGORY_LABEL: {
    EN: "Create Category",
    ES: "Crear categoría",
    RU: "Создать категорию",
  },
  CREATE_MEDIA_LABEL: {
    EN: "Create Media",
    ES: "Crear medios",
    RU: "Загрузить медиа",
  },
  CREATE_PRODUCTION_LABEL: {
    EN: "Create Product",
    ES: "Crear producto",
    RU: "Создать продукт",
  },
  CREATE_PRODUCT_VARIANT_LABEL: {
    EN: "Create Product",
    ES: "Crear producto",
    RU: "Создать продукт",
  },
  SIGNIN_PAGE_WELCOME_LABEL: {
    EN: "We've been waiting for you!",
    ES: "Lo hemos estado esperando!",
    RU: "Мы вас заждались!",
  },
  EMAIL_LABEL: { EN: "Email", ES: "Email", RU: "Email" },
  EMAIL_PLACEHOLDER: {
    EN: "Your email address",
    ES: "Su dirección de correo electrónico",
    RU: "Ваш электронный адрес",
  },
  PASSWORD_LABEL: {
    EN: "Password",
    ES: "Contraseña",
    RU: "Пароль",
  },
  PASSWORD_PLACEHOLDER: {
    EN: "Your password",
    ES: "Tu contraseña",
    RU: "Ваш пароль",
  },
  SEARCH_PLACEHOLDER: {
    EN: "Find anything",
    ES: "Encontrar cualquier cosa",
    RU: "Найти что-нибудь",
  },
  FIND_BY_NAME_PLACEHOLDER: {
    EN: "Find by name",
    ES: "Encontrar por nombre",
    RU: "Найти по названию",
  },
  CHOOSE_A_PRODUCT_LABEL: {
    EN: "Choose a Product",
    ES: "Elija un producto",
    RU: "Выберите продукт",
  },
};

const createDictionaryForLocale = (locale: Locale): Dictionary =>
  Object.entries(Translations).reduce(
    (dictionary: Dictionary, [key, value]) => {
      dictionary[key as TranslationKey] = value[locale];
      return dictionary;
    },
    {} as Dictionary,
  );

export const getDictionary = (locale: Locale = "EN"): Dictionary => {
  return createDictionaryForLocale(locale);
};

const createLinkFromPageKey = (
  dictionary: Dictionary,
  pageKey: PageKey,
): BreadcrumbLink => {
  const { dictionaryKey, href } = PAGES[pageKey];
  const title = dictionary[dictionaryKey];

  return { title, href };
};

export const prepareLocalizedLinks = (
  keys: PageKey[],
  dictionary: Dictionary,
): BreadcrumbLink[] =>
  keys.map((key) => createLinkFromPageKey(dictionary, key));
