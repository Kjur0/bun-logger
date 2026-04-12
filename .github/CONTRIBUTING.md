# Contributing guidelines

Thank you for considering contributing to this project! We welcome contributions from the community and appreciate your efforts to help improve the project. To
ensure a smooth contribution process, please follow the guidelines outlined below.

## How to Contribute

1. Fork the repository and create a new branch for your contribution.
2. Make your changes and commit them with clear and descriptive commit messages.
3. Push your changes to your forked repository.
4. Open a pull request against the main repository, providing a clear description of your changes and the problem they solve.
5. Ensure that your code follows the project's coding style and conventions.
6. If your contribution includes new features or changes to existing functionality, please update the documentation accordingly.

## Style Guidelines

Please avoid using tabs for indentation and use spaces instead. Follow the existing code style and conventions used in the project. If you are unsure about the
style, please refer to the existing codebase for guidance.

Avoid using `var` and prefer `let` or `const` for variable declarations. Use `const` for variables that are not reassigned and `let` for variables that are
reassigned.

Avoid using `any` as a type and prefer more specific types whenever possible. This will help improve the type safety of the code and make it easier to
understand.

Avoid using arrow functions for methods in classes, as they can lead to issues with `this` binding. Instead, use regular function syntax for class methods.

Remember to use `prettier` to format your code before submitting a pull request. This will help maintain a consistent code style across the project.

```bash
bun format
```
