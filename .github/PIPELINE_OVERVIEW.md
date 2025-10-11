# CI/CD Pipeline Overview

This document provides a comprehensive overview of the GitHub Actions CI/CD pipeline implemented for PlatFormula-One.

## Pipeline Architecture

### Continuous Integration (CI) - `ci.yml`

The CI pipeline runs automatically on:
- Pushes to `main` and `develop` branches
- Pull requests targeting `main` and `develop` branches
- Manual workflow dispatch

#### Jobs:

1. **Markdown Lint**
   - Validates markdown file formatting and style
   - Uses: `markdownlint-cli2-action`
   - Continues on error to not block other checks

2. **Link Checker**
   - Validates all links in markdown files
   - Uses: `github-action-markdown-link-check`
   - Configuration: `.github/workflows/mlc_config.json`
   - Continues on error to not block other checks

3. **Security Scan**
   - Scans for vulnerabilities in the repository
   - Uses: Trivy vulnerability scanner
   - Uploads results to GitHub Security tab
   - Continues on error to not block other checks

4. **Build Check**
   - Validates repository structure
   - Placeholder for future build implementations
   - Always runs to ensure basic sanity checks

5. **CI Status**
   - Aggregates results from all jobs
   - Provides overall pipeline status

### Continuous Deployment (CD) - `cd.yml`

The CD pipeline runs on:
- Published GitHub releases
- Manual workflow dispatch with environment selection

#### Jobs:

1. **Validate**
   - Validates release artifacts
   - Checks release metadata
   - First gate before deployment

2. **Build**
   - Creates release artifacts
   - Uploads artifacts for deployment
   - Artifacts retained for 30 days

3. **Deploy to Staging**
   - Deploys to staging environment
   - Runs for: staging selection or all releases
   - Environment: `staging`
   - No approval required

4. **Deploy to Production**
   - Deploys to production environment
   - Runs for: production selection or stable releases (not beta/alpha)
   - Environment: `production`
   - Requires manual approval (configured in GitHub environments)
   - Creates deployment summary

5. **Notify**
   - Sends deployment notifications
   - Runs after all deployments complete
   - Always runs regardless of deployment status

### Repository Automation

#### Label Sync - `label-sync.yml`
- Syncs repository labels from `.github/labels.yml`
- Runs on push to main when labels file changes
- Can be triggered manually
- Maintains consistent labeling across the repository

#### Stale Management - `stale.yml`
- Runs daily at midnight UTC
- Marks issues/PRs stale after 60 days of inactivity
- Closes stale items after 7 additional days
- Exempts items with `pinned` or `security` labels
- Can be triggered manually

#### Dependabot - `dependabot.yml`
- Automatically updates GitHub Actions dependencies
- Runs weekly on Mondays at 9:00 AM
- Opens up to 5 PRs at a time
- Auto-labels with `dependencies` and `ci/cd`
- Assigns to repository owner

## Configuration Files

### `.github/workflows/mlc_config.json`
Configuration for markdown link checker:
- Ignores localhost URLs
- 20-second timeout per link
- Retries on 429 (rate limit) errors
- 3 retry attempts
- Accepts 200, 206, 429 status codes

### `.github/labels.yml`
Defines standard labels for issues and PRs:
- Bug tracking
- Documentation
- Enhancements
- Community labels
- CI/CD specific labels
- Security and maintenance labels

### `.github/dependabot.yml`
Configures automated dependency updates:
- Weekly schedule
- Auto-assignment and review
- Proper labeling
- Conventional commit messages

## Environment Setup

To use the CD pipeline effectively:

1. **Create GitHub Environments:**
   - Go to Repository Settings → Environments
   - Create `staging` environment
   - Create `production` environment with required reviewers

2. **Configure Environment URLs:**
   - Set staging URL in `cd.yml` (line 48)
   - Set production URL in `cd.yml` (line 59)

3. **Add Environment Secrets:**
   - Add any deployment credentials as environment secrets
   - Update deployment steps to use these secrets

## Extending the Pipeline

### Adding Language-Specific Builds

When you add code to the repository, extend the CI pipeline:

```yaml
# Example: Add Node.js build
build-node:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '20'
    - run: npm ci
    - run: npm run build
    - run: npm test
```

### Adding Deployment Steps

Update the deployment jobs in `cd.yml`:

```yaml
- name: Deploy to production
  run: |
    # Add your deployment commands
    # E.g., deploy to cloud provider
    # aws s3 sync dist/ s3://your-bucket
```

## Best Practices

1. **Always use version tags** for GitHub Actions (e.g., `@v4` instead of `@main`)
2. **Use continue-on-error sparingly** - only for non-critical checks
3. **Leverage environment protection rules** for production deployments
4. **Keep secrets in GitHub Secrets** - never commit them
5. **Use workflow dispatch** for manual testing and debugging
6. **Monitor workflow runs** regularly for failures
7. **Update dependencies** via Dependabot PRs promptly

## Monitoring and Debugging

### Viewing Workflow Runs
- Go to Actions tab in GitHub
- Click on specific workflow to see all runs
- Click on a run to see job details and logs

### Debugging Failed Workflows
1. Check the job logs for error messages
2. Use workflow dispatch to test manually
3. Enable debug logging: Add secrets `ACTIONS_STEP_DEBUG` and `ACTIONS_RUNNER_DEBUG` set to `true`

### Status Badges
Add these to your README:
```markdown
[![CI Pipeline](https://github.com/proclean808/PlatFormula-One/actions/workflows/ci.yml/badge.svg)](https://github.com/proclean808/PlatFormula-One/actions/workflows/ci.yml)
[![CD Pipeline](https://github.com/proclean808/PlatFormula-One/actions/workflows/cd.yml/badge.svg)](https://github.com/proclean808/PlatFormula-One/actions/workflows/cd.yml)
```

## Security Considerations

1. **Trivy Scanning**: Automatically scans for vulnerabilities
2. **SARIF Upload**: Results uploaded to GitHub Security tab
3. **Permissions**: Workflows use minimal required permissions
4. **Secrets**: All sensitive data stored in GitHub Secrets
5. **Dependabot**: Keeps Actions up-to-date with security patches

## Cost Optimization

- Workflows use `ubuntu-latest` (free tier friendly)
- `continue-on-error` prevents unnecessary reruns
- Artifact retention set to 30 days (configurable)
- Conditional job execution to avoid unnecessary runs
- Stale bot reduces maintenance overhead

## Support and Maintenance

For issues with the CI/CD pipeline:
1. Check workflow logs first
2. Validate YAML syntax
3. Test with workflow dispatch
4. Review recent changes to workflow files
5. Consult GitHub Actions documentation

---

**Last Updated**: 2025-10-10
**Pipeline Version**: 1.0.0
**Maintained by**: @proclean808
