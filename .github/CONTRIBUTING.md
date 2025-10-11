# Contributing to PlatFormula-One

Thank you for your interest in contributing to PlatFormula-One! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/PlatFormula-One.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes locally
6. Commit your changes: `git commit -m "Add your feature"`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Create a Pull Request

## Development Workflow

### Before Submitting a PR

1. **Ensure markdown files are properly formatted**
   ```bash
   # Install markdownlint locally
   npm install -g markdownlint-cli2
   
   # Check your files
   markdownlint-cli2 "**/*.md"
   ```

2. **Check for broken links**
   - Ensure all links in documentation are valid
   - Use relative paths for internal links

3. **Run security checks** (if applicable)
   - Review any security warnings
   - Update vulnerable dependencies

4. **Test your changes**
   - Build the project (if applicable)
   - Run tests (if applicable)
   - Manually verify functionality

### Pull Request Process

1. **Create a descriptive PR title**
   - Use conventional commits: `feat:`, `fix:`, `docs:`, `chore:`, etc.
   - Example: `feat: add user authentication module`

2. **Provide detailed description**
   - What does this PR do?
   - Why is this change needed?
   - How was it tested?
   - Any breaking changes?

3. **Wait for CI checks**
   - All CI checks must pass before merge
   - Address any issues reported by automated checks
   - Request review from maintainers

4. **Respond to feedback**
   - Address review comments promptly
   - Make requested changes
   - Push updates to your branch

## CI/CD Pipeline

All contributions are automatically validated through our CI/CD pipeline:

### Continuous Integration
- **Markdown Linting**: Validates formatting
- **Link Checking**: Ensures documentation links work
- **Security Scanning**: Checks for vulnerabilities
- **Build Validation**: Verifies repository structure

### What This Means for You
- ✅ Your PR will be automatically tested
- ✅ You'll see status checks on your PR
- ✅ Failed checks will block merging
- ✅ All checks must pass for merge

See `.github/QUICK_START.md` for more details on the CI/CD pipeline.

## Code Style Guidelines

### Markdown Files
- Use ATX-style headers (`#` syntax)
- Keep line length reasonable (under 120 characters when possible)
- Use proper link syntax
- Include blank lines between sections
- Use code blocks with language specification

### General
- Keep commits atomic and focused
- Write clear commit messages
- Follow existing patterns in the codebase
- Add tests for new functionality
- Update documentation for changes

## Commit Message Format

We follow conventional commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

**Examples:**
```
feat(auth): add OAuth2 authentication

Implements OAuth2 authentication flow with support for
Google and GitHub providers.

Closes #123
```

```
fix: resolve markdown link checker warnings

Updates broken links in README and documentation files.
```

```
docs: add CI/CD pipeline documentation

Adds comprehensive documentation for the GitHub Actions
CI/CD pipeline including quick start guide.
```

## Reporting Issues

### Bug Reports
When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (OS, versions, etc.)
- Screenshots if applicable

### Feature Requests
When requesting features, please include:
- Clear description of the feature
- Use case and motivation
- Proposed implementation (if you have ideas)
- Any alternatives considered

## Labels

We use labels to categorize issues and PRs:

- `bug`: Something isn't working
- `enhancement`: New feature or improvement
- `documentation`: Documentation changes
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention needed
- `ci/cd`: CI/CD pipeline related
- `dependencies`: Dependency updates
- `security`: Security related

## Code Review Process

1. **All PRs require review** from at least one maintainer
2. **CI checks must pass** before review
3. **Address feedback** from reviewers
4. **Be responsive** to questions and comments
5. **Be patient** - reviews may take time

## Release Process

Releases are managed by maintainers:

1. Version is tagged following semantic versioning
2. CD pipeline automatically creates release artifacts
3. Staging deployment happens automatically
4. Production deployment requires approval
5. Release notes are generated from commits

## Getting Help

- **Questions?** Open an issue with the `question` label
- **CI/CD Issues?** See `.github/QUICK_START.md`
- **Detailed Pipeline Docs?** See `.github/PIPELINE_OVERVIEW.md`
- **Community Forum**: GitHub Discussions (if enabled)

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## Recognition

Contributors will be recognized in:
- GitHub contributors page
- Release notes
- Project documentation (for significant contributions)

## Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inclusive environment for all contributors.

### Expected Behavior
- Be respectful and inclusive
- Welcome newcomers
- Be collaborative
- Accept constructive criticism gracefully
- Focus on what's best for the project

### Unacceptable Behavior
- Harassment or discrimination
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information
- Any other unprofessional conduct

### Enforcement
Violations may result in temporary or permanent ban from the project.

---

Thank you for contributing to PlatFormula-One! 🚀

**Questions?** Feel free to open an issue or reach out to the maintainers.
