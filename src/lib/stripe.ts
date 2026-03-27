import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

export const PLANS = {
  pro_monthly: {
    priceId: process.env.STRIPE_PRO_MONTHLY_PRICE_ID!,
    name: "Pro Monthly",
    amount: 1200,
  },
  pro_annual: {
    priceId: process.env.STRIPE_PRO_ANNUAL_PRICE_ID!,
    name: "Pro Annual",
    amount: 7900,
  },
} as const;

export type PlanKey = keyof typeof PLANS;
