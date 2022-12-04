// eslint-disable-next-line import/prefer-default-export
export const loadJson = () => new Promise<string>((resolve) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';
  input.style.display = 'none';
  input.dataset.testid = 'file-loader-load-json';

  const detach = () => { input?.remove(); };
  const handleChange = (ev: Event) => {
    const elem = ev.currentTarget as HTMLInputElement;
    const file = elem.files?.[0];
    if (!file) {
      detach();
      resolve('');
    }
    detach();
    resolve(file!.text());
  };
  input.addEventListener('change', handleChange, { once: true });
  document.body.appendChild(input);
  input.click();
  window.addEventListener('focus', detach, { once: true });
});
