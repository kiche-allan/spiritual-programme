data "vercel_project" "spiritual_programme" {
  name = "spiritual-programme"
}

locals {
  environments = ["production", "preview", "development"]

  env_vars = {
    NEXT_PUBLIC_SUPABASE_URL      = var.supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY = var.supabase_anon_key
    SUPABASE_SERVICE_ROLE_KEY     = var.supabase_service_role_key
    NEXT_PUBLIC_POSTHOG_KEY       = var.posthog_key
    NEXT_PUBLIC_POSTHOG_HOST      = var.posthog_host
    NEXT_PUBLIC_AXIOM_DATASET     = var.axiom_dataset
    NEXT_PUBLIC_AXIOM_TOKEN       = var.axiom_token
    RESEND_API_KEY                = var.resend_api_key
    NEXT_PUBLIC_APP_URL           = var.app_url
    SENTRY_ORG                    = var.sentry_org
    SENTRY_PROJECT                = "spiritual-programme"
  }
}

resource "vercel_project_environment_variable" "env_vars" {
  for_each   = local.env_vars
  project_id = data.vercel_project.spiritual_programme.id
  key        = each.key
  value      = each.value
  target     = local.environments
}
