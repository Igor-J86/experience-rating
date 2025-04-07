import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const saveLocal = (name:string,item:string) => {
  localStorage.setItem(name, item)
}

export const loadLocal = (name:string) => {
  return localStorage.getItem(name)
}

export const removeLocal = (name:string) => {
  return localStorage.removeItem(name)
}

export const setQueryParam = (queryName:string, value:string) => {
  const searchParams = new URLSearchParams(location.search);
  // Update url with query param
  searchParams.set(queryName, value)
  const newUrl = `${window.location.pathname}?${searchParams.toString()}`
  window.history.replaceState(null, "", newUrl)
}

// Create PDF document
export const PdfDocument = async (area:string) => {
  const element = document.body;
  const topics = element.querySelector('.topics')
  const summary = element.querySelector('.summary')
  const canvasContainer = element.querySelector('.canvas')
  const buttons = element.querySelectorAll('button')
  const heading = element.querySelector('h1')

  canvasContainer?.setAttribute('style',`max-width: 100vw; display: flex; justify-content: center;`)
  heading?.setAttribute('style','display: none;')
  topics?.setAttribute('style','display: none;')
  summary?.setAttribute('style','color: #333333; width: 100%; max-width: unset;')
  buttons.forEach((btn) => btn.setAttribute('style', 'display: none;'))
  
  const canvas = await html2canvas(element, { scale: 2 }); // Higher scale for better quality
  const imgData = canvas.toDataURL('image/png');
  
  const pdf = new jsPDF('landscape', 'mm', 'a4'); // Set landscape mode
  const width = pdf.internal.pageSize.getWidth();
  const height = pdf.internal.pageSize.getHeight();

  pdf.addImage(imgData, 'PNG', 5, 0, width - 10, height); // Fit to page
  pdf.save(`${area}_summary.pdf`);

  canvasContainer?.removeAttribute('style');
  heading?.removeAttribute('style');
  topics?.removeAttribute('style');
  summary?.removeAttribute('style');
  buttons?.forEach((btn) => btn.removeAttribute('style'));

};