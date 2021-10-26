export default function (url: string, fileName?: string) { // 跨域文件路径、下载到本地的文件名
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  xhr.onload = () => {
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(xhr.response);
    if (!fileName) {
      const arr = url.split('/');
      fileName = arr[arr.length - 1];
    }
    a.download = fileName;
    a.click();
  };
  xhr.send();
}
