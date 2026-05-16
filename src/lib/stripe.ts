import Stripe from "stripe";

let stripe: Stripe | null = null;

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;

  if (!stripe) {
    stripe = new Stripe(key, { apiVersion: "2023-10-16" });
  }
  return stripe;
}
