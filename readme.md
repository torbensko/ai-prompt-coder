# Introduction

`ai-prompt-coder` uses ChatGPT to write code based on `.prompt` files. It will
build a prompt based on a set of rules applied to your directory structure.
All rules are defined in `.promptRules`. Please see `/examples` for existing
rules you can utilise.

# Usage

## Setting up

- Install

  ```
  yarn add ai-prompt-coder
  ```

- Create a `.promptRules` in your root directory. A basic rule that will be applied to all generated prompts looks as follows:

  ```txt
  -- src/**/*.prompt
  Project written in TypeScript with: React.
  ```

- To exclude files, add them to an array after the glob pattern:

  ```txt
  -- **/components/**/*.tsx.prompt ["**/*.stories.tsx.prompt"]
  Rule applied to all components, excluding StoryBook examples.
  ```

A full example may look as follows:

````txt
-- src/**/*.prompt

This project uses: TypeScript, React, MUI, lodash, styled-components.

-- **/components/**/*.tsx.prompt ["**/*.stories.tsx.prompt"]

Follow the approach shown in this example:

```tsx
export interface IMyComponentProps {...}
export const MyComponent: React.FC<IMyComponentProps> = ({ ... }) => { ... }
```

No default export.
Include a class comment explaining the purpose of the component.
Use existing MUI components if necessary.

-- **/components/**/*.stories.tsx.prompt

Storybook example demonstrating all props.
Follow the approach shown in this example:

```ts
import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { MyComponent, IMyComponentProps } from "./MyComponent";

const meta: Meta = {
  title: "Example/MyComponent",
  component: MyComponent,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    onClick: { action: "clicked" }
  }
};

export default meta;

const Template: StoryFn<IMyComponentProps> = (args) => <MyComponent {...args} />;

export const Default = Template.bind({});
Default.args = {
  onClick: action("digit-click")
};
```

-- **/helpers/*.ts.prompt

Do not include any examples or tests in the code.
Ensure the function is exported.
Add a comment describing the purpose of the function.

-- **/helpers/**/*.spec.ts.prompt

Use Jest for testing.
````

## Generating files

To generate a file:

- Create a file called `_prompts/OUTPUT_NAME.prompt`. For example, create
  `Timer.tsx.prompt` with the following:

  ```txt
  Create a component named Timer that displays the ellapsed time since started.
  ```

- Run using `npx ai-prompt-coder`. This will produce a `Timer.tsx` file.
- If you are unhappy with the file, delete and run again.
- You can embed other files using the markup `[[./relative-path/filename]]`. For example:

  ```txt
  Create a component that displays an Image [[../types/Image.ts]].
  ```
