# Releasing `neobrutal`

Releases are managed by Release Please and published to npm from `.github/workflows/release.yml`.

## One-time repository setup

1. In the npm settings for `neobrutal`, add a GitHub Actions trusted publisher with:
   - Organization or user: `Bridgetamana`
   - Repository: `neobrutal-ui`
   - Workflow filename: `release.yml`
   - Environment: leave empty
   - Allowed action: `npm publish`
2. In GitHub Actions settings, allow workflows to create pull requests and grant the workflow its declared write permissions.
3. Optional: add a `RELEASE_PLEASE_TOKEN` repository secret containing a fine-grained personal access token. Without it, release PRs are created with `GITHUB_TOKEN` and will not trigger other workflows until merged.

No long-lived npm publish token is required. The publish job uses npm trusted publishing through GitHub OIDC and receives automatic package provenance.

## Normal release flow

1. Use Conventional Commit prefixes for changes under `packages/cli`:
   - `fix:` creates a patch release.
   - `feat:` creates a minor release.
   - `feat!:` or a `BREAKING CHANGE:` footer creates a major release.
2. Release Please creates or updates a release pull request containing the version bump and `packages/cli/CHANGELOG.md` changes.
3. Review and merge the release pull request.
4. The workflow creates the matching `vX.Y.Z` GitHub release, tests the tagged package, verifies its contents, and publishes it to npm.

## Recovering a failed publish

If the GitHub release was created but npm publishing failed, manually run the `Release` workflow and enter the existing `vX.Y.Z` tag in `publish_tag`. The workflow verifies that the tag, package version, commit, and GitHub release all agree before publishing.
