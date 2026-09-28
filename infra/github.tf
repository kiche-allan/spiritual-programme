locals {
  github_secrets = {
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

resource "github_actions_secret" "secrets" {
  for_each        = local.github_secrets
  repository      = "spiritual-programme"
  secret_name     = each.key
  plaintext_value = each.value
}
