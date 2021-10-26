import DefaultGenerator from './DefaultGenerator';

// eslint-disable-next-line import/prefer-default-export
export const upload = DefaultGenerator.post<{ picture: File }, { url: string }>('/master/index/uploadFile', ({ picture }) => {
  const form = new FormData();
  form.append('picture', picture);
  return {
    data: form,
  };
});
