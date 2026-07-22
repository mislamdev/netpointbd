export type UserRole = "admin" | "editor";

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  role: UserRole;
  createdAt: string;
  lastLogin: string | null;
}

export interface ServiceItem {
  id: string;
  name: string;
  url: string;
  image: string;
  order?: number;
  enabled?: boolean;
}

export interface ServiceSection {
  pageTitle: string;
  pageDescription: string;
  items: ServiceItem[];
}

export type ServicesFile = Record<string, ServiceSection>;

export interface PackagePlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  unit: string;
  features: string[];
  order: number;
  highlighted?: boolean;
}

export interface PackageTab {
  title: string;
  plans: PackagePlan[];
}

export type PackagesFile = Record<"home" | "corporate" | "government", PackageTab>;

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  alt: string;
  order: number;
}

export interface CoverageArea {
  id: string;
  name: string;
  coords: string;
  order: number;
}

export interface Notice {
  id: string;
  date: string;
  title: string;
  fileUrl: string;
}

export interface ContactPhones {
  label: string;
  number: string;
}

export interface NotificationSettings {
  enabled: boolean;
  type: "info" | "warning" | "success" | "danger";
  text: string;
  link: string | null;
}

export interface ContactSettings {
  phones: ContactPhones[];
  emails: string[];
  address: string;
  social: {
    facebook: string;
    youtube: string;
    linkedin: string;
    twitter: string;
  };
}

export interface HomePageSettings {
  heroSlides: {
    title: string;
    subtitle: string;
    ctaLabel: string;
    ctaHref: string;
  }[];
  emergencyNotices: {
    text: string;
    link: string;
    enabled: boolean;
    startAt: string;
    endAt: string;
  }[];
  noticeboard: string;
  stats: { label: string; value: string }[];
  features: { icon: string; title: string; text: string }[];
}

export interface SettingsFile {
  contact: ContactSettings;
  notification: NotificationSettings;
  home: HomePageSettings;
  about: { title: string; body: string; mission: string };
  homeInternet: { title: string; body: string };
  corporate: { title: string; body: string };
  footer: { companyBlurb: string };
}

export type JsonFile =
  | "services"
  | "packages"
  | "products"
  | "coverage"
  | "notices"
  | "settings"
  | "users";

export const SERVICE_SLUGS = [
  "live-tv",
  "ftp-server",
  "torrent",
  "bangla-library",
  "song-zone",
  "newspaper",
  "jobs",
  "gov-websites",
  "education",
  "court-of-law",
  "online-shop-point",
  "all-type-tickets",
  "emergency-service",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
