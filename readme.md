# Introduction

`ai-prompt-coder` uses ChatGPT to write code based on `.prompt` files. It will
build a prompt based on a set of rules applied to your directory structure.
All rules are defined in `rules.prompt`. Please see `/examples` for existing
rules you can utilise.

# Usage

## Setting up

- Install with `yarn add ai-prompt-coder`
- Create a `rules.prompt` in your root directory. A basic file may include:
  ```txt
  -- src/**/*.prompt
  Project written in TypeScript with: React.
  ```
  This will be applied to prompts. You can exclude files using the following notation:
  ```txt
  -- **/components/**/*.tsx.prompt ["**/*.stories.tsx.prompt"]
  Rule applied to all components, excluding StoryBook examples.
  ```

## Generating files

To generate a file:

- Create a file called `OUTPUT_NAME.prompt`. For
  example, create `Timer.tsx.prompt` with the following:

  ```txt
  Create a component named Timer that displays the ellapsed time since started.
  ```

- Run using `npx ai-prompt-coder`. This will produce a `Timer.tsx` file.
- If you are unhappy with the file, delete and run again.
- You can embed other files using the markup `[[./relative-path/filename]]`. For example:
  ```txt
  Create a component that displays an Image [[../types/Image.ts]].
  ```
