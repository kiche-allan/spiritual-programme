# Vercel
variable "vercel_token" {
  description = "Vercel API token"
  type        = string
  sensitive   = true
}

variable "vercel_team" {
  description = "Vercel team slug"
  type        = string
  default     = "kicheallans-projects"
}

# GitHub
variable "github_token" {
  description = "GitHub personal access token"
  type        = string
  sensitive   = true
}

# Supabase
variable "supabase_url" {
  description = "Supabase project URL"
  type        = string
}

variable "supabase_anon_key" {
  description = "Supabase anon key"
  type        = string
  sensitive   = true
}

variable "supabase_service_role_key" {
  description = "Supabase service role key"
  type        = string
  sensitive   = true
}

# PostHog
variable "posthog_key" {
  description = "PostHog project API key"
  type        = string
  sensitive   = true
}

variable "posthog_host" {
  description = "PostHog host"
  type        = string
  default     = "https://us.i.posthog.com"
}

# Axiom
variable "axiom_token" {
  description = "Axiom API token"
  type        = string
  sensitive   = true
}

variable "axiom_dataset" {
  description = "Axiom dataset name"
  type        = string
  default     = "spiritual-programme"
}

# Resend
variable "resend_api_key" {
  description = "Resend API key"
  type        = string
  sensitive   = true
}

# Sentry
variable "sentry_token" {
  description = "Sentry auth token"
  type        = string
  sensitive   = true
}

variable "sentry_org" {
  description = "Sentry organization slug"
  type        = string
}

# App
variable "app_url" {
  description = "Production app URL"
  type        = string
  default     = "https://spiritual-programme.vercel.app"
}
