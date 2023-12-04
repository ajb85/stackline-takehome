export function getSearchParams(...expectedParams: string[]) {
  const queryParameters = new URLSearchParams(window.location.search);
  return expectedParams.reduce((acc, param) => {
    acc[param] = queryParameters.get(param);
    return acc;
  }, {} as Record<string, string | null>);
}
