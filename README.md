# math-operations-dev

`math-operations-dev` repository, the foundational backbone for a backend application focused on mathematical operations.This repository integrates unit tests within our Continuous Integration (CI) process. These tests are the first step in a series of automated validations, leading to an integrated end-to-end (E2E) testing workflow managed by a child repository, all orchestrated through GitHub Actions.

## Repository Directory Structure

```
- .github/workflows       # Contains GitHub Actions CI/CD definitions
- node_modules            # Project dependencies installed here
- src                     # Source code for the application
  - app.js                # Main application entry point
  - math.operations.js    # Mathematical operations logic
- tests                   # Unit tests for the application
  - math.operations.test.js
- .gitignore              # Specifies untracked files to ignore
- package-lock.json       # Auto-generated dependencies tree
- package.json            # Project metadata and dependencies
- README.md               # Documentation for the repository
```

## Workflow Explained

The CI/CD pipeline is defined in `math_operations_dev.yml`, under `.github/workflows`. It triggers a multi-job process on pull request reviews approved for the `main` branch:

1. **Unit Tests**: Executes automated tests to ensure code quality.
2. **Auto-Merge**: Merges approved changes using the "squash" method after tests pass.
3. **Deployment**: Echoes deployment initiation (actual deployment steps are omitted for simplicity).
4. **Trigger E2E Tests**: Triggers the E2E test workflow in the `math-operations-e2e` repository using a GitHub dispatch event.

## Getting Started with Changes and Workflow Activation

### Initiating Your First Contribution

Once you've set up your local environment by forking or downloading ( With download, ensure to push the code to your account ) the repository, you're ready to start contributing. Here's how you can initiate the process:

1. **Install Dependencies**:

    ```
    npm install
    ```

2. **Create a New Branch**: From the `main` branch, create a new branch for your changes. This is a best practice that keeps the `main` branch stable and your work organized.

    ```bash
    git checkout -b feature/my-new-feature
    ```

3. **Make Your Changes**: Implement your feature or simply make a small change to get started. If you're not ready to dive into the application logic, adding a comment is enough in `app.js` file. For example:

    ```javascript
    // TODO: Describe the logic of a new math operation here
    ```

4. **Commit and Push Your Changes**: Once you've made your change, commit it to your branch and push it to the repository.

    ```bash
    git add .
    git commit -m "Add a new comment describing future logic"
    git push origin feature/my-new-feature
    ```

5. **Raise a Pull Request (PR)**: Go to the repository on GitHub and raise a PR from your new branch to the `main` branch. Provide a description of your changes and submit your PR.

6. **Peer Review**: Ask a peer to review your PR, or invite yourself with another account as a collaborator to approve the changes.

### Observing the Workflow in Action

After your PR is approved:

-   The automated workflows will be triggered.
-   You can observe the actions taking place in the 'Actions' section of the project repository.
-   Watch as the unit tests execute, the merge occurs, and the E2E tests are subsequently initiated in child repo.

This real-time observation will give you insight into the automated CI/CD process and the power of GitHub Actions in your development workflow.

### Workflow Breakdown

1. **Trigger for the Workflow**:

    ```yaml
    on:
        pull_request_review:
            types: [submitted]
            branches:
                - main
    ```

    This section specifies that the workflow is triggered when a pull request review is submitted against the `main` branch. Specifically, the workflow runs when a review has been marked as 'submitted', which typically means it has been approved.

2. **Unit Tests Job**:

    ```yaml
    jobs:
        unit-tests:
            runs-on: ubuntu-latest
            if: >
                github.event.review.state == 'approved'
    ```

    This job named `unit-tests` runs on the latest Ubuntu runner provided by GitHub Actions. It only proceeds if the pull request review state is 'approved'.

    - **Checkout Code**:

        ```yaml
        - name: Checkout Backend Repository Code
          uses: actions/checkout@v3
        ```

        The repository code is checked out using the `actions/checkout@v3` action, which is necessary to perform actions on the codebase, such as running tests.

    - **Set Up Node.js Environment**:

        ```yaml
        - name: Set Up Node.js Environment
          uses: actions/setup-node@v4
          with:
              node-version: "18"
        ```

        This step sets up the Node.js environment, specifying version 18, using the `actions/setup-node@v4` action.

    - **Install Dependencies**:

        ```yaml
        - name: Install Project Dependencies
          run: npm ci
        ```

        The project dependencies are installed using `npm ci`, which ensures a clean, consistent install based on the `package-lock.json`.

    - **Execute Unit Tests**:

        ```yaml
        - name: Execute Unit Tests
          run: npm run test
        ```

        This command runs the unit tests defined in the `package.json` under the script `test`.

    - **Post-Test Notification**:
        ```yaml
        - name: Post-Test Notification
          run: |
              echo "Unit tests completed successfully. Initiating the next steps in our testing strategy."
        ```
        After testing, a notification is echoed to the console/log to indicate the completion of the unit tests and the transition to the next steps.

3. **Auto-Merge Job**:

    ```yaml
    auto-merge:
        runs-on: ubuntu-latest
        needs: [unit-tests]
    ```

    The `auto-merge` job runs after the `unit-tests` job completes successfully due to the `needs` attribute. It also runs on the latest Ubuntu runner.

    - **Merge Pull Request**:
        ```yaml
        - name: Merge Pull Request
          uses: pascalgn/automerge-action@v0.15.6
          env:
              GITHUB_TOKEN: ${{ secrets.ACCESS_TOKEN }}
              MERGE_LABELS: "automerge"
              MERGE_METHOD: "squash"
              MERGE_COMMIT_MESSAGE: "pull-request-title"
              MERGE_DELETE_BRANCH: "true"
              MERGE_FORKS: "false"
              MERGE_RETRIES: "6"
              MERGE_RETRY_SLEEP: "10000"
              UPDATE_METHOD: "rebase"
        ```
        This action automates the merging of the pull request using the `pascalgn/automerge-action@v0.15.6`. It is configured to squash merge, delete the branch after merging, and not to merge forks. It will retry the merge up to six times if necessary.

4. **Deployment Job**:

    ```yaml
    deployment:
        runs-on: ubuntu-latest
        needs: [auto-merge]
    ```

    The `deployment` job is a placeholder and is configured to run after the `auto-merge` job.

    - **Deployment Step**:
        ```yaml
        - name: Deployment Step
          run: |
              echo "Deploying the application from main branch..."
        ```
        It simply echoes a message indicating a deployment. In a real-world scenario, this could be where you'd add scripts or actions that perform the actual deployment of your application.

5. **Trigger E2E Tests Job**:

    ```yaml
    trigger-e2e-tests:
        runs-on: ubuntu-latest
        needs: [deployment]
    ```

    The `trigger-e2e-tests` job is configured to run after the `deployment` job.

    - **Activate E2E Tests in Child Repository**:

        ```yaml
        - name: Activate E2E Tests in Child Repository
          run: |
              curl -XPOST -H "Authorization

        : Bearer ${{ secrets.ACCESS_TOKEN }}" \
        -H "Content-Type: application/json" \
        -d '{ "event_type": "trigger-e2e-tests-event" }' \
        https://api.github.com/repos/<username>/math-operations-e2e/dispatches
        ```

This step uses`curl`to send a POST request to GitHub's API to trigger the E2E testing workflow in the`math-operations-e2e`child repository. It uses the`secrets.ACCESS_TOKEN` for authorization. Replace the `<username>` with the GitHub username
