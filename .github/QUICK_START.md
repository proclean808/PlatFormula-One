# CI/CD Pipeline Quick Start Guide

## 🚀 Getting Started

Your repository now has a fully functional CI/CD pipeline! Here's what you need to know to get started.

## What Happens Automatically

### When You Push Code
✅ Markdown files are linted for formatting issues  
✅ All links in documentation are checked  
✅ Security vulnerabilities are scanned  
✅ Repository structure is validated  

### When You Create a Pull Request
✅ All CI checks run automatically  
✅ Status checks appear on the PR  
✅ Merge is blocked until checks pass (configurable)  

### When You Create a Release
✅ Release is validated  
✅ Artifacts are built  
✅ Deployment to staging happens automatically  
✅ Production deployment can be triggered (requires approval)  

## Quick Actions

### Running CI Manually
1. Go to Actions tab
2. Select "CI Pipeline"
3. Click "Run workflow"
4. Choose branch and click "Run workflow"

### Deploying Manually
1. Go to Actions tab
2. Select "CD Pipeline"
3. Click "Run workflow"
4. Choose environment (staging/production)
5. Click "Run workflow"

### Creating a Release
```bash
# Tag your commit
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# Or create release via GitHub UI:
# Releases → Create a new release → Choose tag → Publish
```

## Configuration

### Set Up Environments (Recommended)

1. **Go to Settings → Environments**
2. **Create "staging" environment:**
   - No protection rules needed
   - Add environment-specific secrets if needed

3. **Create "production" environment:**
   - Enable "Required reviewers"
   - Add yourself as a reviewer
   - Add environment-specific secrets if needed

### Add Secrets (If Needed)

1. Go to Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Common secrets you might need:
   - `DEPLOY_TOKEN`: For deployment authentication
   - `AWS_ACCESS_KEY_ID`: For AWS deployments
   - `DOCKER_USERNAME`: For Docker registry
   - `NPM_TOKEN`: For npm publishing

## Customizing Workflows

### Adding Tests

Edit `.github/workflows/ci.yml` and add a new job:

```yaml
test:
  name: Run Tests
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Run tests
      run: |
        # Add your test commands here
        npm test
        # or
        python -m pytest
        # or
        go test ./...
```

### Adding Build Steps

Edit `.github/workflows/ci.yml`:

```yaml
build:
  name: Build
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Build application
      run: |
        # Add your build commands
        npm run build
        # or
        cargo build --release
```

### Customizing Deployment

Edit `.github/workflows/cd.yml` in the deploy steps:

```yaml
- name: Deploy to production
  run: |
    # Replace with your deployment commands
    # Examples:
    # kubectl apply -f k8s/
    # aws s3 sync dist/ s3://your-bucket
    # docker push your-image:${{ github.ref_name }}
```

## Troubleshooting

### CI Pipeline Failing?

**Check markdown files:**
```bash
# Install markdownlint locally
npm install -g markdownlint-cli2

# Run locally
markdownlint-cli2 "**/*.md"
```

**Check for broken links:**
- Look at the Link Checker job logs
- Fix or remove broken links
- Local links should be relative paths

**Security scan issues:**
- Review the Security tab in GitHub
- Check for known vulnerabilities
- Update dependencies if needed

### Deployment Not Working?

1. **Check if environments are created** (Settings → Environments)
2. **Verify secrets are set** (Settings → Secrets)
3. **Review deployment logs** (Actions tab → CD Pipeline)
4. **Ensure you have the right permissions**

### Workflow Not Triggering?

**Check:**
- Branch names match trigger conditions (`main`, `develop`)
- Workflow files are in `.github/workflows/`
- YAML syntax is valid (use a YAML validator)
- You have pushed to the repository (not just committed locally)

## Tips and Tricks

### View All Workflow Runs
```bash
# Using GitHub CLI
gh run list

# View specific workflow
gh run list --workflow=ci.yml

# Watch a running workflow
gh run watch
```

### Cancel Running Workflows
```bash
# Cancel latest run
gh run cancel $(gh run list --limit 1 --json databaseId -q '.[0].databaseId')

# Or via UI: Actions → Click on run → Cancel workflow
```

### Re-run Failed Jobs
1. Go to failed workflow run
2. Click "Re-run failed jobs" or "Re-run all jobs"

### Download Artifacts
1. Go to workflow run
2. Scroll to "Artifacts" section
3. Click to download

Or using CLI:
```bash
gh run download <run-id>
```

## Best Practices

### ✅ Do:
- Keep workflow files simple and readable
- Use descriptive job and step names
- Test workflows on feature branches first
- Use semantic versioning for releases
- Monitor workflow runs regularly
- Keep dependencies updated via Dependabot

### ❌ Don't:
- Commit secrets to the repository
- Use `@main` for action versions (use tags like `@v4`)
- Ignore failed security scans
- Skip CI checks (even if tempting)
- Make huge changes to workflows without testing

## Getting Help

- **GitHub Actions Docs**: https://docs.github.com/en/actions
- **Workflow Syntax**: https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions
- **Community Forum**: https://github.community/c/code-to-cloud/github-actions
- **Pipeline Overview**: See `.github/PIPELINE_OVERVIEW.md`

## Next Steps

1. ✅ Set up environments in repository settings
2. ✅ Add any necessary secrets
3. ✅ Customize deployment steps for your infrastructure
4. ✅ Add language-specific build and test steps
5. ✅ Test the pipeline with a small change
6. ✅ Create your first release!

---

**Need More Help?** Check out `.github/PIPELINE_OVERVIEW.md` for detailed documentation.

Happy Building! 🎉
