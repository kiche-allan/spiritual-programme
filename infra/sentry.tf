data "sentry_organization" "org" {
  slug = var.sentry_org
}

resource "sentry_project" "spiritual_programme" {
  organization = data.sentry_organization.org.slug
  teams        = ["#your-team"]
  name         = "spiritual-programme"
  platform     = "javascript-nextjs"
}

output "sentry_dsn" {
  value     = sentry_project.spiritual_programme.internal_id
  sensitive = true
}
