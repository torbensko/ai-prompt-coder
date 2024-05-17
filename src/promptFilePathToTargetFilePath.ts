export function promptFilePathToTargetFilePath(filePath: string) {
  const target = filePath.replace(".prompt", "").replace("/_prompts/", "/");
  return target;
}
