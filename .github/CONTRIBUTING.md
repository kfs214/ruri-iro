# Welcome to RUri-iro Contributing Guide <!-- omit in toc -->

Thank you for investing your time in contributing to our project! Any contribution you make will be reflected on [RUri-iro app](https://develop.d1pxjinad17uxp.amplifyapp.com) :sparkles:.

In this guide, you'll find an overview of the contribution workflow for opening issues and creating pull requests.

## Table of Contents<!-- omit in toc -->

- [New Contributor Guide](#new-contributor-guide)
- [Issues](#issues)
  - [Reproducing a Reported Bug](#reproducing-a-reported-bug)
  - [Updating Issues](#updating-issues)
- [Pull Requests](#pull-requests)
  - [Fork a Repository](#fork-a-repository)
  - [Branches](#branches)
  - [Commit Messages](#commit-messages)
  - [Creating a Pull Request](#creating-a-pull-request)
  - [Dependency Update Policy](#dependency-update-policy)
- [CI/CD](#cicd)

## New Contributor Guide

To gain an understanding of the project, please read the [README](../README.md) file and [wiki](https://github.com/kfs214/ruri-iro/wiki).

## Issues

Issues can be created [here](https://github.com/kfs214/ruri-iro/issues/new).

If you encounter a bug, check if it has already been reported. If not, you can open an issue to report it following this contribution guideline.

### Reproducing a Reported Bug

Contribute by validating an issue or adding additional context to an existing one.

### Updating Issues

Contribute by providing additional information to existing issues.

## Pull Requests

Pull Requests are the way concrete changes are made to the code and documentation in this repository, including this document.

### Fork a Repository

To start, fork a repository and begin working on your changes.  
For more information, refer to [Fork a Repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)

### Branches

- `main`: Code is merged when tested, ready for production, and released to users.
- `develop`: Base branch to fork, make a new branch, or create your pull request.
- `feature/issue_<issue number>-<understandable slug>` (e.g., `feature/issue_1-discard_button`): Make your `feature/*` branch from `develop` and start coding!

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

### Creating a Pull Request

Follow the link to create a pull request: [Creating a Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

- Complete the provided template to help reviewers understand the changes and the purpose of your pull request.
- After submission, one of our team members will review your proposal. They may request changes before merging, either through suggested changes or comments.
- You can directly apply suggested changes through the user interface. For other modifications, make them in your fork and then commit them to your branch.
- If you encounter merge issues, refer to this [git tutorial](https://github.com/skills/resolve-merge-conflicts) to help resolve conflicts.

### Dependency Update Policy

Maintainers are responsible for modifying dependencies in RUri-iro's `package.json` or `package-lock.json` files. To ensure security, we do not accept pull requests altering these files. While draft pull requests are appreciated, please note that they will be closed in favor of an equivalent pull request submitted by an official RUri-iro maintainer.

## CI/CD

Your pull request triggers automated CI/CD deployment on Vercel.
