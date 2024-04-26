export const fileDownloader = (data: Blob, fileName: string) => {
	const link = document.createElement('a');
	link.href = window.URL.createObjectURL(data);
	link.download = fileName;
	document.body.append(link);
	link.click();
	link.remove();
};
