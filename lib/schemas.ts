import { z } from "zod";
import { SERVICE_SLUGS } from "./types";

const nonEmpty = z.string().trim().min(1);
const idSchema = z.string().trim().min(1);

export const serviceItemSchema = z.object({
  id: idSchema,
  name: nonEmpty,
  url: z.string().url().or(z.literal("")).or(z.string().startsWith("/")),
  image: nonEmpty,
});

export const serviceSectionSchema = z.object({
  pageTitle: nonEmpty,
  pageDescription: z.string(),
  items: z.array(serviceItemSchema),
});

export const servicesFileSchema = z.object(
  Object.fromEntries(SERVICE_SLUGS.map((s) => [s, serviceSectionSchema])) as unknown as Record<
    (typeof SERVICE_SLUGS)[number],
    z.ZodType<unknown>
  >,
);

export const packagePlanSchema = z.object({
  id: idSchema,
  name: nonEmpty,
  price: z.number().nonnegative(),
  currency: z.string(),
  unit: z.string(),
  features: z.array(nonEmpty),
  order: z.number().int().nonnegative(),
  highlighted: z.boolean().optional(),
});

export const packageTabSchema = z.object({
  title: nonEmpty,
  plans: z.array(packagePlanSchema),
});

export const packagesFileSchema = z.object({
  home: packageTabSchema,
  corporate: packageTabSchema,
  government: packageTabSchema,
});

export const productSchema = z.object({
  id: idSchema,
  name: nonEmpty,
  price: z.number().nonnegative(),
  image: nonEmpty,
  alt: z.string(),
  order: z.number().int().nonnegative(),
});

export const productsFileSchema = z.array(productSchema);

export const coverageAreaSchema = z.object({
  id: idSchema,
  name: nonEmpty,
  coords: z.string(),
  order: z.number().int().nonnegative(),
});

export const coverageFileSchema = z.array(coverageAreaSchema);

export const noticeSchema = z.object({
  id: idSchema,
  date: nonEmpty,
  title: nonEmpty,
  fileUrl: z.string(),
});

export const noticesFileSchema = z.array(noticeSchema);

export const notificationSchema = z.object({
  enabled: z.boolean(),
  type: z.enum(["info", "warning", "success", "danger"]),
  text: z.string(),
  link: z.string().url().or(z.literal("")).nullable(),
});

export const contactSchema = z.object({
  phones: z.array(z.object({ label: nonEmpty, number: nonEmpty })),
  emails: z.array(z.string().email().or(nonEmpty)),
  address: z.string(),
  social: z.object({
    facebook: z.string(),
    youtube: z.string(),
    linkedin: z.string(),
    twitter: z.string(),
  }),
});

export const settingsFileSchema = z.object({
  contact: contactSchema,
  notification: notificationSchema,
  home: z.object({
    hero: z.object({
      title: z.string(),
      subtitle: z.string(),
      ctaLabel: z.string(),
      ctaHref: z.string(),
    }),
    noticeboard: z.string(),
    stats: z.array(z.object({ label: z.string(), value: z.string() })),
    features: z.array(z.object({ icon: z.string(), title: z.string(), text: z.string() })),
  }),
  about: z.object({ title: z.string(), body: z.string(), mission: z.string() }),
  homeInternet: z.object({ title: z.string(), body: z.string() }),
  corporate: z.object({ title: z.string(), body: z.string() }),
  footer: z.object({ companyBlurb: z.string() }),
});

export const userSchema = z.object({
  id: idSchema,
  username: nonEmpty,
  passwordHash: nonEmpty,
  role: z.enum(["admin", "editor"]),
  createdAt: z.string(),
  lastLogin: z.string().nullable(),
});

export const usersFileSchema = z.array(userSchema);

export const loginSchema = z.object({
  username: nonEmpty,
  password: nonEmpty,
});
