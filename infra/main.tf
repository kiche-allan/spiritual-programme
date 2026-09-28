terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 1.0"
    }
    github = {
      source  = "integrations/github"
      version = "~> 6.0"
    }
    sentry = {
      source  = "jianyuan/sentry"
      version = "~> 0.12"
    }
  }

  backend "local" {
    path = "terraform.tfstate"
  }
}

provider "vercel" {
  api_token = var.vercel_token
  team      = var.vercel_team
}

provider "github" {
  token = var.github_token
  owner = "kiche-allan"
}

provider "sentry" {
  token = var.sentry_token
}
